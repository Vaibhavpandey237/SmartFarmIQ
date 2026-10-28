// Recommended Products & Remedies Database for Multi-Crop Pathologies (CIBRC Approved)
export const RECOMMENDED_PRODUCTS_DATABASE = [
  {
    id: 'amistar-top-fungicide',
    name: 'Amistar Top (Azoxystrobin 18.2% + Difenoconazole 11.4% SC)',
    brand: 'Syngenta India Ltd.',
    category: 'Systemic Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Mango Anthracnose, Corn Blight, Onion Purple Blotch, Chilli Dieback & Anthracnose, Tomato Blight',
    packSize: '200 ml',
    dosage: '1 ml per liter of water (200 ml in 200 L water per acre). Spray at first sight of spots.',
    safetyPrecautions: '⚠️ Wear protective goggles and gloves. Maintain 14-day Pre-Harvest Interval (PHI).',
    priceINR: 890,
    lastUpdatedDate: '24-Aug-2026',
    buyNowLink: 'https://www.bighaat.com',
    image: '🥭',
    diseaseKey: 'anthracnose',
    crops: ['mango', 'corn', 'onion', 'pepper', 'tomato', 'potato', 'grape'],
    alternatives: [
      { name: 'Saaf 75% WP', brand: 'UPL', priceINR: 320, note: 'Carbendazim + Mancozeb Combo' },
      { name: 'Nativo 75% WG', brand: 'Bayer', priceINR: 960, note: 'Tebuconazole + Trifloxystrobin Premium' }
    ]
  },
  {
    id: 'saaf-carbendazim-mancozeb',
    name: 'Saaf (Carbendazim 12% + Mancozeb 63% WP)',
    brand: 'UPL Limited',
    category: 'Broad-Spectrum Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Mango Anthracnose, Potato & Tomato Early Blight, Groundnut Tikka, Houseplant Spot',
    packSize: '500 grams',
    dosage: '2 g per liter of water (400-500 g per acre). Dual contact & systemic fungal control.',
    safetyPrecautions: '⚠️ Avoid skin and eye contact. Store in cool dry ventilated pesticide store.',
    priceINR: 340,
    lastUpdatedDate: '22-Aug-2026',
    buyNowLink: 'https://www.agribegri.com',
    image: '🌱',
    diseaseKey: 'blight',
    crops: ['mango', 'potato', 'tomato', 'houseplant', 'groundnut', 'guava', 'apple'],
    alternatives: [
      { name: 'Sixer WP', brand: 'Dhanuka', priceINR: 310, note: 'Save ₹30 (Generic Formulation)' },
      { name: 'Companion WP', brand: 'Indofil', priceINR: 330, note: 'Quality alternative' }
    ]
  },
  {
    id: 'bavistin-carbendazim',
    name: 'Bavistin 50% WP (Carbendazim 50% WP)',
    brand: 'Crystal Crop Protection Ltd.',
    category: 'Systemic Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Sugarcane Red Rot (Sett dip), Banana Panama Wilt (Drench), Guava Wilt, Apple Scab',
    packSize: '500 grams',
    dosage: '2 g per liter of water for root basin drenching or cane sett dip for 15-20 minutes.',
    safetyPrecautions: '⚠️ Toxic to aquatic ecosystems. Do not dispose of wash water near ponds.',
    priceINR: 310,
    lastUpdatedDate: '23-Aug-2026',
    buyNowLink: 'https://www.bighaat.com',
    image: '🎋',
    diseaseKey: 'wilt',
    crops: ['sugarcane', 'banana', 'guava', 'apple', 'cotton'],
    alternatives: [
      { name: 'Roko 70% WP', brand: 'Biostadt', priceINR: 390, note: 'Thiophanate Methyl Systemic' },
      { name: 'Derosal 50% WP', brand: 'Bayer', priceINR: 350, note: 'Original formulation' }
    ]
  },
  {
    id: 'pegasus-diafenthiuron',
    name: 'Pegasus 50% WP (Diafenthiuron)',
    brand: 'Syngenta India Ltd.',
    category: 'Acaricide & Insecticide',
    categoryClass: 'cat-insecticide',
    suitableCropDisease: 'Chilli Leaf Curl & Yellow Mites, Cotton Whitefly & Jassids, Brinjal Mites',
    packSize: '250 grams',
    dosage: '1.2 g per liter of water (250 g per acre). Target underside of curling leaves.',
    safetyPrecautions: '⚠️ Highly toxic. Wear complete chemical apron and vapor mask during spray.',
    priceINR: 880,
    lastUpdatedDate: '24-Aug-2026',
    buyNowLink: 'https://www.agribegri.com',
    image: '🌶️',
    diseaseKey: 'curl',
    crops: ['pepper', 'cotton', 'papaya', 'brinjal', 'tomato'],
    alternatives: [
      { name: 'Oberon 22.9% SC', brand: 'Bayer', priceINR: 780, note: 'Spiromesifen Specialist Mite Control' },
      { name: 'Keefun 15% EC', brand: 'PI Industries', priceINR: 820, note: 'Tolfenpyrad Broad Spectrum' }
    ]
  },
  {
    id: 'blitox-copper-fungicide',
    name: 'Blitox 50% WP (Copper Oxychloride 50% WP)',
    brand: 'Tata Rallis Ltd.',
    category: 'Contact Fungicide & Bactericide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Potato & Tomato Early/Late Blight, Citrus Canker, Brinjal Blight, Tea Blister Blight',
    packSize: '500 grams',
    dosage: '2.5 g per liter of water. Spray evenly over foliar canopy early morning.',
    safetyPrecautions: '⚠️ Wear protective gloves and mask. Do not mix with acidic chemicals.',
    priceINR: 340,
    lastUpdatedDate: '20-Aug-2026',
    buyNowLink: 'https://www.bighaat.com',
    image: '🧪',
    diseaseKey: 'blight',
    crops: ['potato', 'tomato', 'citrus', 'brinjal', 'tea', 'grape', 'neem'],
    alternatives: [
      { name: 'Blue Copper 50% WP', brand: 'Crystal', priceINR: 310, note: 'Save ₹30 (Standard Copper)' },
      { name: 'Kocide 2000 53.8% DF', brand: 'Corteva', priceINR: 580, note: 'Advanced Copper Hydroxide' }
    ]
  },
  {
    id: 'tilt-propiconazole',
    name: 'Tilt 25% EC (Propiconazole 25% EC)',
    brand: 'Syngenta India Ltd.',
    category: 'Systemic Triazole Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Wheat Stripe/Yellow Rust, Corn Rust, Banana Black Sigatoka, Rice Sheath Blight',
    packSize: '250 ml',
    dosage: '1 ml per liter of water (200 ml per acre). Spray at first sign of rust or leaf spot.',
    safetyPrecautions: '⚠️ Avoid skin and eye contact. Do not spray during peak midday solar heat.',
    priceINR: 485,
    lastUpdatedDate: '22-Aug-2026',
    buyNowLink: 'https://www.agribegri.com',
    image: '🛡️',
    diseaseKey: 'rust',
    crops: ['wheat', 'corn', 'banana', 'rice', 'soybean', 'coffee'],
    alternatives: [
      { name: 'Folicur 25.9% EC', brand: 'Bayer', priceINR: 520, note: 'Tebuconazole Broad Spectrum' },
      { name: 'Result 25% EC', brand: 'Dhanuka', priceINR: 440, note: 'Save ₹45 (Generic Triazole)' }
    ]
  },
  {
    id: 'baan-tricyclazole',
    name: 'Baan 75% WP (Tricyclazole 75% WP Blast Specialist)',
    brand: 'Indofil Industries Ltd.',
    category: 'Systemic Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Rice Leaf Blast, Neck Blast, Node Blast in Paddy fields',
    packSize: '120 grams',
    dosage: '0.6 g per liter of water (120 g in 200 liters of water per acre).',
    safetyPrecautions: '⚠️ Maintain 15-day pre-harvest interval (PHI) after final spray.',
    priceINR: 290,
    lastUpdatedDate: '21-Aug-2026',
    buyNowLink: 'https://www.krishibazaar.in',
    image: '🌾',
    diseaseKey: 'blast',
    crops: ['rice'],
    alternatives: [
      { name: 'Beam 75% WP', brand: 'Corteva', priceINR: 340, note: 'Original Brand Leader' },
      { name: 'Fujione 40% EC', brand: 'Rallis', priceINR: 380, note: 'Systemic Isoprothiolane' }
    ]
  },
  {
    id: 'score-difenoconazole',
    name: 'Score 25% EC (Difenoconazole 25% EC)',
    brand: 'Syngenta India Ltd.',
    category: 'Systemic Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Apple Scab, Rose Black Spot, Onion Purple Blotch, Grape Black Rot, Banana Sigatoka',
    packSize: '100 ml',
    dosage: '0.5 to 1 ml per liter of water. Superior curative and preventive action.',
    safetyPrecautions: '⚠️ Highly toxic to aquatic organisms. Prevent drift into farm water bodies.',
    priceINR: 495,
    lastUpdatedDate: '23-Aug-2026',
    buyNowLink: 'https://www.bighaat.com',
    image: '🍎',
    diseaseKey: 'scab',
    crops: ['apple', 'rose', 'onion', 'grape', 'banana', 'mango', 'citrus'],
    alternatives: [
      { name: 'Topas 100 EC', brand: 'Syngenta', priceINR: 410, note: 'Penconazole Specialist' },
      { name: 'Contaf Plus 5% SC', brand: 'Rallis', priceINR: 310, note: 'Hexaconazole Alternative' }
    ]
  },
  {
    id: 'kocide-copper-hydroxide',
    name: 'Kocide 2000 (Copper Hydroxide 53.8% DF)',
    brand: 'Corteva Agriscience',
    category: 'Bactericide & Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Citrus Canker, Pepper Bacterial Spot, Cotton Angular Leaf Spot, Tomato Canker',
    packSize: '500 grams',
    dosage: '2 g per liter of water + 1 g Streptocycline per 10 liters.',
    safetyPrecautions: '⚠️ Do not mix with acidifying agents or organophosphate insecticides.',
    priceINR: 580,
    lastUpdatedDate: '22-Aug-2026',
    buyNowLink: 'https://www.agribegri.com',
    image: '🍊',
    diseaseKey: 'bacterial',
    crops: ['citrus', 'pepper', 'cotton', 'tomato', 'mango', 'rice'],
    alternatives: [
      { name: 'Cuprina 50% WP', brand: 'Tata Rallis', priceINR: 340, note: 'Save ₹240 (Copper Oxychloride)' },
      { name: 'Streptocycline 90:10', brand: 'HAL', priceINR: 65, note: 'Pure bactericide supplement (6g pouch)' }
    ]
  },
  {
    id: 'curzate-late-blight',
    name: 'Curzate M8 (Cymoxanil 8% + Mancozeb 64% WP)',
    brand: 'Corteva Agriscience',
    category: 'Emergency Anti-Blight Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Potato Late Blight Emergency, Tomato Late Blight, Grape Downy Mildew',
    packSize: '600 grams',
    dosage: '2.5 g per liter of water. Apply within 48 hours of infection for kickback curative action.',
    safetyPrecautions: '⚠️ Do not apply more than 3 consecutive sprays to avoid fungal resistance.',
    priceINR: 640,
    lastUpdatedDate: '23-Aug-2026',
    buyNowLink: 'https://www.bighaat.com',
    image: '🥔',
    diseaseKey: 'blight',
    crops: ['potato', 'tomato', 'grape'],
    alternatives: [
      { name: 'Ridomil Gold MZ', brand: 'Syngenta', priceINR: 690, note: 'Metalaxyl-M + Mancozeb Leader' },
      { name: 'Sectin 60% WG', brand: 'Bayer', priceINR: 610, note: 'Fenamidone + Mancozeb' }
    ]
  },
  {
    id: 'sanjeevani-trichoderma',
    name: 'Sanjeevani Trichoderma viride 1% WP (Bio-Fungicide)',
    brand: 'Biostadt India Ltd.',
    category: 'Biological Bio-Fungicide',
    categoryClass: 'cat-organic',
    suitableCropDisease: 'Tulsi Leaf Blight, Neem Leaf Spot, Soil-Borne Wilt, Root Rot, Damping Off in all crops',
    packSize: '1 kg',
    dosage: '5 g per liter of water for foliar spray; 2.5 kg mixed in 500 kg FYM per acre for soil drench.',
    safetyPrecautions: '🌿 100% Organic & Chemical-free. Safe for medicinal plants, home gardens, and sacred herbs.',
    priceINR: 220,
    lastUpdatedDate: '24-Aug-2026',
    buyNowLink: 'https://www.krishibazaar.in',
    image: '🍃',
    diseaseKey: 'organic',
    crops: ['tulsi', 'neem', 'houseplant', 'tomato', 'potato', 'banana', 'sugarcane', 'all'],
    alternatives: [
      { name: 'Bio-Cure-F', brand: 'T.Stanes', priceINR: 240, note: 'Trichoderma harzianum standard' },
      { name: 'NIPROT WP', brand: 'National Bio Products', priceINR: 195, note: 'Budget Bio-Agent' }
    ]
  },
  {
    id: 'neem-baan-oil-10000',
    name: 'Econeem Plus (Cold-Pressed Azadirachtin 10,000 PPM)',
    brand: 'PJ Margo / EID Parry Ltd.',
    category: 'Botanical Bio-Pesticide',
    categoryClass: 'cat-organic',
    suitableCropDisease: 'All Healthy Crops (Preventive), Whiteflies, Thrips, Aphids, Mites on Vegetables & Fruits',
    packSize: '500 ml',
    dosage: '3 ml per liter of water with 0.5 ml organic soap spreader. Spray every 10-14 days.',
    safetyPrecautions: '🌿 Non-toxic to honeybees, natural predators, and humans. Zero-day pre-harvest interval.',
    priceINR: 420,
    lastUpdatedDate: '24-Aug-2026',
    buyNowLink: 'https://www.bighaat.com',
    image: '🌿',
    diseaseKey: 'healthy',
    crops: ['all', 'tomato', 'potato', 'mango', 'banana', 'cotton', 'citrus', 'rose', 'tulsi', 'neem'],
    alternatives: [
      { name: 'Neem Gold 300 PPM', brand: 'Southern Petrochemical', priceINR: 210, note: 'Save ₹210 (Milder Home Grade)' },
      { name: 'Bio-Neem 50,000 PPM', brand: 'Biostadt', priceINR: 650, note: 'Ultra concentrated commercial grade' }
    ]
  }
];
