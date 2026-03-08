export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  description: string;
  inStock: boolean;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  color: string;
}

export const categories: Category[] = [
  { name: "Soft Drinks", slug: "soft-drinks", image: "🥤", color: "bg-red-50" },
  { name: "Juices", slug: "juices", image: "🧃", color: "bg-orange-50" },
  { name: "Water & Soda", slug: "water-soda", image: "💧", color: "bg-blue-50" },
  { name: "Energy Drinks", slug: "energy-drinks", image: "⚡", color: "bg-yellow-50" },
  { name: "Tea & Coffee", slug: "tea-coffee", image: "☕", color: "bg-amber-50" },
  { name: "Milk Drinks", slug: "milk-drinks", image: "🥛", color: "bg-purple-50" },
  { name: "Shakes & Smoothies", slug: "shakes-smoothies", image: "🍹", color: "bg-pink-50" },
  { name: "Health Drinks", slug: "health-drinks", image: "🍵", color: "bg-green-50" },
];

export const products: Product[] = [
  // Soft Drinks
  { id: "1", name: "Coca-Cola", category: "Soft Drinks", categorySlug: "soft-drinks", price: 40, originalPrice: 45, unit: "750 ml", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop", description: "Refreshing cola drink with the classic taste everyone loves.", inStock: true },
  { id: "2", name: "Pepsi", category: "Soft Drinks", categorySlug: "soft-drinks", price: 38, unit: "750 ml", image: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=200&h=200&fit=crop", description: "Bold cola flavor, perfect for any occasion.", inStock: true },
  { id: "3", name: "Sprite", category: "Soft Drinks", categorySlug: "soft-drinks", price: 40, originalPrice: 45, unit: "750 ml", image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=200&h=200&fit=crop", description: "Clear lemon-lime soda with a crisp, clean taste.", inStock: true },
  { id: "4", name: "Fanta Orange", category: "Soft Drinks", categorySlug: "soft-drinks", price: 35, unit: "600 ml", image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=200&h=200&fit=crop", description: "Bright and bubbly orange flavored soft drink.", inStock: true },
  { id: "5", name: "Thums Up", category: "Soft Drinks", categorySlug: "soft-drinks", price: 40, unit: "750 ml", image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=200&h=200&fit=crop", description: "Strong, fizzy cola with a bold, masculine taste.", inStock: false },
  { id: "6", name: "Mountain Dew", category: "Soft Drinks", categorySlug: "soft-drinks", price: 38, originalPrice: 42, unit: "600 ml", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop", description: "Citrus-flavored carbonated soft drink with a kick.", inStock: true },

  // Juices
  { id: "7", name: "Real Mango Juice", category: "Juices", categorySlug: "juices", price: 99, originalPrice: 120, unit: "1 L", image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=200&h=200&fit=crop", description: "Pure mango juice made from Alphonso mangoes.", inStock: true },
  { id: "8", name: "Tropicana Orange", category: "Juices", categorySlug: "juices", price: 90, unit: "1 L", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop", description: "100% pure squeezed orange juice, no added sugar.", inStock: true },
  { id: "9", name: "Apple Juice", category: "Juices", categorySlug: "juices", price: 85, originalPrice: 95, unit: "1 L", image: "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=200&h=200&fit=crop", description: "Fresh pressed apple juice with natural sweetness.", inStock: true },
  { id: "10", name: "Mixed Fruit Juice", category: "Juices", categorySlug: "juices", price: 75, unit: "1 L", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop", description: "A delicious blend of tropical fruits.", inStock: true },
  { id: "11", name: "Pomegranate Juice", category: "Juices", categorySlug: "juices", price: 110, unit: "1 L", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=200&h=200&fit=crop", description: "Rich antioxidant pomegranate juice.", inStock: true },
  { id: "12", name: "Guava Juice", category: "Juices", categorySlug: "juices", price: 65, originalPrice: 75, unit: "1 L", image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=200&h=200&fit=crop", description: "Sweet and tangy guava juice.", inStock: true },

  // Water & Soda
  { id: "13", name: "Bisleri Water", category: "Water & Soda", categorySlug: "water-soda", price: 20, unit: "1 L", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop", description: "Pure packaged drinking water.", inStock: true },
  { id: "14", name: "Himalayan Water", category: "Water & Soda", categorySlug: "water-soda", price: 30, unit: "1 L", image: "https://images.unsplash.com/photo-1560023907-5f339617ea55?w=200&h=200&fit=crop", description: "Natural mineral water from the Himalayas.", inStock: true },
  { id: "15", name: "Soda Water", category: "Water & Soda", categorySlug: "water-soda", price: 15, unit: "750 ml", image: "https://images.unsplash.com/photo-1603394630850-69b3e4f1e4c1?w=200&h=200&fit=crop", description: "Plain sparkling soda water.", inStock: true },
  { id: "16", name: "Tonic Water", category: "Water & Soda", categorySlug: "water-soda", price: 55, unit: "500 ml", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&h=200&fit=crop", description: "Premium tonic water with quinine.", inStock: true },

  // Energy Drinks
  { id: "17", name: "Red Bull", category: "Energy Drinks", categorySlug: "energy-drinks", price: 115, unit: "250 ml", image: "https://images.unsplash.com/photo-1613225755711-e83281ef9e16?w=200&h=200&fit=crop", description: "Energy drink that gives you wings.", inStock: true },
  { id: "18", name: "Monster Energy", category: "Energy Drinks", categorySlug: "energy-drinks", price: 125, originalPrice: 140, unit: "350 ml", image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=200&h=200&fit=crop", description: "Unleash the beast with Monster Energy.", inStock: true },
  { id: "19", name: "Sting Energy", category: "Energy Drinks", categorySlug: "energy-drinks", price: 20, unit: "250 ml", image: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=200&h=200&fit=crop", description: "Affordable energy boost with berry flavor.", inStock: true },
  { id: "20", name: "Gatorade", category: "Energy Drinks", categorySlug: "energy-drinks", price: 50, unit: "500 ml", image: "https://images.unsplash.com/photo-1585171953968-6c27e10e6476?w=200&h=200&fit=crop", description: "Sports drink to replenish electrolytes.", inStock: true },

  // Tea & Coffee
  { id: "21", name: "Iced Tea Lemon", category: "Tea & Coffee", categorySlug: "tea-coffee", price: 30, unit: "400 ml", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop", description: "Refreshing lemon iced tea.", inStock: true },
  { id: "22", name: "Cold Coffee", category: "Tea & Coffee", categorySlug: "tea-coffee", price: 45, originalPrice: 55, unit: "200 ml", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop", description: "Creamy cold coffee with milk.", inStock: true },
  { id: "23", name: "Green Tea", category: "Tea & Coffee", categorySlug: "tea-coffee", price: 25, unit: "350 ml", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=200&h=200&fit=crop", description: "Pure green tea with antioxidants.", inStock: true },
  { id: "24", name: "Espresso Shot", category: "Tea & Coffee", categorySlug: "tea-coffee", price: 60, unit: "150 ml", image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200&h=200&fit=crop", description: "Strong double espresso shot, ready to drink.", inStock: true },

  // Milk Drinks
  { id: "25", name: "Amul Lassi", category: "Milk Drinks", categorySlug: "milk-drinks", price: 30, unit: "200 ml", image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=200&h=200&fit=crop", description: "Thick, sweet lassi made with fresh curd.", inStock: true },
  { id: "26", name: "Chocolate Milk", category: "Milk Drinks", categorySlug: "milk-drinks", price: 25, unit: "200 ml", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&h=200&fit=crop", description: "Rich chocolate flavored milk drink.", inStock: true },
  { id: "27", name: "Badam Milk", category: "Milk Drinks", categorySlug: "milk-drinks", price: 35, originalPrice: 40, unit: "200 ml", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop", description: "Almond flavored milk with real badam.", inStock: true },
  { id: "28", name: "Buttermilk", category: "Milk Drinks", categorySlug: "milk-drinks", price: 20, unit: "200 ml", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=200&fit=crop", description: "Spiced traditional buttermilk.", inStock: true },

  // Shakes & Smoothies
  { id: "29", name: "Mango Shake", category: "Shakes & Smoothies", categorySlug: "shakes-smoothies", price: 55, unit: "300 ml", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=200&h=200&fit=crop", description: "Thick mango milkshake with real mango pulp.", inStock: true },
  { id: "30", name: "Strawberry Smoothie", category: "Shakes & Smoothies", categorySlug: "shakes-smoothies", price: 65, originalPrice: 75, unit: "300 ml", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=200&h=200&fit=crop", description: "Fresh strawberry smoothie with yogurt.", inStock: true },
  { id: "31", name: "Banana Shake", category: "Shakes & Smoothies", categorySlug: "shakes-smoothies", price: 50, unit: "300 ml", image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=200&h=200&fit=crop", description: "Creamy banana shake with honey.", inStock: true },
  { id: "32", name: "Oreo Shake", category: "Shakes & Smoothies", categorySlug: "shakes-smoothies", price: 70, unit: "300 ml", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=200&fit=crop", description: "Indulgent Oreo cookie milkshake.", inStock: true },

  // Health Drinks
  { id: "33", name: "Coconut Water", category: "Health Drinks", categorySlug: "health-drinks", price: 35, unit: "200 ml", image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=200&h=200&fit=crop", description: "Natural tender coconut water.", inStock: true },
  { id: "34", name: "Aloe Vera Juice", category: "Health Drinks", categorySlug: "health-drinks", price: 45, originalPrice: 55, unit: "500 ml", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop", description: "Pure aloe vera juice with pulp.", inStock: true },
  { id: "35", name: "Amla Juice", category: "Health Drinks", categorySlug: "health-drinks", price: 60, unit: "500 ml", image: "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=200&h=200&fit=crop", description: "Indian gooseberry juice rich in Vitamin C.", inStock: true },
  { id: "36", name: "Protein Shake", category: "Health Drinks", categorySlug: "health-drinks", price: 150, originalPrice: 180, unit: "400 ml", image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=200&h=200&fit=crop", description: "High protein shake with whey protein.", inStock: true },
];
