import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-cafe-cream-light min-h-screen py-0 overflow-hidden font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center text-center bg-cafe-brown-dark">
        {/* Background Image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale-[15%] contrast-110"
          style={{ backgroundImage: `url('/assets/hero_cafe_bg.png')` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-cafe-cream-light z-10 flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-cafe-terracotta text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Our Provenance
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight mb-4 leading-tight"
          >
            The Sourcing & Craft
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-1 bg-cafe-terracotta mb-6 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-base sm:text-lg text-cafe-cream-medium/90 max-w-2xl text-balance"
          >
            From Direct-Trade Cooperatives to our Chinchwad Roastery.
          </motion.p>
        </div>
      </section>

      {/* Sourcing Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Sidamo, Ethiopia */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
          
          {/* Text block (Left on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 border-b border-cafe-brown-dark/10 pb-4 font-mono text-xs uppercase tracking-widest text-cafe-brown-light font-semibold">
              <span className="text-cafe-terracotta">Sidamo, Ethiopia</span>
              <span className="h-1 w-1 bg-cafe-terracotta rounded-full"></span>
              <span className="text-cafe-charcoal/60">Altitude: 1900m</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cafe-brown-dark">
              The Birthplace of Coffee
            </h2>
            
            <p className="text-cafe-charcoal/80 text-sm sm:text-base leading-relaxed max-w-lg">
              We partner directly with smallholder farming families in the Sidamo region, ensuring fair-trade premiums that invest in community infrastructure. These heirloom varietals are hand-picked at peak ripeness, yielding complex floral notes and a vibrant, sparkling acidity.
            </p>
          </motion.div>

          {/* Image block (Right on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 relative group"
          >
            {/* Offset decorative shadow border */}
            <div className="absolute inset-0 bg-cafe-terracotta/10 translate-x-4 translate-y-4 rounded-2xl -z-10 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />
            
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] w-full">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/assets/about_cafe.png"
                alt="Coffee brewing details"
              />
            </div>
          </motion.div>
        </div>

        {/* Section 2: Tarrazú, Costa Rica */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Image block (Left on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative group"
          >
            {/* Offset decorative shadow border */}
            <div className="absolute inset-0 bg-cafe-terracotta/10 -translate-x-4 translate-y-4 rounded-2xl -z-10 transition-transform duration-300 group-hover:-translate-x-6 group-hover:translate-y-6" />
            
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] w-full">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/assets/artisanal_roasts.png"
                alt="Artisanal roasted coffee beans"
              />
            </div>
          </motion.div>

          {/* Text block (Right on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 border-b border-cafe-brown-dark/10 pb-4 font-mono text-xs uppercase tracking-widest text-cafe-brown-light font-semibold">
              <span className="text-cafe-terracotta">Tarrazú, Costa Rica</span>
              <span className="h-1 w-1 bg-cafe-terracotta rounded-full"></span>
              <span className="text-cafe-charcoal/60">Process: Honey</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cafe-brown-dark">
              Precision Sorting
            </h2>
            
            <p className="text-cafe-charcoal/80 text-sm sm:text-base leading-relaxed max-w-lg">
              In the steep valleys of Tarrazú, meticulous sorting is paramount. Our partners employ rigorous hand-sorting methods to ensure only the most flawless beans proceed to the drying patios. This obsessive attention to detail results in unparalleled sweetness and an exceptionally clean cup.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Roasting Philosophy Section */}
      <section className="py-24 bg-cafe-cream-medium/40 border-y border-cafe-brown-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Details (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <h2 className="font-serif text-3xl font-bold text-cafe-brown-dark">
              Calibrated Micro-Batches
            </h2>
            <p className="text-cafe-charcoal/85 text-sm sm:text-base leading-relaxed">
              Roasting is an act of translation. We utilize advanced telemetry and sensory intuition to unlock the inherent potential of every bean, roasting in small batches to maintain absolute control over the development curve.
            </p>
          </motion.div>

          {/* Cupping Note Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-cafe-brown-dark/5 shadow-sm"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-cafe-brown-light font-bold mb-6 pb-3 border-b border-cafe-brown-dark/5">
              The Cupping Note
            </h3>
            
            <div className="flex flex-col gap-3 font-mono text-xs sm:text-sm">
              <div className="flex justify-between items-center py-2.5 border-b border-cafe-brown-dark/5">
                <span className="text-cafe-charcoal/60">Roast Profile</span>
                <span className="text-cafe-brown-dark font-bold">Light-Medium</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-cafe-brown-dark/5">
                <span className="text-cafe-charcoal/60">Drop Temp</span>
                <span className="text-cafe-brown-dark font-bold">204°C</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-cafe-brown-dark/5">
                <span className="text-cafe-charcoal/60">Dev Time</span>
                <span className="text-cafe-brown-dark font-bold">11.5%</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-cafe-brown-dark/5">
                <span className="text-cafe-charcoal/60">Acidity</span>
                <span className="text-cafe-brown-dark font-bold">Vibrant</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-cafe-charcoal/60">Body</span>
                <span className="text-cafe-brown-dark font-bold">Syrupy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founders Quote Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <span className="font-serif text-6xl text-cafe-terracotta/30 leading-none">“</span>
          
          <p className="font-serif text-2xl sm:text-3xl font-light text-cafe-brown-dark italic leading-relaxed -mt-4">
            We wanted to build a sanctuary of timber and slow-dripped coffee.
          </p>
          
          <footer className="mt-6 border-t border-cafe-brown-dark/5 pt-6 w-32 mx-auto">
            <div className="font-serif text-lg font-bold text-cafe-terracotta italic">Liam & Aoife</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-cafe-charcoal/60 mt-1 font-semibold">Co-Founders</div>
          </footer>
        </motion.blockquote>
      </section>

    </div>
  );
}
