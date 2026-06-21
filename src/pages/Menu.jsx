import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCard from '../components/MenuCard';

const MENU_DATA = {
  drinks: [
    {
      title: 'Double Espresso',
      description: 'Rich, bold double shot of our signature house blend with a perfect hazelnut crema.',
      price: 120,
      image: '/assets/hero_cafe_bg.png',
      isPopular: true,
      rating: 4.9
    },
    {
      title: 'Café Latte',
      description: 'Velvety espresso shot topped with steamed micro-foam milk and delicate latte art.',
      price: 160,
      image: '/assets/about_cafe.png',
      isPopular: false,
      rating: 4.8
    },
    {
      title: 'Classic Cappuccino',
      description: 'Classic double espresso with equal parts steamed milk and thick velvety foam, dusted with cocoa.',
      price: 170,
      image: '/assets/hero_cafe_bg.png',
      isPopular: true,
      rating: 4.8
    },
    {
      title: 'Cortado',
      description: 'Equal parts double espresso and warm steamed milk, creating a perfectly balanced profile.',
      price: 140,
      image: '/assets/about_cafe.png',
      isPopular: false,
      rating: 4.7
    }
  ],
  coldbrews: [
    {
      title: 'Classic Cold Brew',
      description: 'Steeped slowly in cold water for 18 hours, yielding a smooth, low-acid, refreshing finish.',
      price: 180,
      image: '/assets/artisanal_roasts.png',
      isPopular: true,
      rating: 4.9
    },
    {
      title: 'Vanilla Sweet Cream Cold Brew',
      description: 'Our slow-steeped cold brew topped with house-made vanilla sweet cream float.',
      price: 210,
      image: '/assets/hero_cafe_bg.png',
      isPopular: true,
      rating: 4.9
    },
    {
      title: 'Iced Caramel Macchiato',
      description: 'Fresh espresso poured over cold milk and vanilla, topped with a rich caramel drizzle crosshatch.',
      price: 220,
      image: '/assets/about_cafe.png',
      isPopular: false,
      rating: 4.8
    },
    {
      title: 'Tonic Cold Brew',
      description: 'Crisp premium tonic water paired with a shot of cold brew, served with a citrus slice.',
      price: 200,
      image: '/assets/artisanal_roasts.png',
      isPopular: false,
      rating: 4.6
    }
  ],
  bites: [
    {
      title: 'Classic Butter Croissant',
      description: 'Flaky, buttery, multi-layered French pastry baked golden brown fresh every morning.',
      price: 110,
      image: '/assets/fresh_pastries.png',
      isPopular: true,
      rating: 4.8
    },
    {
      title: 'Almond Frangipane Croissant',
      description: 'Double-baked croissant filled with rich almond paste, topped with sliced almonds and powdered sugar.',
      price: 140,
      image: '/assets/fresh_pastries.png',
      isPopular: false,
      rating: 4.9
    },
    {
      title: 'Avocado Sourdough Toast',
      description: 'Toasted local sourdough, mashed Hass avocado, cherry tomatoes, feta, and microgreens.',
      price: 190,
      image: '/assets/fresh_pastries.png',
      isPopular: true,
      rating: 4.7
    },
    {
      title: 'Mushroom & Cheese Melt',
      description: 'Sautéed wild mushrooms and melted Swiss cheese with garlic aioli on toasted sourdough.',
      price: 220,
      image: '/assets/fresh_pastries.png',
      isPopular: false,
      rating: 4.6
    }
  ],
  sweets: [
    {
      title: 'Signature Tiramisu',
      description: 'Espresso-soaked ladyfingers layered with velvety whipped mascarpone cream and dark cocoa.',
      price: 240,
      image: '/assets/signature_desserts.png',
      isPopular: true,
      rating: 5.0
    },
    {
      title: 'Warm Fudge Brownie',
      description: 'Rich, chewy double chocolate fudge brownie served warm with a dusting of powdered sugar.',
      price: 165,
      image: '/assets/signature_desserts.png',
      isPopular: false,
      rating: 4.8
    },
    {
      title: 'Lemon Blueberry Tart',
      description: 'Tangy lemon curd crust filled with fresh local blueberries in a sweet, buttery tart shell.',
      price: 180,
      image: '/assets/signature_desserts.png',
      isPopular: false,
      rating: 4.7
    },
    {
      title: 'New York Cheesecake',
      description: 'Classic dense, creamy cheesecake on a graham cracker crust with a light berry compote.',
      price: 230,
      image: '/assets/signature_desserts.png',
      isPopular: true,
      rating: 4.9
    }
  ]
};

const CATEGORIES = [
  { id: 'drinks', label: 'Hot Drinks' },
  { id: 'coldbrews', label: 'Cold Brews' },
  { id: 'bites', label: 'Bites & Savories' },
  { id: 'sweets', label: 'Sweets & Desserts' }
];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'drinks';

  // Fallback to 'drinks' if url parameter is invalid
  useEffect(() => {
    if (!MENU_DATA[activeCategory]) {
      setSearchParams({ category: 'drinks' });
    }
  }, [activeCategory, setSearchParams]);

  const handleCategoryChange = (categoryId) => {
    setSearchParams({ category: categoryId });
  };

  const currentItems = MENU_DATA[activeCategory] || [];

  return (
    <div className="bg-cafe-cream-light min-h-[85vh] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cafe-terracotta text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Freshly Prepared
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl font-bold text-cafe-brown-dark mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-cafe-terracotta mx-auto mb-4 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-cafe-charcoal/70 text-sm sm:text-base leading-relaxed"
          >
            Indulge in our carefully selected single-origin espresso creations, slow-steeped cold brews, and baked goods.
          </motion.p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap md:flex-nowrap bg-cafe-cream-medium/55 p-1.5 rounded-2xl border border-cafe-brown-dark/5 gap-1 max-w-full overflow-x-auto no-scrollbar justify-center shadow-sm">
            {CATEGORIES.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`relative px-6 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-cafe-cream-light font-semibold' : 'text-cafe-brown-dark/75 hover:text-cafe-terracotta'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMenuTab"
                      className="absolute inset-0 bg-cafe-terracotta rounded-xl shadow-sm z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {currentItems.map((item) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <MenuCard {...item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Menu Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20 p-8 rounded-3xl bg-cafe-cream-medium/35 border border-cafe-brown-dark/5 max-w-3xl mx-auto"
        >
          <h3 className="font-serif text-lg font-bold text-cafe-brown-dark mb-2">Dietary Information & Customizations</h3>
          <p className="text-xs text-cafe-charcoal/70 leading-relaxed">
            All our beverages can be customized with oat, almond, or soy milk (additional ₹30). Please inform our baristas of any food allergies before placing your order. All prices are in Indian Rupees (INR) and are inclusive of local taxes.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
