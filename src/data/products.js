const products = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    brand: "Apple",
    price: 4200,
    category: "Smartphones",
    rating: 4.8,
    stock: 3,
    description:
      "Premium smartphone with powerful performance and advanced camera system.",
    image:
      "https://images.unsplash.com/photo-1697120397972-cee0865a6fd6?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 2,
    title: "Samsung Galaxy S24",
    brand: "Samsung",
    price: 3500,
    category: "Smartphones",
    rating: 4.7,
    stock: 0,
    description:
      "Powerful Android smartphone with an excellent display and camera.",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 3,
    title: "Google Pixel 9",
    brand: "Google",
    price: 3200,
    category: "Smartphones",
    rating: 4.6,
    stock: 12,
    description:
      "Smartphone with excellent photography and clean Android experience.",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
  },
{
  id: 4,
  title: "MacBook Air M3",
  brand: "Apple",
  price: 6200,
  category: "Laptops",
  rating: 4.9,
  stock: 15,
  description:
    "Thin and powerful laptop featuring the Apple M3 chip.",
  image:
    "https://images.unsplash.com/photo-1657770295015-79b98a3e37ac?auto=format&fit=crop&w=600&q=80",
},

{
  id: 5,
  title: "MacBook Pro 14",
  brand: "Apple",
  price: 8500,
  category: "Laptops",
  rating: 4.9,
  stock: 6,
  description:
    "Professional laptop designed for demanding creative and development tasks.",
  image:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
},
  {
    id: 6,
    title: "Dell XPS 15",
    brand: "Dell",
    price: 5900,
    category: "Laptops",
    rating: 4.7,
    stock: 10,
    description:
      "Premium Windows laptop with a powerful processor and beautiful display.",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 7,
    title: "HP Pavilion 15",
    brand: "HP",
    price: 3200,
    category: "Laptops",
    rating: 4.4,
    stock: 18,
    description:
      "Reliable laptop suitable for studying, work and everyday tasks.",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 8,
    title: "Lenovo Legion 5",
    brand: "Lenovo",
    price: 4800,
    category: "Gaming",
    rating: 4.8,
    stock: 9,
    description: "Gaming laptop with strong performance for modern games.",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 9,
    title: "AirPods Pro 2",
    brand: "Apple",
    price: 1100,
    category: "Headphones",
    rating: 4.8,
    stock: 25,
    description:
      "Wireless earbuds with active noise cancellation and excellent sound.",
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 10,
    title: "Galaxy Buds 3 Pro",
    brand: "Samsung",
    price: 850,
    category: "Headphones",
    rating: 4.6,
    stock: 22,
    description:
      "Premium wireless earbuds with immersive sound and noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 11,
    title: "Sony WH-1000XM5",
    brand: "Sony",
    price: 1400,
    category: "Headphones",
    rating: 4.9,
    stock: 14,
    description:
      "Premium over-ear headphones with industry-leading noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 12,
    title: "JBL Tune 770NC",
    brand: "JBL",
    price: 650,
    category: "Headphones",
    rating: 4.5,
    stock: 30,
    description:
      "Comfortable wireless headphones with powerful JBL sound.",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 13,
    title: "Apple Watch Series 9",
    brand: "Apple",
    price: 1800,
    category: "Smart Watches",
    rating: 4.8,
    stock: 11,
    description:
      "Smart watch with health, fitness and productivity features.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 14,
    title: "Samsung Galaxy Watch 7",
    brand: "Samsung",
    price: 1300,
    category: "Smart Watches",
    rating: 4.6,
    stock: 16,
    description:
      "Modern smartwatch with health tracking and fitness features.",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 15,
    title: "Xiaomi Watch 2",
    brand: "Xiaomi",
    price: 750,
    category: "Smart Watches",
    rating: 4.4,
    stock: 20,
    description:
      "Affordable smartwatch with useful fitness and smart features.",
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 16,
    title: "Samsung Odyssey G5",
    brand: "Samsung",
    price: 2200,
    category: "Monitors",
    rating: 4.7,
    stock: 7,
    description:
      "Curved gaming monitor designed for an immersive gaming experience.",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 17,
    title: "LG UltraGear 27",
    brand: "LG",
    price: 1900,
    category: "Monitors",
    rating: 4.6,
    stock: 13,
    description:
      "High-performance gaming monitor with smooth refresh rate.",
    image:
      "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 18,
    title: "Dell UltraSharp 27",
    brand: "Dell",
    price: 2100,
    category: "Monitors",
    rating: 4.8,
    stock: 8,
    description:
      "Professional monitor with excellent colors and sharp image quality.",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 19,
    title: "Logitech MX Keys",
    brand: "Logitech",
    price: 500,
    category: "Keyboards",
    rating: 4.7,
    stock: 25,
    description:
      "Premium wireless keyboard designed for comfortable productivity.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 20,
    title: "Razer BlackWidow V3",
    brand: "Razer",
    price: 700,
    category: "Keyboards",
    rating: 4.6,
    stock: 17,
    description:
      "Mechanical gaming keyboard with responsive switches.",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 21,
    title: "Logitech MX Master 3S",
    brand: "Logitech",
    price: 550,
    category: "Mice",
    rating: 4.8,
    stock: 21,
    description:
      "Advanced wireless mouse designed for productivity and precision.",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 22,
    title: "Razer DeathAdder V3",
    brand: "Razer",
    price: 450,
    category: "Mice",
    rating: 4.7,
    stock: 24,
    description:
      "Lightweight gaming mouse designed for fast and accurate movements.",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 23,
    title: "PlayStation 5",
    brand: "Sony",
    price: 2700,
    category: "Gaming",
    rating: 4.9,
    stock: 5,
    description:
      "Next-generation gaming console with powerful performance.",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 24,
    title: "Xbox Series X",
    brand: "Microsoft",
    price: 2500,
    category: "Gaming",
    rating: 4.8,
    stock: 7,
    description:
      "Powerful gaming console designed for high-quality gaming.",
    image:
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 25,
    title: "Nintendo Switch OLED",
    brand: "Nintendo",
    price: 1700,
    category: "Gaming",
    rating: 4.7,
    stock: 12,
    description:
      "Portable gaming console with a beautiful OLED display.",
    image:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 26,
    title: "Anker Power Bank 20000mAh",
    brand: "Anker",
    price: 350,
    category: "Accessories",
    rating: 4.6,
    stock: 35,
    description:
      "High-capacity portable power bank for charging your devices.",
    image:
      "https://images.unsplash.com/photo-1564286026507-03875c383229?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 27,
    title: "Apple 20W USB-C Charger",
    brand: "Apple",
    price: 180,
    category: "Accessories",
    rating: 4.5,
    stock: 40,
    description:
      "Compact USB-C power adapter for fast charging.",
    image:
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 28,
    title: "Belkin USB-C Hub",
    brand: "Belkin",
    price: 420,
    category: "Accessories",
    rating: 4.4,
    stock: 18,
    description:
      "Multi-port USB-C hub for connecting multiple devices.",
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 29,
    title: "Amazon Echo Dot",
    brand: "Amazon",
    price: 300,
    category: "Smart Home",
    rating: 4.5,
    stock: 27,
    description:
      "Compact smart speaker with voice assistant features.",
    image:
      "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 30,
    title: "Google Nest Hub",
    brand: "Google",
    price: 600,
    category: "Smart Home",
    rating: 4.6,
    stock: 15,
    description:
      "Smart display for controlling compatible smart home devices.",
    image:
      "https://images.unsplash.com/photo-1650682009477-52fd77302b78?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 31,
    title: "iPhone 16 Pro",
    brand: "Apple",
    price: 4800,
    category: "Smartphones",
    rating: 4.9,
    stock: 10,
    description:
      "Advanced smartphone with powerful performance and a professional camera system.",
    image:
      "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 32,
    title: "Samsung Galaxy S25",
    brand: "Samsung",
    price: 3900,
    category: "Smartphones",
    rating: 4.8,
    stock: 14,
    description:
      "Modern flagship smartphone with powerful performance and a vibrant display.",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 33,
    title: "MacBook Pro 16",
    brand: "Apple",
    price: 9800,
    category: "Laptops",
    rating: 4.9,
    stock: 5,
    description:
      "High-performance professional laptop built for demanding creative workflows.",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 34,
    title: "ASUS ROG Strix G16",
    brand: "ASUS",
    price: 7200,
    category: "Gaming",
    rating: 4.8,
    stock: 7,
    description:
      "Powerful gaming laptop designed for demanding games and high-performance tasks.",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 35,
    title: "AirPods 4",
    brand: "Apple",
    price: 900,
    category: "Headphones",
    rating: 4.7,
    stock: 20,
    description:
      "Comfortable wireless earbuds with clear sound and seamless connectivity.",
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 36,
    title: "Sony WF-1000XM5",
    brand: "Sony",
    price: 1600,
    category: "Headphones",
    rating: 4.9,
    stock: 12,
    description:
      "Premium wireless earbuds with excellent sound quality and noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 37,
    title: "Apple Watch Ultra 2",
    brand: "Apple",
    price: 3200,
    category: "Smart Watches",
    rating: 4.9,
    stock: 8,
    description:
      "Rugged smartwatch designed for fitness, adventure and everyday performance.",
    image:
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 38,
    title: "Logitech G Pro Keyboard",
    brand: "Logitech",
    price: 950,
    category: "Keyboards",
    rating: 4.8,
    stock: 13,
    description:
      "Professional mechanical gaming keyboard built for speed and precision.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 39,
    title: "Logitech G502 X",
    brand: "Logitech",
    price: 800,
    category: "Mice",
    rating: 4.8,
    stock: 16,
    description:
      "High-performance gaming mouse with precise tracking and customizable controls.",
    image:
      "https://images.unsplash.com/photo-1563297007-0686b7003af7?auto=format&fit=crop&w=600&q=80",
  },

  {
    id: 40,
    title: "Anker USB-C Cable",
    brand: "Anker",
    price: 120,
    category: "Accessories",
    rating: 4.6,
    stock: 50,
    description:
      "Durable USB-C charging cable designed for fast and reliable connectivity.",
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80",
  },
];

export default products;