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

    // 4. CHEMICAL & HARDWARE SENSOR ALIGNMENT (Max 15 points)
    let sensorScore = 10;
    const effectivePh = parseFloat(soilTest?.ph);
    const effectiveEc = parseFloat(soilTest?.ec);
    const effectiveMoisture = parseFloat(soilTest?.moisture);
    const effectiveTemp = parseFloat(soilTest?.temperature);

    // A. Soil pH matching
    if (!isNaN(effectivePh)) {
      if (effectivePh >= crop.phRange.min && effectivePh <= crop.phRange.max) {
        sensorScore += 3;
        explanations.push(`Soil pH (${effectivePh}) is within the verified tolerance envelope (${crop.phRange.optimal}).`);
      } else {
        sensorScore -= 4;
        explanations.push(`pH Alert: Field pH (${effectivePh}) is outside optimal range (${crop.phRange.optimal}), requiring soil amendments.`);
      }
    }

    // B. EC / Salinity Tolerance Check
    if (!isNaN(effectiveEc)) {
      if (effectiveEc > 3.5) {
        // High salinity condition
        if (crop.suitableSoils.includes('saline_alkaline') || crop.category.toLowerCase().includes('salt') || crop.id === 'barley' || crop.id === 'dhaincha' || crop.id === 'salt_tolerant_rice') {
          sensorScore += 5;
          explanations.push(`High Salinity Synergy: ${crop.name} possesses certified salt/osmotic tolerance up to EC ${effectiveEc} dS/m (ICAR-CSSRI benchmark).`);
        } else {
          sensorScore -= 6;
          explanations.push(`Salinity Stress Caution: Field EC (${effectiveEc} dS/m) exceeds non-saline threshold (< 2.0 dS/m). Susceptible to osmotic drought.`);
        }
      } else {
        sensorScore += 2;
      }
    }

    // C. Capacitive Moisture Sensor Check
    if (!isNaN(effectiveMoisture)) {
      if (effectiveMoisture < 25) {
        // Dry soil
        if (crop.waterTolerance.toLowerCase().includes('drought') || crop.irrigationLevel === 'rainfed') {
          sensorScore += 3;
          explanations.push(`Low Moisture Adaptation: Deep taproot withstands current dry capacitive sensor reading (${effectiveMoisture}% moisture).`);
        } else if (crop.irrigationLevel === 'reliable') {
          sensorScore -= 4;
          explanations.push(`Water Deficit Alert: Current soil moisture (${effectiveMoisture}%) is insufficient for ${crop.name}; requires immediate irrigation.`);
        }
      } else if (effectiveMoisture > 75) {
        // Saturated / waterlogged soil
        if (crop.waterTolerance.toLowerCase().includes('high') || crop.id === 'rice_paddy' || crop.id === 'jute' || crop.id === 'salt_tolerant_rice') {
          sensorScore += 4;
          explanations.push(`Saturated Matrix Fit: High soil moisture (${effectiveMoisture}%) ideal for flooded wetland establishment.`);
        } else {
          sensorScore -= 5;
          explanations.push(`Waterlogging Risk: Excessive moisture (${effectiveMoisture}%) risks root asphyxiation and fungal collar rot.`);
        }
      }
    }

    breakdown.chemicalFit = Math.min(15, Math.max(0, sensorScore));

    // 5. REGIONAL / STATE ADAPTABILITY & WHERE IT GROWS BEST (Max 10 points)
    let regionalScore = 3;
    if (state && crop.majorStates.some(s => s.toLowerCase() === state.toLowerCase())) {
      regionalScore = 10;
      explanations.push(`Proven regional cultivar: Widely cultivated with strong APMC market, MSP procurement, and high yield presence across ${state}.`);
    } else {
      regionalScore = 4;
      explanations.push(`Secondary zone: Primary high-yielding belts are ${crop.majorStates.slice(0, 3).join(', ')}.`);
    }
    breakdown.regionalFit = regionalScore;

    // 6. FARMING GOAL BONUS
    if (farmingGoal === 'soil_restoring' && (crop.category.includes('Legume') || crop.id === 'dhaincha')) {
      score += 5;
      explanations.push(`Goal alignment: Biological nitrogen fixation & organic acids enhance soil structure for future crop cycles.`);
    } else if (farmingGoal === 'drought_hardy' && crop.waterTolerance.toLowerCase().includes('drought')) {
      score += 5;
      explanations.push(`Goal alignment: Proven drought endurance protects farm capital in water-scarce years.`);
    } else if (farmingGoal === 'cash_crop' && (crop.category.includes('Cash') || crop.category.includes('Commercial') || crop.id === 'guar_cluster_bean')) {
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

    // Dynamic field management advice based on sensor readings
    const sensorRemedyAdvice = [];
    if (!isNaN(effectiveEc) && effectiveEc > 3.0) {
      sensorRemedyAdvice.push(`High Salinity (${effectiveEc} dS/m): Apply Gypsum based on Soil Health Card GR test; sow Dhaincha for green manure; install drainage to leach excess salts.`);
    }
    if (!isNaN(effectivePh) && effectivePh > 8.5) {
      sensorRemedyAdvice.push(`Sodic/Alkaline Soil (pH ${effectivePh}): Incorporate Agricultural Gypsum (2.5–4.0 t/ha) followed by light ponding before transplanting.`);
    } else if (!isNaN(effectivePh) && effectivePh < 5.8) {
      sensorRemedyAdvice.push(`Acidic Soil (pH ${effectivePh}): Apply Agricultural Dolomite or Slaked Lime (1.5–2.5 t/ha) to neutralize aluminum toxicity and unlock phosphate.`);
    }
    if (!isNaN(effectiveMoisture) && effectiveMoisture < 30) {
      sensorRemedyAdvice.push(`Moisture Stress (${effectiveMoisture}%): Schedule 1–2 life-saving protective irrigations or apply organic paddy straw mulch (5 t/ha).`);
    }

    return {
      ...crop,
      suitabilityScore: score,
      suitabilityLabel,
      badgeClass,
      breakdown,
      explanations,
      sensorRemedyAdvice,
      whereItGrowsBest: crop.bestGrowingRegions || `Top States: ${crop.majorStates.join(', ')}`
    };
  });

  // Sort descending by suitability score
  scoredCrops.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  // Take top 4 to 6 recommendations
  const topRecommendations = scoredCrops.slice(0, 6);

  return {
    recommendations: topRecommendations,
    isPreliminary,
    missingFactors,
    totalEvaluated: scoredCrops.length,
    soilGroup: INDIAN_SOIL_GROUPS[soilGroupKey] || null,
    soilTexture: SOIL_TEXTURE_CLASSES[soilTextureKey] || null
  };
}
