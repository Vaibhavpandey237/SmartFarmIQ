package com.plantcare.ai.service;

import org.springframework.stereotype.Service;
import javax.imageio.ImageIO;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class ImageProcessingService {

    /**
     * Reads image byte array into a Java BufferedImage.
     */
    public BufferedImage readImage(byte[] imageBytes) throws IOException {
        ByteArrayInputStream bais = new ByteArrayInputStream(imageBytes);
        BufferedImage image = ImageIO.read(bais);
        if (image == null) {
            throw new IOException("Unsupported image format or corrupt byte stream.");
        }
        return image;
    }

    /**
     * Resizes a BufferedImage to target dimensions (e.g. 224x224 for DJL tensor input).
     */
    public BufferedImage resizeImage(BufferedImage originalImage, int targetWidth, int targetHeight) {
        BufferedImage resizedImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = resizedImage.createGraphics();
        g2d.drawImage(originalImage, 0, 0, targetWidth, targetHeight, null);
        g2d.dispose();
        return resizedImage;
    }

    /**
     * Analyzes leaf pixel color histograms to calculate chlorosis (yellowing)
     * and necrosis (browning) percentages across the foliage.
     */
    public Map<String, Object> analyzeLeafColorMetrics(BufferedImage image) {
        int width = image.getWidth();
        int height = image.getHeight();
        long totalPixels = (long) width * height;
        
        long yellowPixels = 0;
        long brownPixels = 0;
        long greenPixels = 0;
        long skinPixels = 0;
        long backdropPixels = 0;

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int rgb = image.getRGB(x, y);
                int r = (rgb >> 16) & 0xFF;
                int g = (rgb >> 8) & 0xFF;
                int b = rgb & 0xFF;

                // 1. Human Skin Detection
                double cb = -0.168736 * r - 0.331264 * g + 0.5 * b + 128;
                double cr = 0.5 * r - 0.418688 * g - 0.081312 * b + 128;
                boolean isSkin = (cb >= 77 && cb <= 127 && cr >= 133 && cr <= 173) ||
                                 (r > 80 && g > 45 && b > 30 && r > g && g > b && (r - g >= 10) && (g - b >= 5));
                if (isSkin) {
                    skinPixels++;
                }

                // 2. Green detection (Chlorophyll)
                int excessGreen = 2 * g - r - b;
                if (excessGreen > 12 && g > r + 6 && g > b + 6 && g >= 35 && g <= 240) {
                    greenPixels++;
                }
                // 3. Yellow detection (Chlorosis)
                else if (r >= 70 && g >= 70 && b <= 125 && Math.abs(r - g) <= 28 && g > b + 18) {
                    yellowPixels++;
                }
                // 4. Brown detection (Necrosis / Drying)
                else if (r >= 55 && r <= 165 && g >= 35 && g <= 130 && b <= 85 && r > g && g > b && (r - g <= 45)) {
                    brownPixels++;
                }

                // 5. Neutral studio/passport backdrop
                if ((r > 215 && g > 215 && b > 215) || (b > 180 && r > 160 && g > 160 && Math.abs(r - g) < 20)) {
                    backdropPixels++;
                }
            }
        }

        double greenPct = (greenPixels * 100.0) / Math.max(1, totalPixels);
        double yellowPct = (yellowPixels * 100.0) / Math.max(1, totalPixels);
        boolean hasLeafBase = greenPct >= 5.0 || yellowPct >= 8.0;
        double brownPct = hasLeafBase ? ((brownPixels * 100.0) / Math.max(1, totalPixels)) : 0.0;
        double skinPct = (skinPixels * 100.0) / Math.max(1, totalPixels);
        double backdropPct = (backdropPixels * 100.0) / Math.max(1, totalPixels);
        double totalFoliagePct = greenPct + yellowPct + brownPct;

        boolean isValidPlantLeaf = true;
        String rejectionReason = null;

        boolean isHumanPortrait = (skinPct >= 7.0 && totalFoliagePct < 8.0) ||
                                (skinPct >= 20.0 && totalFoliagePct < 15.0) ||
                                (skinPct >= 5.0 && backdropPct >= 20.0 && totalFoliagePct < 8.0);

        if (isHumanPortrait) {
            isValidPlantLeaf = false;
            rejectionReason = "अमान्य फोटो: इंसान का चेहरा / पासपोर्ट फोटो डिटेक्ट हुआ है। कृपया केवल फसल या पौधे की पत्ती (Crop Leaf) की फोटो अपलोड करें। (Human portrait / passport photo detected.)";
        } else if (totalFoliagePct < 15.0) {
            isValidPlantLeaf = false;
            rejectionReason = "अमान्य फोटो: इस फोटो में कोई पौधा या पत्ती नहीं मिली। कृपया केवल फसल या पौधे की पत्ती (Plant Leaf) की साफ फोटो अपलोड करें। (Non-plant image: No crop leaf foliage detected.)";
        }

        Map<String, Object> metrics = new HashMap<>();
        metrics.put("imageWidth", width);
        metrics.put("imageHeight", height);
        metrics.put("greenCoveragePct", Math.round(greenPct * 10.0) / 10.0);
        metrics.put("chlorosisYellowPct", Math.round(yellowPct * 10.0) / 10.0);
        metrics.put("necrosisBrownPct", Math.round(brownPct * 10.0) / 10.0);
        metrics.put("skinPct", Math.round(skinPct * 10.0) / 10.0);
        metrics.put("foliagePct", Math.round(totalFoliagePct * 10.0) / 10.0);
        metrics.put("isValidPlantLeaf", isValidPlantLeaf);
        metrics.put("rejectionReason", rejectionReason);

        return metrics;
    }
}
