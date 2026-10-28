/**
 * SoilSense AI — Comprehensive Soil & Crop Agronomic Knowledge Base
 * Sources: 
 *   - Indian Council of Agricultural Research (ICAR), New Delhi
 *   - National Bureau of Soil Survey and Land Use Planning (NBSS&LUP)
 *   - State Agricultural Universities (TNAU, PAU, GBPUAT, PJTSAU)
 *   - Ministry of Agriculture & Farmers Welfare, Govt. of India
 * Last Reviewed: August 2026
 */

// ==========================================
// 1. MAJOR INDIAN SOIL GROUPS (Geographical)
// ==========================================
export const INDIAN_SOIL_GROUPS = {
  alluvial: {
    id: 'alluvial',
    typeNumber: 1,
    name: 'Alluvial Soil',
    hindiName: 'जलोढ़ मिट्टी (Alluvial Soil)',
    category: 'River Plain / Fluvial Deposit (Entisol / Inceptisol)',
    coveragePct: '43.4% of India total land area',
    keyRegions: ['Indo-Gangetic Plains', 'Brahmaputra Valley', 'Coastal Deltas (Mahanadi, Godavari, Krishna, Kaveri)'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Assam', 'Odisha', 'Andhra Pradesh', 'Tamil Nadu'],
    formation: 'Rivers se transported sand, silt aur clay ke deposits; deposition of fine silt and clay aggregates over flood plains.',
    colorRange: 'Grey, light brown to ash-grey; sandy loam se clayey tak (Khadar is lighter, Bhangar is darker and more clayey).',
    textureTypical: 'Sandy loam to silty clay loam',
    phRange: { min: 6.5, max: 8.4, optimal: '7.0 – 7.8 (Near-neutral to mildly alkaline, fixed range nahi hai)' },
    typesOrVariants: 'Khadar (new fertile riverbed alluvium) aur Bhangar/Bangar (older alluvium with kankar nodules).',
    nutrients: {
      nitrogen: 'Generally Deficient (Low; limiting factor)',
      phosphorus: 'Medium to Adequate (Site-specific)',
      potassium: 'Adequate to Rich (Potash-containing illite/mica minerals)',
      organicCarbon: '0.4% – 0.7% (Frequently limiting)',
      micronutrients: 'Zinc (Zn) and Boron (B) frequently limiting due to intensive multi-cropping'
    },
    properties: 'High porosity, excellent workability, good sub-surface capillary recharge; highly responsive to nitrogen and organic manure.',
    waterRetention: 'Moderate to High; excellent sub-surface capillary recharge in deltaic plains.',
    drainage: 'Well-drained in uplands (Bhangar); moderately drained to waterlogged in low-lying riverbeds (Khadar).',
    crops: ['Rice (धान)', 'Wheat (गेहूं)', 'Sugarcane (गन्ना)', 'Maize (मक्का)', 'Pulses (दालें)', 'Jute (पटसन)', 'Oilseeds (तिलहन)'],
    sensorBenchmark: {
      moisturePct: 45,
      tempC: 25.0,
      ph: 7.3,
      ecDsm: 0.75,
      nitrogenKgHa: 220,
      phosphorusKgHa: 18,
      potassiumKgHa: 280,
      organicCarbonPct: 0.58,
      sandPct: 40,
      siltPct: 40,
      clayPct: 20
    },
    description: 'Alluvial soils are among the most fertile and agriculturally productive soils of India. Formed by river silt deposition, they feature high porosity and good workability. While rich in potash, lime, and phosphoric acid, they typically respond strongly to nitrogenous amendments and organic manure.',
    limitations: [
      'Nitrogen deficiency is widespread; requires split-dose nitrogen or legume rotation.',
      'Susceptible to waterlogging in canal-irrigated command areas (salinization/alkalization risk).',
      'Intensive cropping has led to micronutrient deficiencies, especially Zinc (Zn) and Boron (B).'
    ],
    managementAdvice: [
      'Incorporate green manures like Dhaincha (Sesbania) or Sunn hemp before Kharif sowing to replenish organic matter.',
      'Adopt balanced NPK fertilization (recommended ratio 4:2:1 for cereals) based on soil health card values.',
      'Apply Zinc Sulphate (25 kg/ha) every 2–3 seasons to prevent khaira disease in paddy and zinc deficiency in wheat.'
    ]
  },

  black: {
    id: 'black',
    typeNumber: 2,
    name: 'Black Soil (Regur / Black Cotton Soil)',
    hindiName: 'काली मिट्टी / रेगुर (Black Cotton Soil)',
    category: 'Volcanic Basalt / Vertisol',
    coveragePct: '16.6% of India total land area',
    keyRegions: ['Deccan Lava Plateau', 'Malwa Plateau', 'Narmada & Tapi Valleys', 'Kathiawar Peninsula'],
    states: ['Maharashtra', 'Madhya Pradesh', 'Gujarat', 'Telangana', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu'],
    formation: 'Mostly basaltic parent material se weathering under semi-arid conditions; high montmorillonite clay content.',
    colorRange: 'Dark grey to black, clay-rich (derived from titaniferous magnetite and humus complexes).',
    textureTypical: 'Clay-rich to heavy clay (> 45% clay fraction)',
    phRange: { min: 7.2, max: 8.6, optimal: '7.5 – 8.2 (Neutral se alkaline conditions common hain)' },
    typesOrVariants: 'Shallow black (upland ridges), Medium black, Deep black (valleys and plains).',
    nutrients: {
      nitrogen: 'Deficient (Low; limiting factor)',
      phosphorus: 'Low to Medium (limiting factor)',
      potassium: 'Rich in Potash (K)',
      organicCarbon: '0.3% – 0.6% (Low; limiting factor)',
      micronutrients: 'Calcium, magnesium aur iron often abundant; zinc is frequently deficient'
    },
    properties: 'Wet hone par swell/sticky ho jaati hai; dry hone par deep cracks develop karti hai; high moisture retention.',
    waterRetention: 'Very High; swells and retains moisture long after monsoon retreat, supporting dryland rabi crops.',
    drainage: 'Slow to Poor internal drainage; high risk of surface runoff and temporary waterlogging.',
    crops: ['Cotton (कपास)', 'Soybean (सोयाबीन)', 'Sorghum / Jowar (ज्वार)', 'Wheat (गेहूं)', 'Pulses / Gram (चना/अरहर)', 'Sunflower (सूरजमुखी)'],
    sensorBenchmark: {
      moisturePct: 58,
      tempC: 26.5,
      ph: 7.9,
      ecDsm: 0.95,
      nitrogenKgHa: 185,
      phosphorusKgHa: 14,
      potassiumKgHa: 340,
      organicCarbonPct: 0.46,
      sandPct: 18,
      siltPct: 34,
      clayPct: 48
    },
    description: 'Black soil (Regur) is renowned for its exceptional self-ploughing capacity (due to shrinking and swelling cycles) and moisture retentive power. It retains moisture long after the monsoon retreats, allowing successful dryland rabi cropping. Rich in calcium carbonate, magnesium, and iron, but notably deficient in nitrogen and phosphorus.',
    limitations: [
      'Extremely sticky when wet and rock-hard when dry, leaving a narrow moisture window for tillage and sowing.',
      'Poor internal percolation causes water stagnation if drainage channels are not maintained.',
      'Prone to severe erosion during early monsoon before crop canopy develops.'
    ],
    managementAdvice: [
      'Adopt the Broad Bed and Furrow (BBF) or Ridge-and-Furrow method to facilitate surface drainage and moisture conservation.',
      'Carry out primary tillage immediately after harvesting the preceding crop when residual moisture remains.',
      'Apply Farm Yard Manure (FYM) @ 10 t/ha to improve soil structure and reduce crusting and compaction.'
    ]
  },

  red_yellow: {
    id: 'red_yellow',
    typeNumber: 3,
    name: 'Red and Yellow Soil',
    hindiName: 'लाल और पीली मिट्टी (Red & Yellow Soil)',
    category: 'Crystalline Igneous / Alfisol & Ultisol',
    coveragePct: '18.5% of India total land area',
    keyRegions: ['Eastern and Southern Deccan', 'Chota Nagpur Plateau', 'Orissa Hills', 'Brahmaputra Foothills'],
    states: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Odisha', 'Chhattisgarh', 'Jharkhand', 'Madhya Pradesh'],
    formation: 'Granite, gneiss aur other crystalline rocks ki weathering in low to moderate rainfall tracts.',
    colorRange: 'Iron oxides ki diffusion ki wajah se red; hydration aur composition se yellow shades.',
    textureTypical: 'Sandy se loamy/clayey tak (coarse on uplands, finer in valleys)',
    phRange: { min: 5.5, max: 7.2, optimal: '6.0 – 6.8 (Acidic se near-neutral, local variation possible)' },
    typesOrVariants: 'Red loams, Red gravelly soils, Yellowish loamy soils (hydrated valley beds).',
    nutrients: {
      nitrogen: 'Severely Low (Limiting factor)',
      phosphorus: 'Low to Deficient (Often fixed by iron and aluminum oxides)',
      potassium: 'Medium to Adequate',
      organicCarbon: '0.2% – 0.5% (Very Low to Low)',
      micronutrients: 'Zinc, boron, and calcium often deficient on leached uplands'
    },
    properties: 'Porous, friable, non-sticky; rapid water infiltration; low water retention makes crops vulnerable to dry spells.',
    waterRetention: 'Low to Moderate; fast percolation and limited moisture holding capacity.',
    drainage: 'Excessive to well-drained; rarely faces waterlogging unless situated in valley bottoms.',
    crops: ['Groundnut (मूंगफली)', 'Millets / Ragi (रागी/बाजरा)', 'Pulses (दालें)', 'Potato (आलू)', 'Rice (in valleys)', 'Cotton (under irrigation)'],
    sensorBenchmark: {
      moisturePct: 32,
      tempC: 27.2,
      ph: 6.3,
      ecDsm: 0.42,
      nitrogenKgHa: 155,
      phosphorusKgHa: 11,
      potassiumKgHa: 195,
      organicCarbonPct: 0.36,
      sandPct: 58,
      siltPct: 24,
      clayPct: 18
    },
    description: 'Red and yellow soils are porous, friable, and aerated, making them easy to cultivate. However, they are inherently low in organic humus, nitrogen, and phosphorus. With proper irrigation, organic amendments, and split fertilizer application, they respond very favorably and support a wide spectrum of field crops, pulses, and oilseeds.',
    limitations: [
      'Low moisture retention makes crops vulnerable to mid-season dry spells under rainfed cultivation.',
      'High phosphorus fixation capacity reduces available phosphorus to plants.',
      'Surface crusting can hinder seedling emergence after sudden showers.'
    ],
    managementAdvice: [
      'Apply well-decomposed organic manure or vermicompost combined with biofertilizers (Rhizobium, PSB) to release bound phosphorus.',
      'Use mulching (crop residues or bio-mulch) to conserve moisture and reduce surface soil temperatures.',
      'Adopt split application of chemical fertilizers to prevent nutrient leaching in coarse porous profiles.'
    ]
  },

  laterite: {
    id: 'laterite',
    typeNumber: 4,
    name: 'Laterite Soil',
    hindiName: 'लेटराइट मिट्टी (Laterite Soil)',
    category: 'Residual Leached / Ultisol & Oxisol',
    coveragePct: '3.7% of India total land area',
    keyRegions: ['Western Ghats', 'Eastern Ghats summits', 'Malabar Coast', 'Meghalaya Plateau', 'Rajmahal Hills'],
    states: ['Kerala', 'Karnataka', 'Goa', 'Maharashtra (Konkan)', 'Tamil Nadu', 'Odisha', 'Assam', 'Meghalaya'],
    formation: 'Hot, humid climate aur heavy rainfall ke saath intense leaching (desilication) leaving iron/aluminium oxides.',
    colorRange: 'Red, reddish-yellow to brick-red; concentrated iron and aluminium sesquioxides.',
    textureTypical: 'Gravelly clay loam to coarse gravelly sand with hard crusts',
    phRange: { min: 4.5, max: 6.2, optimal: '5.0 – 5.8 (Often acidic, but exact value site par depend karti hai)' },
    typesOrVariants: 'High-level laterite (thin, gravelly on ridges), Low-level laterite (deeper, clayey in coastal belts).',
    nutrients: {
      nitrogen: 'Low to Medium (Leached away by heavy rains)',
      phosphorus: 'Very Low (Severe phosphate fixation by aluminum and iron oxides)',
      potassium: 'Low (Severe leaching losses)',
      organicCarbon: '0.3% – 0.8% (Rapidly oxidized in humid tropical heat)',
      micronutrients: 'Rich in iron and aluminum; severely deficient in calcium, magnesium, and boron'
    },
    properties: 'Kuch areas mein dry hone par irreversibly hard brick-like crust develop hoti hai; fertility management aur liming critical hai.',
    waterRetention: 'Low; highly porous and rapid gravitational drainage.',
    drainage: 'Rapidly to excessively drained; high erosion vulnerability on undulating slopes.',
    crops: ['Tea (चाय)', 'Coffee (कॉफ़ी)', 'Cashew (काजू)', 'Rubber (रबर)', 'Coconut (नारियल)', 'Spices / Pepper / Cardamom', 'Rice (in terraced valleys)'],
    sensorBenchmark: {
      moisturePct: 36,
      tempC: 24.8,
      ph: 5.2,
      ecDsm: 0.28,
      nitrogenKgHa: 195,
      phosphorusKgHa: 8,
      potassiumKgHa: 115,
      organicCarbonPct: 0.52,
      sandPct: 50,
      siltPct: 22,
      clayPct: 28
    },
    description: 'Laterite soils develop under conditions of high rainfall and temperature where silica is completely leached away, leaving a residual crust of iron and aluminum oxides. When wet, they are soft, but harden irreversibly like brick upon exposure to sunlight. With targeted nutrient replenishment, they excel for plantation crops like cashew, rubber, tea, coffee, and spices.',
    limitations: [
      'High acidity (low pH) causes aluminum and manganese toxicity while reducing phosphorus and calcium availability.',
      'Low base saturation and high cation leaching require sustained micronutrient supply.',
      'Low water storage capacity necessitates drip or micro-irrigation for perennial horticulture.'
    ],
    managementAdvice: [
      'Apply agricultural lime or dolomite @ 1.5–2.5 t/ha based on soil test to raise pH above 5.8.',
      'Apply rock phosphate (which solubilizes well in acidic soils) rather than water-soluble SSP/DAP to mitigate phosphate fixation.',
      'Plant contour hedgerows and vetiver grass strips on sloping terrains to check erosion.'
    ]
  },

  arid_desert: {
    id: 'arid_desert',
    typeNumber: 5,
    name: 'Arid / Desert Soil',
    hindiName: 'मरुस्थलीय मिट्टी (Arid & Desert Soil)',
    category: 'Aridisol / Entisol',
    coveragePct: '4.2% of India total land area',
    keyRegions: ['Thar Desert', 'Rann of Kutch', 'Southwestern Punjab and Haryana plains'],
    states: ['Western Rajasthan', 'Kutch & Gujarat dry regions', 'Punjab (Southwest)', 'Haryana (Southwest)'],
    formation: 'Dry climate, limited chemical weathering, wind-blown sand aur salt accumulation.',
    colorRange: 'Pale brown, yellowish to light sandy brown; low organic matter.',
    textureTypical: 'Coarse sand to loamy sand (loose, single-grain, rapid drainage)',
    phRange: { min: 7.8, max: 9.0, optimal: '8.0 – 8.6 (Often neutral to alkaline; saline patches bhi mil sakte hain)' },
    typesOrVariants: 'Sand dunes (moving dunes), Calcareous sandy loam, Saline desert depressions (Playas).',
    nutrients: {
      nitrogen: 'Extremely Low / Deficient (< 130 kg/ha)',
      phosphorus: 'Low to Variable (Often in calcium phosphate bound form)',
      potassium: 'Sufficient to High (Rich in feldspars and mica sand grains)',
      organicCarbon: '< 0.2% (Extremely low organic humus)',
      micronutrients: 'Zinc and iron deficiency common due to high alkalinity'
    },
    properties: 'Low water retention, rapid drainage, moisture stress; high temperature evaporation causes soluble salt buildup.',
    waterRetention: 'Very Poor; rapid percolation with near-zero capillary hold.',
    drainage: 'Excessive; subsoil often contains an impervious calcic kankar pan at 1–1.5m depth.',
    crops: ['Bajra / Pearl Millet (बाजरा)', 'Guar / Cluster Bean (ग्वार)', 'Pulses / Moong / Moth (मूंग/मोठ)', 'Barley (जौ)', 'Mustard (सरसों - under irrigation)', 'Wheat (गेहूं - with canal irrigation)'],
    sensorBenchmark: {
      moisturePct: 16,
      tempC: 31.0,
      ph: 8.3,
      ecDsm: 1.85,
      nitrogenKgHa: 110,
      phosphorusKgHa: 12,
      potassiumKgHa: 265,
      organicCarbonPct: 0.16,
      sandPct: 82,
      siltPct: 11,
      clayPct: 7
    },
    description: 'Arid and desert soils are coarse-grained with low moisture content and very low organic humus. Soluble salts may accumulate on the surface due to high evapotranspiration. However, with canal irrigation (such as the Indira Gandhi Canal) or micro-drip systems, desert soils can produce outstanding yields of drought-hardy crops, pulses, and oilseeds.',
    limitations: [
      'Severe water scarcity and high salt accumulation risk under improper irrigation.',
      'Extremely low biological activity and negligible microbial biomass.',
      'Susceptible to continuous wind erosion and moving sand dunes.'
    ],
    managementAdvice: [
      'Establish shelterbelts and windbreaks (using Khejri, Acacia, and Subabul) to reduce wind erosion and evaporation.',
      'Adopt pressurized drip irrigation with fertigation to maximize water-use efficiency without raising water tables.',
      'Incorporate bulky organic manures, pressmud, or tank silt to improve moisture retention capacity.'
    ]
  },

  saline_alkaline: {
    id: 'saline_alkaline',
    typeNumber: 6,
    name: 'Saline and Alkaline Soil (Usar / Reh / Kallar)',
    hindiName: 'लवणीय व क्षारीय मिट्टी / ऊसर (Saline & Sodic Soil)',
    category: 'Halomorphic / Solonchak & Solonetz',
    coveragePct: '2.5% of India total land area (~6.73 million hectares)',
    keyRegions: ['Indo-Gangetic canal commands (UP, Haryana, Punjab)', 'Rann of Kutch & coastal Gujarat', 'Rajasthan dry saline depressions', 'Coastal deltas with brackish water table'],
    states: ['Rajasthan', 'Gujarat', 'Punjab', 'Haryana', 'Western Uttar Pradesh', 'Coastal Andhra Pradesh & Tamil Nadu', 'Maharashtra coastal pockets'],
    formation: 'Salt accumulation, inadequate drainage, excessive capillary evaporation, high water table, brackish irrigation water aur canal seepage.',
    colorRange: 'Variable; surface par distinct white salt crust (white alkali / Reh / Kallar) ya dark brownish organic stains (black alkali / Usar) ho sakti hai.',
    textureTypical: 'Variable: Sandy loam to dense clay loam; structureless or dispersed dense clay',
    phRange: { min: 7.3, max: 10.2, optimal: 'Saline: pH < 8.5 (EC > 4.0 dS/m); Sodic/Alkaline: pH 8.5 – 10.2 (ESP > 15%)' },
    typesOrVariants: 'Saline Soil (Solonchak: high EC > 4, normal pH < 8.5), Sodic/Alkaline Soil (Solonetz: high pH > 8.5, high ESP > 15%), Saline-Sodic Soil (both high).',
    nutrients: {
      nitrogen: 'Severely Deficient (Very Low)',
      phosphorus: 'Low to Variable; high sodicity fixes available phosphate',
      potassium: 'Medium to Sufficient',
      organicCarbon: '0.15% – 0.35% (Very Low)',
      micronutrients: 'Zinc (Zn), Iron (Fe), and Manganese (Mn) severely locked and deficient due to high pH'
    },
    properties: 'Excess soluble salts plant water uptake ko restrict karte hain (osmotic/physiological drought); high exchangeable sodium (sodicity) soil structure ko disperse aur damage kar deta hai, leading to poor aeration and water impermeability.',
    waterRetention: 'Poor aeration despite high water table; surface stays slushy or develops impenetrable hard crust.',
    drainage: 'Very Poor; deflocculated dispersed clay particles plug soil macropores, preventing internal percolation.',
    crops: ['Barley / Jau (जौ - highly salt-tolerant)', 'Salt-Tolerant Rice / CSR-36, Basmati CSR-30, Pokkali (लवण-सहनशील धान)', 'Dhaincha / Sesbania (ढैंचा - green manure & reclamation)', 'Karnal Grass / Rhodes Grass (चारे की घास)', 'Mustard / Rai (tolerant lines like CS-54)', 'Sugarbeet (चुकंदर)'],
    sensorBenchmark: {
      moisturePct: 38,
      tempC: 28.5,
      ph: 8.9,
      ecDsm: 5.8, // Critical: EC > 4.0 indicates high salinity hazard!
      nitrogenKgHa: 130,
      phosphorusKgHa: 10,
      potassiumKgHa: 240,
      organicCarbonPct: 0.24,
      sandPct: 36,
      siltPct: 36,
      clayPct: 28
    },
    description: 'Saline and alkaline soils (commonly known as Usar, Reh, or Kallar in Northern India) contain toxic concentrations of soluble salts (chlorides and sulfates of sodium, calcium, magnesium) or high exchangeable sodium percentages. Under intensive canal irrigation with poor drainage, secondary salinization occurs as water tables rise. They require scientific reclamation including chemical amendments, drainage, and salt-tolerant cropping.',
    limitations: [
      'High osmotic pressure prevents roots from taking up soil moisture even when the ground is moist (physiological drought).',
      'High sodium disperses clay aggregates, destroying soil tilth and creating severe crusting and water stagnation.',
      'Micronutrient deficiencies (Zinc, Iron) and boron toxicity severely stunt standard agricultural crops.'
    ],
    managementAdvice: [
      'For Sodic Soils (pH > 8.5, ESP > 15%): Apply Agricultural Gypsum (CaSO4·2H2O) @ 2.5–5.0 t/ha based on Gypsum Requirement (GR) test, followed by deep ponding to leach displaced sodium.',
      'Install sub-surface perforated pipe drainage (tile drains) to lower brackish water tables and remove excess root-zone salts.',
      'Sow Dhaincha (Sesbania aculeata) green manure and incorporate at 45 days; root exudates generate organic acids that mobilize native soil CaCO3.',
      'Select certified salt-tolerant crop varieties developed by ICAR-CSSRI Karnal (CSR-36 paddy, CS-54 mustard, DL-88 barley).'
    ]
  },

  peaty_marshy: {
    id: 'peaty_marshy',
    typeNumber: 7,
    name: 'Peaty and Marshy Soil',
    hindiName: 'पीट व दलदली मिट्टी (Peaty & Marshy Soil / Kari)',
    category: 'Histosol / Organic Submerged',
    coveragePct: '2.1% of India total land area',
    keyRegions: ['Kuttanad (Kerala - below sea level)', 'Sundarbans Delta (West Bengal)', 'Coastal Odisha and Tamil Nadu backwaters', 'North Bihar wetlands (Chaur areas)'],
    states: ['Kerala ke lowlands', 'Sundarbans (West Bengal)', 'Northern Bihar waterlogged pockets', 'Odisha coastal plains', 'Tamil Nadu (Coastal wetlands)'],
    formation: 'Waterlogged conditions mein partly decomposed organic matter ka slow anaerobic accumulation over centuries.',
    colorRange: 'Dark brown, deep charcoal black; organic-rich, often poorly drained with bluish-grey subsoil gleying.',
    textureTypical: 'Heavy clay with spongy organic mass (15%–40% organic matter by weight)',
    phRange: { min: 3.5, max: 6.2, optimal: '4.5 – 5.5 (Frequently acidic, but site-specific; acid-sulfate Kari soils pH < 4.0)' },
    typesOrVariants: 'Kari soils (Kerala acid-sulfate), Pokkali soils (brackish coastal wetlands), Sundarbans mangrove swamp peat.',
    nutrients: {
      nitrogen: 'High Total Nitrogen, but available ammoniacal/nitrate is low due to poor mineralization',
      phosphorus: 'Extremely Low / Deficient (Fixed tightly with iron and aluminum sulfides)',
      potassium: 'Low to Medium',
      organicCarbon: '1.5% – 3.8% (Organic carbon exceptionally high)',
      micronutrients: 'Toxic levels of ferrous iron (Fe2+) and hydrogen sulfide (H2S); copper and zinc deficient'
    },
    properties: 'Waterlogging, poor aeration aur root-zone oxygen stress; spongy when moist, shrinks severely upon drying; toxic sulfide acidity.',
    waterRetention: 'Saturated; holds massive quantities of water with near-permanent anaerobic root conditions.',
    drainage: 'Very Poor; water table is at or above the surface for 6–9 months of the year.',
    crops: ['Rice / Pokkali Paddy (विशेष खारी धान)', 'Selected wetland crops (सिंघाड़ा/कमल)', 'Rotational shrimp/fish-rice farming', 'Colocasia / Taro (अरबी)', 'Coconut on raised dykes'],
    sensorBenchmark: {
      moisturePct: 82,
      tempC: 25.5,
      ph: 4.8,
      ecDsm: 2.1,
      nitrogenKgHa: 310,
      phosphorusKgHa: 7,
      potassiumKgHa: 145,
      organicCarbonPct: 2.85,
      sandPct: 15,
      siltPct: 35,
      clayPct: 50
    },
    description: 'Peaty and marshy soils occur in humid coastal wetlands and depressions where submergence leads to slow organic decay. They are heavy, black, and highly acidic. When reclaimed through controlled drainage and liming, or managed with indigenous saline-tolerant varieties (like Pokkali rice in Kerala), they produce specialized aquatic and coastal crops.',
    limitations: [
      'Severe acidity and presence of ferrous iron and toxic hydrogen sulfide gas.',
      'Periodic tidal inundation and saline intrusions in coastal deltas.',
      'Poor aeration severely restricts root respiration for normal terrestrial field crops.'
    ],
    managementAdvice: [
      'Construct polder dykes and one-way sluice gates to drain floodwaters and pump out acid water.',
      'Apply heavy doses of agricultural lime (2–4 t/ha) to neutralize extreme acidity before sowing.',
      'Cultivate specialized acid-saline tolerant paddy varieties (Pokkali, Vyttila, Matta) in rotational fish-rice systems.'
    ]
  },

  forest_mountain: {
    id: 'forest_mountain',
    typeNumber: 8,
    name: 'Forest and Mountain Soil',
    hindiName: 'पर्वतीय और वन मिट्टी (Forest & Mountain Soil)',
    category: 'Inceptisol / Spodosol / Entisol',
    coveragePct: '8.7% of India total land area',
    keyRegions: ['Himalayan Range (Kashmir to Arunachal)', 'Western Ghats high ridges', 'Eastern Ghats hills', 'Northeastern Hills'],
    states: ['Himalayas (J&K, Himachal Pradesh, Uttarakhand)', 'Northeastern hills (Assam, Meghalaya, Sikkim, Arunachal)', 'Higher-altitude forested regions (Kerala/TN High Ranges)'],
    formation: 'Parent rock, climate, slope, vegetation aur elevation ke combined effects; continuous leaf litter humus accumulation.',
    colorRange: 'Dark brown, chocolate brown to dark slate grey with visible forest leaf litter.',
    textureTypical: 'Highly variable; loamy to silty loam in valleys; coarse, stony, and shallow on slopes.',
    phRange: { min: 5.0, max: 6.8, optimal: '5.6 – 6.5 (Often acidic in high-rainfall forest areas, lekin universal rule nahi hai)' },
    typesOrVariants: 'Brown forest soil, Podzolic mountain soil, Glacial drift gravelly slopes.',
    nutrients: {
      nitrogen: 'Rich in organic nitrogen (slow mineralizing due to cool temperatures)',
      phosphorus: 'Low to Medium (Altitude aur parent material ke hisaab se vary karta hai)',
      potassium: 'Medium to Deficient',
      organicCarbon: '1.2% – 3.5% (High to Very High in virgin forest layers)',
      micronutrients: 'Generally adequate organic micronutrient chelation, but boron and zinc vary by rock type'
    },
    properties: 'Slopes par erosion, shallow soil depth aur drainage differences important hain; topsoil is rich in organic humus, but vulnerable to landslides.',
    waterRetention: 'Good to High in deep valley soils; poor on steep rocky escarpments.',
    drainage: 'Well-drained to excessive on slopes; valley bottoms may experience cool-season saturation.',
    crops: ['Tea (चाय)', 'Apples / Temperate Fruits (सेब/नाशपाती/आड़ू)', 'Maize (मक्का)', 'Potatoes (आलू)', 'Selected spices / Saffron / Cardamom', 'Terrace farming crops (स्थान के हिसाब से)'],
    sensorBenchmark: {
      moisturePct: 52,
      tempC: 18.5,
      ph: 5.8,
      ecDsm: 0.35,
      nitrogenKgHa: 330,
      phosphorusKgHa: 16,
      potassiumKgHa: 215,
      organicCarbonPct: 1.95,
      sandPct: 42,
      siltPct: 38,
      clayPct: 20
    },
    description: 'Mountain soils are heterogeneous, changing markedly with altitude, aspect, and vegetation cover. The upper layers are generally enriched with dark forest humus, but slow decomposition in cold climates can cause podzolization and acidity. Excellent for temperate fruits, tea, coffee, spices, and terrace farming.',
    limitations: [
      'High vulnerability to severe soil erosion and landslides on cleared slopes.',
      'Shallow effective soil depth on steeper gradients limits root anchorage.',
      'Acidity and cold soil temperatures can restrict phosphorus uptake in early spring.'
    ],
    managementAdvice: [
      'Practice strict terrace farming (bench terracing) and contour planting to hold slope soil.',
      'Maintain continuous vegetative ground cover and fruit-orchard mulching to prevent rain splash erosion.',
      'Apply mycorrhizal biofertilizers to enhance nutrient uptake in cool acidic soil environments.'
    ]
  }
};

// ==========================================
// 2. SOIL TEXTURE CLASSES (Physical Matrix)
// ==========================================
export const SOIL_TEXTURE_CLASSES = {
  sandy: {
    id: 'sandy',
    name: 'Sandy (Coarse)',
    composition: '> 85% sand particles, < 10% clay',
    feel: 'Gritty, loose, non-sticky; does not form a ribbon or ball when moist.',
    aeration: 'Excellent',
    drainage: 'Rapid / Excessive',
    nutrientHolding: 'Poor (low CEC)',
    typicalManagement: 'Frequent light irrigations (drip), frequent split fertilizer doses, organic mulching.'
  },
  sandy_loam: {
    id: 'sandy_loam',
    name: 'Sandy Loam (Medium-Light)',
    composition: '50%–70% sand, 15%–30% silt, < 20% clay',
    feel: 'Slightly gritty with moderate cohesion; forms a weak ball that crumbles easily.',
    aeration: 'Very Good',
    drainage: 'Well-drained',
    nutrientHolding: 'Moderate',
    typicalManagement: 'Ideal for root crops, tubers, pulses, and groundnut; balanced fertility management.'
  },
  loam: {
    id: 'loam',
    name: 'Loam (Medium / Balanced)',
    composition: '40% sand, 40% silt, 20% clay',
    feel: 'Smooth, slightly gritty, pliable; forms a firm ball and short ribbon without cracking.',
    aeration: 'Ideal',
    drainage: 'Balanced / Ideal',
    nutrientHolding: 'High',
    typicalManagement: 'The agricultural gold standard; supports maximum crop diversity with standard agronomical care.'
  },
  silty_clay_loam: {
    id: 'silty_clay_loam',
    name: 'Silty Clay Loam (Medium-Heavy)',
    composition: '20%–40% clay, 40%–60% silt, < 20% sand',
    feel: 'Silky smooth like flour when dry, moderately sticky and plastic when wet; forms a medium ribbon.',
    aeration: 'Moderate',
    drainage: 'Moderately Slow',
    nutrientHolding: 'Very High',
    typicalManagement: 'Excellent for paddy, wheat, sugarcane; careful tillage at optimum soil moisture.'
  },
  heavy_clay: {
    id: 'heavy_clay',
    name: 'Heavy Clay (Fine / Dense)',
    composition: '> 40% clay particles',
    feel: 'Very sticky and slick like modeling clay when wet; forms a long flexible ribbon (> 5 cm); hard clods when dry.',
    aeration: 'Restricted / Poor',
    drainage: 'Slow / Poor',
    nutrientHolding: 'Extremely High',
    typicalManagement: 'Requires raised beds / BBF, deep subsoiling, organic matter incorporation to reduce compaction.'
  }
};

// ==============================================================
// 2B. GOVT SOIL HEALTH CARD & HARDWARE SENSOR TELEMETRY METADATA
// ==============================================================
export const SENSOR_PARAMETERS_METADATA = [
  {
    key: 'moisture',
    name: 'Soil Moisture',
    hindiName: 'मृदा नमी (Soil Moisture)',
    sensorHardware: 'Capacitive Soil Moisture Sensor v1.2 / Analog Probe',
    systemRole: 'Paani ki availability (Plant Available Water)',
    unit: '%',
    min: 0,
    max: 100,
    idealRange: '40% – 65%',
    icon: 'Droplets',
    color: '#06B6D4',
    description: 'Measures volumetric water content. Prevents drought stress and root-rot caused by over-irrigation.'
  },
  {
    key: 'temperature',
    name: 'Soil Temperature',
    hindiName: 'मृदा तापमान (Soil Temperature)',
    sensorHardware: 'DS18B20 Digital Waterproof Thermal Probe',
    systemRole: 'Root-zone thermal status & microbial activity',
    unit: '°C',
    min: 0,
    max: 50,
    idealRange: '20°C – 30°C',
    icon: 'Thermometer',
    color: '#F97316',
    description: 'Critical for seed germination, root elongation kinetics, and microbial nitrogen cycling.'
  },
  {
    key: 'ph',
    name: 'Soil pH',
    hindiName: 'मृदा पीएच (Acidity / Alkalinity)',
    sensorHardware: 'Calibrated Glass Electrode pH Probe / 1:2.5 Soil-Water Extract',
    systemRole: 'Acidity and alkalinity; controls nutrient bioavailability',
    unit: 'pH',
    min: 0,
    max: 14,
    idealRange: '6.5 – 7.8 (Near-neutral)',
    icon: 'Activity',
    color: '#10B981',
    description: 'Dictates whether N, P, K and micronutrients are biologically available or chemically locked.'
  },
  {
    key: 'ec',
    name: 'Electrical Conductivity (EC / Salinity)',
    hindiName: 'विद्युत चालकता / लवणता (Salinity / EC)',
    sensorHardware: 'Direct Soil EC Sensor (4-pin Stainless Steel Probe)',
    systemRole: 'Dissolved salts ka indication (Saline/Alkaline hazard)',
    unit: 'dS/m',
    min: 0,
    max: 16,
    idealRange: '< 2.0 dS/m (Non-saline)',
    icon: 'Zap',
    color: '#EC4899',
    description: 'Measures soluble mineral salts. EC > 4.0 dS/m creates physiological drought, requiring gypsum or leaching.'
  },
  {
    key: 'nitrogen',
    name: 'Available Nitrogen (N)',
    hindiName: 'नाइट्रोजन (N Status)',
    sensorHardware: 'Sub-surface NPK Optical Sensor / Alkaline Permanganate Lab Method',
    systemRole: 'Nutrient status (Leaf vigor, vegetative growth, biomass)',
    unit: 'kg/ha',
    min: 0,
    max: 700,
    idealRange: '280 – 560 kg/ha (Medium)',
    icon: 'Leaf',
    color: '#22C55E',
    ratingBreakdown: { low: '< 280', medium: '280 – 560', high: '> 560' }
  },
  {
    key: 'phosphorus',
    name: 'Available Phosphorus (P)',
    hindiName: 'फास्फोरस (P Status)',
    sensorHardware: 'Olsen / Bray Spectrophotometer Lab Analysis',
    systemRole: 'Nutrient status (Root development, flowering, early tillering)',
    unit: 'kg/ha',
    min: 0,
    max: 60,
    idealRange: '10 – 25 kg/ha (Medium)',
    icon: 'Sparkles',
    color: '#EAB308',
    ratingBreakdown: { low: '< 10', medium: '10 – 25', high: '> 25' }
  },
  {
    key: 'potassium',
    name: 'Available Potassium (K)',
    hindiName: 'पोटेशियम (K Status)',
    sensorHardware: 'Neutral Normal Ammonium Acetate Flame Photometer',
    systemRole: 'Nutrient status (Disease resistance, stomatal regulation, grain quality)',
    unit: 'kg/ha',
    min: 0,
    max: 600,
    idealRange: '108 – 280 kg/ha (Medium)',
    icon: 'Shield',
    color: '#8B5CF6',
    ratingBreakdown: { low: '< 108', medium: '108 – 280', high: '> 280' }
  },
  {
    key: 'organicCarbon',
    name: 'Organic Carbon (OC)',
    hindiName: 'जैविक कार्बन (Organic Carbon %)',
    sensorHardware: 'Walkley-Black Wet Oxidation Method (Govt Soil Health Card)',
    systemRole: 'Soil organic matter & microbial health assessment',
    unit: '%',
    min: 0,
    max: 5,
    idealRange: '0.50% – 0.75% (Medium to High)',
    icon: 'Layers',
    color: '#14B8A6',
    ratingBreakdown: { low: '< 0.50%', medium: '0.50% – 0.75%', high: '> 0.75%' }
  },
  {
    key: 'texture',
    name: 'Texture: Sand, Silt, Clay',
    hindiName: 'मृदा गठन (Sand %, Silt %, Clay %)',
    sensorHardware: 'Soil Texture Analysis (Bouyoucos Hydrometer / Pipette Method)',
    systemRole: 'Soil classification matrix & pore geometry',
    unit: '%',
    icon: 'Grid',
    color: '#6366F1',
    description: 'Defines soil water retention, drainage velocity, workability, and physical aeration.'
  },
  {
    key: 'location',
    name: 'Location / Regional Climate',
    hindiName: 'स्थान और जलवायु (Location / GPS)',
    sensorHardware: 'GPS or user-provided location (State & District Selector)',
    systemRole: 'Regional soil information & agro-climatic zone suitability',
    icon: 'MapPin',
    color: '#F43F5E',
    description: 'Maps the farm to verified Indian Council of Agricultural Research (ICAR) regional crop zones.'
  }
];

// ==========================================
// 3. VERIFIED CROP KNOWLEDGE BASE (25+ Crops)
// ==========================================
export const CROPS_KNOWLEDGE_BASE = [
  // CEREALS
  {
    id: 'rice_paddy',
    name: 'Rice / Paddy (धान)',
    scientificName: 'Oryza sativa',
    category: 'Cereal / Staple Food',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['alluvial', 'peaty_marshy', 'black'],
    preferredTextures: ['silty_clay_loam', 'heavy_clay', 'loam'],
    phRange: { min: 5.5, max: 7.5, optimal: '6.0 – 7.0' },
    seasons: ['kharif', 'zaid'],
    sowingWindow: 'June 1 – July 15 (Kharif / Aman); Nov – Dec (Boro / Rabi); March (Zaid / Aus)',
    waterRequirementMm: '1100 – 1500 mm',
    irrigationLevel: 'reliable', // reliable | limited | rainfed
    waterTolerance: 'High (Thrives in standing water / flooded basins)',
    tempRangeC: '22°C – 35°C',
    growingConsiderations: 'Requires impermeable subsoil layer to prevent percolation losses. Responds dramatically to split application of Nitrogen (Basal, Tillering, Panicle Initiation).',
    preSowingSteps: 'Puddle soil thoroughly to break macro-pores; treat seeds with Carbendazim or Trichoderma viride @ 4g/kg; apply 25 kg Zinc Sulphate/ha.',
    majorStates: ['West Bengal', 'Uttar Pradesh', 'Punjab', 'Andhra Pradesh', 'Odisha', 'Bihar', 'Tamil Nadu', 'Chhattisgarh'],
    sourceReference: 'ICAR-Indian Institute of Rice Research (IIRR), Hyderabad',
    lastReviewed: 'August 2026'
  },
  {
    id: 'wheat',
    name: 'Wheat (गेहूं)',
    scientificName: 'Triticum aestivum',
    category: 'Cereal / Rabi Staple',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['alluvial', 'black'],
    preferredTextures: ['loam', 'silty_clay_loam', 'sandy_loam'],
    phRange: { min: 6.0, max: 8.0, optimal: '6.5 – 7.5' },
    seasons: ['rabi'],
    sowingWindow: 'November 1 – November 25 (Timely sown); Late Nov – Dec 15 (Late sown)',
    waterRequirementMm: '450 – 600 mm',
    irrigationLevel: 'reliable',
    waterTolerance: 'Moderate (Sensitive to waterlogging, requires 4–6 critical stage irrigations)',
    tempRangeC: '10°C – 25°C (Cool vegetative phase, warm ripening)',
    growingConsiderations: 'Crown Root Initiation (CRI) at 21 days after sowing is the most critical irrigation stage. Avoid late planting which causes terminal heat stress during grain filling.',
    preSowingSteps: 'Fine seedbed preparation free of hard clods; seed treatment with Trichoderma (4g/kg) and Vitavax (2g/kg); line sowing using seed-cum-fertilizer drill.',
    majorStates: ['Uttar Pradesh', 'Punjab', 'Madhya Pradesh', 'Haryana', 'Rajasthan', 'Bihar'],
    sourceReference: 'ICAR-Indian Institute of Wheat and Barley Research (IIWBR), Karnal',
    lastReviewed: 'August 2026'
  },
  {
    id: 'maize',
    name: 'Maize / Corn (मक्का)',
    scientificName: 'Zea mays',
    category: 'Cereal / Coarse Grain',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['alluvial', 'red_yellow', 'forest_mountain', 'black'],
    preferredTextures: ['loam', 'sandy_loam'],
    phRange: { min: 5.8, max: 7.5, optimal: '6.5 – 7.2' },
    seasons: ['kharif', 'rabi', 'zaid'],
    sowingWindow: 'June 15 – July 15 (Kharif); October – November (Rabi); February – March (Spring/Zaid)',
    waterRequirementMm: '500 – 700 mm',
    irrigationLevel: 'limited',
    waterTolerance: 'Low (Highly sensitive to stagnant water, needs rapid drainage)',
    tempRangeC: '18°C – 32°C',
    growingConsiderations: 'Deep well-aerated soil is mandatory. Waterlogging for even 24–48 hours at knee-high or silking stage can slash grain yields by over 50%.',
    preSowingSteps: 'Ensure broad ridges or furrows for drainage; seed treatment with Imidacloprid (5ml/kg) to deter Fall Armyworm and Shoot fly; apply basal NPK.',
    majorStates: ['Karnataka', 'Madhya Pradesh', 'Bihar', 'Tamil Nadu', 'Telangana', 'Maharashtra', 'Andhra Pradesh'],
    sourceReference: 'ICAR-Indian Institute of Maize Research (IIMR), Ludhiana',
    lastReviewed: 'August 2026'
  },
  {
    id: 'pearl_millet',
    name: 'Pearl Millet / Bajra (बाजरा)',
    scientificName: 'Pennisetum glaucum',
    category: 'Nutri-Cereal / Millet',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['arid_desert', 'red_yellow', 'alluvial'],
    preferredTextures: ['sandy', 'sandy_loam'],
    phRange: { min: 6.5, max: 8.5, optimal: '7.0 – 8.0' },
    seasons: ['kharif', 'zaid'],
    sowingWindow: 'July 1 – July 20 (With onset of monsoon); Feb 15 – March 15 (Summer)',
    waterRequirementMm: '250 – 350 mm',
    irrigationLevel: 'rainfed',
    waterTolerance: 'Extremely Drought-Hardy; tolerates dry spells and high temperature spikes.',
    tempRangeC: '25°C – 38°C',
    growingConsiderations: 'Ideal for marginal arid soils with low rainfall. Does exceptionally well where other cereals fail. Avoid waterlogged or heavy sticky clay soils.',
    preSowingSteps: 'Shallow ploughing; seed treatment with Azospirillum (25g/kg) and PSB; maintain spacing of 45 cm × 12 cm.',
    majorStates: ['Rajasthan', 'Uttar Pradesh', 'Gujarat', 'Haryana', 'Maharashtra'],
    sourceReference: 'ICAR-All India Coordinated Research Project on Pearl Millet, Jodhpur',
    lastReviewed: 'August 2026'
  },
  {
    id: 'sorghum',
    name: 'Sorghum / Jowar (ज्वार)',
    scientificName: 'Sorghum bicolor',
    category: 'Nutri-Cereal / Millet',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['black', 'alluvial', 'red_yellow'],
    preferredTextures: ['loam', 'silty_clay_loam', 'heavy_clay'],
    phRange: { min: 6.0, max: 8.5, optimal: '6.5 – 7.8' },
    seasons: ['kharif', 'rabi'],
    sowingWindow: 'June 20 – July 10 (Kharif); September 15 – October 15 (Rabi)',
    waterRequirementMm: '400 – 550 mm',
    irrigationLevel: 'rainfed',
    waterTolerance: 'High Drought Tolerance; capable of entering dormancy during dry spells and resuming growth.',
    tempRangeC: '25°C – 35°C',
    growingConsiderations: 'Rabi jowar thrives on the deep residual moisture of black Vertisols. Avoid early sowing in Kharif to escape shoot fly infestation.',
    preSowingSteps: 'Seed treatment with Thiamethoxam 30 FS @ 10ml/kg for shoot fly deterrence; apply FYM @ 5 t/ha; maintain optimum plant population.',
    majorStates: ['Maharashtra', 'Karnataka', 'Rajasthan', 'Tamil Nadu', 'Andhra Pradesh'],
    sourceReference: 'ICAR-Indian Institute of Millets Research (IIMR), Hyderabad',
    lastReviewed: 'August 2026'
  },
  {
    id: 'finger_millet',
    name: 'Finger Millet / Ragi (रागी)',
    scientificName: 'Eleusine coracana',
    category: 'Nutri-Cereal / Calcium-Rich Millet',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['red_yellow', 'laterite', 'forest_mountain', 'alluvial'],
    preferredTextures: ['sandy_loam', 'loam'],
    phRange: { min: 5.0, max: 7.5, optimal: '5.8 – 6.8' },
    seasons: ['kharif', 'rabi'],
    sowingWindow: 'July 15 – August 15 (Kharif); Dec – Jan (Summer/Irrigated)',
    waterRequirementMm: '350 – 500 mm',
    irrigationLevel: 'rainfed',
    waterTolerance: 'Moderate; highly resilient to intermittent moisture stress.',
    tempRangeC: '20°C – 32°C',
    growingConsiderations: 'Performs remarkably well on coarse red soils and acid laterites where few other crops survive. Exceptional nutritional value (highest calcium among cereals).',
    preSowingSteps: 'Transplanting 21-day-old nursery seedlings gives higher yields than direct broadcasting; apply 5 t/ha FYM and seed inoculate with Azotobacter.',
    majorStates: ['Karnataka', 'Tamil Nadu', 'Uttarakhand', 'Odisha', 'Andhra Pradesh', 'Maharashtra'],
    sourceReference: 'ICAR-All India Coordinated Research Project on Small Millets, Bengaluru',
    lastReviewed: 'August 2026'
  },

  // CASH & COMMERCIAL CROPS
  {
    id: 'cotton',
    name: 'Cotton (कपास)',
    scientificName: 'Gossypium hirsutum / arboreum',
    category: 'Cash Crop / Natural Fiber',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['black', 'alluvial'],
    preferredTextures: ['heavy_clay', 'silty_clay_loam', 'loam'],
    phRange: { min: 6.5, max: 8.5, optimal: '7.0 – 8.0' },
    seasons: ['kharif', 'annual'],
    sowingWindow: 'May (North irrigated zone); June 15 – July 15 (Central & South rainfed zone)',
    waterRequirementMm: '700 – 1100 mm',
    irrigationLevel: 'limited',
    waterTolerance: 'Moderate; deep taproot extracts moisture, but waterlogging stunts boll development.',
    tempRangeC: '21°C – 34°C (Requires min 180–200 frost-free days)',
    growingConsiderations: 'Black cotton soil (Regur) is historically synonymous with cotton production due to high moisture holding capacity. Requires pest monitoring for Pink Bollworm.',
    preSowingSteps: 'Deep summer ploughing to expose pupae; use certified Bt seeds with refuge; seed treatment with Trichoderma viride; maintain 90 cm × 60 cm spacing.',
    majorStates: ['Gujarat', 'Maharashtra', 'Telangana', 'Andhra Pradesh', 'Madhya Pradesh', 'Haryana', 'Rajasthan', 'Punjab'],
    sourceReference: 'ICAR-Central Institute for Cotton Research (CICR), Nagpur',
    lastReviewed: 'August 2026'
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane (गन्ना)',
    scientificName: 'Saccharum officinarum',
    category: 'Cash Crop / Sugar & Energy',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['alluvial', 'black', 'red_yellow'],
    preferredTextures: ['loam', 'silty_clay_loam'],
    phRange: { min: 6.0, max: 8.2, optimal: '6.5 – 7.5' },
    seasons: ['annual'],
    sowingWindow: 'Oct – Nov (Autumn planting in North); Feb – March (Spring planting in North); Jan – Feb (Adsali / Suru in South)',
    waterRequirementMm: '1500 – 2200 mm',
    irrigationLevel: 'reliable',
    waterTolerance: 'Moderate; needs copious water throughout the formative phase, but good drainage is essential.',
    tempRangeC: '20°C – 35°C',
    growingConsiderations: 'Heavy feeder demanding generous nitrogen, potassium, and organic manure. Drip irrigation saves 40–50% water while improving cane diameter and recovery.',
    preSowingSteps: 'Select healthy 2–3 eye bud setts; hot water treatment (52°C for 30 min) or Carbendazim soak (1g/L); apply pressmud or FYM @ 20 t/ha.',
    majorStates: ['Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Bihar', 'Gujarat', 'Haryana', 'Punjab'],
    sourceReference: 'ICAR-Indian Institute of Sugarcane Research (IISR), Lucknow',
    lastReviewed: 'August 2026'
  },
  {
    id: 'jute',
    name: 'Jute (पटसन / जूट)',
    scientificName: 'Corchorus olitorius / capsularis',
    category: 'Commercial / Golden Fiber',
    image: 'https://images.unsplash.com/photo-1544983058-2947098e947c?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['alluvial', 'peaty_marshy'],
    preferredTextures: ['silty_clay_loam', 'loam'],
    phRange: { min: 5.5, max: 7.2, optimal: '6.0 – 6.8' },
    seasons: ['kharif', 'zaid'],
    sowingWindow: 'March 15 – May 15 (Pre-kharif)',
    waterRequirementMm: '1000 – 1400 mm',
    irrigationLevel: 'reliable',
    waterTolerance: 'High; capsularis varieties tolerate prolonged flooding and standing water in later growth stages.',
    tempRangeC: '24°C – 37°C with high relative humidity (> 75%)',
    growingConsiderations: 'Thrives in fresh silt-deposited river deltas of Eastern India. Requires clean retting ponds with slow-moving water for biological fiber extraction.',
    preSowingSteps: 'Prepare fine tilth; seed rate 5–7 kg/ha (line sowing); seed treatment with Carbendazim @ 2g/kg; apply urea in 2 split doses.',
    majorStates: ['West Bengal', 'Bihar', 'Assam', 'Odisha', 'Meghalaya'],
    sourceReference: 'ICAR-Central Research Institute for Jute and Allied Fibres (CRIJAF), Barrackpore',
    lastReviewed: 'August 2026'
  },

  // PULSES / LEGUMES (Soil Restoring)
  {
    id: 'chickpea_gram',
    name: 'Chickpea / Bengal Gram (चना)',
    scientificName: 'Cicer arietinum',
    category: 'Pulse / Soil Restoring Legume',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['black', 'alluvial', 'red_yellow'],
    preferredTextures: ['sandy_loam', 'loam', 'silty_clay_loam'],
    phRange: { min: 6.0, max: 8.2, optimal: '6.5 – 7.5' },
    seasons: ['rabi'],
    sowingWindow: 'October 15 – November 15',
    waterRequirementMm: '250 – 400 mm',
    irrigationLevel: 'limited',
    waterTolerance: 'Low; highly prone to collar rot, wilt, and root rot in waterlogged soils.',
    tempRangeC: '15°C – 28°C',
    growingConsiderations: 'Atmospheric nitrogen fixer that enriches field fertility. Excessive vegetative growth from over-watering reduces pod count. One irrigation at pre-flowering and one at pod-fill is ideal.',
    preSowingSteps: 'Seed inoculation with Rhizobium and Phosphotika (PSB) culture; treat with Trichoderma viride @ 5g/kg to shield against Fusarium wilt.',
    majorStates: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Karnataka', 'Uttar Pradesh', 'Gujarat'],
    sourceReference: 'ICAR-Indian Institute of Pulses Research (IIPR), Kanpur',
    lastReviewed: 'August 2026'
  },
  {
    id: 'pigeonpea_arhar',
    name: 'Pigeon Pea / Red Gram / Arhar (अरहर / तुअर)',
    scientificName: 'Cajanus cajan',
    category: 'Pulse / Protein Staple',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['black', 'red_yellow', 'alluvial'],
    preferredTextures: ['loam', 'sandy_loam', 'silty_clay_loam'],
    phRange: { min: 6.0, max: 8.0, optimal: '6.5 – 7.5' },
    seasons: ['kharif'],
    sowingWindow: 'June 15 – July 15 (Onset of monsoon)',
    waterRequirementMm: '500 – 650 mm',
    irrigationLevel: 'rainfed',
    waterTolerance: 'Low; deep taproot searches for subsoil moisture, but sensitive to surface water stagnation.',
    tempRangeC: '20°C – 35°C',
    growingConsiderations: 'Deep taproot breaks hard subsoil pans and mines nutrients from deeper layers. Often intercropped with soybean, cotton, or sorghum (1:2 or 1:1 ratio).',
    preSowingSteps: 'Ridge and furrow planting; seed treatment with Rhizobium and Trichoderma; nip early terminal shoots at 45 days to encourage lateral pod-bearing branches.',
    majorStates: ['Maharashtra', 'Madhya Pradesh', 'Karnataka', 'Uttar Pradesh', 'Gujarat', 'Telangana'],
    sourceReference: 'ICAR-Indian Institute of Pulses Research (IIPR), Kanpur',
    lastReviewed: 'August 2026'
  },
  {
    id: 'green_gram_moong',
    name: 'Green Gram / Moong (मूंग)',
    scientificName: 'Vigna radiata',
    category: 'Pulse / Short-Duration Catch Crop',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['alluvial', 'red_yellow', 'black'],
    preferredTextures: ['sandy_loam', 'loam'],
    phRange: { min: 6.2, max: 7.8, optimal: '6.5 – 7.2' },
    seasons: ['kharif', 'zaid'],
    sowingWindow: 'March 15 – April 15 (Summer / Zaid); July 1 – July 20 (Kharif)',
    waterRequirementMm: '300 – 400 mm',
    irrigationLevel: 'limited',
    waterTolerance: 'Low; matures rapidly in 60–65 days.',
    tempRangeC: '25°C – 38°C',
    growingConsiderations: 'Exceptional catch crop to fit between Rabi wheat and Kharif paddy. Fixes 30–40 kg N/ha, boosting the fertility of following crops.',
    preSowingSteps: 'Seed treatment with Rhizobium culture and Imidacloprid (for yellow mosaic vector whitefly); 1–2 summer irrigations.',
    majorStates: ['Rajasthan', 'Madhya Pradesh', 'Maharashtra', 'Karnataka', 'Bihar', 'Uttar Pradesh', 'Andhra Pradesh'],
    sourceReference: 'ICAR-IIPR Regional Research Centre & AICRP Kharif Pulses',
    lastReviewed: 'August 2026'
  },

  // OILSEEDS
  {
    id: 'soybean',
    name: 'Soybean (सोयाबीन)',
    scientificName: 'Glycine max',
    category: 'Oilseed & Protein Crop',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['black', 'alluvial'],
    preferredTextures: ['silty_clay_loam', 'loam', 'heavy_clay'],
    phRange: { min: 6.0, max: 7.5, optimal: '6.5 – 7.0' },
    seasons: ['kharif'],
    sowingWindow: 'June 20 – July 15 (When soil receives 75–100 mm rainfall)',
    waterRequirementMm: '500 – 700 mm',
    irrigationLevel: 'rainfed',
    waterTolerance: 'Moderate; requires moist soil for germination, but vulnerable to continuous water stagnation.',
    tempRangeC: '20°C – 32°C',
    growingConsiderations: 'The backbone of Central India’s rainfed agriculture on black Vertisols. High seed oil (20%) and protein (40%). Responds well to broad-bed planting.',
    preSowingSteps: 'Broad bed and furrow (BBF) layout; seed treatment with Bradyrhizobium japonicum and Trichoderma viride; depth of sowing should not exceed 3–4 cm.',
    majorStates: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Karnataka', 'Telangana'],
    sourceReference: 'ICAR-Indian Institute of Soybean Research (IISR), Indore',
    lastReviewed: 'August 2026'
  },
  {
    id: 'mustard_rapeseed',
    name: 'Mustard / Rapeseed (सरसों)',
    scientificName: 'Brassica juncea',
    category: 'Rabi Oilseed / Spice',
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['alluvial', 'arid_desert', 'black'],
    preferredTextures: ['sandy_loam', 'loam'],
    phRange: { min: 6.0, max: 8.2, optimal: '6.5 – 7.5' },
    seasons: ['rabi'],
    sowingWindow: 'October 1 – October 25 (Ideal to escape mustard aphid peak)',
    waterRequirementMm: '250 – 400 mm',
    irrigationLevel: 'limited',
    waterTolerance: 'Low; requires 2–3 light irrigations at flowering and siliqua development.',
    tempRangeC: '10°C – 25°C',
    growingConsiderations: 'Highly sensitive to sulphur deficiency; applying 20–25 kg elemental sulphur or gypsum increases seed oil percentage and pungency significantly.',
    preSowingSteps: 'Seed treatment with Apron 35 SD (6g/kg) for white rust; apply Single Super Phosphate (SSP) as phosphorus source since it supplies both P and Sulphur.',
    majorStates: ['Rajasthan', 'Madhya Pradesh', 'Haryana', 'Uttar Pradesh', 'West Bengal', 'Gujarat'],
    sourceReference: 'ICAR-Directorate of Rapeseed-Mustard Research (DRMR), Bharatpur',
    lastReviewed: 'August 2026'
  },
  {
    id: 'groundnut_peanut',
    name: 'Groundnut / Peanut (मूंगफली)',
    scientificName: 'Arachis hypogaea',
    category: 'Oilseed & Food Legume',
    image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['red_yellow', 'alluvial', 'arid_desert'],
    preferredTextures: ['sandy_loam', 'loam'],
    phRange: { min: 6.0, max: 7.5, optimal: '6.2 – 6.8' },
    seasons: ['kharif', 'zaid'],
    sowingWindow: 'June 15 – July 15 (Kharif); Jan – Feb (Summer/Rabi)',
    waterRequirementMm: '450 – 600 mm',
    irrigationLevel: 'limited',
    waterTolerance: 'Low to Moderate; requires loose, friable soil for gynophore (peg) penetration and pod enlargement.',
    tempRangeC: '22°C – 32°C',
    growingConsiderations: 'Heavy clay soils are strictly unsuitable as pegs cannot penetrate hard crusts, and harvesting causes heavy pod loss. Calcium (Gypsum @ 400 kg/ha at pegging) prevents "pops" (empty shells).',
    preSowingSteps: 'Deep ploughing with fine pulverization; seed treatment with Rhizobium and Mancozeb (2g/kg); split application of gypsum at flowering/pegging.',
    majorStates: ['Gujarat', 'Rajasthan', 'Tamil Nadu', 'Andhra Pradesh', 'Karnataka', 'Madhya Pradesh'],
    sourceReference: 'ICAR-Directorate of Groundnut Research (DGR), Junagadh',
    lastReviewed: 'August 2026'
  },

  // PLANTATION & HORTICULTURE CROPS
  {
    id: 'tea',
    name: 'Tea (चाय)',
    scientificName: 'Camellia sinensis',
    category: 'Plantation / Beverage',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['laterite', 'forest_mountain'],
    preferredTextures: ['loam', 'sandy_loam'],
    phRange: { min: 4.5, max: 5.8, optimal: '4.8 – 5.5 (Strictly Acidic)' },
    seasons: ['annual'],
    sowingWindow: 'May – June or September – October (Plantation saplings)',
    waterRequirementMm: '1500 – 2500 mm',
    irrigationLevel: 'reliable',
    waterTolerance: 'Zero tolerance for waterlogging; requires sloping, highly porous, well-drained mountain/laterite soils.',
    tempRangeC: '15°C – 30°C',
    growingConsiderations: 'Acidic pH is essential; calcium-rich or alkaline soils cause chlorosis and bush death. Needs high organic matter and shade trees.',
    preSowingSteps: 'Contour trenching on slopes; pit digging (45x45x45 cm) filled with compost and rock phosphate; planting shade trees (Albizia lebbeck).',
    majorStates: ['Assam', 'West Bengal (Darjeeling, Jalpaiguri)', 'Tamil Nadu (Nilgiris)', 'Kerala', 'Himachal Pradesh (Kangra)'],
    sourceReference: 'Tea Board of India & UPASI Tea Research Institute',
    lastReviewed: 'August 2026'
  },
  {
    id: 'coffee',
    name: 'Coffee (कॉफ़ी)',
    scientificName: 'Coffea arabica / canephora',
    category: 'Plantation / Beverage',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['laterite', 'forest_mountain'],
    preferredTextures: ['loam', 'silty_clay_loam'],
    phRange: { min: 5.0, max: 6.5, optimal: '5.5 – 6.2' },
    seasons: ['annual'],
    sowingWindow: 'August – September (With retreating monsoon for root establishment)',
    waterRequirementMm: '1600 – 2200 mm',
    irrigationLevel: 'limited',
    waterTolerance: 'Requires well-drained, deep friable forest/laterite slopes; blossom showers in March–April are critical.',
    tempRangeC: '15°C – 28°C',
    growingConsiderations: 'Grown under two tiers of natural forest shade (dadap and silver oak) in the Western Ghats. Protects hills against landslides.',
    preSowingSteps: 'Soil analysis for pH and available P; lime application if pH < 5.0; two-tier shade management; terracing on steep slopes.',
    majorStates: ['Karnataka (Kodagu, Chikkamagaluru, Hassan)', 'Kerala (Wayanad)', 'Tamil Nadu', 'Andhra Pradesh (Araku Valley)'],
    sourceReference: 'Central Coffee Research Institute (CCRI), Balehonnur & Coffee Board of India',
    lastReviewed: 'August 2026'
  },
  {
    id: 'cashew',
    name: 'Cashew (काजू)',
    scientificName: 'Anacardium occidentale',
    category: 'Horticulture / Dry Fruit',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['laterite', 'red_yellow'],
    preferredTextures: ['sandy', 'sandy_loam'],
    phRange: { min: 5.0, max: 7.0, optimal: '5.5 – 6.5' },
    seasons: ['annual'],
    sowingWindow: 'June – August (Softwood graft planting with onset of monsoon)',
    waterRequirementMm: '800 – 1600 mm',
    irrigationLevel: 'rainfed',
    waterTolerance: 'High Drought Hardy; thrives on degraded coastal lateritic hillocks and marginal red lands.',
    tempRangeC: '20°C – 36°C',
    growingConsiderations: 'Highly adaptable to low fertility laterite crusts where standard crops fail. Heavy clay and flood-prone soils must be avoided.',
    preSowingSteps: 'Pits of 1m × 1m × 1m filled with topsoil, FYM, and rock phosphate; softwood grafts from high-yielding varieties (Ullal, VRI-3, Bhaskara).',
    majorStates: ['Maharashtra (Konkan)', 'Andhra Pradesh', 'Odisha', 'Kerala', 'Goa', 'Tamil Nadu', 'Karnataka'],
    sourceReference: 'ICAR-Directorate of Cashew Research (DCR), Puttur',
    lastReviewed: 'August 2026'
  },
  {
    id: 'potato',
    name: 'Potato (आलू)',
    scientificName: 'Solanum tuberosum',
    category: 'Vegetable / Tuber',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['alluvial', 'forest_mountain', 'red_yellow'],
    preferredTextures: ['sandy_loam', 'loam'],
    phRange: { min: 5.2, max: 7.0, optimal: '5.5 – 6.5' },
    seasons: ['rabi'],
    sowingWindow: 'October 15 – November 10 (Plains); March – April (Hills)',
    waterRequirementMm: '400 – 600 mm',
    irrigationLevel: 'reliable',
    waterTolerance: 'Moderate; tubers rot rapidly under stagnant moisture. Loose soil allows uniform tuber expansion.',
    tempRangeC: '15°C – 22°C (Tuberization requires night temps below 20°C)',
    growingConsiderations: 'Earthing up at 30–35 days is critical to prevent greening of tubers from sunlight exposure (solanine formation). High potassium demand.',
    preSowingSteps: 'Use certified disease-free seed tubers with sprouts; seed treatment with Mancozeb (2.5g/L); apply Potash (MOP) as basal for tuber firmness.',
    majorStates: ['Uttar Pradesh', 'West Bengal', 'Bihar', 'Gujarat', 'Madhya Pradesh', 'Punjab'],
    sourceReference: 'ICAR-Central Potato Research Institute (CPRI), Shimla',
    lastReviewed: 'August 2026'
  },
  {
    id: 'tomato',
    name: 'Tomato (टमाटर)',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable / Solanaceous Fruit',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['alluvial', 'red_yellow', 'black'],
    preferredTextures: ['sandy_loam', 'loam'],
    phRange: { min: 6.0, max: 7.5, optimal: '6.2 – 6.8' },
    seasons: ['rabi', 'kharif', 'zaid'],
    sowingWindow: 'June – July (Autumn crop); Oct – Nov (Spring crop); Jan – Feb (Summer crop)',
    waterRequirementMm: '400 – 600 mm',
    irrigationLevel: 'reliable',
    waterTolerance: 'Moderate; drip irrigation with mulching prevents blossom end rot and fungal blights.',
    tempRangeC: '18°C – 28°C',
    growingConsiderations: 'Requires consistent moisture. Irregular watering causes fruit cracking. Calcium deficiency under dry spells leads to Blossom End Rot.',
    preSowingSteps: 'Raised bed nursery preparation; seedling root dip in Trichoderma & Pseudomonas; staking plants on trellises at 30 days.',
    majorStates: ['Andhra Pradesh', 'Madhya Pradesh', 'Karnataka', 'Gujarat', 'Odisha', 'West Bengal', 'Maharashtra'],
    sourceReference: 'ICAR-Indian Institute of Vegetable Research (IIVR), Varanasi',
    lastReviewed: 'August 2026'
  },
  {
    id: 'spices_cardamom_blackpepper',
    name: 'Black Pepper & Cardamom (काली मिर्च और इलायची)',
    scientificName: 'Piper nigrum / Elettaria cardamomum',
    category: 'Spices / High-Value Cash',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['laterite', 'forest_mountain'],
    preferredTextures: ['loam', 'silty_clay_loam'],
    phRange: { min: 4.8, max: 6.2, optimal: '5.2 – 5.8' },
    seasons: ['annual'],
    sowingWindow: 'June – July (Onset of South-West Monsoon)',
    waterRequirementMm: '1800 – 2800 mm',
    irrigationLevel: 'limited',
    waterTolerance: 'Requires humid microclimate but zero stagnant root water; quick drainage is mandatory to prevent foot rot (Phytophthora).',
    tempRangeC: '15°C – 32°C',
    growingConsiderations: 'Pepper vines are trained on living support trees (silver oak, arecanut) in multi-tier agroforestry systems of the Western Ghats.',
    preSowingSteps: 'Pit preparation with forest loam, FYM, and rock phosphate; apply Trichoderma enriched neem cake to prevent Phytophthora wilt.',
    majorStates: ['Kerala', 'Karnataka', 'Tamil Nadu'],
    sourceReference: 'ICAR-Indian Institute of Spices Research (IISR), Kozhikode',
    lastReviewed: 'August 2026'
  },

  // SALINE, ARID & SPECIALIZED SOIL CROPS (ICAR-CSSRI & ICAR-CAZRI)
  {
    id: 'barley',
    name: 'Barley / Jau (जौ)',
    scientificName: 'Hordeum vulgare',
    category: 'Cereal / High Salinity & Drought Tolerant',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['saline_alkaline', 'arid_desert', 'alluvial'],
    preferredTextures: ['sandy_loam', 'loam', 'silty_clay_loam'],
    phRange: { min: 6.5, max: 9.0, optimal: '7.5 – 8.8 (Highly tolerant to sodic & saline soils)' },
    seasons: ['rabi'],
    sowingWindow: 'October 20 – November 15 (Semi-arid & irrigated); November (Late sown)',
    waterRequirementMm: '200 – 350 mm',
    irrigationLevel: 'rainfed',
    waterTolerance: 'Extremely High Drought & Salt Tolerance; tolerates soil EC up to 8.0–10.0 dS/m where wheat fails.',
    tempRangeC: '12°C – 26°C',
    growingConsiderations: 'Barley is the premier cereal for saline-sodic (Usar) reclamation and arid drylands. Requires minimal inputs and ripens 15–20 days earlier than wheat, escaping terminal heat stress.',
    preSowingSteps: 'Seed treatment with Thiram or Bavistin @ 2g/kg; sowing depth 4–5 cm in moist zone; apply 60 kg N, 30 kg P2O5 per ha in saline soils.',
    majorStates: ['Rajasthan', 'Uttar Pradesh', 'Haryana', 'Punjab', 'Madhya Pradesh', 'Bihar'],
    bestGrowingRegions: 'Western Rajasthan (Jaipur, Sikar, Alwar), Haryana (Hisar, Sirsa), Western UP (Agra, Mathura, Aligarh canal commands)',
    sourceReference: 'ICAR-Indian Institute of Wheat & Barley Research (IIWBR), Karnal & ICAR-CSSRI',
    lastReviewed: 'August 2026'
  },
  {
    id: 'dhaincha',
    name: 'Dhaincha / Sesbania (ढैंचा - Green Manure & Reclamation)',
    scientificName: 'Sesbania aculeata / bispinosa',
    category: 'Soil Restoring / Sodic Land Reclamation Legume',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['saline_alkaline', 'alluvial', 'black'],
    preferredTextures: ['loam', 'silty_clay_loam', 'heavy_clay'],
    phRange: { min: 5.5, max: 9.8, optimal: '7.0 – 9.5 (Survives severe sodicity & waterlogging)' },
    seasons: ['kharif', 'zaid'],
    sowingWindow: 'April 15 – May 31 (Summer green manure); June 15 – July 15 (Kharif)',
    waterRequirementMm: '350 – 550 mm',
    irrigationLevel: 'limited',
    waterTolerance: 'High; tolerates stagnant water, waterlogged sodic pans, and saline conditions.',
    tempRangeC: '25°C – 42°C',
    growingConsiderations: 'Reclamation champion: Incorporating 45-day-old succulent Dhaincha biomass (20–25 t/ha) produces carbonic and organic acids that dissolve native CaCO3 in sodic soils, unlocking sodium and reclaiming Usar soil.',
    preSowingSteps: 'Broadcast seeds @ 40–50 kg/ha for green manuring; irrigate immediately; incorporate into soil with disc harrow at 45–50 days (before stem hardens).',
    majorStates: ['Uttar Pradesh', 'Punjab', 'Haryana', 'Bihar', 'West Bengal', 'Gujarat', 'Rajasthan'],
    bestGrowingRegions: 'Canal-command sodic tracts of UP (Rae Bareli, Sultanpur, Unnao, Aligarh), Punjab/Haryana salinity zones',
    sourceReference: 'Central Soil Salinity Research Institute (CSSRI), Karnal',
    lastReviewed: 'August 2026'
  },
  {
    id: 'salt_tolerant_rice',
    name: 'Salt-Tolerant Paddy / CSR-36 & Pokkali (लवण-सहनशील धान)',
    scientificName: 'Oryza sativa (Halophyte bred lines)',
    category: 'Cereal / Saline & Sodic Resistant Staple',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['saline_alkaline', 'peaty_marshy', 'alluvial'],
    preferredTextures: ['silty_clay_loam', 'heavy_clay', 'loam'],
    phRange: { min: 4.5, max: 9.8, optimal: '7.5 – 9.5 in sodic soils, 4.5 – 6.0 in Pokkali peats' },
    seasons: ['kharif'],
    sowingWindow: 'June 15 – July 20 (Nursery sowing and 30-day transplanting)',
    waterRequirementMm: '1100 – 1400 mm',
    irrigationLevel: 'reliable',
    waterTolerance: 'High; thrives in flooded conditions with saline/brackish water (ECe up to 9–11 dS/m and ESP up to 45).',
    tempRangeC: '24°C – 36°C',
    growingConsiderations: 'Specially developed varieties (CSR-36, CSR-27, Basmati CSR-30 by CSSRI Karnal; Pokkali and Vyttila in Kerala) exclude toxic sodium through roots while maintaining potassium uptake.',
    preSowingSteps: 'Transplant 30–35 day old seedlings (3–4 seedlings per hill); apply 25% extra nitrogen than normal soils; apply Zinc Sulphate @ 25 kg/ha basal.',
    majorStates: ['Haryana (Karnal, Kaithal)', 'Punjab', 'Uttar Pradesh', 'West Bengal (Sundarbans coastal)', 'Kerala (Kuttanad & Ernakulam)'],
    bestGrowingRegions: 'Indo-Gangetic sodic tracts and Sundarbans / Kerala saline wetland backwaters',
    sourceReference: 'ICAR-Central Soil Salinity Research Institute (CSSRI), Karnal & KAU Kerala',
    lastReviewed: 'August 2026'
  },
  {
    id: 'guar_cluster_bean',
    name: 'Guar / Cluster Bean (ग्वार)',
    scientificName: 'Cyamopsis tetragonoloba',
    category: 'Pulse & Industrial Gum / Arid Hardy',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['arid_desert', 'red_yellow', 'alluvial'],
    preferredTextures: ['sandy', 'sandy_loam'],
    phRange: { min: 7.0, max: 8.8, optimal: '7.5 – 8.5' },
    seasons: ['kharif'],
    sowingWindow: 'July 1 – July 25 (With first substantial monsoon showers)',
    waterRequirementMm: '200 – 300 mm',
    irrigationLevel: 'rainfed',
    waterTolerance: 'Exceptionally High Drought Hardy; deep root system searches for deep capillary moisture in sand dunes.',
    tempRangeC: '25°C – 40°C',
    growingConsiderations: 'Ideal cash-pulse crop for sandy Thar desert soils. Enriches soil with biological nitrogen while yielding valuable galactomannan gum for industrial export.',
    preSowingSteps: 'Seed treatment with Rhizobium and Trichoderma (4g/kg); line sowing at 45 cm × 15 cm; avoid heavy soils prone to water stagnation.',
    majorStates: ['Rajasthan (Produces > 75% of India total)', 'Gujarat', 'Haryana', 'Punjab'],
    bestGrowingRegions: 'Thar desert districts (Barmer, Bikaner, Jodhpur, Jaisalmer, Churu, Nagaur)',
    sourceReference: 'ICAR-Central Arid Zone Research Institute (CAZRI), Jodhpur',
    lastReviewed: 'August 2026'
  },
  {
    id: 'apple_temperate',
    name: 'Apple & Temperate Fruits (सेब और पर्वतीय फल)',
    scientificName: 'Malus domestica',
    category: 'Horticulture / High-Altitude Mountain Orchard',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['forest_mountain'],
    preferredTextures: ['loam', 'sandy_loam'],
    phRange: { min: 5.5, max: 6.8, optimal: '6.0 – 6.5 (Rich in organic forest humus)' },
    seasons: ['annual'],
    sowingWindow: 'December – February (Dormant sapling plantation on hill contours)',
    waterRequirementMm: '1000 – 1250 mm',
    irrigationLevel: 'limited',
    waterTolerance: 'Requires deep well-drained mountain terrace slopes; zero tolerance for root water stagnation.',
    tempRangeC: '-5°C – 24°C (Requires 800–1200 winter chilling hours below 7°C)',
    growingConsiderations: 'Thrives in organic-rich forest and mountain soils at elevations between 1,500m to 2,700m above sea level. Needs organic mulching and anti-hail net protection.',
    preSowingSteps: 'Dig pits (1m × 1m × 1m) on bench terraces; blend pit soil with 30 kg well-decomposed forest compost, 500g rock phosphate, and mycorrhizae.',
    majorStates: ['Jammu & Kashmir (Baramulla, Shopian, Pulwama)', 'Himachal Pradesh (Shimla, Kullu, Kinnaur)', 'Uttarakhand (Nainital, Almora, Uttarkashi)'],
    bestGrowingRegions: 'Himalayan mountain terraces: Kashmir Valley, Shimla Apple Belt, Kinnaur, Kumaon Hills',
    sourceReference: 'ICAR-Central Institute of Temperate Horticulture (CITH), Srinagar & Dr. YS Parmar UHF Solan',
    lastReviewed: 'August 2026'
  },
  {
    id: 'rubber_coconut',
    name: 'Coconut & Natural Rubber (नारियल और रबर)',
    scientificName: 'Cocos nucifera / Hevea brasiliensis',
    category: 'Plantation / Coastal & Laterite Commercial',
    image: 'https://images.unsplash.com/photo-1544983058-2947098e947c?w=600&auto=format&fit=crop&q=80',
    suitableSoils: ['laterite', 'peaty_marshy', 'alluvial'],
    preferredTextures: ['sandy_loam', 'loam', 'silty_clay_loam'],
    phRange: { min: 4.8, max: 7.5, optimal: '5.2 – 6.5' },
    seasons: ['annual'],
    sowingWindow: 'May – June (With South-West monsoon) or September (Retreating monsoon)',
    waterRequirementMm: '1500 – 2500 mm',
    irrigationLevel: 'reliable',
    waterTolerance: 'High humidity adaptation; requires well-drained laterite slopes or coastal mounds to avoid root collar rotting.',
    tempRangeC: '20°C – 35°C',
    growingConsiderations: 'Extremely well-adapted to the high-rainfall laterites of the Western Ghats and coastal lowlands. High potassium demand for copra and latex synthesis.',
    preSowingSteps: 'Pit size 1m × 1m × 1m; fill with topsoil, 25 kg compost, 1 kg bone meal or rock phosphate; in acidic laterites apply 1 kg dolomite per pit annually.',
    majorStates: ['Kerala', 'Tamil Nadu', 'Karnataka', 'Goa', 'Andhra Pradesh', 'Odisha', 'Maharashtra (Konkan)'],
    bestGrowingRegions: 'Kerala (Palakkad, Thrissur, Kottayam), Tamil Nadu (Coimbatore, Thanjavur), Karnataka coastal belt',
    sourceReference: 'ICAR-Central Plantation Crops Research Institute (CPCRI), Kasaragod & Rubber Board of India',
    lastReviewed: 'August 2026'
  }
];

// ==========================================
// 4. INDIAN STATES & AGRO-CLIMATIC DISTRICTS
// ==========================================
export const INDIAN_STATES_DISTRICTS = [
  {
    state: 'Punjab',
    dominantSoil: 'alluvial',
    districts: ['Ludhiana', 'Amritsar', 'Patiala', 'Jalandhar', 'Bathinda', 'Gurdaspur', 'Firozpur', 'Sangrur']
  },
  {
    state: 'Haryana',
    dominantSoil: 'alluvial',
    districts: ['Karnal', 'Kurukshetra', 'Ambala', 'Hisar', 'Sirsa', 'Rohtak', 'Panipat', 'Sonipat']
  },
  {
    state: 'Uttar Pradesh',
    dominantSoil: 'alluvial',
    districts: ['Varanasi', 'Bareilly', 'Agra', 'Kanpur', 'Lucknow', 'Meerut', 'Gorakhpur', 'Prayagraj', 'Aligarh']
  },
  {
    state: 'Bihar',
    dominantSoil: 'alluvial',
    districts: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Samastipur', 'Rohtas']
  },
  {
    state: 'West Bengal',
    dominantSoil: 'alluvial',
    districts: ['Burdwan', 'Murshidabad', 'Nadia', 'Hooghly', 'Midnapore', 'Malda', 'Birbhum', 'South 24 Parganas']
  },
  {
    state: 'Maharashtra',
    dominantSoil: 'black',
    districts: ['Nagpur', 'Nashik', 'Pune', 'Amravati', 'Aurangabad', 'Solapur', 'Kolhapur', 'Akola', 'Yavatmal']
  },
  {
    state: 'Madhya Pradesh',
    dominantSoil: 'black',
    districts: ['Indore', 'Ujjain', 'Bhopal', 'Jabalpur', 'Gwalior', 'Hoshangabad', 'Sagar', 'Dewas', 'Khargone']
  },
  {
    state: 'Gujarat',
    dominantSoil: 'black',
    districts: ['Rajkot', 'Surat', 'Vadodara', 'Ahmedabad', 'Bhavnagar', 'Junagadh', 'Kutch', 'Mehsana', 'Anand']
  },
  {
    state: 'Rajasthan',
    dominantSoil: 'arid_desert',
    districts: ['Jodhpur', 'Bikaner', 'Jaipur', 'Kota', 'Barmer', 'Ganganagar', 'Nagaur', 'Alwar', 'Udaipur']
  },
  {
    state: 'Karnataka',
    dominantSoil: 'red_yellow',
    districts: ['Belagavi', 'Dharwad', 'Tumakuru', 'Mysuru', 'Ballari', 'Shivamogga', 'Chikkamagaluru', 'Hassan']
  },
  {
    state: 'Tamil Nadu',
    dominantSoil: 'red_yellow',
    districts: ['Coimbatore', 'Thanjavur', 'Madurai', 'Salem', 'Tiruchirappalli', 'Erode', 'Tirunelveli', 'Dindigul']
  },
  {
    state: 'Andhra Pradesh',
    dominantSoil: 'red_yellow',
    districts: ['Guntur', 'Krishna', 'East Godavari', 'West Godavari', 'Kurnool', 'Anantapur', 'Chittoor', 'Nellore']
  },
  {
    state: 'Telangana',
    dominantSoil: 'red_yellow',
    districts: ['Warangal', 'Nalgonda', 'Khammam', 'Karimnagar', 'Nizamabad', 'Mahbubnagar', 'Rangareddy']
  },
  {
    state: 'Odisha',
    dominantSoil: 'red_yellow',
    districts: ['Cuttack', 'Balasore', 'Bhadrak', 'Sambalpur', 'Ganjam', 'Bargarh', 'Kalahandi', 'Puri']
  },
  {
    state: 'Chhattisgarh',
    dominantSoil: 'red_yellow',
    districts: ['Raipur', 'Bilaspur', 'Durg', 'Rajnandgaon', 'Janjgir-Champa', 'Bastar', 'Korba']
  },
  {
    state: 'Kerala',
    dominantSoil: 'laterite',
    districts: ['Palakkad', 'Alappuzha', 'Wayanad', 'Thrissur', 'Kottayam', 'Kozhikode', 'Kannur', 'Idukki']
  },
  {
    state: 'Assam',
    dominantSoil: 'alluvial',
    districts: ['Kamrup', 'Dibrugarh', 'Nagaon', 'Sonitpur', 'Jorhat', 'Cachar', 'Barpeta', 'Tinsukia']
  },
  {
    state: 'Himachal Pradesh',
    dominantSoil: 'forest_mountain',
    districts: ['Shimla', 'Kangra', 'Kullu', 'Mandi', 'Solan', 'Una', 'Chamba', 'Sirmaur']
  },
  {
    state: 'Uttarakhand',
    dominantSoil: 'forest_mountain',
    districts: ['Dehradun', 'Haridwar', 'Udham Singh Nagar', 'Nainital', 'Almora', 'Pauri Garhwal']
  },
  {
    state: 'Jammu & Kashmir',
    dominantSoil: 'forest_mountain',
    districts: ['Anantnag', 'Baramulla', 'Pulwama', 'Jammu', 'Kathua', 'Udhampur', 'Srinagar']
  }
];

// ==========================================
// 5. SOIL IMPROVEMENT & AGRONOMIC GUIDELINES
// ==========================================
export const GENERAL_SOIL_MANAGEMENT_ADVICE = [
  {
    id: 'organic_matter',
    title: 'Organic Carbon & Humus Enhancement',
    category: 'Soil Fertility & Biology',
    icon: 'Leaf',
    summary: '90% of Indian soils suffer from low organic carbon (< 0.5%). Replenishing humus restores microbial life and moisture storage.',
    actionableTips: [
      'Apply well-rotted Farm Yard Manure (FYM) or Vermicompost @ 5–10 t/ha before summer discing.',
      'Sow green manure legumes (Dhaincha / Sesbania aculeata or Sunn hemp) at 45 days before the main Kharif crop and incorporate into soil at 50% flowering stage.',
      'Retain and incorporate crop residues (wheat stubble, paddy straw via Happy Seeder) rather than burning.'
    ],
    verifiedSource: 'ICAR-Indian Institute of Soil Science (IISS), Bhopal'
  },
  {
    id: 'drainage_aeration',
    title: 'Subsoil Aeration & Drainage Management',
    category: 'Physical Soil Health',
    icon: 'Waves',
    summary: 'Poor drainage in heavy clay (black soils) and coastal alluvial basins leads to root suffocation and salinization.',
    actionableTips: [
      'In heavy clay soils, construct Broad Bed and Furrow (BBF) systems (1.5m bed width, 30cm furrow depth) to facilitate excess runoff disposal.',
      'Perform deep subsoiling / chiselling once every 3 years to shatter hard tillage pans at 25–35 cm depth.',
      'In sandy soils, maintain field bunds and adopt contour farming to maximize rainwater percolation.'
    ],
    verifiedSource: 'Central Soil Salinity Research Institute (CSSRI), Karnal'
  },
  {
    id: 'ph_correction',
    title: 'Evidence-Based pH Correction & Reclamation',
    category: 'Chemical Soil Health',
    icon: 'Activity',
    summary: 'Soil chemical balance dictates nutrient availability. Corrections must be verified through laboratory testing before application.',
    actionableTips: [
      'Acidic Soils (pH < 6.0, common in Laterite & Hill soils): Apply Agricultural Lime (CaCO3) or Dolomite @ 1.5–2.5 t/ha based on lime requirement test.',
      'Alkaline / Sodic Soils (pH > 8.2, ESP > 15%, common in canal commands): Apply agricultural gypsum based on Gypsum Requirement (GR) test, followed by heavy ponding and leaching.',
      'Neutral Soils (pH 6.5–7.8): Maintain balance using bio-fertilizers (Rhizobium, PSB, KMB) without unneeded chemical amendments.'
    ],
    verifiedSource: 'ICAR Soil Health Card Advisory Guidelines'
  },
  {
    id: 'erosion_prevention',
    title: 'Erosion Prevention & Moisture Conservation',
    category: 'Conservation Agriculture',
    icon: 'Shield',
    summary: 'Topsoil loss via monsoon downpours or desert winds permanently strips the fertile root horizon.',
    actionableTips: [
      'On slopes exceeding 3%, practice contour bunding and establish vegetative vegetative barriers using Vetiver (Khus) grass.',
      'Adopt organic mulching (paddy straw, sugarcane trash) @ 5 t/ha to lower soil temperature by 3°–5°C and cut evaporation by 40%.',
      'In arid tracts, establish windbreaks of Prosopis cineraria (Khejri) and Acacia along field borders perpendicular to prevailing winds.'
    ],
    verifiedSource: 'National Bureau of Soil Survey and Land Use Planning (NBSS&LUP), Nagpur'
  }
];
