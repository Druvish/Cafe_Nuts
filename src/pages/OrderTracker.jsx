import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';
import { Coffee, ChevronRight, ArrowLeft, ShoppingBag, ChefHat, CheckCircle2, Clock, Check, PhoneCall } from 'lucide-react';

export default function OrderTracker() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const prevStatusRef = useRef(null);

  // Helper to map DB columns to JS attributes
  const mapDBToJS = (row) => ({
    orderId: row.order_id,
    pickupCode: row.pickup_code,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerEmail: row.customer_email || '',
    pickupTime: row.pickup_time,
    items: row.items,
    subtotal: row.subtotal,
    gst: row.gst,
    packagingFee: row.packaging_fee,
    grandTotal: row.grand_total,
    paymentMethod: row.payment_method,
    status: row.status,
    timestamp: row.created_at,
  });

  // Synthesize custom sound ding-dong on status transitions
  const playChimeSound = (status) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playTone = (freq, duration, delay) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + duration);
      };

      if (status === 'Preparing') {
        // Double tone (rising)
        playTone(440, 0.45, 0);       // A4
        playTone(554.37, 0.55, 0.12); // C#5
      } else if (status === 'Ready') {
        // High sparkling chime
        playTone(523.25, 0.3, 0);     // C5
        playTone(659.25, 0.3, 0.08);  // E5
        playTone(783.99, 0.55, 0.16); // G5
      } else if (status === 'Served') {
        // Friendly goodbye chime
        playTone(587.33, 0.4, 0);     // D5
        playTone(440, 0.6, 0.15);     // A4
      }
    } catch (e) {
      console.warn('Web Audio API is blocked or failed to play chime:', e);
    }
  };

  // Fetch initial order details from Supabase and subscribe to changes
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error || !data) {
        console.error('Error fetching order:', error);
        setNotFound(true);
        setLoading(false);
        return;
      }

      const jsOrder = mapDBToJS(data);
      setOrder(jsOrder);
      prevStatusRef.current = jsOrder.status;
      setLoading(false);
    };

    fetchOrder();

    // Subscribe to Postgres changes on this specific order
    const channel = supabase
      .channel(`order-tracker-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `order_id=eq.${orderId}`,
        },
        (payload) => {
          const updated = mapDBToJS(payload.new);
          setOrder(updated);

          // Play status transition alert
          if (prevStatusRef.current && prevStatusRef.current !== updated.status) {
            playChimeSound(updated.status);
          }
          prevStatusRef.current = updated.status;
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  // Determine active step index based on status
  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Preparing': return 1;
      case 'Ready': return 2;
      case 'Served': return 3;
      default: return 0;
    }
  };

  const steps = [
    { label: 'Order Placed', desc: 'Sent to kitchen', icon: ShoppingBag },
    { label: 'In Preparation', desc: 'Crafting your items', icon: ChefHat },
    { label: 'Ready for Pickup', desc: 'Hot & Fresh!', icon: Coffee },
    { label: 'Completed', desc: 'Enjoy your meal!', icon: CheckCircle2 }
  ];

  const currentStepIdx = order ? getStepIndex(order.status) : 0;

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-cafe-cream-light flex flex-col items-center justify-center py-20 p-4 font-sans text-cafe-brown-dark">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-10 h-10 border-4 border-cafe-terracotta border-t-transparent rounded-full mb-4"
        />
        <p className="font-serif text-lg font-bold">Connecting to Kitchen...</p>
        <p className="text-xs text-cafe-charcoal/60 mt-1">Fetching live status of order {orderId}</p>
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="min-h-[70vh] bg-cafe-cream-light flex flex-col items-center justify-center text-center py-20 px-6 font-sans text-cafe-brown-dark">
        <div className="p-4 bg-red-50 text-red-500 rounded-full mb-4 border border-red-100">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-xl font-bold">Order Not Found</h2>
        <p className="text-sm text-cafe-charcoal/70 max-w-sm mt-2 mb-6">
          We couldn't locate order ID <strong className="font-mono">{orderId}</strong>. It may have been cleared or type is incorrect.
        </p>
        <Link
          to="/menu"
          className="px-6 py-2.5 bg-cafe-terracotta hover:bg-cafe-terracotta-dark text-cafe-cream-light rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 shadow-md"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cafe-cream-light font-sans text-cafe-brown-dark selection:bg-cafe-terracotta selection:text-cafe-cream-light py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cafe-charcoal/70 hover:text-cafe-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu</span>
          </Link>
        </div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-cafe-brown-dark/5 p-6 rounded-3xl shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <span className="text-[10px] bg-cafe-terracotta/10 border border-cafe-terracotta/20 text-cafe-terracotta font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
              Live Tracker
            </span>
            <h1 className="font-serif text-2xl font-bold text-cafe-brown-dark mt-2 mb-1">
              Order #{order.orderId}
            </h1>
            <p className="text-xs text-cafe-charcoal/60">
              Placed on {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Mode: {order.paymentMethod}
            </p>
          </div>

          <div className="bg-cafe-cream-medium/40 border border-cafe-brown-dark/5 px-5 py-3 rounded-2xl text-center sm:text-right shrink-0 w-full sm:w-auto">
            <span className="text-[10px] text-cafe-brown-light uppercase tracking-wider font-bold block mb-0.5">
              Pickup Code
            </span>
            <span className="font-mono font-bold text-xl text-cafe-terracotta tracking-wider">
              {order.pickupCode}
            </span>
          </div>
        </motion.div>

        {/* Main Status Timeline Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-cafe-brown-dark/5 p-6 sm:p-8 rounded-3xl shadow-sm mb-6"
        >
          {/* Status Alert Banner */}
          <div className="mb-8 p-4 bg-cafe-cream-light/65 rounded-2xl border border-cafe-brown-dark/5 flex gap-4 items-center">
            <div className="p-3 bg-cafe-terracotta/10 text-cafe-terracotta rounded-full shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-cafe-brown-dark">
                {order.status === 'Pending' && 'Order Received & Queued'}
                {order.status === 'Preparing' && 'Cooking & Brewing...'}
                {order.status === 'Ready' && 'Order is Ready for Pickup!'}
                {order.status === 'Served' && 'Order Handed Over'}
              </h4>
              <p className="text-xs text-cafe-charcoal/75 leading-relaxed mt-0.5">
                {order.status === 'Pending' && 'Your order is safely in our system! The baristas will start crafting it shortly.'}
                {order.status === 'Preparing' && 'The chef is brewing your fresh coffees and preparing your bites. Sit back and relax!'}
                {order.status === 'Ready' && 'Woohoo! Please show your pickup code at the counter to claim your fresh items.'}
                {order.status === 'Served' && 'Thank you for dining with Café Aroma. We hope you enjoy your warm espresso and pastries!'}
              </p>
            </div>
          </div>

          {/* Stepper Steps UI */}
          <div className="relative">
            {/* Connector Line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-cafe-cream-medium sm:left-1/2 sm:-translate-x-1/2 sm:top-5 sm:bottom-auto sm:w-full sm:h-0.5" />
            
            {/* Active Connector Progress overlay */}
            {currentStepIdx > 0 && (
              <div
                style={{
                  height: window.innerWidth >= 640 ? '2px' : `${(currentStepIdx / (steps.length - 1)) * 100}%`,
                  width: window.innerWidth >= 640 ? `${(currentStepIdx / (steps.length - 1)) * 100}%` : '2px',
                  transition: 'all 0.8s ease-in-out'
                }}
                className="absolute left-6 top-6 bg-cafe-terracotta sm:left-0 sm:top-5 sm:-translate-y-1/2"
              />
            )}

            {/* Stepper items */}
            <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-4 relative z-10">
              {steps.map((st, idx) => {
                const IconComponent = st.icon;
                const isCompleted = idx < currentStepIdx || (currentStepIdx === 3 && idx === 3);
                const isActive = idx === currentStepIdx && currentStepIdx !== 3;
                const isPending = idx > currentStepIdx;

                return (
                  <div key={idx} className="flex sm:flex-col items-center text-left sm:text-center gap-4 sm:gap-2">
                    
                    {/* Circle Node */}
                    <motion.div
                      animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                      transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 ${
                        isCompleted
                          ? 'bg-cafe-terracotta border-cafe-terracotta text-cafe-cream-light'
                          : isActive
                          ? 'bg-white border-cafe-terracotta text-cafe-terracotta ring-4 ring-cafe-terracotta/10 shadow-[0_0_12px_rgba(212,122,85,0.2)]'
                          : 'bg-white border-cafe-cream-dark text-cafe-charcoal/30'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <IconComponent className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                      )}
                    </motion.div>

                    {/* Step texts */}
                    <div>
                      <h3 className={`font-bold text-xs uppercase tracking-wider ${isActive ? 'text-cafe-terracotta' : isCompleted ? 'text-cafe-brown-dark' : 'text-cafe-charcoal/50'}`}>
                        {st.label}
                      </h3>
                      <p className="text-[10px] text-cafe-charcoal/55 mt-0.5 sm:max-w-[140px] sm:mx-auto">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </motion.div>

        {/* Navigation Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <Link
            to="/menu"
            className="flex-grow py-4 px-6 bg-cafe-terracotta hover:bg-cafe-terracotta-dark text-cafe-cream-light text-center font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform active:translate-y-0.5"
          >
            Order Something Else (Browse Menu)
          </Link>
          <Link
            to="/"
            className="sm:w-1/3 py-4 px-6 bg-white hover:bg-cafe-cream-medium text-cafe-brown-dark text-center font-semibold text-sm rounded-2xl border border-cafe-brown-dark/5 shadow-sm hover:shadow-md transition-all duration-300 transform active:translate-y-0.5"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Summary invoice items */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-cafe-brown-dark/5 p-6 rounded-3xl shadow-sm mb-6"
        >
          <h2 className="font-serif text-base font-bold text-cafe-brown-dark mb-4 pb-2 border-b border-cafe-brown-medium/30">
            Order Receipt Summary
          </h2>

          <div className="space-y-3 mb-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs text-cafe-charcoal">
                <span className="font-medium">{item.quantity}x {item.title}</span>
                <span className="font-mono text-cafe-brown-dark font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-cafe-cream-medium pt-3 space-y-1.5 text-xs text-cafe-charcoal/80">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span className="font-mono">₹{order.gst}</span>
            </div>
            <div className="flex justify-between">
              <span>Service/Packaging Fee:</span>
              <span className="font-mono">₹{order.packagingFee}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-cafe-brown-dark border-t border-cafe-cream-medium pt-2.5 mt-2">
              <span>Grand Total:</span>
              <span className="text-cafe-terracotta font-mono">₹{order.grandTotal}</span>
            </div>
          </div>
        </motion.div>

        {/* Customer Help Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-cafe-brown-dark text-cafe-cream-light p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h3 className="font-serif text-base font-bold text-white mb-0.5">Need Help with your order?</h3>
            <p className="text-[11px] text-cafe-cream-light/65 leading-relaxed max-w-md">
              If you have any questions about custom roasting, allergen adjustments, or pickup timing, call our front desk directly.
            </p>
          </div>
          <a
            href="tel:9876543210"
            className="flex items-center gap-2 px-4.5 py-2.5 bg-cafe-terracotta hover:bg-cafe-terracotta-dark text-white rounded-full text-xs font-semibold transition-all shrink-0 select-none shadow-md"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Counter</span>
          </a>
        </motion.div>

      </div>
    </div>
  );
}
