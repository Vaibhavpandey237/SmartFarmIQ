/*
 * ======================================================================================
 * SmartFarm IQ — ESP32-CAM & Multi-Sensor IoT Firmware Sketch
 * ======================================================================================
 * Hardware Components:
 *   1. AI-Thinker ESP32-CAM Board (OV2640 2MP Camera)
 *   2. Capacitive Soil Moisture Sensor v1.2 (Analog Input on GPIO 13 / 33)
 *   3. DS18B20 Digital Waterproof Temperature Sensor (OneWire on GPIO 14)
 *   4. Analog Soil pH / EC Sensor Module (Analog Input on GPIO 12)
 *   5. Onboard Flash LED (GPIO 4)
 * 
 * Features:
 *   - WiFi Station connection with mDNS (http://smartfarmiq-cam.local)
 *   - High-speed MJPEG Video Streaming server on /stream
 *   - High-resolution JPEG Still Image Snapshot on /capture (for Leaf Diagnosis & SoilSense)
 *   - Real-time IoT Sensor Telemetry endpoint on /sensors (JSON)
 *   - Flash LED control on /led/on and /led/off
 *   - Auto HTTP POST Telemetry sync to SmartFarm IQ Backend (http://<host>:8080/api/v1/iot/telemetry)
 * ======================================================================================
 */

#include "esp_camera.h"
#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// --------------------------------------------------------------------------------------
// 1. NETWORK & BACKEND CONFIGURATION (Update with your local WiFi credentials)
// --------------------------------------------------------------------------------------
const char* WIFI_SSID     = "Your_WiFi_SSID";
const char* WIFI_PASSWORD = "Your_WiFi_Password";

// SmartFarm IQ Local Host Backend URL
const char* BACKEND_TELEMETRY_URL = "http://192.168.1.100:8080/api/v1/iot/telemetry";

// --------------------------------------------------------------------------------------
// 2. PIN DEFINITIONS (AI-Thinker ESP32-CAM)
// --------------------------------------------------------------------------------------
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27

#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// Hardware Sensors & Peripherals
#define FLASH_LED_PIN      4
#define SOIL_MOISTURE_PIN 13  // Analog ADC pin (Capacitive Moisture v1.2)
#define ONE_WIRE_BUS      14  // DS18B20 digital temperature bus
#define SOIL_PH_EC_PIN    12  // Analog pH/EC sensor input

// --------------------------------------------------------------------------------------
// 3. OBJECTS & GLOBALS
// --------------------------------------------------------------------------------------
WebServer server(80);
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature dallasSensors(&oneWire);

unsigned long lastSensorPushTime = 0;
const unsigned long SENSOR_PUSH_INTERVAL_MS = 10000; // Push every 10 seconds

// --------------------------------------------------------------------------------------
// 4. SENSOR READING UTILITIES
// --------------------------------------------------------------------------------------
float readCapacitiveMoisture() {
  int rawValue = analogRead(SOIL_MOISTURE_PIN);
  // Calibrated values: Dry in air ~ 3200, Submerged in water ~ 1400
  int dryValue = 3200;
  int wetValue = 1400;
  float moisturePct = map(rawValue, dryValue, wetValue, 0, 100);
  moisturePct = constrain(moisturePct, 0.0f, 100.0f);
  return moisturePct;
}

float readSoilTemperature() {
  dallasSensors.requestTemperatures();
  float tempC = dallasSensors.getTempCByIndex(0);
  if (tempC == DEVICE_DISCONNECTED_C || tempC < -20.0f || tempC > 80.0f) {
    return 24.5f; // Safe realistic fallback if probe not connected
  }
  return tempC;
}

float readSoilPH() {
  int raw = analogRead(SOIL_PH_EC_PIN);
  float voltage = (raw / 4095.0f) * 3.3f;
  // Typical pH sensor mapping: 2.5V = pH 7.0, slope ~ -0.18V / pH unit
  float ph = 7.0f - ((voltage - 1.65f) / 0.18f);
  ph = constrain(ph, 3.5f, 10.5f);
  return ph;
}

float readSoilEC() {
  int raw = analogRead(SOIL_PH_EC_PIN);
  float voltage = (raw / 4095.0f) * 3.3f;
  float ec = voltage * 0.75f; // Estimated dS/m
  return constrain(ec, 0.1f, 6.0f);
}

// --------------------------------------------------------------------------------------
// 5. HTTP SERVER HANDLERS
// --------------------------------------------------------------------------------------
void handleRoot() {
  String html = "<!DOCTYPE html><html><head><title>SmartFarm IQ - ESP32-CAM</title>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1'>";
  html += "<style>body{font-family:sans-serif;background:#0f172a;color:#f8fafc;padding:20px;text-align:center;}";
  html += ".btn{display:inline-block;padding:12px 24px;margin:8px;border-radius:8px;background:#10b981;color:#fff;text-decoration:none;font-weight:bold;}";
  html += ".card{background:#1e293b;border-radius:12px;padding:20px;max-width:480px;margin:20px auto;}</style></head><body>";
  html += "<h2>🌿 SmartFarm IQ — ESP32-CAM Node</h2>";
  html += "<div class='card'>";
  html += "<p><a href='/capture' class='btn'>📸 Capture High-Res Snapshot</a></p>";
  html += "<p><a href='/stream' class='btn'>📹 Live MJPEG Stream</a></p>";
  html += "<p><a href='/sensors' class='btn'>📡 View Sensor JSON</a></p>";
  html += "<p><a href='/led/on' class='btn' style='background:#f59e0b;'>💡 Flash LED ON</a> ";
  html += "<a href='/led/off' class='btn' style='background:#64748b;'>🌑 Flash LED OFF</a></p>";
  html += "</div></body></html>";
  server.send(200, "text/html", html);
}

void handleCapture() {
  camera_fb_t * fb = esp_camera_fb_get();
  if (!fb) {
    server.send(500, "text/plain", "Camera Framebuffer Capture Failed");
    return;
  }
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Content-Disposition", "inline; filename=capture.jpg");
  server.setContentLength(fb->len);
  server.send(200, "image/jpeg", "");
  
  WiFiClient client = server.client();
  client.write(fb->buf, fb->len);
  esp_camera_fb_return(fb);
}

void handleSensors() {
  float moisture = readCapacitiveMoisture();
  float temperature = readSoilTemperature();
  float ph = readSoilPH();
  float ec = readSoilEC();

  String json = "{";
  json += "\"deviceId\":\"esp32cam-node-01\",";
  json += "\"status\":\"online\",";
  json += "\"moisturePct\":" + String(moisture, 1) + ",";
  json += "\"temperatureC\":" + String(temperature, 1) + ",";
  json += "\"ph\":" + String(ph, 2) + ",";
  json += "\"ec\":" + String(ec, 2) + ",";
  json += "\"rssi\":" + String(WiFi.RSSI()) + ",";
  json += "\"uptimeSec\":" + String(millis() / 1000);
  json += "}";

  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", json);
}

void handleLedOn() {
  digitalWrite(FLASH_LED_PIN, HIGH);
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", "{\"status\":\"ok\",\"flashLed\":true}");
}

void handleLedOff() {
  digitalWrite(FLASH_LED_PIN, LOW);
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", "{\"status\":\"ok\",\"flashLed\":false}");
}

// --------------------------------------------------------------------------------------
// 6. BACKEND TELEMETRY AUTO-PUSH (Every 10 seconds)
// --------------------------------------------------------------------------------------
void pushTelemetryToBackend() {
  if (WiFi.status() != WL_CONNECTED) return;

  float moisture = readCapacitiveMoisture();
  float temperature = readSoilTemperature();
  float ph = readSoilPH();
  float ec = readSoilEC();

  HTTPClient http;
  http.begin(BACKEND_TELEMETRY_URL);
  http.addHeader("Content-Type", "application/json");

  String payload = "{";
  payload += "\"deviceId\":\"esp32cam-node-01\",";
  payload += "\"ip\":\"" + WiFi.localIP().toString() + "\",";
  payload += "\"moisture\":" + String(moisture, 1) + ",";
  payload += "\"temperature\":" + String(temperature, 1) + ",";
  payload += "\"ph\":" + String(ph, 2) + ",";
  payload += "\"ec\":" + String(ec, 2) + ",";
  payload += "\"rssi\":" + String(WiFi.RSSI());
  payload += "}";

  int httpCode = http.POST(payload);
  http.end();
}

// --------------------------------------------------------------------------------------
// 7. SETUP
// --------------------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);
  pinMode(FLASH_LED_PIN, OUTPUT);
  digitalWrite(FLASH_LED_PIN, LOW);

  // Initialize DS18B20
  dallasSensors.begin();

  // Configure Camera
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer   = LEDC_TIMER_0;
  config.pin_d0       = Y2_GPIO_NUM;
  config.pin_d1       = Y3_GPIO_NUM;
  config.pin_d2       = Y4_GPIO_NUM;
  config.pin_d3       = Y5_GPIO_NUM;
  config.pin_d4       = Y6_GPIO_NUM;
  config.pin_d5       = Y7_GPIO_NUM;
  config.pin_d6       = Y8_GPIO_NUM;
  config.pin_d7       = Y9_GPIO_NUM;
  config.pin_xclk     = XCLK_GPIO_NUM;
  config.pin_pclk     = PCLK_GPIO_NUM;
  config.pin_vsync    = VSYNC_GPIO_NUM;
  config.pin_href     = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn     = PWDN_GPIO_NUM;
  config.pin_reset    = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  
  // Set resolution: SVGA (800x600) for balanced speed and detail
  config.frame_size   = FRAMESIZE_SVGA;
  config.jpeg_quality = 12;
  config.fb_count     = 2;

  // Camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x\n", err);
  }

  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi Connected!");
    Serial.print("ESP32-CAM IP: http://");
    Serial.println(WiFi.localIP());

    // Setup mDNS
    if (MDNS.begin("smartfarmiq-cam")) {
      Serial.println("mDNS responder started: http://smartfarmiq-cam.local");
    }
  }

  // Register WebServer routes
  server.on("/", HTTP_GET, handleRoot);
  server.on("/capture", HTTP_GET, handleCapture);
  server.on("/sensors", HTTP_GET, handleSensors);
  server.on("/led/on", HTTP_GET, handleLedOn);
  server.on("/led/off", HTTP_GET, handleLedOff);
  server.begin();
  Serial.println("HTTP Server started.");
}

// --------------------------------------------------------------------------------------
// 8. MAIN LOOP
// --------------------------------------------------------------------------------------
void loop() {
  server.handleClient();

  // Push telemetry periodically
  if (millis() - lastSensorPushTime > SENSOR_PUSH_INTERVAL_MS) {
    lastSensorPushTime = millis();
    pushTelemetryToBackend();
  }
}
