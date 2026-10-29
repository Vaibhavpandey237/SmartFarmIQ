# 📷 SmartFarm IQ — ESP32-CAM & IoT Soil Hardware Integration

This module connects a physical **AI-Thinker ESP32-CAM** board and multi-sensor IoT node directly to the SmartFarm IQ platform.

---

## 🛠️ Hardware Requirements

1. **AI-Thinker ESP32-CAM Module** (includes OV2640 2MP camera)
2. **FTDI USB-to-TTL Serial Programmer** (set to 3.3V or 5V VCC, GND, TX->U0R, RX->U0T, IO0 to GND during flash)
3. **Capacitive Soil Moisture Sensor v1.2** (corrosion-resistant analog output)
4. **DS18B20 Waterproof Digital Temperature Sensor** (OneWire protocol + 4.7kΩ pull-up resistor)
5. **Analog Soil pH / EC Sensor Module** (or analog probe interface)
6. **5V 2A DC Power Supply** (clean power is crucial for ESP32 WiFi stability)

---

## 📌 Pinout & Wiring Diagram

```
ESP32-CAM Pin       Connected Device / Sensor Pin
────────────────────────────────────────────────────────────────
5V / VCC            External 5V 2A Power Supply (+)
GND                 Common Ground (Power Supply, Sensors, FTDI)
GPIO 4 (Flash)      Onboard Ultra-Bright White Flash LED
GPIO 13             Capacitive Soil Moisture Sensor Analog OUT
GPIO 14             DS18B20 Temperature Sensor DATA (4.7kΩ to 3.3V)
GPIO 12             Analog Soil pH / EC Sensor OUT
GPIO 0              Connect to GND only when flashing firmware; disconnect for run
```

---

## 🚀 Flashing Instructions (Arduino IDE)

1. Open Arduino IDE -> File -> Preferences -> Add ESP32 Board URL:
   `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
2. Install **ESP32 by Espressif** (version 2.0.x or higher) from Boards Manager.
3. Install Libraries from Library Manager:
   - `DallasTemperature` by Miles Burton
   - `OneWire` by Paul Stoffregen
4. Select Board: **AI Thinker ESP32-CAM**
   - CPU Frequency: **240MHz**
   - Flash Frequency: **80MHz**
   - Flash Mode: **QIO**
   - Partition Scheme: **Huge APP (3MB No OTA / 1MB SPIFFS)**
5. Open `smart_farm_iq_esp32cam.ino`, enter your local WiFi SSID and password.
6. Connect `GPIO 0` to `GND`, press Reset button on ESP32, and click **Upload**.
7. Once uploaded, disconnect `GPIO 0` from `GND`, press Reset, and open Serial Monitor (115200 baud).
8. Copy the displayed IP address (e.g. `http://192.168.1.105`) and enter it in the SmartFarm IQ Dashboard!

---

## 🌐 Endpoints Provided by ESP32-CAM

- `GET /` — Interactive web status interface.
- `GET /capture` — Single JPEG frame snapshot (directly ingested by Leaf Diagnosis and SoilSense).
- `GET /stream` — Continuous MJPEG video stream for live field inspection.
- `GET /sensors` — JSON sensor telemetry:
  ```json
  {
    "deviceId": "esp32cam-node-01",
    "status": "online",
    "moisturePct": 42.5,
    "temperatureC": 24.8,
    "ph": 6.8,
    "ec": 0.85,
    "rssi": -62,
    "uptimeSec": 128
  }
  ```
- `GET /led/on` & `GET /led/off` — Remote night illumination flash toggle.
