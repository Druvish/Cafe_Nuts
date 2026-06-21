import { Link } from 'react-router-dom';
import { Coffee, Mail, Phone, MapPin } from 'lucide-react';

// Custom inline SVG social icons to replace deprecated Lucide brand icons
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-cafe-brown-dark text-cafe-cream-light/80 border-t border-cafe-brown-medium pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group w-max">
              <div className="p-2 rounded-full bg-cafe-terracotta text-cafe-cream-light">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-cafe-cream-light group-hover:text-cafe-terracotta transition-colors duration-300">
                Café <span className="text-cafe-terracotta">Aroma</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-cafe-cream-medium/70">
              Crafting perfect moments, one cup at a time. Experience our custom micro-roasts and freshly baked delicacies in a cozy, welcoming environment.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                onClick={handleSocialClick}
                className="w-9 h-9 rounded-full bg-cafe-brown-medium flex items-center justify-center text-cafe-cream-medium hover:text-cafe-terracotta hover:bg-cafe-cream-light transition-all duration-300"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="#"
                onClick={handleSocialClick}
                className="w-9 h-9 rounded-full bg-cafe-brown-medium flex items-center justify-center text-cafe-cream-medium hover:text-cafe-terracotta hover:bg-cafe-cream-light transition-all duration-300"
              >
                <FacebookIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="#"
                onClick={handleSocialClick}
                className="w-9 h-9 rounded-full bg-cafe-brown-medium flex items-center justify-center text-cafe-cream-medium hover:text-cafe-terracotta hover:bg-cafe-cream-light transition-all duration-300"
              >
                <TwitterIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-cafe-cream-light mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-cafe-terracotta transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-cafe-terracotta transition-colors duration-200">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cafe-terracotta transition-colors duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cafe-terracotta transition-colors duration-200">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-cafe-cream-light mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-cafe-cream-medium/70">
              <li className="flex justify-between border-b border-cafe-brown-medium/40 pb-1">
                <span>Monday - Friday</span>
                <span className="text-cafe-cream-light">7:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-cafe-brown-medium/40 pb-1">
                <span>Saturday</span>
                <span className="text-cafe-cream-light">8:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between pb-1">
                <span>Sunday</span>
                <span className="text-cafe-cream-light">8:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-cafe-cream-light mb-4">Find Us</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-cafe-terracotta shrink-0 mt-0.5" />
                <span className="text-cafe-cream-medium/70">
                  123, Coffee House Lane, Chinchwad, Pimpri-Chinchwad, Maharashtra 411019
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-cafe-terracotta shrink-0" />
                <a href="tel:+912012345678" className="text-cafe-cream-medium/70 hover:text-cafe-cream-light">
                  +91 20 1234 5678
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-cafe-terracotta shrink-0" />
                <a href="mailto:hello@cafearoma.com" className="text-cafe-cream-medium/70 hover:text-cafe-cream-light">
                  hello@cafearoma.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cafe-brown-medium/40 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-cafe-cream-medium/55">
          <p>&copy; {currentYear} Café Aroma. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/chef" className="hover:text-cafe-cream-light text-cafe-terracotta font-semibold">Chef Terminal &rarr;</Link>
            <a href="#" onClick={handleSocialClick} className="hover:text-cafe-cream-light">Privacy Policy</a>
            <a href="#" onClick={handleSocialClick} className="hover:text-cafe-cream-light">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
