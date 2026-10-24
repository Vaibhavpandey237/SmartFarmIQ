// Recommended Products & Remedies Database for Multi-Crop Pathologies
export const RECOMMENDED_PRODUCTS_DATABASE = [
  {
    id: 'blitox-copper-fungicide',
    name: 'Blitox 50% WP Copper Oxychloride',
    brand: 'Tata Rallis Ltd.',
    category: 'Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Potato Early & Late Blight, Tomato Blight & Spot, Grape Black Rot',
    packSize: '500 grams',
    dosage: '2.5 g per liter of water. Spray evenly over foliage early morning or late evening.',
    safetyPrecautions: '⚠️ Wear protective gloves, safety goggles & mask. Keep out of reach of children.',
    priceINR: 340,
    lastUpdatedDate: '20-Aug-2026',
    buyNowLink: 'https://www.bighaat.com',
    image: '🧪',
    diseaseKey: 'blight',
    crops: ['potato', 'tomato', 'grape'],
    alternatives: [
      { name: 'Tata Master 72% WP', brand: 'Tata Rallis', priceINR: 310, note: 'Save ₹30 (Standard Fungicide)' },
      { name: 'Antracol 70% WP', brand: 'Bayer CropScience', priceINR: 365, note: 'Premium Zinc-based protectant' }
    ]
  },
  {
    id: 'tilt-propiconazole',
    name: 'Tilt 25% EC Propiconazole Systemic Fungicide',
    brand: 'Syngenta India Ltd.',
    category: 'Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Wheat Stripe Rust, Corn Northern Leaf Blight & Rust, Rice Sheath Blight',
    packSize: '250 ml',
    dosage: '1 ml per liter of water (200 ml per acre). Spray at first sign of rust or leaf blight.',
    safetyPrecautions: '⚠️ Avoid skin and eye contact. Do not spray during peak midday heat.',
    priceINR: 485,
    lastUpdatedDate: '22-Aug-2026',
    buyNowLink: 'https://www.agribegri.com',
    image: '🛡️',
    diseaseKey: 'rust',
    crops: ['wheat', 'corn', 'rice'],
    alternatives: [
      { name: 'Folicur 25.9% EC', brand: 'Bayer', priceINR: 520, note: 'Tebuconazole Broad Spectrum' },
      { name: 'Result 25% EC', brand: 'Dhanuka', priceINR: 440, note: 'Save ₹45 (Generic Triazole)' }
    ]
  },
  {
    id: 'baan-tricyclazole',
    name: 'Baan 75% WP Tricyclazole Blast Specialist',
    brand: 'Indofil Industries Ltd.',
    category: 'Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Rice Leaf Blast, Neck Blast, Node Blast in Paddy',
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
    name: 'Score 25% EC Difenoconazole Broad Spectrum',
    brand: 'Syngenta India Ltd.',
    category: 'Fungicide',
    categoryClass: 'cat-fungicide',
    suitableCropDisease: 'Apple Scab, Grape Black Rot & Powdery Mildew, Mango Anthracnose',
    packSize: '100 ml',
    dosage: '0.5 ml per liter of water. Superior curative and preventive action.',
    safetyPrecautions: '⚠️ Highly toxic to aquatic organisms. Prevent drift into farm ponds.',
    priceINR: 495,
    lastUpdatedDate: '23-Aug-2026',
    buyNowLink: 'https://www.bighaat.com',
    image: '🍎',
    diseaseKey: 'scab',
    crops: ['apple', 'grape', 'mango', 'citrus'],
    alternatives: [
      { name: 'Topas 100 EC', brand: 'Syngenta', priceINR: 410, note: 'Penconazole Specialist' },
      { name: 'Bavistin 50% WP', brand: 'Crystal', priceINR: 280, note: 'Carbendazim Alternative' }
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
    safetyPrecautions: '⚠️ Do not mix with acidifying agents or organophosphates.',
    priceINR: 580,
    lastUpdatedDate: '22-Aug-2026',
    buyNowLink: 'https://www.agribegri.com',
    image: '🍊',
    diseaseKey: 'bacterial',
    crops: ['citrus', 'pepper', 'cotton', 'tomato'],
    alternatives: [
      { name: 'Streptocycline Sulfate', brand: 'Hindustan Antibiotics', priceINR: 65, note: 'Antibiotic packet 6g' },
      { name: 'Cuprina 50% WP', brand: 'UPL', priceINR: 320, note: 'Save ₹260 (Standard Copper)' }
    ]
  },
  {
    id: 'neem-oil-organic',
    name: 'Cold Pressed Organic Neem Oil (1500 PPM)',
    brand: 'Indore Bio Organics',
    category: 'Bio-pesticide',
    categoryClass: 'cat-bio',
    suitableCropDisease: 'Rice Stem Borer, Aphids, Whiteflies, Thrips, Spider Mites on All Crops',
    packSize: '1 Liter',
    dosage: '5 ml per liter of water + 2-3 drops liquid soap as emulsifier. Spray weekly.',
    safetyPrecautions: '🌿 100% Eco-friendly & non-toxic to honeybees when sprayed after sunset.',
    priceINR: 420,
    lastUpdatedDate: '19-Aug-2026',
    buyNowLink: 'https://www.agribegri.com',
    image: '🌿',
    diseaseKey: 'pesticide',
    crops: ['all', 'tomato', 'pepper', 'cotton', 'houseplant'],
    alternatives: [
      { name: 'Katyayani Neem 3000 PPM', brand: 'Katyayani Organics', priceINR: 480, note: 'Higher Azadirachtin conc.' },
      { name: 'Organic India Neem Care', brand: 'Organic India', priceINR: 390, note: 'Save ₹30 (Standard grade)' }
    ]
  },
  {
    id: 'epsom-salt-magnesium',
    name: 'Epsom Salt Magnesium Sulfate (9.5% Mg)',
    brand: 'IFFCO Urban Gardens',
    category: 'Fertilizer',
    categoryClass: 'cat-fertilizer',
    suitableCropDisease: 'Chlorosis (Yellowing Leaves), Tomato Blossom Rot, Pepper, Roses, Ornamentals',
    packSize: '1 kg',
    dosage: 'Foliar Spray: 10g per gallon of water. Soil Drench: 15g per plant base monthly.',
    safetyPrecautions: '✅ Safe & non-hazardous. Store sealed in a dry place away from direct moisture.',
    priceINR: 180,
    lastUpdatedDate: '20-Aug-2026',
    buyNowLink: 'https://www.iffcostore.in',
    image: '💎',
    diseaseKey: 'yellow',
    crops: ['all', 'tomato', 'potato', 'houseplant'],
    alternatives: [
      { name: 'Katyayani Epsom Salt', brand: 'Katyayani', priceINR: 160, note: 'Save ₹20 (Bulk Pack)' },
      { name: 'Syngenta MagBoost', brand: 'Syngenta', priceINR: 210, note: 'Added Micronutrients' }
    ]
  },
  {
    id: 'npk-19-19-19-water-soluble',
    name: 'Mahadhan 19:19:19 Water Soluble NPK',
    brand: 'Smartchem Technologies (Mahadhan)',
    category: 'Fertilizer',
    categoryClass: 'cat-fertilizer',
    suitableCropDisease: 'All Vegetables & Grain Crops, Vegetative Vigour, Balanced Macro Nutrition',
    packSize: '1 kg',
    dosage: '5 g per liter of water applied every 14 days during active growth phase.',
    safetyPrecautions: '✅ Keep container tightly closed in a cool, ventilated shade.',
    priceINR: 210,
    lastUpdatedDate: '20-Aug-2026',
    buyNowLink: 'https://www.mahadhan.co.in',
    image: '⚡',
    diseaseKey: 'general',
    crops: ['all', 'corn', 'wheat', 'sugarcane', 'tomato'],
    alternatives: [
      { name: 'IFFCO NPK 19-19-19', brand: 'IFFCO', priceINR: 195, note: 'Save ₹15 (Farmer Choice)' },
      { name: 'Nagarjuna SoluFert NPK', brand: 'Nagarjuna', priceINR: 225, note: 'Imported Quality' }
    ]
  }
];
