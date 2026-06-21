import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalItems, setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 shadow-md' : 'py-5'
    } glass-nav`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-2 rounded-full bg-cafe-brown-dark text-cafe-cream-light"
            >
              <Coffee className="w-6 h-6" />
            </motion.div>
            <span className="font-serif text-2xl font-bold tracking-tight text-cafe-brown-dark group-hover:text-cafe-terracotta transition-colors duration-300">
              Café <span className="text-cafe-terracotta">Aroma</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-1 py-2 font-medium transition-colors duration-300 text-sm tracking-wide ${
                    isActive
                      ? 'text-cafe-terracotta font-semibold'
                      : 'text-cafe-brown-dark/80 hover:text-cafe-terracotta'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cafe-terracotta rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Action Area (Cart & Buttons) */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full bg-cafe-cream-medium/55 hover:bg-cafe-cream-medium text-cafe-brown-dark hover:text-cafe-terracotta hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-cafe-terracotta text-cafe-cream-light text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-cafe-cream-light shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Order Online Button (Desktop Only) */}
            <Link
              to="/menu"
              className="hidden md:block px-5 py-2.5 rounded-full bg-cafe-terracotta hover:bg-cafe-terracotta-dark text-cafe-cream-light font-medium text-sm transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
            >
              Order Online
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-cafe-brown-dark hover:text-cafe-terracotta hover:bg-cafe-cream-medium/50 focus:outline-none transition-colors duration-300"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-cafe-brown-dark/5 bg-cafe-cream-light/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-lg text-base font-medium transition-all ${
                      isActive
                        ? 'bg-cafe-cream-medium text-cafe-terracotta font-semibold'
                        : 'text-cafe-brown-dark hover:bg-cafe-cream-medium/40 hover:text-cafe-terracotta'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-2 px-3">
                <Link
                  to="/menu"
                  className="block w-full text-center px-4 py-3 rounded-xl bg-cafe-terracotta text-cafe-cream-light font-semibold shadow-md active:bg-cafe-terracotta-dark transition-all duration-200"
                >
                  Order Online
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
