// Crop Price & Government MSP Database (Rates in ₹ per Quintal)
// Updated with latest official CCEA approved Government MSP rates (Marketing Season 2025-26)
export const CROP_PRICES_DATABASE = [
  {
    id: 'wheat',
    name: 'Wheat (Gehu)',
    category: 'Cereal',
    mspINR: 2425, // Updated from 2275 to 2425 (+₹150 CCEA hike)
    mspYear: '2025-26',
    states: [
      {
        stateName: 'Punjab',
        mandis: [
          { mandiName: 'Khanna Mandi', minPrice: 2450, maxPrice: 2650, modalPrice: 2530, arrivalQuintals: 4500, date: '29-Oct-2026' },
          { mandiName: 'Rajpura Mandi', minPrice: 2430, maxPrice: 2600, modalPrice: 2490, arrivalQuintals: 3200, date: '29-Oct-2026' }
        ]
      },
      {
        stateName: 'Haryana',
        mandis: [
          { mandiName: 'Karnal Mandi', minPrice: 2460, maxPrice: 2700, modalPrice: 2580, arrivalQuintals: 5100, date: '29-Oct-2026' },
          { mandiName: 'Kurukshetra Mandi', minPrice: 2440, maxPrice: 2640, modalPrice: 2520, arrivalQuintals: 3800, date: '29-Oct-2026' }
        ]
      },
      {
        stateName: 'Uttar Pradesh',
        mandis: [
          { mandiName: 'Bareilly Mandi', minPrice: 2430, maxPrice: 2590, modalPrice: 2490, arrivalQuintals: 6200, date: '29-Oct-2026' },
          { mandiName: 'Agra Mandi', minPrice: 2450, maxPrice: 2630, modalPrice: 2540, arrivalQuintals: 4900, date: '29-Oct-2026' }
        ]
      },
      {
        stateName: 'Madhya Pradesh',
        mandis: [
          { mandiName: 'Indore Mandi', minPrice: 2500, maxPrice: 2780, modalPrice: 2640, arrivalQuintals: 7500, date: '29-Oct-2026' },
          { mandiName: 'Ujjain Mandi', minPrice: 2480, maxPrice: 2730, modalPrice: 2610, arrivalQuintals: 5400, date: '29-Oct-2026' }
        ]
      }
    ]
  },
  {
    id: 'paddy',
    name: 'Paddy / Rice (Dhan)',
    category: 'Cereal',
    mspINR: 2300, // Updated from 2183 to 2300 (Common) / 2320 (Grade A)
    mspYear: '2025-26',
    states: [
      {
        stateName: 'Haryana',
        mandis: [
          { mandiName: 'Ambala Mandi', minPrice: 2320, maxPrice: 2520, modalPrice: 2410, arrivalQuintals: 3900, date: '29-Oct-2026' },
          { mandiName: 'Kaithal Mandi', minPrice: 2330, maxPrice: 2550, modalPrice: 2440, arrivalQuintals: 4200, date: '29-Oct-2026' }
        ]
      },
      {
        stateName: 'Punjab',
        mandis: [
          { mandiName: 'Amritsar Mandi', minPrice: 2325, maxPrice: 2510, modalPrice: 2420, arrivalQuintals: 4800, date: '29-Oct-2026' }
        ]
      },
      {
        stateName: 'Uttar Pradesh',
        mandis: [
          { mandiName: 'Gorakhpur Mandi', minPrice: 2310, maxPrice: 2470, modalPrice: 2380, arrivalQuintals: 5300, date: '29-Oct-2026' }
        ]
      }
    ]
  },
  {
    id: 'mustard',
    name: 'Mustard / Rapeseed (Sarson)',
    category: 'Oilseed',
    mspINR: 5950, // Updated from 5650 to 5950 (+₹300 CCEA hike)
    mspYear: '2025-26',
    states: [
      {
        stateName: 'Rajasthan',
        mandis: [
          { mandiName: 'Bharatpur Mandi', minPrice: 6000, maxPrice: 6450, modalPrice: 6250, arrivalQuintals: 2800, date: '29-Oct-2026' },
          { mandiName: 'Alwar Mandi', minPrice: 5980, maxPrice: 6400, modalPrice: 6200, arrivalQuintals: 3100, date: '29-Oct-2026' }
        ]
      },
      {
        stateName: 'Haryana',
        mandis: [
          { mandiName: 'Hisar Mandi', minPrice: 5970, maxPrice: 6350, modalPrice: 6180, arrivalQuintals: 2200, date: '29-Oct-2026' }
        ]
      }
    ]
  },
  {
    id: 'cotton',
    name: 'Cotton (Kapas)',
    category: 'Commercial',
    mspINR: 7121, // Updated from 6620 to 7121 (Medium Staple) / 7521 (Long Staple)
    mspYear: '2025-26',
    states: [
      {
        stateName: 'Gujarat',
        mandis: [
          { mandiName: 'Rajkot Mandi', minPrice: 7250, maxPrice: 7750, modalPrice: 7520, arrivalQuintals: 3400, date: '29-Oct-2026' },
          { mandiName: 'Kadi Mandi', minPrice: 7200, maxPrice: 7680, modalPrice: 7460, arrivalQuintals: 2900, date: '29-Oct-2026' }
        ]
      },
      {
        stateName: 'Maharashtra',
        mandis: [
          { mandiName: 'Yavatmal Mandi', minPrice: 7180, maxPrice: 7600, modalPrice: 7420, arrivalQuintals: 4100, date: '29-Oct-2026' }
        ]
      }
    ]
  },
  {
    id: 'maize',
    name: 'Maize (Makka)',
    category: 'Cereal',
    mspINR: 2225, // Updated from 2090 to 2225 (+₹135 hike)
    mspYear: '2025-26',
    states: [
      {
        stateName: 'Madhya Pradesh',
        mandis: [
          { mandiName: 'Chhindwara Mandi', minPrice: 2250, maxPrice: 2450, modalPrice: 2350, arrivalQuintals: 3600, date: '29-Oct-2026' }
        ]
      },
      {
        stateName: 'Karnataka',
        mandis: [
          { mandiName: 'Davanagere Mandi', minPrice: 2260, maxPrice: 2480, modalPrice: 2370, arrivalQuintals: 2900, date: '29-Oct-2026' }
        ]
      }
    ]
  },
  {
    id: 'gram',
    name: 'Gram (Chana)',
    category: 'Pulses',
    mspINR: 5650, // Updated from 5440 to 5650 (+₹210 CCEA hike)
    mspYear: '2025-26',
    states: [
      {
        stateName: 'Maharashtra',
        mandis: [
          { mandiName: 'Latur Mandi', minPrice: 5720, maxPrice: 6150, modalPrice: 5920, arrivalQuintals: 2100, date: '29-Oct-2026' }
        ]
      },
      {
        stateName: 'Rajasthan',
        mandis: [
          { mandiName: 'Bikaner Mandi', minPrice: 5700, maxPrice: 6100, modalPrice: 5880, arrivalQuintals: 1900, date: '29-Oct-2026' }
        ]
      }
    ]
  },
  {
    id: 'bajra',
    name: 'Bajra (Pearl Millet)',
    category: 'Millet',
    mspINR: 2625, // Updated from 2500 to 2625 (+₹125 hike)
    mspYear: '2025-26',
    states: [
      {
        stateName: 'Rajasthan',
        mandis: [
          { mandiName: 'Jaipur Mandi', minPrice: 2650, maxPrice: 2880, modalPrice: 2750, arrivalQuintals: 2400, date: '29-Oct-2026' }
        ]
      }
    ]
  },
  {
    id: 'jowar',
    name: 'Jowar (Sorghum)',
    category: 'Millet',
    mspINR: 3371, // Updated from 3180 to 3371 (Hybrid) / 3421 (Maldandi)
    mspYear: '2025-26',
    states: [
      {
        stateName: 'Maharashtra',
        mandis: [
          { mandiName: 'Solapur Mandi', minPrice: 3420, maxPrice: 3700, modalPrice: 3560, arrivalQuintals: 1800, date: '29-Oct-2026' }
        ]
      }
    ]
  },
  {
    id: 'pulses',
    name: 'Pulses (Tur / Arhar / Moong)',
    category: 'Pulses',
    mspINR: 7550, // Updated from 7000 to 7550 (Tur/Arhar) | Moong: 8682
    mspYear: '2025-26',
    states: [
      {
        stateName: 'Madhya Pradesh',
        mandis: [
          { mandiName: 'Hardoi Mandi', minPrice: 7700, maxPrice: 9400, modalPrice: 8650, arrivalQuintals: 1500, date: '29-Oct-2026' }
        ]
      }
    ]
  },
  {
    id: 'soybean',
    name: 'Soybean (Yellow)',
    category: 'Oilseed',
    mspINR: 4892, // Official CCEA rate (increased by ₹292)
    mspYear: '2025-26',
    states: [
      {
        stateName: 'Madhya Pradesh',
        mandis: [
          { mandiName: 'Dewas Mandi', minPrice: 4920, maxPrice: 5350, modalPrice: 5120, arrivalQuintals: 4200, date: '29-Oct-2026' },
          { mandiName: 'Sehore Mandi', minPrice: 4900, maxPrice: 5300, modalPrice: 5080, arrivalQuintals: 3700, date: '29-Oct-2026' }
        ]
      }
    ]
  },
  {
    id: 'barley',
    name: 'Barley (Jau)',
    category: 'Cereal',
    mspINR: 1980, // Updated from 1850 to 1980 (+₹130 CCEA hike)
    mspYear: '2025-26',
    states: [
      {
        stateName: 'Rajasthan',
        mandis: [
          { mandiName: 'Sriganganagar Mandi', minPrice: 2000, maxPrice: 2200, modalPrice: 2110, arrivalQuintals: 2100, date: '29-Oct-2026' }
        ]
      }
    ]
  }
];
