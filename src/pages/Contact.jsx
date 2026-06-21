import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

// Custom inline SVG social icons to replace deprecated Lucide brand icons
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Auto reset success message after 5s
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-cafe-cream-light py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cafe-terracotta text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl font-bold text-cafe-brown-dark mb-4"
          >
            Contact & Location
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
            Have a question, feedback, or just want to chat coffee? Send us a message or find us in Chinchwad.
          </motion.p>
        </div>

        {/* Info & Form Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24">
          
          {/* Left Details Panel (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 bg-cafe-brown-dark text-cafe-cream-light p-8 sm:p-10 rounded-3xl flex flex-col justify-between shadow-lg border border-cafe-brown-medium/35"
          >
            <div>
              <h2 className="font-serif text-2xl font-bold text-cafe-cream-light mb-6">Contact Information</h2>
              
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-cafe-brown-light/45 text-cafe-terracotta shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cafe-cream-medium text-sm">Our Location</h3>
                    <p className="text-sm text-cafe-cream-light/85 mt-1 leading-relaxed">
                      123, Coffee House Lane, Chinchwad, Pimpri-Chinchwad, Maharashtra 411019
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-cafe-brown-light/45 text-cafe-terracotta shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cafe-cream-medium text-sm">Call Us</h3>
                    <p className="text-sm text-cafe-cream-light/85 mt-1">
                      <a href="tel:+912012345678" className="hover:text-cafe-terracotta transition-colors duration-200">
                        +91 20 1234 5678
                      </a>
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-cafe-brown-light/45 text-cafe-terracotta shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cafe-cream-medium text-sm">Email Us</h3>
                    <p className="text-sm text-cafe-cream-light/85 mt-1">
                      <a href="mailto:hello@cafearoma.com" className="hover:text-cafe-terracotta transition-colors duration-200">
                        hello@cafearoma.com
                      </a>
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-cafe-brown-light/45 text-cafe-terracotta shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cafe-cream-medium text-sm">Business Hours</h3>
                    <div className="text-sm text-cafe-cream-light/85 mt-1 space-y-1">
                      <p>Mon - Fri: 7:00 AM - 9:00 PM</p>
                      <p>Sat - Sun: 8:00 AM - 10:00 PM</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social Block */}
            <div className="mt-12 pt-8 border-t border-cafe-brown-light/20">
              <h4 className="text-xs uppercase tracking-widest font-bold text-cafe-terracotta mb-4">Follow Our Journey</h4>
              <div className="flex space-x-3">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-xl bg-cafe-brown-light/30 flex items-center justify-center text-cafe-cream-medium hover:text-cafe-terracotta hover:bg-cafe-cream-light transition-all duration-300"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-xl bg-cafe-brown-light/30 flex items-center justify-center text-cafe-cream-medium hover:text-cafe-terracotta hover:bg-cafe-cream-light transition-all duration-300"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-xl bg-cafe-brown-light/30 flex items-center justify-center text-cafe-cream-medium hover:text-cafe-terracotta hover:bg-cafe-cream-light transition-all duration-300"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Form Panel (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-white/60 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-cafe-brown-dark/5 shadow-sm flex flex-col justify-center"
          >
            <h2 className="font-serif text-2xl font-bold text-cafe-brown-dark mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div className="flex flex-col">
                <label htmlFor="name" className="text-xs font-semibold text-cafe-brown-light mb-1.5 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="px-4 py-3 rounded-xl border border-cafe-cream-dark bg-cafe-cream-light/40 text-cafe-charcoal placeholder-cafe-charcoal/30 focus:outline-none focus:ring-2 focus:ring-cafe-terracotta/40 focus:border-cafe-terracotta transition-all duration-300 text-sm"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-xs font-semibold text-cafe-brown-light mb-1.5 uppercase tracking-wide">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="px-4 py-3 rounded-xl border border-cafe-cream-dark bg-cafe-cream-light/40 text-cafe-charcoal placeholder-cafe-charcoal/30 focus:outline-none focus:ring-2 focus:ring-cafe-terracotta/40 focus:border-cafe-terracotta transition-all duration-300 text-sm"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col">
                <label htmlFor="message" className="text-xs font-semibold text-cafe-brown-light mb-1.5 uppercase tracking-wide">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your message here..."
                  className="px-4 py-3 rounded-xl border border-cafe-cream-dark bg-cafe-cream-light/40 text-cafe-charcoal placeholder-cafe-charcoal/30 focus:outline-none focus:ring-2 focus:ring-cafe-terracotta/40 focus:border-cafe-terracotta transition-all duration-300 text-sm resize-none"
                />
              </div>

              {/* Submit Button & Alert Messages */}
              <div className="pt-2 relative">
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-cafe-terracotta hover:bg-cafe-terracotta-dark text-cafe-cream-light font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-cafe-cream-light border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -bottom-16 left-0 right-0 flex items-center space-x-2 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs sm:text-sm shadow-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Thank you! Your message was sent successfully. We will reply soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

        </div>

        {/* Stylized geometric SVG map representing Pimpri-Chinchwad */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-cafe-cream-medium/40 rounded-3xl p-6 sm:p-8 border border-cafe-brown-dark/5 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-cafe-brown-dark">Our Location Map</h2>
              <p className="text-xs sm:text-sm text-cafe-charcoal/70 mt-1">
                Centrally located in Chinchwad, Pimpri-Chinchwad, Maharashtra. Easy access from highways.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-cafe-terracotta bg-cafe-cream-light px-3 py-1.5 rounded-full border border-cafe-brown-dark/5 w-fit">
              <span className="w-2 h-2 rounded-full bg-cafe-terracotta animate-ping mr-2" />
              <span>Café Aroma Landmark Pin</span>
            </div>
          </div>

          {/* Interactive geometric map area */}
          <div className="relative bg-[#EEE8E2] border border-cafe-cream-dark rounded-2xl h-[350px] overflow-hidden group shadow-inner">
            
            {/* Map Roads & River (Geometric Vector Representation) */}
            <svg className="absolute inset-0 w-full h-full text-cafe-cream-medium" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Pawana River */}
              <path d="M-50 180 Q100 120 300 190 T700 130 T1200 200" stroke="#CADBE9" strokeWidth="32" strokeLinecap="round" />
              <path d="M-50 180 Q100 120 300 190 T700 130 T1200 200" stroke="#DCEAF5" strokeWidth="20" strokeLinecap="round" />
              
              {/* Major Roads */}
              <line x1="-20" y1="80" x2="1200" y2="280" stroke="#DFCFC2" strokeWidth="12" />
              <line x1="-20" y1="80" x2="1200" y2="280" stroke="#FAF8F5" strokeWidth="6" />

              <line x1="400" y1="-20" x2="450" y2="400" stroke="#DFCFC2" strokeWidth="10" />
              <line x1="400" y1="-20" x2="450" y2="400" stroke="#FAF8F5" strokeWidth="4" />

              <line x1="150" y1="-20" x2="900" y2="420" stroke="#DFCFC2" strokeWidth="8" />
              <line x1="150" y1="-20" x2="900" y2="420" stroke="#FAF8F5" strokeWidth="3" />

              {/* Smaller Streets */}
              <line x1="750" y1="20" x2="680" y2="380" stroke="#FAF8F5" strokeWidth="3" />
              <line x1="200" y1="300" x2="1100" y2="100" stroke="#FAF8F5" strokeWidth="3" />
              
              {/* Local Area Landmark Texts */}
              <text x="80" y="50" fill="#8C7D73" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">CHINCHWAD STN ROAD</text>
              <text x="850" y="320" fill="#8C7D73" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">MUMBAI-PUNE EXPRESSWAY</text>
              <text x="250" y="240" fill="#6A8EA8" fontSize="10" fontWeight="bold" fontFamily="sans-serif" transform="rotate(6, 250, 240)">PAWANA RIVER</text>
              <text x="600" y="60" fill="#8C7D73" fontSize="10" fontFamily="sans-serif">D-Mart Chinchwad</text>
              <text x="200" y="130" fill="#8C7D73" fontSize="10" fontFamily="sans-serif">Chinchwad Chowk</text>
              <text x="480" y="360" fill="#8C7D73" fontSize="10" fontFamily="sans-serif">Thergaon Park</text>
            </svg>
            
            {/* Green Parks */}
            <div className="absolute top-[40px] left-[70%] w-32 h-20 bg-[#D4E2CD] rounded-full filter blur-[8px] opacity-75" />
            <div className="absolute top-[280px] left-[15%] w-24 h-16 bg-[#D4E2CD] rounded-full filter blur-[6px] opacity-70" />

            {/* Glowing Cafe Marker Pin */}
            <div className="absolute top-[170px] left-[55%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              {/* Pulsing ring */}
              <div className="absolute w-12 h-12 bg-cafe-terracotta/30 rounded-full animate-ping mt-1" />
              
              {/* Pin */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="relative bg-cafe-brown-dark border-2 border-cafe-terracotta p-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-cafe-cream-light cursor-pointer z-20 group"
              >
                <div className="bg-cafe-terracotta p-1 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-left pr-1">
                  <p className="font-serif text-xs font-bold tracking-tight">Café Aroma</p>
                  <p className="text-[9px] text-cafe-cream-medium/80 font-medium">Click to navigate</p>
                </div>
              </motion.div>
              
              {/* Pin pointer stem */}
              <div className="w-3 h-3 bg-cafe-brown-dark border-r border-b border-cafe-terracotta transform rotate-45 -mt-1.5 z-10" />
            </div>

            {/* Scale indicator and zoom placeholders for authenticity */}
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-cafe-brown-dark/5 flex items-center space-x-3 text-[10px] text-cafe-charcoal/80 font-mono shadow-sm">
              <span>500 m</span>
              <div className="w-12 h-0.5 bg-cafe-charcoal" />
            </div>
            
            <div className="absolute top-4 right-4 flex flex-col space-y-1">
              <button onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white text-cafe-charcoal font-bold flex items-center justify-center border border-cafe-brown-dark/5 shadow-sm text-sm active:scale-95 transition-all cursor-pointer">+</button>
              <button onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white text-cafe-charcoal font-bold flex items-center justify-center border border-cafe-brown-dark/5 shadow-sm text-sm active:scale-95 transition-all cursor-pointer">-</button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
