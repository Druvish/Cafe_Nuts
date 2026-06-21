import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Loader2, CheckCircle2, ClipboardCheck, ArrowLeft, CalendarDays } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
    addOrder
  } = useCart();

  // Simplified Checkout Wizard Steps: 'cart' | 'details' | 'confirmed'
  const [step, setStep] = useState('cart');

  // Customer Info State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('As soon as possible (15-20 Mins)');

  // Loading/Checkout confirmation states
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState('');
  const [currentPickupCode, setCurrentPickupCode] = useState('');

  // Calculations
  const packagingFee = subtotal > 0 ? 30 : 0;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst + packagingFee;

  // Reset checkout flow states when drawer closes/opens
  useEffect(() => {
    if (!isCartOpen) {
      setStep('cart');
    }
  }, [isCartOpen]);

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    finalizeOrder();
  };

  // Process final order dispatch
  const finalizeOrder = () => {
    setIsProcessing(true);
    const orderId = `AROMA-${Math.floor(1000 + Math.random() * 9000)}`;
    const pickupCode = `PICKUP-${Math.floor(100 + Math.random() * 900)}`;
    
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentOrderId(orderId);
      setCurrentPickupCode(pickupCode);
      
      // Dispatch order to global context state (Chef Dashboard tab listens to this)
      addOrder({
        orderId,
        pickupCode,
        customerName,
        customerPhone,
        pickupTime,
        items: cartItems.map(item => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal,
        gst,
        packagingFee,
        grandTotal,
        paymentMethod: 'Pay at Counter'
      });

      setStep('confirmed');
    }, 1500);
  };

  const handleCloseReceipt = () => {
    clearCart();
    setCartOpen(false);
    setStep('cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isProcessing && step !== 'confirmed') {
                setCartOpen(false);
              }
            }}
            className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[100]"
          />

          {/* Cart Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[460px] bg-cafe-cream-light z-[101] shadow-2xl flex flex-col border-l border-cafe-brown-dark/5"
          >
            {/* Header */}
            <div className="p-6 border-b border-cafe-brown-dark/5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {step !== 'cart' && step !== 'confirmed' && (
                  <button
                    onClick={() => {
                      if (step === 'details') setStep('cart');
                    }}
                    disabled={isProcessing}
                    className="p-1 rounded-lg hover:bg-cafe-cream-medium/70 text-cafe-brown-dark transition-all mr-1 cursor-pointer"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="p-2 rounded-xl bg-cafe-terracotta/10 text-cafe-terracotta">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-xl font-bold text-cafe-brown-dark">
                  {step === 'confirmed' ? 'Order Success' : 'Checkout'}
                </h2>
              </div>
              
              {!isProcessing && step !== 'confirmed' && (
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-cafe-cream-medium/70 text-cafe-charcoal/80 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Scrollable Wizard Body */}
            <div className="flex-grow overflow-y-auto p-6 no-scrollbar flex flex-col">
              
              {isProcessing ? (
                /* Processing Page Spinner */
                <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="w-12 h-12 text-cafe-terracotta animate-spin" />
                  <p className="font-serif text-lg font-semibold text-cafe-brown-dark">Placing Order...</p>
                  <p className="text-xs text-cafe-charcoal/60">Please wait while we send your details to the kitchen.</p>
                </div>
              ) : (
                /* Main wizard views rendering */
                <div className="flex-grow flex flex-col justify-between">
                  <div className="w-full">
                    {step === 'cart' && (
                      /* STEP 1: CART LIST */
                      cartItems.length === 0 ? (
                        <div className="h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
                          <div className="p-4 rounded-full bg-cafe-cream-medium/55 text-cafe-brown-light/40">
                            <ShoppingBag className="w-12 h-12" />
                          </div>
                          <h3 className="font-serif text-lg font-bold text-cafe-brown-dark">Your cart is empty</h3>
                          <Link
                            to="/menu"
                            onClick={() => setCartOpen(false)}
                            className="px-6 py-2 rounded-full bg-cafe-terracotta text-cafe-cream-light text-xs font-semibold uppercase tracking-wider hover:bg-cafe-terracotta-dark transition-colors duration-300"
                          >
                            Browse Menu
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div key={item.title} className="flex items-center space-x-4 p-3 bg-white/50 border border-cafe-brown-dark/5 rounded-2xl shadow-sm">
                              <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                              <div className="flex-grow min-w-0">
                                <h4 className="font-serif text-sm font-bold text-cafe-brown-dark truncate">{item.title}</h4>
                                <p className="text-xs text-cafe-terracotta font-semibold mt-0.5">₹{item.price}</p>
                                <div className="flex items-center space-x-2.5 mt-2">
                                  <button onClick={() => updateQuantity(item.title, -1)} className="p-1 rounded-md bg-cafe-cream-medium/50 hover:bg-cafe-cream-medium text-cafe-brown-dark cursor-pointer"><Minus className="w-3 h-3" /></button>
                                  <span className="font-semibold text-xs text-cafe-charcoal w-4 text-center">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.title, 1)} className="p-1 rounded-md bg-cafe-cream-medium/50 hover:bg-cafe-cream-medium text-cafe-brown-dark cursor-pointer"><Plus className="w-3 h-3" /></button>
                                </div>
                              </div>
                              <button onClick={() => removeFromCart(item.title)} className="p-1.5 text-cafe-charcoal/30 hover:text-cafe-terracotta transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          ))}
                        </div>
                      )
                    )}

                    {step === 'details' && (
                      /* STEP 2: CUSTOMER DETAILS */
                      <form onSubmit={handleDetailsSubmit} className="space-y-5 font-sans">
                        <div className="flex items-center space-x-2 pb-2 mb-2 border-b border-cafe-brown-dark/5">
                          <ClipboardCheck className="w-5 h-5 text-cafe-terracotta" />
                          <h3 className="font-serif text-lg font-bold text-cafe-brown-dark">Enter Pickup Details</h3>
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold text-cafe-brown-light mb-1.5 uppercase tracking-wide">Your Name</label>
                          <input
                            type="text"
                            required
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="John Doe"
                            className="px-4 py-3 rounded-xl border border-cafe-cream-dark bg-white/45 text-sm focus:outline-none focus:ring-2 focus:ring-cafe-terracotta/40 focus:border-cafe-terracotta"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-xs font-semibold text-cafe-brown-light mb-1.5 uppercase tracking-wide">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                            placeholder="9876543210"
                            className="px-4 py-3 rounded-xl border border-cafe-cream-dark bg-white/45 text-sm focus:outline-none focus:ring-2 focus:ring-cafe-terracotta/40 focus:border-cafe-terracotta"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-xs font-semibold text-cafe-brown-light mb-1.5 uppercase tracking-wide">Pickup Time</label>
                          <div className="relative">
                            <select
                              value={pickupTime}
                              onChange={(e) => setPickupTime(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-cafe-cream-dark bg-white/45 text-sm focus:outline-none focus:ring-2 focus:ring-cafe-terracotta/40 focus:border-cafe-terracotta appearance-none"
                            >
                              <option>As soon as possible (15-20 Mins)</option>
                              <option>In 30 Minutes</option>
                              <option>In 45 Minutes</option>
                              <option>In 1 Hour</option>
                            </select>
                            <CalendarDays className="w-4 h-4 absolute right-4 top-3.5 text-cafe-charcoal/40 pointer-events-none" />
                          </div>
                        </div>

                        <div className="p-4 bg-cafe-cream-medium/40 rounded-2xl border border-cafe-brown-dark/5 text-xs text-cafe-charcoal/80 leading-relaxed mt-4">
                          <span className="font-bold text-cafe-brown-dark block mb-1">Payment Method:</span>
                          You will pay at the counter when you pick up your order. We accept cash, card, and all UPI applications.
                        </div>

                        <button type="submit" className="hidden" id="details-form-submit" />
                      </form>
                    )}

                    {step === 'confirmed' && (
                      /* STEP 3: RECEIPT / SUCCESS INVOICE */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                      >
                        {/* Success Icon */}
                        <div className="flex flex-col items-center justify-center text-center space-y-2 mt-4">
                          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full animate-bounce">
                            <CheckCircle2 className="w-10 h-10" />
                          </div>
                          <h3 className="font-serif text-xl font-bold text-cafe-brown-dark">Order Received!</h3>
                          <p className="text-xs text-cafe-charcoal/65">Thank you, your order has been sent to the kitchen.</p>
                        </div>

                        {/* Detailed Printable Receipt Invoice Layout */}
                        <div className="bg-white/80 border border-cafe-brown-dark/5 p-5 rounded-2xl shadow-inner font-mono text-xs space-y-4">
                          {/* Invoice Header */}
                          <div className="text-center border-b border-cafe-brown-dark/10 pb-3">
                            <h4 className="font-bold text-sm tracking-tight text-cafe-brown-dark font-serif">CAFÉ AROMA</h4>
                            <p className="text-[10px] text-cafe-charcoal/65 mt-0.5">Chinchwad, Pimpri-Chinchwad</p>
                          </div>

                          {/* Order Codes */}
                          <div className="grid grid-cols-2 gap-2 border-b border-cafe-brown-dark/5 pb-3">
                            <div>
                              <span className="text-cafe-charcoal/50 block">Invoice ID:</span>
                              <span className="text-cafe-brown-dark font-bold">{currentOrderId}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-cafe-charcoal/50 block">Pickup Code:</span>
                              <span className="text-cafe-terracotta font-bold">{currentPickupCode}</span>
                            </div>
                          </div>

                          {/* Customer info */}
                          <div className="space-y-1 text-[11px] text-cafe-charcoal">
                            <div><span className="text-cafe-charcoal/50">Name:</span> {customerName}</div>
                            <div><span className="text-cafe-charcoal/50">Schedule:</span> {pickupTime}</div>
                            <div><span className="text-cafe-charcoal/50">Method:</span> Pay at Counter</div>
                          </div>

                          {/* Line Items */}
                          <div className="border-t border-b border-cafe-brown-dark/5 py-3 space-y-2">
                            {cartItems.map((item) => (
                              <div key={item.title} className="flex justify-between text-cafe-charcoal">
                                <span className="truncate pr-4">{item.quantity}x {item.title}</span>
                                <span>₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>

                          {/* Financials Summary */}
                          <div className="space-y-1.5 text-[11px] text-cafe-charcoal/90">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>GST (18%):</span>
                              <span>₹{gst}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Service/Pkg Fee:</span>
                              <span>₹{packagingFee}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold text-cafe-brown-dark border-t border-cafe-brown-dark/5 pt-2 mt-2">
                              <span>Amount Due:</span>
                              <span className="text-cafe-terracotta">₹{grandTotal}</span>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="text-center bg-cafe-cream-medium/40 py-2 rounded-lg font-bold border border-cafe-brown-dark/5 text-[10px] uppercase text-cafe-terracotta tracking-wider animate-pulse">
                            Kitchen Status: Brewing & Cooking
                          </div>
                        </div>

                        <button
                          onClick={handleCloseReceipt}
                          className="w-full py-3.5 px-6 rounded-xl bg-cafe-terracotta hover:bg-cafe-terracotta-dark text-cafe-cream-light font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5 cursor-pointer"
                        >
                          Close & Done
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* Summary Sticky Footer */}
                  {step === 'details' && (
                    <div className="border-t border-cafe-brown-dark/5 pt-4 mt-6 space-y-4">
                      {/* Price brief */}
                      <div className="flex justify-between text-sm font-bold text-cafe-brown-dark">
                        <span>Total Amount Due</span>
                        <span className="text-cafe-terracotta text-base">₹{grandTotal}</span>
                      </div>

                      <button
                        onClick={() => document.getElementById('details-form-submit').click()}
                        className="w-full py-3.5 px-6 rounded-xl bg-cafe-terracotta hover:bg-cafe-terracotta-dark text-cafe-cream-light font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                      >
                        Confirm & Place Order
                      </button>
                    </div>
                  )}

                  {/* Cart review page summary footer */}
                  {step === 'cart' && cartItems.length > 0 && (
                    <div className="p-6 border-t border-cafe-brown-dark/5 bg-cafe-cream-medium/20 -mx-6 -mb-6 space-y-4 mt-8">
                      <div className="space-y-2 text-xs font-medium text-cafe-charcoal/80">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="text-cafe-brown-dark">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between font-bold text-cafe-brown-dark border-t border-cafe-brown-dark/5 pt-3.5 mt-2">
                          <span>Total Amount</span>
                          <span className="text-cafe-terracotta text-base">₹{grandTotal}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setStep('details')}
                        className="w-full py-3.5 px-6 rounded-xl bg-cafe-terracotta hover:bg-cafe-terracotta-dark text-cafe-cream-light font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5 cursor-pointer"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
