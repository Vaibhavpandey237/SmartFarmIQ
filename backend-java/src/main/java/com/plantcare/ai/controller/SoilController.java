package com.plantcare.ai.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.plantcare.ai.model.SoilScanRecord;
import com.plantcare.ai.service.SoilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/v1/soil")
@CrossOrigin(origins = "*")
public class SoilController {

    @Autowired
    private SoilService soilService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> analyzeSoil(@RequestParam(value = "image", required = false) MultipartFile file,
                                                           @RequestParam(value = "file", required = false) MultipartFile fallbackFile) {
        MultipartFile target = file != null ? file : fallbackFile;
        if (target == null || target.isEmpty()) {
            Map<String, Object> err = new HashMap<>();
            err.put("error", "NO_FILE");
            err.put("message", "No image file provided for soil analysis.");
            return ResponseEntity.badRequest().body(err);
        }

        try {
            byte[] bytes = target.getBytes();
            Map<String, Object> result = soilService.analyzeSoil(bytes, target.getOriginalFilename());
            if ("UNSUITABLE_SAMPLE".equals(result.get("error"))) {
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(result);
            }
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> err = new HashMap<>();
            err.put("error", "PROCESSING_FAILED");
            err.put("message", "Soil image processing error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @PostMapping("/history")
    public ResponseEntity<Map<String, Object>> saveReport(@RequestBody Map<String, Object> payload) {
        try {
            String userIdentifier = (String) payload.getOrDefault("userIdentifier", "default_farmer");
            String fieldName = (String) payload.getOrDefault("fieldName", "Plot #1");
            String fieldAcreage = (String) payload.getOrDefault("fieldAcreage", "1.0");
            String soilGroup = (String) payload.getOrDefault("soilGroup", "Alluvial Soil");
            String soilTexture = (String) payload.getOrDefault("soilTexture", "Loam");
            String state = (String) payload.getOrDefault("state", "Uttar Pradesh");
            String district = (String) payload.getOrDefault("district", "");
            String season = (String) payload.getOrDefault("season", "kharif");
            String irrigation = (String) payload.getOrDefault("irrigation", "limited");

            String json = objectMapper.writeValueAsString(payload);

            SoilScanRecord record = new SoilScanRecord(
                    userIdentifier, fieldName, fieldAcreage, "soil_sample.jpg",
                    soilGroup, soilTexture, 82.5, state, district, season, irrigation, json
            );
            soilService.saveRecord(record);

            Map<String, Object> res = new HashMap<>();
            res.put("success", true);
            res.put("id", record.getId());
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            Map<String, Object> err = new HashMap<>();
            err.put("success", false);
            err.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<SoilScanRecord>> getHistory(@RequestParam(value = "user", required = false) String userIdentifier) {
        try {
            return ResponseEntity.ok(soilService.getHistory(userIdentifier));
        } catch (Exception e) {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }

    @GetMapping("/knowledge")
    public ResponseEntity<Map<String, Object>> getKnowledgeBase() {
        Map<String, Object> info = new HashMap<>();
        info.put("module", "SoilSense AI Agronomic Knowledge Base");
        info.put("sources", Arrays.asList("ICAR", "NBSS&LUP", "TNAU", "PAU"));
        info.put("supportedSoilGroups", Arrays.asList("Alluvial", "Black (Regur)", "Red & Yellow", "Laterite", "Desert & Arid", "Forest & Mountain", "Peaty & Marshy"));
        info.put("status", "ACTIVE");
        return ResponseEntity.ok(info);
    }
}
