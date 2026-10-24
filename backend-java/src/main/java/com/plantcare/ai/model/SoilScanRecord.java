package com.plantcare.ai.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "soil_scan_records")
public class SoilScanRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_identifier")
    private String userIdentifier;

    @Column(name = "field_name")
    private String fieldName;

    @Column(name = "field_acreage")
    private String fieldAcreage;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "soil_group", nullable = false)
    private String soilGroup;

    @Column(name = "soil_texture")
    private String soilTexture;

    @Column(name = "confidence_pct")
    private Double confidencePct;

    @Column(name = "state")
    private String state;

    @Column(name = "district")
    private String district;

    @Column(name = "season")
    private String season;

    @Column(name = "irrigation")
    private String irrigation;

    @Column(name = "recommendations_json", columnDefinition = "TEXT")
    private String recommendationsJson;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public SoilScanRecord() {}

    public SoilScanRecord(String userIdentifier, String fieldName, String fieldAcreage, String imageName,
                          String soilGroup, String soilTexture, Double confidencePct,
                          String state, String district, String season, String irrigation,
                          String recommendationsJson) {
        this.userIdentifier = userIdentifier;
        this.fieldName = fieldName;
        this.fieldAcreage = fieldAcreage;
        this.imageName = imageName;
        this.soilGroup = soilGroup;
        this.soilTexture = soilTexture;
        this.confidencePct = confidencePct;
        this.state = state;
        this.district = district;
        this.season = season;
        this.irrigation = irrigation;
        this.recommendationsJson = recommendationsJson;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserIdentifier() { return userIdentifier; }
    public void setUserIdentifier(String userIdentifier) { this.userIdentifier = userIdentifier; }

    public String getFieldName() { return fieldName; }
    public void setFieldName(String fieldName) { this.fieldName = fieldName; }

    public String getFieldAcreage() { return fieldAcreage; }
    public void setFieldAcreage(String fieldAcreage) { this.fieldAcreage = fieldAcreage; }

    public String getImageName() { return imageName; }
    public void setImageName(String imageName) { this.imageName = imageName; }

    public String getSoilGroup() { return soilGroup; }
    public void setSoilGroup(String soilGroup) { this.soilGroup = soilGroup; }

    public String getSoilTexture() { return soilTexture; }
    public void setSoilTexture(String soilTexture) { this.soilTexture = soilTexture; }

    public Double getConfidencePct() { return confidencePct; }
    public void setConfidencePct(Double confidencePct) { this.confidencePct = confidencePct; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public String getIrrigation() { return irrigation; }
    public void setIrrigation(String irrigation) { this.irrigation = irrigation; }

    public String getRecommendationsJson() { return recommendationsJson; }
    public void setRecommendationsJson(String recommendationsJson) { this.recommendationsJson = recommendationsJson; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
