import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MenuCard({ title, description, price, image, isPopular = false, rating = 4.8 }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ title, description, price, image });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-cafe-brown-dark/5 flex flex-col h-full group"
    >
      {/* Card Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cafe-brown-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Popular Tag */}
        {isPopular && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cafe-terracotta text-cafe-cream-light text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Popular</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-lg font-bold text-cafe-brown-dark group-hover:text-cafe-terracotta transition-colors duration-300">
            {title}
          </h3>
          <span className="font-semibold text-cafe-terracotta text-base pl-3">
            ₹{price}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-sm italic text-cafe-charcoal/70 mb-4 line-clamp-2 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Rating/Order button row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-cafe-brown-dark/5">
          <div className="flex items-center text-xs text-cafe-brown-light font-medium bg-cafe-cream-medium/55 px-2.5 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
            <span>{rating} (45+)</span>
          </div>
          
          <button
            onClick={handleAdd}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
              isAdded ? 'text-emerald-600 font-bold' : 'text-cafe-terracotta hover:text-cafe-terracotta-dark'
            }`}
          >
            {isAdded ? 'Added ✓' : 'Add to Order →'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
