// js/data.js

const mockData = {
  products: [
    // --- SPICES ---
    {
      id: 'p01',
      category: 'Spices',
      roman_urdu_name: 'Premium Biryani Masala',
      english_subtitle: 'Authentic Karachi Biryani Blend',
      spice_profile: { heat: 4, aroma: 5, color: 4 },
      variants: [ { id: 'v01-1', form: 'Powder', weight_grams: 100, price: 250, sku: 'BIRY-100', stock_quantity: 50 }, { id: 'v01-2', form: 'Powder', weight_grams: 500, price: 1100, sku: 'BIRY-500', stock_quantity: 20 } ]
    },
    {
      id: 'p02',
      category: 'Spices',
      roman_urdu_name: 'Lal Mirch Powder',
      english_subtitle: 'Pure Red Chilli Powder',
      spice_profile: { heat: 5, aroma: 3, color: 5 },
      variants: [ { id: 'v02-1', form: 'Powder', weight_grams: 200, price: 400, sku: 'LAL-200', stock_quantity: 100 } ]
    },
    {
      id: 'p03',
      category: 'Spices',
      roman_urdu_name: 'Haldi Powder',
      english_subtitle: 'Organic Turmeric Powder',
      spice_profile: { heat: 1, aroma: 4, color: 5 },
      variants: [ { id: 'v03-1', form: 'Powder', weight_grams: 200, price: 350, sku: 'HAL-200', stock_quantity: 80 } ]
    },
    {
      id: 'p04',
      category: 'Spices',
      roman_urdu_name: 'Karahi Masala Special',
      english_subtitle: 'Restaurant Style Karahi Blend',
      spice_profile: { heat: 4, aroma: 5, color: 4 },
      variants: [ { id: 'v04-1', form: 'Powder', weight_grams: 100, price: 280, sku: 'KAR-100', stock_quantity: 40 } ]
    },
    {
      id: 'p05',
      category: 'Spices',
      roman_urdu_name: 'Garam Masala Sabut',
      english_subtitle: 'Whole Mixed Spices',
      spice_profile: { heat: 3, aroma: 5, color: 3 },
      variants: [ { id: 'v05-1', form: 'Whole', weight_grams: 100, price: 450, sku: 'GAR-W-100', stock_quantity: 60 } ]
    },
    {
      id: 'p06',
      category: 'Spices',
      roman_urdu_name: 'Himalayan Pink Salt',
      english_subtitle: 'Pure Coarse Pink Salt',
      spice_profile: { heat: 0, aroma: 1, color: 1 },
      variants: [ { id: 'v06-1', form: 'Coarse', weight_grams: 500, price: 200, sku: 'PNK-500', stock_quantity: 150 } ]
    },

    // --- DATES (KHAJOOR) ---
    {
      id: 'p07',
      category: 'Dates',
      roman_urdu_name: 'Ajwa Khajoor',
      english_subtitle: 'Premium Grade Ajwa Dates from Madinah',
      spice_profile: { heat: 0, aroma: 2, color: 5 },
      variants: [ { id: 'v07-1', form: 'Whole', weight_grams: 500, price: 2500, sku: 'AJW-500', stock_quantity: 30 } ]
    },
    {
      id: 'p08',
      category: 'Dates',
      roman_urdu_name: 'Medjool Dates',
      english_subtitle: 'Large & Juicy Jumbo Dates',
      spice_profile: { heat: 0, aroma: 3, color: 4 },
      variants: [ { id: 'v08-1', form: 'Whole', weight_grams: 500, price: 1800, sku: 'MED-500', stock_quantity: 25 } ]
    },
    {
      id: 'p09',
      category: 'Dates',
      roman_urdu_name: 'Mabroom Khajoor',
      english_subtitle: 'Chewy & Sweet Mabroom',
      spice_profile: { heat: 0, aroma: 2, color: 4 },
      variants: [ { id: 'v09-1', form: 'Whole', weight_grams: 500, price: 1600, sku: 'MAB-500', stock_quantity: 45 } ]
    },
    {
      id: 'p10',
      category: 'Dates',
      roman_urdu_name: 'Sukari Khajoor',
      english_subtitle: 'Soft & Melt-in-mouth Dates',
      spice_profile: { heat: 0, aroma: 2, color: 3 },
      variants: [ { id: 'v10-1', form: 'Whole', weight_grams: 500, price: 1400, sku: 'SUK-500', stock_quantity: 0 } ] // Out of stock demo
    },

    // --- DRY FRUITS ---
    {
      id: 'p11',
      category: 'Dry Fruits',
      roman_urdu_name: 'American Badam',
      english_subtitle: 'Premium Almonds (Without Shell)',
      spice_profile: { heat: 0, aroma: 2, color: 2 },
      variants: [ { id: 'v11-1', form: 'Raw', weight_grams: 250, price: 900, sku: 'ALM-250', stock_quantity: 50 } ]
    },
    {
      id: 'p12',
      category: 'Dry Fruits',
      roman_urdu_name: 'Irani Pista',
      english_subtitle: 'Roasted & Salted Pistachios',
      spice_profile: { heat: 0, aroma: 4, color: 3 },
      variants: [ { id: 'v12-1', form: 'Roasted', weight_grams: 250, price: 1400, sku: 'PIS-250', stock_quantity: 40 } ]
    },
    {
      id: 'p13',
      category: 'Dry Fruits',
      roman_urdu_name: 'Kaju Roasted',
      english_subtitle: 'Premium Salted Cashews',
      spice_profile: { heat: 0, aroma: 3, color: 2 },
      variants: [ { id: 'v13-1', form: 'Roasted', weight_grams: 250, price: 1200, sku: 'KAJ-250', stock_quantity: 35 } ]
    },
    {
      id: 'p14',
      category: 'Dry Fruits',
      roman_urdu_name: 'Akhrot Giri',
      english_subtitle: 'Premium Walnut Kernels',
      spice_profile: { heat: 0, aroma: 2, color: 3 },
      variants: [ { id: 'v14-1', form: 'Raw', weight_grams: 250, price: 1100, sku: 'WAL-250', stock_quantity: 20 } ]
    },

    // --- CHOCOLATES ---
    {
      id: 'p15',
      category: 'Chocolates',
      roman_urdu_name: 'Dark Chocolate Block',
      english_subtitle: '70% Cocoa Baking & Eating Chocolate',
      spice_profile: { heat: 0, aroma: 5, color: 5 },
      variants: [ { id: 'v15-1', form: 'Solid', weight_grams: 200, price: 850, sku: 'CHO-DRK', stock_quantity: 15 } ]
    },
    {
      id: 'p16',
      category: 'Chocolates',
      roman_urdu_name: 'Assorted Chocolate Truffles',
      english_subtitle: 'Handcrafted Premium Box',
      spice_profile: { heat: 0, aroma: 4, color: 4 },
      variants: [ { id: 'v16-1', form: 'Box', weight_grams: 300, price: 1500, sku: 'CHO-TRF', stock_quantity: 10 } ]
    },

    // --- CHEESE ---
    {
      id: 'p17',
      category: 'Cheese',
      roman_urdu_name: 'Cheddar Cheese Block',
      english_subtitle: 'Aged Sharp Cheddar',
      spice_profile: { heat: 0, aroma: 4, color: 2 },
      variants: [ { id: 'v17-1', form: 'Block', weight_grams: 400, price: 1250, sku: 'CHS-CHD', stock_quantity: 25 } ]
    },
    {
      id: 'p18',
      category: 'Cheese',
      roman_urdu_name: 'Mozzarella Cheese',
      english_subtitle: 'Perfect Pizza Cheese Block',
      spice_profile: { heat: 0, aroma: 3, color: 1 },
      variants: [ { id: 'v18-1', form: 'Block', weight_grams: 400, price: 1300, sku: 'CHS-MOZ', stock_quantity: 30 } ]
    },

    // --- SHARBATS (SYRUPS) ---
    {
      id: 'p19',
      category: 'Sharbats',
      roman_urdu_name: 'Gulab Sharbat',
      english_subtitle: 'Refreshing Rose Syrup (Rooh Afza Style)',
      spice_profile: { heat: 0, aroma: 5, color: 5 },
      variants: [ { id: 'v19-1', form: 'Liquid', weight_grams: 800, price: 450, sku: 'SHR-ROS', stock_quantity: 100 } ]
    },
    {
      id: 'p20',
      category: 'Sharbats',
      roman_urdu_name: 'Sandal Sharbat',
      english_subtitle: 'Cooling Sandalwood Syrup',
      spice_profile: { heat: 0, aroma: 5, color: 2 },
      variants: [ { id: 'v20-1', form: 'Liquid', weight_grams: 800, price: 550, sku: 'SHR-SAN', stock_quantity: 60 } ]
    }
  ]
};