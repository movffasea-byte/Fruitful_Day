// Same shapes as the Supabase tables (Phase 2). Prices are integer Naira.

export interface Category {
  id: string
  name: string
  slug: string
  sort_order: number
  icon: string
}

export interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string
  price: number
  image_url: string
  is_available: boolean
  sort_order: number
}

export interface Topping {
  id: string
  name: string
  price: number
  applies_to: string[] // category slugs
  requires_18?: boolean
}

export interface DeliveryZone {
  id: string
  name: string
  fee: number
  is_active: boolean
}

export interface Settings {
  store_open: boolean
  opening_hours: string
  whatsapp_number: string
  store_address: string
}

export const categories: Category[] = [
  { id: 'smoothies', name: 'Smoothies', slug: 'smoothies', sort_order: 1, icon: '🥤' },
  { id: 'milkshakes', name: 'Milkshakes', slug: 'milkshakes', sort_order: 2, icon: '🍦' },
  { id: 'juices', name: 'Juices', slug: 'juices', sort_order: 3, icon: '🍊' },
  { id: 'sandwiches', name: 'Sandwiches', slug: 'sandwiches', sort_order: 4, icon: '🥪' },
  { id: 'protein', name: 'Protein', slug: 'protein', sort_order: 5, icon: '🍗' },
  { id: 'shawarma', name: 'Shawarma', slug: 'shawarma', sort_order: 6, icon: '🌯' },
  { id: 'wellness-shots', name: 'Wellness Shots', slug: 'wellness-shots', sort_order: 7, icon: '🌿' },
  { id: 'extras', name: 'Extras', slug: 'extras', sort_order: 8, icon: '🍟' },
]

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// [name, price, description]
type Row = [string, number, string?]

const rows: Record<string, Row[]> = {
  smoothies: [
    ['Banana Smoothie', 3000],
    ['Banana Apple Smoothie', 3200],
    ['Mango Smoothie', 3500],
    ['Blueberry Blast', 4000],
    ['Peaches and Cream', 4000],
    ['Avocado Smoothie', 3500],
    ['Coconut Smoothie', 3200],
    ['Carrot Cake Smoothie', 3200],
    ['Orange Creamsicle', 3200],
    ['Chocolate Banana', 3500],
    ['Matcha Green', 4000],
    ['Coconut Berry', 4000],
    ['Peanut Butter Banana', 4000],
    ['Creamy Oatmeal', 4000],
    ['Strawberry Smoothie', 4000],
  ],
  milkshakes: [
    ['Apple Milkshake', 4000],
    ['Oreo Milkshake', 4500],
    ['Banana Milkshake', 4000],
    ['Strawberry Milkshake', 5500],
    ['Chocolate Milkshake', 4500],
  ],
  juices: [
    ['Green Juice', 1500],
    ['Apple Cucumber Orange & Lemon', 4000],
    ['Pineapple Carrot Juice', 2000],
    ['Beetroot Pineapple & Ginger Juice', 3000],
    ['Beetroot Apples Carrot & Ginger Juice', 3200],
    ['Carrot Orange Juice', 3200],
    ['Pineapple Cucumber Orange & Ginger Juice', 4000],
    ['Watermelon Pineapple Juice', 3000],
    ['Watermelon & Beetroot Juice', 3000],
    ['Watermelon Pineapple & Mango Juice', 3500],
  ],
  sandwiches: [
    ['Tuna Sandwich', 3000],
    ['Chicken Sandwich', 4000],
    ['Chicken Egg Sandwich', 4200],
    ['Sausage Max Sandwich', 3500],
    ['Double Decker', 4500],
    ['Vegetable Sandwich', 3500],
  ],
  protein: [
    ['Peppered Turkey', 8500],
    ['Wings', 4500],
    ['Drumsticks', 5000],
    ['Grilled Dodo (Gizz Dodo)', 6000],
  ],
  shawarma: [
    ['Chicken Shawarma', 5000],
    ['Suya Shawarma', 5500],
  ],
  'wellness-shots': [
    ['Glow Skin Shot', 1500],
    ['Gut Reset Shot', 1500],
    ['Lemon & Ginger Shot', 1500],
  ],
  extras: [
    ['Fries', 1500],
    ['Plantain', 1500],
  ],
}

export const menuItems: MenuItem[] = categories.flatMap((c) =>
  (rows[c.slug] ?? []).map(([name, price, description], i) => ({
    id: slugify(name),
    category_id: c.id,
    name,
    description: description ?? '',
    price,
    image_url: `/images/placeholders/${c.slug}.svg`,
    is_available: true,
    sort_order: i + 1,
  })),
)

// Unconfirmed: applies to smoothies and milkshakes only
export const toppings: Topping[] = [
  { id: 'groundnut', name: 'Groundnut', price: 500, applies_to: ['smoothies', 'milkshakes'] },
  { id: 'coconut-flakes', name: 'Coconut Flakes', price: 500, applies_to: ['smoothies', 'milkshakes'] },
  { id: 'alcohol-shots', name: 'Alcohol Shots', price: 1000, applies_to: ['smoothies', 'milkshakes'], requires_18: true },
]

// Flat placeholder fee until the client confirms. Area-based zones can be added as rows.
export const deliveryZones: DeliveryZone[] = [
  { id: 'ile-ife', name: 'Delivery within Ile-Ife', fee: 1000, is_active: true },
  { id: 'pickup', name: 'Walk-in / pickup at our Ife store', fee: 0, is_active: true },
]

export const settings: Settings = {
  store_open: true,
  opening_hours: 'Mon–Sat, 9am – 8pm (placeholder)',
  whatsapp_number: '2348122254443',
  store_address: 'Fruitful Day store, Ile-Ife, Osun State (address to be confirmed)',
}

export const formatNaira = (n: number) => `₦${n.toLocaleString('en-NG')}`
