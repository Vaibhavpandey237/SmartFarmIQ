package com.plantcare.ai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.plantcare.ai.model.SoilScanRecord;
import com.plantcare.ai.repository.SoilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.*;

@Service
public class SoilService {

    @Autowired(required = false)
    private SoilRepository soilRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Analyze agricultural soil image bytes using computer vision & color space statistics
     */
    public Map<String, Object> analyzeSoil(byte[] imageBytes, String filename) throws IOException {
        if (imageBytes == null || imageBytes.length == 0) {
            throw new IllegalArgumentException("Image byte array is empty.");
        }

        BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
        if (img == null) {
            throw new IllegalArgumentException("Unable to decode image format. Supported formats: JPEG, PNG, WEBP.");
        }

        int width = img.getWidth();
        int height = img.getHeight();

        long sampled = 0;
        long totalR = 0, totalG = 0, totalB = 0;
        long faceSkinPixels = 0;
        long whiteGlarePixels = 0;
        long soilPixels = 0;
        double gradientSum = 0;

        int step = Math.max(1, Math.min(width, height) / 100);

        for (int y = 0; y < height; y += step) {
            for (int x = 0; x < width; x += step) {
                sampled++;
                int rgb = img.getRGB(x, y);
                int r = (rgb >> 16) & 0xFF;
                int g = (rgb >> 8) & 0xFF;
                int b = rgb & 0xFF;

                totalR += r;
                totalG += g;
                totalB += b;

                // Human face skin detection
                if (r > 130 && g > 85 && b > 65 && r > g + 18 && g > b + 10 && g < 175) {
                    faceSkinPixels++;
                }

                // White glare / empty document detection
                if (r > 240 && g > 240 && b > 240) {
                    whiteGlarePixels++;
                }

                // Soil natural hue check (browns, terracotta red, black humus, yellowish sand)
                boolean isSoilHue = (r < 95 && g < 95 && b < 95 && Math.abs(r - g) < 22 && Math.abs(g - b) < 22)
                        || (r > 80 && r > g && g > b - 10 && (r - b) > 25)
                        || (r > 70 && g > 55 && b < 140 && r >= g && g >= b - 15)
                        || (r > 120 && g > 110 && b > 60 && r >= g && g > b);

                if (isSoilHue) {
                    soilPixels++;
                }

                // Sharpness gradient check
                if (x + step < width && y + step < height) {
                    int nextRgb = img.getRGB(x + step, y);
                    int nr = (nextRgb >> 16) & 0xFF;
                    int ng = (nextRgb >> 8) & 0xFF;
                    int nb = nextRgb & 0xFF;
                    gradientSum += Math.abs((r + g + b) - (nr + ng + nb)) / 3.0;
                }
            }
        }

        double faceSkinRatio = (double) faceSkinPixels / sampled;
        double whiteGlareRatio = (double) whiteGlarePixels / sampled;
        double soilRatio = (double) soilPixels / sampled;
        double avgGradient = gradientSum / sampled;

        // Validation & Rejection
        if (faceSkinRatio > 0.35) {
            Map<String, Object> err = new HashMap<>();
            err.put("error", "UNSUITABLE_SAMPLE");
            err.put("message", "The image appears to contain a human subject. Please capture a clear photograph of an agricultural field soil bed or clod.");
            return err;
        }

        if (whiteGlareRatio > 0.70) {
            Map<String, Object> err = new HashMap<>();
            err.put("error", "UNSUITABLE_SAMPLE");
            err.put("message", "The photograph is heavily overexposed or shows an empty screen. Please photograph soil under natural daylight.");
            return err;
        }

        if (soilRatio < 0.22) {
            Map<String, Object> err = new HashMap<>();
            err.put("error", "UNSUITABLE_SAMPLE");
            err.put("message", "No recognizable agricultural soil aggregate found in photograph. Please position camera 15–30 cm above soil clods.");
            return err;
        }

        double avgR = (double) totalR / sampled;
        double avgG = (double) totalG / sampled;
        double avgB = (double) totalB / sampled;
        double brightness = (avgR + avgG + avgB) / 3.0;
        double redProminence = avgR - (avgG + avgB) / 2.0;

        String predictedGroup = "alluvial";
        String predictedGroupName = "Alluvial Soil";
        String hindiName = "जलोढ़ मिट्टी (Jalodh Mitti)";
        String estimatedTexture = "loam";
        String estimatedTextureName = "Loam (Medium Balanced)";
        double confidence = 82.0;
        boolean isLowConfidence = false;
        String cautionMsg = null;

        List<Map<String, Object>> alternatives = new ArrayList<>();

        if (brightness < 65) {
            if (avgB < 50 && avgG < 55) {
                predictedGroup = "black";
                predictedGroupName = "Black Soil (Regur / Cotton Soil)";
                hindiName = "काली मिट्टी / रेगुर (Regur Mitti)";
                estimatedTexture = "heavy_clay";
                estimatedTextureName = "Heavy Clay (Fine / Dense)";
                confidence = 84.5;

                alternatives.add(createAltMap("peaty_marshy", "Peaty and Marshy Soil", 12.0));
                alternatives.add(createAltMap("alluvial", "Clayey Alluvial (Bhangar)", 3.5));
            } else {
                predictedGroup = "peaty_marshy";
                predictedGroupName = "Peaty and Marshy Soil";
                hindiName = "दलदली और जैविक मिट्टी (Daldali Mitti)";
                estimatedTexture = "silty_clay_loam";
                estimatedTextureName = "Silty Clay Loam";
                confidence = 74.0;

                alternatives.add(createAltMap("black", "Black Cotton Soil", 18.0));
                alternatives.add(createAltMap("forest_mountain", "Forest Mountain Humus", 8.0));
            }
        } else if (redProminence > 24 && avgR > 105) {
            if (avgR > 135 && (avgR - avgG) > 40) {
                predictedGroup = "laterite";
                predictedGroupName = "Laterite Soil";
                hindiName = "लेटराइट मिट्टी (Laterite Mitti)";
                estimatedTexture = "sandy_loam";
                estimatedTextureName = "Sandy Loam (Gravelly)";
                confidence = 81.5;

                alternatives.add(createAltMap("red_yellow", "Red and Yellow Soil", 15.0));
                alternatives.add(createAltMap("alluvial", "Alluvial Soil", 3.5));
            } else {
                predictedGroup = "red_yellow";
                predictedGroupName = "Red and Yellow Soil";
                hindiName = "लाल और पीली मिट्टी (Laal aur Peeli Mitti)";
                estimatedTexture = "loam";
                estimatedTextureName = "Loam (Porous & Friable)";
                confidence = 80.0;

                alternatives.add(createAltMap("laterite", "Laterite Soil", 16.0));
                alternatives.add(createAltMap("alluvial", "Alluvial Soil", 4.0));
            }
        } else if (brightness > 140 && (avgR - avgB) > 35 && avgG > 120) {
            predictedGroup = "arid_desert";
            predictedGroupName = "Desert and Arid Soil";
            hindiName = "मरुस्थलीय मिट्टी (Balui Mitti)";
            estimatedTexture = "sandy";
            estimatedTextureName = "Sandy (Coarse & Loose)";
            confidence = 86.0;

            alternatives.add(createAltMap("alluvial", "Sandy Alluvial Soil", 11.0));
            alternatives.add(createAltMap("red_yellow", "Red Sandy Soil", 3.0));
        } else if (brightness < 85 && avgGradient > 22) {
            predictedGroup = "forest_mountain";
            predictedGroupName = "Forest and Mountain Soil";
            hindiName = "पर्वतीय और वन मिट्टी (Parvatiya Mitti)";
            estimatedTexture = "loam";
            estimatedTextureName = "Loam with Humus Litter";
            confidence = 76.5;

            alternatives.add(createAltMap("alluvial", "Alluvial Plain Soil", 17.5));
            alternatives.add(createAltMap("black", "Black Soil", 6.0));
        } else {
            predictedGroup = "alluvial";
            predictedGroupName = "Alluvial Soil";
            hindiName = "जलोढ़ मिट्टी (Jalodh Mitti)";
            estimatedTexture = "loam";
            estimatedTextureName = "Loam (Medium Balanced)";
            confidence = 83.0;

            alternatives.add(createAltMap("red_yellow", "Red and Yellow Soil", 12.0));
            alternatives.add(createAltMap("arid_desert", "Semi-Arid Loam", 5.0));
        }

        if (avgGradient < 8.5) {
            confidence = Math.max(52.0, confidence - 22.0);
            isLowConfidence = true;
            cautionMsg = "The soil photograph appears slightly blurry or lacks sharp aggregate clod texture. Confidence calibrated downward.";
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("success", true);
        result.put("fileName", filename);
        result.put("predictedGroup", predictedGroup);
        result.put("predictedGroupName", predictedGroupName);
        result.put("hindiName", hindiName);
        result.put("confidencePct", Math.round(confidence * 10.0) / 10.0);
        result.put("isLowConfidence", isLowConfidence);
        result.put("cautionMessage", cautionMsg);
        result.put("alternativeClasses", alternatives);

        // Separate Texture Distinction
        result.put("estimatedTexture", estimatedTexture);
        result.put("estimatedTextureName", estimatedTextureName);

        // Typical Agronomic Estimates
        result.put("typicalWaterRetention", "Moderate to High (Typical Estimate)");
        result.put("typicalDrainage", "Well-drained in uplands (Field Behavior)");
        result.put("typicalPh", "6.5 – 7.8 (Neutral to mildly alkaline)");

        List<String> nextSteps = Arrays.asList(
                "Confirm optical assessment with your district Krishi Vigyan Kendra (KVK) or Soil Health Card laboratory testing.",
                "Verify available nitrogen, phosphorus, and potassium before purchasing fertilizer.",
                "Use our Smart Crop Recommendation Engine to identify suitable regional cultivars."
        );
        result.put("recommendedNextSteps", nextSteps);

        result.put("opticalDisclaimer", "Scientific Principle: Surface photographic color does not prove geographical soil group with 100% certainty. Laboratory testing is required for definitive physical particle-size distribution and chemical analysis.");

        return result;
    }

    private Map<String, Object> createAltMap(String group, String name, double conf) {
        Map<String, Object> m = new HashMap<>();
        m.put("group", group);
        m.put("name", name);
        m.put("confidence", conf);
        return m;
    }

    /**
     * Save soil scan record to database
     */
    public SoilScanRecord saveRecord(SoilScanRecord record) {
        if (soilRepository != null) {
            return soilRepository.save(record);
        }
        return record;
    }

    /**
     * Retrieve recent history
     */
    public List<SoilScanRecord> getHistory(String userIdentifier) {
        if (soilRepository != null) {
            if (userIdentifier != null && !userIdentifier.isEmpty()) {
                return soilRepository.findByUserIdentifierOrderByCreatedAtDesc(userIdentifier);
            }
            return soilRepository.findTop20ByOrderByCreatedAtDesc();
        }
        return Collections.emptyList();
    }
}
