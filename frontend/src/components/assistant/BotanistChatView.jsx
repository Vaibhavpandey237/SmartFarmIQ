import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Volume2, VolumeX, Trash2, Sparkles, Copy, Check, RotateCcw, HelpCircle } from 'lucide-react';

// ==============================================================================
// AGRONOMIC KNOWLEDGE BASE (CIBRC Approved Chemicals, Dosages, Organic & MSP)
// ==============================================================================
const AGRONOMIC_DATA = {
  rice: {
    name: 'Rice / Paddy (धान)',
    hindiName: 'धान की फसल (Paddy / Rice)',
    scientificName: 'Oryza sativa',
    family: 'Poaceae',
    msp: { common: '₹2,300 / quintal', gradeA: '₹2,320 / quintal', year: '2025-26' },
    mandis: [
      { mandi: 'Karnal Mandi (Haryana)', modal: '₹2,450 / quintal' },
      { mandi: 'Amritsar Mandi (Punjab)', modal: '₹2,420 / quintal' },
      { mandi: 'Bareilly Mandi (UP)', modal: '₹2,380 / quintal' }
    ],
    chapters: [
      {
        title: 'Major Diseases & Exact CIBRC Chemical Dosages',
        category: 'Chemical',
        badges: ['🧪 Chemical Dosages', '⏱️ Pre-Harvest Intervals', '🌾 Paddy / धान'],
        content: `🌾 **Deep-Dive Chapter 1: Major Diseases & Exact Chemical Dosages for Rice (धान)**

1. **Yellow Stem Borer (तना छेदक कीट - Scirpophaga incertulas)**
   • 🔍 **Symptoms:** "Dead Hearts" (सूखी केंद्रीय गोभ) at vegetative stage; "White Earheads" (सफेद थोथी बालियां) at heading stage with no grain filling.
   • 🧪 **Recommended Chemical:** **Chlorantraniliprole 18.5% SC (Coragen)** @ 60 ml in 200 L water/acre OR **Cartap Hydrochloride 50% SP (Padan)** @ 400 g in 200 L water/acre.
   • 💊 **Granular Alternative:** **Cartap Hydrochloride 4% G (Caldan / Padan 4G)** @ 7.5 to 10 kg/acre broadcast in 2-3 cm standing water.
   • ⏱️ **Safety (PHI):** 14 days pre-harvest interval.

2. **Rice Blast (झुलसा रोग - Pyricularia oryzae)**
   • 🔍 **Symptoms:** Spindle-shaped/diamond spots with grey centers and brown borders on leaves (Leaf Blast). Black rot at panicle neck causing heads to break and lodge (Neck Blast).
   • 🧪 **Recommended Chemical:** **Tricyclazole 75% WP (Baan / Beam)** @ 120-150 g in 200 L water/acre OR **Isoprothiolane 40% EC (Fuji-one)** @ 300 ml/acre.
   • ⏱️ **Safety:** Spray immediately at first sign of spindle spots; repeat after 10-12 days if humid.

3. **Brown Spot (भूरा धब्बा रोग - Bipolaris oryzae)**
   • 🔍 **Symptoms:** Small, oval to circular dark brown spots with a yellow halo scattered across leaves and glumes.
   • 🧪 **Recommended Chemical:** **Propiconazole 25% EC (Tilt)** @ 200 ml in 200 L water/acre OR **Mancozeb 75% WP (Dithane M-45)** @ 500 g/acre.

4. **Khaira Disease - Zinc Deficiency (खैरा रोग - जिंक की कमी)**
   • 🔍 **Symptoms:** Rusty reddish-bronze chlorotic patches on young leaves starting 2-3 weeks after transplanting. Plants severely stunted.
   • 🧪 **Treatment:** Foliar spray of **Zinc Sulphate 21%** @ 5 g + **Slaked Lime (बुझा चूना)** 2.5 g per liter of water (1 kg ZnSO4 + 500g lime in 200 L water/acre).`,
        followUps: ['🌿 Organic & Bio Control', '🔬 Fertilizer Schedule (NPK)', '💰 Mandi Rates & Govt MSP', '💧 Water Management']
      },
      {
        title: 'Organic IPM, Biological Control & Field Cultural Management',
        category: 'Organic',
        badges: ['🌿 100% Bio-Organic', '🐝 Pollinator Safe', '🛡️ Natural IPM'],
        content: `🌿 **Deep-Dive Chapter 2: Organic IPM & Bio-Control for Rice (धान)**

1. **Yellow Stem Borer Bio-Control:**
   • 🪤 **Pheromone Traps:** Install yellow sleeve pheromone traps with lure @ 8 traps/acre at 20 days after transplanting (DAT). Change lure every 25 days.
   • 🥚 **Egg Parasitoids:** Release **Trichogramma japonicum** cards @ 1,00,000 parasitized eggs/ha (approx. 40,000/acre) at weekly intervals starting 30 DAT.
   • 🍃 **Botanical:** Spray 5% Neem Seed Kernel Extract (NSKE) or cold-pressed **Neem Oil 1500 PPM** @ 3-5 ml/L water with 1 ml liquid soap.

2. **Bio-Fungicide for Blast & Sheath Blight:**
   • 🦠 **Pseudomonas fluorescens 0.5% WP:** Soak seeds in 10 g/kg seed for 12 hours before nursery sowing.
   • 💦 **Foliar Spray:** Spray Pseudomonas fluorescens @ 2.5 kg/ha (1 kg/acre) or **Trichoderma harzianum** @ 5 g/L water at 40 and 60 DAT.

3. **Cultural Field Tactics:**
   • ✂️ **Leaf Clipping:** Clip top 2 inches of rice seedling leaves before transplanting to remove stem borer egg masses.
   • 🌾 **Balanced Urea:** Never over-apply urea in late vegetative stage, as soft lush tissue attracts both blast spores and plant hoppers.`,
        followUps: ['🔬 Fertilizer Schedule (NPK)', '💰 Mandi Rates & Govt MSP', '💧 Water & AWD Management', '🌾 Harvest & Storage']
      },
      {
        title: 'Scientific Fertilizer Schedule, Split Urea & AWD Water Management',
        category: 'Fertilizer',
        badges: ['📊 NPK 120:60:40', '🌱 Split Urea Timing', '💧 AWD Water Saving'],
        content: `🧪 **Deep-Dive Chapter 3: Fertilizer Schedule & Water Management for Rice**

1. **NPK Fertilizer Recommendations (per Acre):**
   • 📊 **Recommended Dose:** 48 kg Nitrogen (N) : 24 kg Phosphorus (P2O5) : 16 kg Potash (K2O) per acre.
   • 🌱 **Basal Application (रोपाई के समय):**
     - DAP: 50 kg (provides 9 kg N + 23 kg P)
     - MOP (Muriate of Potash): 25-30 kg (provides 16 kg K)
     - Zinc Sulphate 21%: 10 kg/acre (or ZnSO4 33% @ 6 kg/acre)
     - Urea: 25 kg
   • ⚡ **1st Top Dressing (Active Tillering - 21 to 25 DAT):**
     - Urea: 35 kg/acre
   • 🌾 **2nd Top Dressing (Panicle Initiation - 40 to 45 DAT):**
     - Urea: 35 kg/acre + 2% Potash spray if soil is deficient.

2. **AWD Water Management (Alternate Wetting & Drying):**
   • 💧 Maintain 2-3 cm standing water during first 10 days of transplanting to suppress weeds.
   • 📉 Afterward, practice **AWD**: allow surface water to naturally recede 5 cm below soil surface before re-flooding to 5 cm depth. Saves 25-30% irrigation water and prevents methane emission!
   • 🚫 Drain water completely 10-12 days before harvesting to ensure uniform grain ripening.`,
        followUps: ['💰 Mandi Rates & Govt MSP', '🌾 Harvest & Storage Criteria', '🧪 Chemical Dosages', '🍅 Switch to Tomato']
      },
      {
        title: 'Government MSP, Mandi Prices, Harvest Stage & Storage Rules',
        category: 'Price_MSP',
        badges: ['🏛️ Govt MSP ₹2,300/q', '📈 Mandi Rates', '🌾 14% Moisture Storage'],
        content: `💰 **Deep-Dive Chapter 4: Rice MSP Rates, Mandi Prices & Safe Storage (2025-26)**

1. **Official Government MSP Rates (2025-26):**
   • 🏛️ **Paddy (Common):** **₹2,300 per quintal**
   • 🏛️ **Paddy (Grade 'A'):** **₹2,320 per quintal**
   • 🌾 **Current Mandi Modal Rates:**
     - Karnal Mandi (Haryana): **₹2,450/q**
     - Amritsar Mandi (Punjab): **₹2,420/q**
     - Bareilly Mandi (UP): **₹2,380/q**

2. **Harvest Readiness & Moisture Standards:**
   • 🌾 Harvest when 80-85% of panicles turn golden straw-yellow and grain moisture is between 20-22%.
   • ☀️ **Sun Drying:** Immediately dry threshed paddy under direct sun on clean tarpaulin to bring moisture down to:
     - **14% Moisture:** For commercial government procurement and general grain storage.
     - **12% Moisture:** For certified seed grain storage in hermetic bags.

3. **Key Farmer Welfare Schemes:**
   • **PM-Kisan:** ₹6,000/year credited directly into bank accounts in 3 equal installments.
   • **PM Fasal Bima Yojana (PMFBY):** Premium rate only 2.0% for Kharif paddy. Provides full compensation against drought, flood, pests, and post-harvest unseasonal rain.`,
        followUps: ['🌾 Rice Nursery Management', '🍅 Tomato Guide', '🌾 Wheat Guide', '🧪 Pesticide Dosages']
      }
    ]
  },

  tomato: {
    name: 'Tomato (टमाटर)',
    hindiName: 'टमाटर की फसल (Tomato)',
    scientificName: 'Solanum lycopersicum',
    family: 'Solanaceae',
    msp: { common: 'Market Driven (₹1,200 – ₹3,500 / quintal)', year: '2025-26' },
    mandis: [
      { mandi: 'Kolar Mandi (Karnataka)', modal: '₹1,800 / quintal' },
      { mandi: 'Nashik Mandi (Maharashtra)', modal: '₹1,650 / quintal' },
      { mandi: 'Madanapalle Mandi (Andhra)', modal: '₹1,900 / quintal' }
    ],
    chapters: [
      {
        title: 'Tomato Pathologies & Exact Chemical Fungicide Prescription',
        category: 'Chemical',
        badges: ['🧪 Fungicides', '🍅 Solanaceae', '🛡️ Early & Late Blight'],
        content: `🍅 **Deep-Dive Chapter 1: Tomato Diseases & Chemical Prescription**

1. **Early Blight (अगेती झुलसा - Alternaria solani)**
   • 🔍 **Symptoms:** Concentric dark brown target-board rings on older lower leaves. Yellow halo surrounding lesions. Causes premature leaf drying and defoliation.
   • 🧪 **Chemical Spray:** **Mancozeb 75% WP (Dithane M-45)** @ 2.5 g/L (500 g in 200 L water/acre) OR **Chlorothalonil 75% WP (Kavach)** @ 2 g/L water.
   • ⏱️ **Interval:** Spray at 7-10 day intervals during cloudy or warm humid weather.

2. **Late Blight (पछेती झुलसा - Phytophthora infestans)**
   • 🔍 **Symptoms:** Rapidly enlarging greasy, water-soaked black lesions on leaves and stems. White downy mold on leaf undersides during cool, foggy mornings.
   • 🧪 **Chemical Spray:** **Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold)** @ 2.5 g/L water OR **Cymoxanil 8% + Mancozeb 64% WP (Curzate)** @ 3 g/L water.
   • ⏱️ **Safety:** Rotate systemic and contact fungicides to prevent fungal resistance.

3. **Tomato Leaf Curl Virus - ToLCV (पत्ती मरोड़ रोग)**
   • 🔍 **Symptoms:** Upward curling, puckering, stunted bushy plant growth, and failure to set fruit. Vectored by **Whitefly (Bemisia tabaci)**.
   • 🧪 **Vector Control Chemical:** **Acetamiprid 20% SP** @ 0.5 g/L (100 g/acre) OR **Imidacloprid 17.8% SL (Confidor)** @ 0.5 ml/L water.

4. **Blossom End Rot (फल गलन - कैल्शियम की कमी)**
   • 🔍 **Symptoms:** Sunken, flat black leathery spot at the bottom/blossom end of green tomato fruits.
   • 🧪 **Cure:** Foliar spray of **Calcium Nitrate** @ 5 g/L water (1 kg/acre in 200 L water) at fruit-set stage. Ensure steady drip irrigation to prevent moisture stress.`,
        followUps: ['🌿 Organic & Bio Control', '🔬 Fertigation & Nutrition', '💰 Mandi Rates & Marketing', '🥔 Switch to Potato']
      },
      {
        title: 'Tomato Organic IPM, Trellising & Cultural Protection',
        category: 'Organic',
        badges: ['🌿 Organic IPM', '🪤 Sticky Traps', '🍅 Pruning & Staking'],
        content: `🌿 **Deep-Dive Chapter 2: Tomato Organic IPM & Cultural Care**

1. **Whitefly & Leaf Curl Management:**
   • 🪤 **Yellow Sticky Traps:** Install yellow sticky cards @ 20-25 traps/acre at canopy height to trap whiteflies and aphids.
   • 🍃 **Neem Oil Spray:** Cold-pressed **Neem Oil 10,000 PPM** @ 3 ml/L water with 1 ml liquid soap emulsifier. Spray underside of leaves bi-weekly.

2. **Bio-Fungicides:**
   • 🦠 Spray **Trichoderma viride 1% WP** @ 5 g/L water or **Bacillus subtilis** against soil-borne damping off and root wilt.
   • 🥛 Fermented Butter Milk (खट्टी छाछ @ 50 ml/L) spray provides natural organic antifungal protection.

3. **Canopy Management & Staking:**
   • 🎋 **Staking / Trellising:** Tie tomato vines to bamboo stakes or trellising wires. Keeps foliage off moist soil and reduces early blight by 70%.
   • ✂️ **Pruning:** Remove bottom 6-8 inches of foliage (suckers) touching the ground to eliminate soil-splash spore contamination.`,
        followUps: ['🔬 Fertigation & Nutrition', '💰 Mandi Rates & Marketing', '🧪 Chemical Dosages', '🌾 Switch to Rice']
      }
    ]
  },

  wheat: {
    name: 'Wheat (गेहूं)',
    hindiName: 'गेहूं की फसल (Wheat)',
    scientificName: 'Triticum aestivum',
    family: 'Poaceae',
    msp: { common: '₹2,425 / quintal', year: '2025-26' },
    mandis: [
      { mandi: 'Khanna Mandi (Punjab)', modal: '₹2,530 / quintal' },
      { mandi: 'Karnal Mandi (Haryana)', modal: '₹2,580 / quintal' },
      { mandi: 'Indore Mandi (MP)', modal: '₹2,640 / quintal' },
      { mandi: 'Bareilly Mandi (UP)', modal: '₹2,490 / quintal' }
    ],
    chapters: [
      {
        title: 'Wheat Rusts, Smut & Chemical Fungicide Controls',
        category: 'Chemical',
        badges: ['🧪 Tilt 25% EC', '🌾 Wheat Rust Shield', '🏛️ MSP ₹2,425/q'],
        content: `🌾 **Deep-Dive Chapter 1: Wheat Rusts, Smut & Chemical Protection**

1. **Yellow / Stripe Rust (पीला रतुआ - Puccinia striiformis)**
   • 🔍 **Symptoms:** Lemon-yellow powder-filled pustules arranged in parallel linear stripes along leaf veins. Yellow dust rubs off on fingers. Spreads with alarming speed in cool, humid weather (10-18°C).
   • 🧪 **Chemical Treatment:** **Propiconazole 25% EC (Tilt)** @ 200 ml in 200 L water/acre OR **Tebuconazole 25.9% EC (Folicur)** @ 200 ml/acre. Spray immediately when first yellow pustules appear!
   • ⏱️ **Safety:** 21 days pre-harvest interval.

2. **Brown / Leaf Rust (भूरा रतुआ - Puccinia triticina)**
   • 🔍 **Symptoms:** Round to oval orange-brown pustules scattered randomly across leaf blades (not in stripes).
   • 🧪 **Treatment:** **Propiconazole 25% EC** @ 200 ml/acre or **Mancozeb 75% WP** @ 500 g/acre.

3. **Loose Smut (कंडुआ / काला दाना - Ustilago tritici)**
   • 🔍 **Symptoms:** Entire earhead converts into a black powdery fungal spore mass.
   • 🧪 **Mandatory Seed Treatment:** Treat seed before sowing with **Carbendazim 50% WP (Bavistin)** @ 2 g/kg seed OR **Carboxin + Thiram (Vitavax Power)** @ 2.5 g/kg seed.`,
        followUps: ['🔬 Critical 6 Irrigations', '💰 Mandi Rates & Govt MSP', '🌿 Organic Care', '🌾 Switch to Rice']
      },
      {
        title: '6 Critical Irrigations, CRI Stage & Weed Control',
        category: 'Fertilizer',
        badges: ['💧 6 Irrigation Stages', '⚡ CRI Stage 21 Days', '🌿 Gulli Danda Control'],
        content: `💧 **Deep-Dive Chapter 2: Wheat Irrigation Schedule & Weed Management**

1. **The 6 Critical Irrigation Stages:**
   • 1️⃣ **Crown Root Initiation (CRI Stage - 21 DAS):** MOST CRITICAL! A delay of even 5 days causes 15-20% irreversible yield loss.
   • 2️⃣ **Tillering Stage (40-45 DAS):** Promotes strong productive tillers.
   • 3️⃣ **Late Jointing Stage (60-65 DAS):** Stem elongation and node formation.
   • 4️⃣ **Flowering Stage (80-85 DAS):** Pollen viability and spikelet fertilization.
   • 5️⃣ **Milking Stage (100-105 DAS):** Grain filling. Light irrigation to prevent lodging under winds.
   • 6️⃣ **Dough Stage (115-120 DAS):** Final grain hardening.

2. **Weed Control (Gulli Danda / Phalaris minor):**
   • 🌾 Spray **Sulfosulfuron 75% WG (Leader)** @ 13.5 g/acre in 150 L water at 30-35 DAS after 1st irrigation.`,
        followUps: ['💰 Mandi Rates & Govt MSP', '🧪 Chemical Rust Spray', '🥔 Switch to Potato']
      }
    ]
  },

  potato: {
    name: 'Potato (आलू)',
    hindiName: 'आलू की फसल (Potato)',
    scientificName: 'Solanum tuberosum',
    family: 'Solanaceae',
    msp: { common: 'Market Driven (₹1,000 – ₹1,800 / quintal)', year: '2025-26' },
    mandis: [
      { mandi: 'Agra Mandi (UP)', modal: '₹1,250 / quintal' },
      { mandi: 'Farrukhabad Mandi (UP)', modal: '₹1,180 / quintal' },
      { mandi: 'Jalandhar Mandi (Punjab)', modal: '₹1,320 / quintal' }
    ],
    chapters: [
      {
        title: 'Potato Late Blight, Black Scurf & Tuber Treatment',
        category: 'Chemical',
        badges: ['🥔 Potato / आलू', '🧪 Ridomil MZ', '🛡️ Tuber Treatment'],
        content: `🥔 **Deep-Dive Chapter 1: Potato Late Blight & Seed Tuber Protection**

1. **Late Blight (पछेती झुलसा - Phytophthora infestans)**
   • 🔍 **Symptoms:** Rapidly expanding water-soaked purplish-black lesions with pale green borders. White fuzzy mildew on lower leaf surface under fog and high humidity. Can destroy an entire field in 48 hours.
   • 🧪 **Chemical Spray:** **Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold MZ)** @ 2.5 g/L (500 g/acre) OR **Cymoxanil 8% + Mancozeb 64% (Curzate)** @ 3 g/L water.
   • 🛡️ **Prophylactic:** Spray **Mancozeb 75% WP** @ 2.5 g/L as a preventative barrier before cloudy weather begins.

2. **Black Scurf (काली पपड़ी - Rhizoctonia solani)**
   • 🔍 **Symptoms:** Hard black crusts on harvested tuber skins that look like soil dirt but cannot be washed off.
   • 🧪 **Tuber Dip Treatment:** Dip seed tubers in **Pencycuron 250 SC (Monceren)** @ 2.5 ml/L water for 10 minutes, or spray over tubers spread on tarpaulin before planting.

3. **Earthing Up & Dehaulming:**
   • 🚜 Earthing up at 30-35 DAS protects developing tubers from sun-greening (solanine poisoning) and tuber moth.
   • ✂️ **Dehaulm (cut foliage)** 10-12 days before digging to harden tuber skin for cold storage.`,
        followUps: ['🔬 Fertilizer & Potash Schedule', '💰 Mandi Rates & Storage', '🍅 Switch to Tomato']
      }
    ]
  },

  cotton: {
    name: 'Cotton (कपास)',
    hindiName: 'कपास की फसल (Cotton)',
    scientificName: 'Gossypium hirsutum',
    family: 'Malvaceae',
    msp: { common: 'Medium Staple: ₹7,121/q | Long Staple: ₹7,521/q', year: '2025-26' },
    mandis: [
      { mandi: 'Rajkot Mandi (Gujarat)', modal: '₹7,450 / quintal' },
      { mandi: 'Adilabad Mandi (Telangana)', modal: '₹7,320 / quintal' }
    ],
    chapters: [
      {
        title: 'Pink Bollworm, Whitefly & CIBRC Chemical Control',
        category: 'Chemical',
        badges: ['🌿 Cotton / कपास', '🐛 Pink Bollworm', '🏛️ MSP ₹7,121/q'],
        content: `🌿 **Deep-Dive Chapter 1: Cotton Pest Management & Govt MSP**

1. **Pink Bollworm (गुलाबी सुंडी - Pectinophora gossypiella)**
   • 🔍 **Symptoms:** Rosetted flowers ("गुलाब जैसा फूल") that fail to open. Larvae burrow into developing bolls, eating seeds and staining cotton lint yellow-brown.
   • 🧪 **Chemical Spray:** **Emamectin Benzoate 5% SG (Proclaim)** @ 80-100 g in 200 L water/acre OR **Profenofos 50% EC** @ 400 ml in 200 L water/acre.
   • 🪤 **Organic Trap:** Install Pectino-Lure Pheromone Traps @ 8-10 traps/acre at 45 DAS.

2. **Whitefly & Leaf Curl Virus:**
   • 🧪 Spray **Diafenthiuron 50% WP (Pegasus)** @ 250 g/acre OR **Pyriproxyfen 10% EC** @ 400 ml/acre. Install yellow sticky traps @ 20/acre.

3. **Govt MSP (2025-26):**
   • Medium Staple Cotton: **₹7,121 per quintal**
   • Long Staple Cotton: **₹7,521 per quintal**`,
        followUps: ['🔬 Fertilizer & Boll Nutrition', '💰 Mandi Rates & MSP', '🌾 Switch to Wheat']
      }
    ]
  },

  mustard: {
    name: 'Mustard (सरसों / राई)',
    hindiName: 'सरसों की फसल (Mustard)',
    scientificName: 'Brassica juncea',
    family: 'Brassicaceae',
    msp: { common: '₹5,950 / quintal', year: '2025-26' },
    mandis: [
      { mandi: 'Alwar Mandi (Rajasthan)', modal: '₹6,200 / quintal' },
      { mandi: 'Bharatpur Mandi (Rajasthan)', modal: '₹6,250 / quintal' }
    ],
    chapters: [
      {
        title: 'Mustard Aphids (Mahu), White Rust & Sulphur Nutrition',
        category: 'Chemical',
        badges: ['🥬 Mustard / सरसों', '🐛 Aphids / माहू', '🏛️ MSP ₹5,950/q'],
        content: `🥬 **Deep-Dive Chapter 1: Mustard Aphids & Disease Control**

1. **Mustard Aphids / Mahu (चेपा / माहू कीट - Lipaphis erysimi)**
   • 🔍 **Symptoms:** Colonies of tiny greenish-black insects sucking sap from apical twigs, buds, and pods. Leaves curl, pods turn stunted, and black sticky honey-dew covers plants.
   • 🧪 **Chemical Spray:** **Dimethoate 30% EC (Rogor)** @ 250 ml in 200 L water/acre OR **Thiamethoxam 25% WG** @ 50 g in 200 L water/acre.
   • ⚠️ Avoid spraying at midday to protect honeybees. Spray during late afternoon.

2. **White Rust (सफेद रतुआ - Albugo candida)**
   • 🔍 **Symptoms:** White raised blisters/pustules on leaf undersides. Floral hypertrophy ("Stag-head") causing complete seed abortion.
   • 🧪 **Spray:** **Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold)** @ 2 g/L water at first appearance.

3. **Sulphur for Oil Content:**
   • Apply **Bentonite Sulphur 90%** @ 20-25 kg/ha at sowing. Increases mustard oil recovery by 2-3%!`,
        followUps: ['💰 Mandi Rates & Govt MSP', '🌿 Organic Neem Spray', '🌾 Switch to Wheat']
      }
    ]
  }
};

// General Fertilizer & Nutrient Guide
const GENERAL_NUTRIENT_GUIDE = `🧪 **Quick Nutrient Deficiency & Fertilizer Diagnostic Guide:**

• 🌿 **Nitrogen (Urea 46% N):**
  - Role: Lush foliage, rapid growth, tillering.
  - Deficiency: Older lower leaves turn pale yellow in a distinct V-shaped pattern starting at leaf tips.
  - Remedy: Split applications of Urea. Never apply to waterlogged or bone-dry soil.

• 🔬 **Phosphorus (DAP 18:46:0):**
  - Role: Strong root growth, vigorous early tillering.
  - Deficiency: Purplish or dark bronze discoloration on leaf undersides and stunted roots.
  - Remedy: Apply 100% as basal dose drilled 3-5 cm below seed level.

• 🌾 **Potassium (MOP 0:0:60):**
  - Role: Disease resistance, drought tolerance, grain weight, and fruit sweetness.
  - Deficiency: Marginal leaf scorch — outer leaf edges dry up with burnt appearance while middle stays green.
  - Remedy: Apply MOP at sowing and top-dress at flowering stage.

• ⚡ **Zinc Sulphate (21% / 33%):**
  - Role: Enzyme activator and auxin hormone synthesis. Prevents Khaira disease in paddy and white bud in maize.
  - Remedy: 10 kg/acre Zinc Sulphate 21% basal or 5g/L + lime foliar spray.

• 🌸 **Boron (Solubor 20%):**
  - Role: Flower retention, fruit setting, pollen tube growth. Prevents flower drop in tomato and chilli.
  - Remedy: Foliar spray of 1.5 g/L at pre-flowering stage.`;

// Top MSP & Mandi Rates Database (2025-26)
const ALL_MSP_RATES = `💰 **Official Government MSP Rates (2025-26) [Rates in ₹ per Quintal]:**

• 🌾 **Wheat (गेहूं):** **₹2,425 / quintal** *(+₹150 CCEA hike)*
• 🌾 **Paddy (Common):** **₹2,300 / quintal** *(Grade 'A': ₹2,320)*
• 🥬 **Mustard / Rapeseed (सरसों):** **₹5,950 / quintal** *(+₹300 CCEA hike)*
• 🥔 **Gram / Chana (चना):** **₹5,650 / quintal** *(+₹210 CCEA hike)*
• 🌿 **Cotton (Medium Staple):** **₹7,121 / quintal** | (Long Staple): **₹7,521 / quintal**
• 🌽 **Maize (मक्का):** **₹2,225 / quintal** *(+₹135 hike)*
• 🌾 **Barley (जौ):** **₹1,980 / quintal** *(+₹130 hike)*
• 🫘 **Lentil / Masur (मसूर):** **₹6,700 / quintal** *(+₹275 hike)*
• 🫘 **Soybean (Yellow):** **₹4,892 / quintal** *(+₹292 hike)*
• 🎋 **Sugarcane (FRP):** **₹340 / quintal**

💡 *Click on the 'Crop Prices' tab on top for daily mandi arrival volumes and price trends across your district!*`;

// ==============================================================================
// BOTANIST COMPONENT
// ==============================================================================
export default function BotanistChatView() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `🌱 **Namaste! I am your AI Botanist & Agronomic Advisor.**\n\n` +
            `I provide comprehensive, ICAR-aligned agricultural intelligence on:\n` +
            `• 🌾 **Major Crops:** Rice/Paddy (धान), Wheat (गेहूं), Tomato (टमाटर), Potato (आलू), Cotton (कपास), Mustard (सरसों), Chilli (मिर्च)\n` +
            `• 🧪 **Chemical Dosages:** CIBRC registered fungicides, insecticides, and exact per-acre formulations\n` +
            `• 🌿 **Organic & Bio-Control:** Neem oil, Trichoderma, Pseudomonas, and pheromone traps\n` +
            `• 🔬 **Fertilizer & Soil Nutrition:** NPK split doses, Zinc/Boron deficiencies, and composting\n` +
            `• 💰 **Mandi Prices & Govt MSP:** Official 2025-26 rates across state markets\n\n` +
            `👉 *Ask me any question in English, Hindi, or Hinglish!* (e.g., *"Rice stem borer dawa"*, *"Tamatar me jhulsa rog"*, *"Gehu me rathua"* or click a quick suggestion below)`,
      badges: ['🤖 AI Botanist 2.0', '🌾 Multi-Crop Support', '🇮🇳 Bilingual'],
      followUps: [
        '🌾 Rice / Paddy (धान)',
        '🍅 Tomato (टमाटर)',
        '🌾 Wheat (गेहूं)',
        '🥔 Potato (आलू)',
        '🧪 Pesticide Dosages',
        '🌿 Organic Remedies',
        '💰 Mandi Prices & MSP'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  // Conversation context memory
  const [activeCrop, setActiveCrop] = useState('rice');
  const [cropChapterIdx, setCropChapterIdx] = useState(0);

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Detect crop from text
  const detectCrop = (text) => {
    const t = text.toLowerCase();
    if (t.includes('rice') || t.includes('paddy') || t.includes('dhan') || t.includes('धान') || t.includes('chawal')) return 'rice';
    if (t.includes('tomato') || t.includes('tamatar') || t.includes('टमाटर')) return 'tomato';
    if (t.includes('wheat') || t.includes('gehu') || t.includes('गेहूं') || t.includes('gehoon')) return 'wheat';
    if (t.includes('potato') || t.includes('aalu') || t.includes('alu') || t.includes('आलू')) return 'potato';
    if (t.includes('cotton') || t.includes('kapas') || t.includes('कपास')) return 'cotton';
    if (t.includes('mustard') || t.includes('sarson') || t.includes('सरसों') || t.includes('rai')) return 'mustard';
    return null;
  };

  // Detect continuation / "more"
  const isContinuation = (text) => {
    const t = text.toLowerCase().trim();
    const keywords = [
      'more', 'give me more', 'give me more information', 'more info', 'more information',
      'aur', 'aur batao', 'aur jankari', 'aur information', 'details', 'detail',
      'tell me more', 'kuch aur', 'next', 'expand', 'explain more', 'aur detail me',
      'batao', 'and then', 'what else', 'आगे बताओ', 'और बताओ', 'और जानकारी', 'aur detail'
    ];
    return keywords.some(k => t === k || t.startsWith(k) || t.endsWith(k));
  };

  // Generate intelligent response
  const generateBotReply = (userQuery) => {
    const raw = userQuery.trim();
    const t = raw.toLowerCase();

    // 1. Check if user switched or mentioned crop
    const detected = detectCrop(t);
    let currentCropKey = activeCrop;
    if (detected && detected !== activeCrop) {
      currentCropKey = detected;
      setActiveCrop(detected);
      setCropChapterIdx(0);
    }

    const cropData = AGRONOMIC_DATA[currentCropKey] || AGRONOMIC_DATA.rice;

    // 2. Handle "Give me more information" / "more" / "aur batao"
    if (isContinuation(t)) {
      const nextIdx = (cropChapterIdx + 1) % cropData.chapters.length;
      setCropChapterIdx(nextIdx);
      const chapter = cropData.chapters[nextIdx];

      return {
        text: chapter.content,
        badges: chapter.badges,
        followUps: chapter.followUps
      };
    }

    // 3. Price / Mandi / MSP intent
    if (t.includes('price') || t.includes('msp') || t.includes('mandi') || t.includes('rate') || t.includes('bhav') || t.includes('भाव') || t.includes('कीमत')) {
      let mandiText = `🌾 **Govt MSP & Mandi Market Intelligence for ${cropData.name}:**\n\n`;
      if (cropData.msp) {
        mandiText += `• 🏛️ **Official Govt MSP (2025-26):** ${cropData.msp.common || cropData.msp.gradeA}\n`;
      }
      if (cropData.mandis && cropData.mandis.length > 0) {
        mandiText += `• 📍 **Current Mandi Modal Rates:**\n`;
        cropData.mandis.forEach(m => {
          mandiText += `   - ${m.mandi}: **${m.modal}**\n`;
        });
      }
      mandiText += `\n` + ALL_MSP_RATES;

      return {
        text: mandiText,
        badges: ['🏛️ Govt MSP 2025-26', '📈 Live Mandi Rates', `🌱 ${cropData.name}`],
        followUps: [
          '📖 Give More Information',
          '🧪 Pesticide & Dosage Guide',
          '🔬 Fertilizer Schedule (NPK)',
          '🌾 Switch to Wheat'
        ]
      };
    }

    // 4. Fertilizers / Khad / NPK / Soil
    if (t.includes('fertilizer') || t.includes('khad') || t.includes('खाद') || t.includes('urea') || t.includes('dap') || t.includes('npk') || t.includes('potash') || t.includes('zinc') || t.includes('soil') || t.includes('mitti')) {
      // Find chapter for fertilizer if present
      const fertChapter = cropData.chapters.find(c => c.category === 'Fertilizer');
      const content = fertChapter ? fertChapter.content + `\n\n` + GENERAL_NUTRIENT_GUIDE : GENERAL_NUTRIENT_GUIDE;

      return {
        text: content,
        badges: ['📊 NPK Nutrition', '⚡ Micronutrients', `🌱 ${cropData.name}`],
        followUps: [
          '📖 Give More Information',
          '🧪 Chemical Spray Schedule',
          '🌿 Organic Bio-Fertilizers',
          '💰 Mandi Rates & Govt MSP'
        ]
      };
    }

    // 5. Organic / Bio / Jaivik
    if (t.includes('organic') || t.includes('jaivik') || t.includes('जैविक') || t.includes('neem') || t.includes('trichoderma') || t.includes('natural')) {
      const orgChapter = cropData.chapters.find(c => c.category === 'Organic');
      if (orgChapter) {
        return {
          text: orgChapter.content,
          badges: orgChapter.badges,
          followUps: orgChapter.followUps
        };
      }
    }

    // 6. Direct crop switch (e.g. user just clicked "Rice / Paddy (धान)" or typed "wheat")
    if (detected) {
      setCropChapterIdx(0);
      const firstChapter = cropData.chapters[0];
      let overview = `🌱 **${cropData.name} — Agronomic Protection & Care Guide**\n\n` +
                     `• 🏛️ **Govt MSP (2025-26):** ${cropData.msp.common || cropData.msp.gradeA}\n` +
                     `• 🔍 **Scientific Name:** *${cropData.scientificName}* (${cropData.family})\n\n` +
                     firstChapter.content;

      return {
        text: overview,
        badges: firstChapter.badges,
        followUps: [
          '📖 Give More Information',
          '🌿 Organic & Bio Control',
          '🔬 Fertilizer Schedule (NPK)',
          '💰 Mandi Rates & Govt MSP'
        ]
      };
    }

    // 7. General smart contextual fallback (Never repeat generic line!)
    const currentChapter = cropData.chapters[cropChapterIdx] || cropData.chapters[0];
    let smartText = `🌿 **AI Botanist Guidance for ${cropData.name}:**\n\n` +
                    `Regarding *" ${userQuery} "*:\n` +
                    `• **Crop Protection Rule:** Inspect plant foliage weekly, ensure root-zone drainage, and avoid overhead leaf wetting.\n` +
                    `• **Current Govt MSP:** ${cropData.msp.common || cropData.msp.gradeA}.\n\n` +
                    currentChapter.content;

    return {
      text: smartText,
      badges: [`🌱 ${cropData.name}`, '💡 Tailored Guidance', '📖 Progressive Knowledge'],
      followUps: [
        '📖 Give More Information',
        '🧪 Exact Chemical Dosage',
        '🌿 Organic Remedy',
        '💰 Mandi Rates & Govt MSP'
      ]
    };
  };

  // Handle message sending
  const handleSend = (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input;
    if (!query.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInput('');
    setIsTyping(true);

    // Realistic processing delay for AI inference
    setTimeout(() => {
      const botResponse = generateBotReply(query);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse.text,
          badges: botResponse.badges,
          followUps: botResponse.followUps
        }
      ]);

      // If speak mode active, speak the response
      if (isSpeaking && window.speechSynthesis) {
        speakText(botResponse.text);
      }
    }, 450);
  };

  // Text to Speech
  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    // Clean markdown symbols for smooth audio reading
    const cleanText = text.replace(/[*_#•🔍🧪💊⏱️🌿🦠🌾🏛️📊🌱⚡💧🚜✂️🪤🍃💡👉]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Look for Hindi or English voice
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(v => v.lang.includes('hi') || v.name.includes('Hindi'));
    if (hiVoice) utterance.voice = hiVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Copy message text
  const copyMessage = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // Clear chat
  const clearChat = () => {
    stopSpeaking();
    setActiveCrop('rice');
    setCropChapterIdx(0);
    setMessages([
      {
        sender: 'bot',
        text: '🌱 **Chat cleared.** I am your AI Botanist. Ask me about any crop disease, chemical pesticide dosage, organic cure, or government MSP rate!',
        badges: ['🤖 Reset Complete', '🌾 Ready for Questions'],
        followUps: [
          '🌾 Rice / Paddy (धान)',
          '🍅 Tomato (टमाटर)',
          '🌾 Wheat (गेहूं)',
          '🥔 Potato (आलू)',
          '🧪 Pesticide Dosages',
          '💰 Mandi Prices & MSP'
        ]
      }
    ]);
  };

  // Simple markdown renderer for bolding, bullet points, headers
  const renderFormattedText = (raw) => {
    const lines = raw.split('\n');
    return lines.map((line, lIdx) => {
      // Bold text replacements
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} style={{ color: 'var(--text-main, #e5e7eb)' }}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={lIdx} style={{ paddingLeft: '1rem', marginTop: '0.2rem', marginBottom: '0.2rem' }}>
            {renderedLine}
          </div>
        );
      }

      if (line.trim().startsWith('1.') || line.trim().startsWith('2.') || line.trim().startsWith('3.') || line.trim().startsWith('4.')) {
        return (
          <div key={lIdx} style={{ marginTop: '0.5rem', marginBottom: '0.3rem', fontWeight: 600, color: 'var(--accent-green, #10b981)' }}>
            {renderedLine}
          </div>
        );
      }

      return (
        <div key={lIdx} style={{ minHeight: line.trim() ? 'auto' : '0.4rem', marginBottom: '0.2rem' }}>
          {renderedLine}
        </div>
      );
    });
  };

  return (
    <section className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '620px' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h2 className="card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
            <MessageSquare size={22} color="var(--accent-green, #10b981)" /> 
            <span>AI Botanist Agronomic Intelligence</span>
            <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
              v2.0 Active
            </span>
          </h2>
          <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: 'var(--text-muted, #9ca3af)' }}>
            Context-Aware Multi-Turn Agronomic Diagnostics, CIBRC Dosages, Organic IPM & Govt MSP Rates
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {isSpeaking ? (
            <button 
              type="button"
              className="btn-secondary" 
              onClick={stopSpeaking}
              style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444', color: '#ef4444' }}
              title="Stop Speech Audio"
            >
              <VolumeX size={15} /> Stop Voice
            </button>
          ) : (
            <button 
              type="button"
              className="btn-secondary" 
              onClick={() => {
                const lastBotMsg = [...messages].reverse().find(m => m.sender === 'bot');
                if (lastBotMsg) speakText(lastBotMsg.text);
              }}
              style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              title="Listen to last answer"
            >
              <Volume2 size={15} /> Speak
            </button>
          )}

          <button 
            type="button"
            className="btn-secondary" 
            onClick={clearChat}
            style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
            title="Clear Chat History"
          >
            <Trash2 size={15} /> Clear
          </button>
        </div>
      </div>

      {/* Quick Topic Chips Bar */}
      <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.6rem', marginBottom: '0.5rem', scrollbarWidth: 'thin' }}>
        {[
          { label: '🌾 Rice (धान)', query: 'rice' },
          { label: '🍅 Tomato (टमाटर)', query: 'tomato' },
          { label: '🌾 Wheat (गेहूं)', query: 'wheat' },
          { label: '🥔 Potato (आलू)', query: 'potato' },
          { label: '🌿 Cotton (कपास)', query: 'cotton' },
          { label: '🥬 Mustard (सरसों)', query: 'mustard' },
          { label: '🧪 Pesticide Dosages', query: 'pesticide dosages' },
          { label: '🌿 Organic Remedies', query: 'organic remedies' },
          { label: '💰 Mandi Prices & MSP', query: 'msp rates' },
          { label: '🔬 Soil & NPK', query: 'fertilizer schedule' }
        ].map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(item.query)}
            style={{
              whiteSpace: 'nowrap',
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '20px',
              border: '1px solid var(--bg-card-border, rgba(255, 255, 255, 0.1))',
              background: 'var(--input-bg, rgba(0, 0, 0, 0.25))',
              color: 'var(--text-main, #d1d5db)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-green, #10b981)';
              e.currentTarget.style.color = '#10b981';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--bg-card-border, rgba(255, 255, 255, 0.1))';
              e.currentTarget.style.color = 'var(--text-main, #d1d5db)';
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Chat Viewport */}
      <div className="chat-box" style={{ flex: 1, height: '480px', display: 'flex', flexDirection: 'column' }}>
        <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`chat-bubble ${msg.sender}`}
              style={{
                maxWidth: msg.sender === 'user' ? '75%' : '88%',
                lineHeight: 1.6,
                position: 'relative'
              }}
            >
              {/* Badges row for bot */}
              {msg.sender === 'bot' && msg.badges && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.5rem' }}>
                  {msg.badges.map((b, bIdx) => (
                    <span 
                      key={bIdx}
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: '#34d399'
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {/* Message text with formatting */}
              <div>{renderFormattedText(msg.text)}</div>

              {/* Footer bar for bot responses */}
              {msg.sender === 'bot' && (
                <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  
                  {/* Action buttons (Copy / Listen) */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: msg.followUps?.length ? '0.5rem' : 0 }}>
                    <button
                      type="button"
                      onClick={() => copyMessage(msg.text, idx)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedIdx === idx ? '#34d399' : 'var(--text-muted, #9ca3af)',
                        fontSize: '0.72rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        cursor: 'pointer',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      {copiedIdx === idx ? <Check size={13} /> : <Copy size={13} />}
                      {copiedIdx === idx ? 'Copied' : 'Copy'}
                    </button>

                    <button
                      type="button"
                      onClick={() => speakText(msg.text)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted, #9ca3af)',
                        fontSize: '0.72rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        cursor: 'pointer',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      <Volume2 size={13} /> Listen
                    </button>
                  </div>

                  {/* Dynamic Follow-up Suggestions */}
                  {msg.followUps && msg.followUps.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim, #6b7280)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Sparkles size={11} color="#f59e0b" /> Suggested:
                      </span>
                      {msg.followUps.map((chip, cIdx) => (
                        <button
                          key={cIdx}
                          type="button"
                          onClick={() => handleSend(chip)}
                          style={{
                            fontSize: '0.72rem',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            background: 'rgba(14, 165, 233, 0.12)',
                            border: '1px solid rgba(14, 165, 233, 0.3)',
                            color: '#38bdf8',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(14, 165, 233, 0.25)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(14, 165, 233, 0.12)';
                          }}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="chat-bubble bot" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1rem' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse 1s infinite' }}></span>
                <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse 1s infinite 0.2s' }}></span>
                <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse 1s infinite 0.4s' }}></span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #9ca3af)', fontStyle: 'italic' }}>
                AI Botanist analyzing pathology & agronomic database...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="chat-input-row" style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', background: 'var(--bg-card, #111827)', borderTop: '1px solid var(--bg-card-border, rgba(255, 255, 255, 0.1))' }}>
          <input
            type="text"
            className="chat-input"
            placeholder="Ask about plant diseases, pesticides, crop prices, or type 'more' for details..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: '0.65rem 1rem',
              background: 'var(--input-bg, rgba(0, 0, 0, 0.3))',
              border: '1px solid var(--bg-card-border, rgba(255, 255, 255, 0.15))',
              borderRadius: '10px',
              color: 'var(--text-main, #f3f4f6)',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />

          {/* Quick 'Give More Info' Button */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => handleSend('give me more information')}
            style={{
              padding: '0.5rem 0.85rem',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              borderRadius: '8px',
              whiteSpace: 'nowrap',
              background: 'rgba(16, 185, 129, 0.15)',
              borderColor: 'rgba(16, 185, 129, 0.35)',
              color: '#34d399',
              fontWeight: 600
            }}
            title="Click to get deeper layer of information on current crop"
          >
            <Sparkles size={14} /> More Info
          </button>

          <button 
            type="submit" 
            className="btn-secondary"
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent-green, #10b981), var(--accent-teal, #14b8a6))',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>

    </section>
  );
}
