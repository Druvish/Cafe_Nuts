import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wifi, Leaf, Heart, ArrowRight } from 'lucide-react';
import Typewriter from '../components/Typewriter';

export default function Home() {
  const categories = [
    {
      title: 'Artisanal Roasts',
      description: 'Single-origin beans custom micro-roasted weekly.',
      image: '/assets/artisanal_roasts.png',
      link: '/menu?category=drinks'
    },
    {
      title: 'Fresh Pastries',
      description: 'Flaky croissants and scones baked in-house daily.',
      image: '/assets/fresh_pastries.png',
      link: '/menu?category=bites'
    },
    {
      title: 'Signature Desserts',
      description: 'Heavenly sweets crafted by our pastry chef.',
      image: '/assets/signature_desserts.png',
      link: '/menu?category=sweets'
    }
  ];

  const bannerItems = [
    { icon: Wifi, text: 'Free High-Speed Wi-Fi' },
    { icon: Leaf, text: 'Locally Sourced Ingredients' },
    { icon: Heart, text: 'Cozy & Welcoming Ambience' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[92vh] flex items-center justify-center text-center bg-cafe-brown-dark">
        {/* Background Image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/hero_cafe_bg.png')` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-cafe-cream-light z-10 flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-cafe-terracotta text-sm sm:text-base font-semibold tracking-widest uppercase mb-4"
          >
            Welcome to Café Aroma
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight max-w-3xl"
          >
            Crafting <Typewriter words={['perfect moments', 'custom roasts', 'fresh memories']} speed={100} deleteSpeed={60} delay={2500} />, one cup at a time.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-base sm:text-lg text-cafe-cream-medium/80 mb-8 max-w-xl font-sans"
          >
            Nestled in the heart of Chinchwad, we brew premium single-origin coffee alongside artisanal treats baked fresh every morning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/menu"
              className="px-8 py-3.5 rounded-full bg-cafe-terracotta hover:bg-cafe-terracotta-dark text-cafe-cream-light font-medium text-base transition-all duration-300 shadow-lg hover:shadow-cafe-terracotta/25 hover:-translate-y-0.5"
            >
              View Menu
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 rounded-full border border-cafe-cream-medium/40 hover:border-cafe-cream-light bg-white/5 hover:bg-white/10 text-cafe-cream-light font-medium text-base transition-all duration-300 hover:-translate-y-0.5"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10 hidden sm:block"
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
        >
          <div className="w-6 h-10 rounded-full border-2 border-cafe-cream-medium/40 flex justify-center p-1.5">
            <div className="w-1.5 h-1.5 bg-cafe-terracotta rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Info Banner Section */}
      <section className="bg-cafe-brown-medium py-6 text-cafe-cream-light border-y border-cafe-brown-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {bannerItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 bg-cafe-brown-dark/30 py-4 px-6 rounded-2xl border border-cafe-brown-light/10"
              >
                <div className="p-2.5 rounded-full bg-cafe-terracotta/15 text-cafe-terracotta">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm sm:text-base tracking-wide text-cafe-cream-medium">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="py-24 bg-cafe-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl font-bold text-cafe-brown-dark mb-4"
            >
              Explore Our Highlights
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-cafe-terracotta mx-auto mb-4 rounded-full"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-cafe-charcoal/70 text-sm sm:text-base leading-relaxed"
            >
              Handcrafted beverages and gourmet treats baked fresh by local bakers to perfect your day.
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-md border border-cafe-brown-dark/5"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${category.image}')` }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cafe-brown-dark/90 via-cafe-brown-dark/40 to-transparent transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-cafe-cream-light z-10">
                  <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-cafe-terracotta transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-sm text-cafe-cream-medium/80 mb-5 leading-relaxed">
                    {category.description}
                  </p>
                  <Link
                    to={category.link}
                    className="inline-flex items-center space-x-2 text-sm font-semibold text-cafe-terracotta group-hover:text-cafe-cream-light transition-colors duration-300"
                  >
                    <span>Browse Category</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Visual Callout */}
      <section className="bg-cafe-cream-medium/40 py-20 border-t border-cafe-brown-dark/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="font-serif italic text-cafe-terracotta text-2xl">Brewed with Love</span>
            <p className="font-serif text-3xl font-bold text-cafe-brown-dark leading-snug">
              "A cup of coffee shared with a friend is happiness tasted and time well spent."
            </p>
            <p className="text-sm uppercase tracking-wider font-semibold text-cafe-brown-light">
              Visit us today and find your new favorite spot.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
