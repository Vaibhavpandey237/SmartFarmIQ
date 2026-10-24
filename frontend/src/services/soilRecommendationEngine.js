/**
 * SoilSense AI — Smart Multi-Factor Agronomic Crop Recommendation Engine
 * Calculates transparent, multi-parameter suitability scores based on:
 *   - Major Soil Group & Physical Soil Texture
 *   - Geographic State & Regional Agro-Climatic Zone
 *   - Sowing Season (Kharif, Rabi, Zaid, Annual)
 *   - Irrigation Availability (Rainfed, Limited, Reliable)
 *   - Optional Soil-Test Data (pH, N, P, K, EC, Organic Carbon)
 *   - Farming Objective / Goal
 */

import { CROPS_KNOWLEDGE_BASE, INDIAN_SOIL_GROUPS, SOIL_TEXTURE_CLASSES } from '../data/soilCropKnowledgeBase.js';

export function calculateCropRecommendations({
  soilGroupKey,
  soilTextureKey,
  state,
  district,
  season,
  irrigation,
  soilTest = {},
  farmingGoal = 'all'
}) {
  if (!soilGroupKey) {
    return {
      recommendations: [],
      isPreliminary: true,
      missingFactors: ['Soil Identification required']
    };
  }

  const missingFactors = [];
  if (!state) missingFactors.push('State / District location');
  if (!season) missingFactors.push('Sowing Season');
  if (!irrigation) missingFactors.push('Irrigation Availability');

  const isPreliminary = missingFactors.length > 0;

  const scoredCrops = CROPS_KNOWLEDGE_BASE.map(crop => {
    let score = 0;
    const explanations = [];
    const breakdown = {
      soilFit: 0,
      seasonFit: 0,
      waterFit: 0,
      chemicalFit: 0,
      regionalFit: 0
    };

    // 1. SOIL GROUP COMPATIBILITY (Max 35 points)
    if (crop.suitableSoils.includes(soilGroupKey)) {
      const isPrimary = crop.suitableSoils[0] === soilGroupKey;
      breakdown.soilFit = isPrimary ? 35 : 28;
      explanations.push(
        isPrimary 
          ? `Primary agronomic affinity: ${crop.name} is ideally adapted to ${INDIAN_SOIL_GROUPS[soilGroupKey]?.name || soilGroupKey}.`
          : `Well-suited secondary crop for ${INDIAN_SOIL_GROUPS[soilGroupKey]?.name || soilGroupKey} with appropriate fertility management.`
      );
    } else {
      breakdown.soilFit = 8;
      explanations.push(`Marginal match: ${crop.name} typically requires different soil properties, but can grow with intensive soil conditioning.`);
    }

    // Texture compatibility bonus / check
    if (soilTextureKey && crop.preferredTextures.includes(soilTextureKey)) {
      breakdown.soilFit = Math.min(35, breakdown.soilFit + 5);
      explanations.push(`Physical texture (${SOIL_TEXTURE_CLASSES[soilTextureKey]?.name || soilTextureKey}) facilitates ideal root anchorage and aeration.`);
    }

    // 2. SEASONAL ALIGNMENT (Max 25 points)
    const effectiveSeason = (season || 'kharif').toLowerCase();
    if (crop.seasons.includes(effectiveSeason)) {
      breakdown.seasonFit = 25;
      explanations.push(`Active season match: Highly synchronized with the ${effectiveSeason.toUpperCase()} sowing cycle.`);
    } else if (crop.seasons.includes('annual')) {
      breakdown.seasonFit = 22;
      explanations.push(`Perennial / Annual crop: Can be established during current season provided moisture is adequate.`);
    } else {
      breakdown.seasonFit = 4;
      explanations.push(`Off-season warning: Sowing outside standard window (${crop.sowingWindow}) risks temperature/daylight stress.`);
    }

    // 3. WATER & IRRIGATION FEASIBILITY (Max 25 points)
    const effectiveIrrigation = (irrigation || 'limited').toLowerCase();
    if (effectiveIrrigation === 'rainfed') {
      if (crop.irrigationLevel === 'rainfed') {
        breakdown.waterFit = 25;
        explanations.push(`Drought resilience: Outstanding survival under purely rainfed moisture conditions.`);
      } else if (crop.irrigationLevel === 'limited') {
        breakdown.waterFit = 16;
        explanations.push(`Moderate moisture sensitivity: May yield acceptably if monsoon rainfall is well-distributed, but vulnerable to prolonged dry spells.`);
      } else {
        breakdown.waterFit = 0; // Reliable water required!
        explanations.push(`High water deficit risk: ${crop.name} requires assured/flooded irrigation (${crop.waterRequirementMm}) and is prone to crop failure under dry rainfed conditions.`);
      }
    } else if (effectiveIrrigation === 'limited') {
      if (crop.irrigationLevel === 'limited' || crop.irrigationLevel === 'rainfed') {
        breakdown.waterFit = 25;
        explanations.push(`Optimal water synergy: Protective 2–3 irrigations meet crop critical stage demands.`);
      } else {
        breakdown.waterFit = 14;
        explanations.push(`Supplemental irrigation needed: Requires careful water scheduling at critical development stages.`);
      }
    } else {
      // Reliable irrigation
      breakdown.waterFit = 25;
      explanations.push(`Assured irrigation support: Ample canal/tube-well water meets full crop evapotranspiration demand.`);
    }

    // 4. CHEMICAL & SOIL-TEST ALIGNMENT (Max 10 points)
    let chemicalScore = 10;
    if (soilTest && soilTest.ph) {
      const ph = parseFloat(soilTest.ph);
      if (!isNaN(ph)) {
        if (ph >= crop.phRange.min && ph <= crop.phRange.max) {
          chemicalScore = 10;
          explanations.push(`Soil pH (${ph}) is within the verified tolerance envelope (${crop.phRange.optimal}).`);
        } else {
          chemicalScore = 2;
          explanations.push(`pH caution: Field pH (${ph}) is outside optimal range (${crop.phRange.optimal}), requiring soil amendments.`);
        }
      }
    }
    breakdown.chemicalFit = chemicalScore;

    // 5. REGIONAL / STATE ADAPTABILITY (Max 5 points)
    if (state && crop.majorStates.some(s => s.toLowerCase() === state.toLowerCase())) {
      breakdown.regionalFit = 5;
      explanations.push(`Proven regional cultivar: Widely cultivated with strong market and procurement presence across ${state}.`);
    } else {
      breakdown.regionalFit = 2;
    }

    // 6. FARMING GOAL BONUS
    if (farmingGoal === 'soil_restoring' && crop.category.includes('Legume')) {
      score += 5;
      explanations.push(`Goal alignment: Biological nitrogen fixation enhances organic fertility for future crops.`);
    } else if (farmingGoal === 'drought_hardy' && crop.waterTolerance.toLowerCase().includes('drought')) {
      score += 5;
      explanations.push(`Goal alignment: Proven drought endurance protects farm capital in water-scarce years.`);
    } else if (farmingGoal === 'cash_crop' && crop.category.includes('Cash')) {
      score += 4;
    }

    score = breakdown.soilFit + breakdown.seasonFit + breakdown.waterFit + breakdown.chemicalFit + breakdown.regionalFit;
    score = Math.min(100, Math.max(10, score));

    // Suitability Category
    let suitabilityLabel = 'Moderate Suitability';
    let badgeClass = 'suitability-moderate';
    if (score >= 82) {
      suitabilityLabel = 'Highly Recommended';
      badgeClass = 'suitability-high';
    } else if (score >= 65) {
      suitabilityLabel = 'Suitable with Management';
      badgeClass = 'suitability-good';
    } else {
      suitabilityLabel = 'Conditional / Marginal';
      badgeClass = 'suitability-marginal';
    }

    return {
      ...crop,
      suitabilityScore: score,
      suitabilityLabel,
      badgeClass,
      breakdown,
      explanations
    };
  });

  // Sort descending by suitability score
  scoredCrops.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  // Take top 3 to 5 recommendations
  const topRecommendations = scoredCrops.slice(0, 5);

  return {
    recommendations: topRecommendations,
    isPreliminary,
    missingFactors,
    totalEvaluated: scoredCrops.length,
    soilGroup: INDIAN_SOIL_GROUPS[soilGroupKey] || null,
    soilTexture: SOIL_TEXTURE_CLASSES[soilTextureKey] || null
  };
}
