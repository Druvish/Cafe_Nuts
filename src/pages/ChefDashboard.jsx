import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, RotateCcw, ShieldAlert, Award, Clock, DollarSign, ListOrdered, Utensils, CheckSquare, ArrowLeft, Lock, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChefDashboard() {
  const { orders, updateOrderStatus, clearAllOrders } = useCart();
  const [activeTab, setActiveTab] = useState('kds'); // 'kds' | 'history'
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('chef_authorized') === 'true'
  );
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const prevOrderCountRef = useRef(orders.length);

  // Play low buzz sound on wrong PIN
  const playErrorSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio Context error sound failed', e);
    }
  };

  // Play high chime sound on successful PIN entry
  const playSuccessSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.1); // A5
      
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      console.warn('Audio Context success sound failed', e);
    }
  };

  const handleKeyPress = (num) => {
    setPinError(false);
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin === '8850') {
        playSuccessSound();
        sessionStorage.setItem('chef_authorized', 'true');
        setIsAuthenticated(true);
        setPin('');
      } else if (newPin.length === 4) {
        setTimeout(() => {
          setPinError(true);
          setPin('');
          playErrorSound();
        }, 200);
      }
    }
  };

  const handleClear = () => {
    setPin('');
    setPinError(false);
  };

  const handleSubmit = () => {
    if (pin === '8850') {
      playSuccessSound();
      sessionStorage.setItem('chef_authorized', 'true');
      setIsAuthenticated(true);
      setPin('');
    } else {
      setPinError(true);
      setPin('');
      playErrorSound();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('chef_authorized');
    setIsAuthenticated(false);
  };

  // Listen to physical keyboard events on lock screen
  useEffect(() => {
    if (isAuthenticated) return;

    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        setPinError(false);
        setPin((prev) => prev.slice(0, -1));
      } else if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isAuthenticated]);

  // Synthesize bell chime tone on new orders using Web Audio API
  const playNewOrderSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      const playTone = (freq, duration, delay) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
        
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + duration);
      };
      
      // Chime note: E6 followed by G6
      playTone(1318.51, 0.6, 0);
      playTone(1567.98, 0.9, 0.12);
    } catch (e) {
      console.warn('Audio Context failed to trigger sound', e);
    }
  };

  // Sound chime listener
  useEffect(() => {
    if (orders.length > prevOrderCountRef.current) {
      playNewOrderSound();
    }
    prevOrderCountRef.current = orders.length;
  }, [orders]);

  // Separate columns
  const pendingOrders = orders.filter((o) => o.status === 'Pending');
  const preparingOrders = orders.filter((o) => o.status === 'Preparing');
  const readyOrders = orders.filter((o) => o.status === 'Ready');
  const servedOrders = orders.filter((o) => o.status === 'Served');

  // Metrics computations
  const totalRevenue = servedOrders.reduce((acc, o) => acc + o.grandTotal, 0);
  const activeCount = pendingOrders.length + preparingOrders.length + readyOrders.length;
  
  // Today's summary calculations (filtering orders completed today)
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayServed = servedOrders.filter((o) => new Date(o.timestamp) >= todayStart);
  const todayRevenue = todayServed.reduce((acc, o) => acc + o.grandTotal, 0);
  
  // Calculate popular items
  const itemCounts = {};
  orders.forEach((o) => {
    o.items.forEach((i) => {
      itemCounts[i.title] = (itemCounts[i.title] || 0) + i.quantity;
    });
  });
  const popularItem = Object.entries(itemCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center font-sans p-4 selection:bg-amber-500 selection:text-stone-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-stone-900/60 backdrop-blur-md border border-stone-850 rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center"
        >
          {/* Header Icon */}
          <div className="p-4 rounded-full bg-amber-500/10 text-amber-500 mb-4 border border-amber-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-xl font-bold tracking-tight text-white mb-1">
            KITCHEN TERMINAL
          </h2>
          <p className="text-xs text-stone-400 mb-6 text-center">
            Enter passcode to access KDS board
          </p>

          {/* PIN Indicators */}
          <div className="flex space-x-4 mb-6">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                animate={pinError ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  pinError
                    ? 'border-red-500 bg-red-500/20'
                    : index < pin.length
                    ? 'border-amber-500 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                    : 'border-stone-700 bg-stone-950'
                }`}
              />
            ))}
          </div>

          {/* Error Message */}
          <div className="h-6 mb-2">
            <AnimatePresence>
              {pinError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-400 font-semibold"
                >
                  Incorrect passcode. Try again.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* 3x4 Numeric Keypad */}
          <div className="grid grid-cols-3 gap-3 w-full mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num.toString())}
                className="py-4 rounded-xl bg-stone-950 hover:bg-stone-850 active:bg-amber-500 active:text-stone-950 text-stone-200 font-mono text-xl font-bold border border-stone-800 transition-all duration-100 flex items-center justify-center cursor-pointer select-none"
              >
                {num}
              </button>
            ))}
            {/* Clear Button */}
            <button
              onClick={handleClear}
              className="py-4 rounded-xl bg-stone-950 hover:bg-red-950/20 text-red-400 hover:text-red-300 font-bold border border-stone-800 hover:border-red-900/30 transition-all duration-100 flex items-center justify-center cursor-pointer select-none text-xs tracking-wider"
            >
              CLEAR
            </button>
            {/* 0 Button */}
            <button
              onClick={() => handleKeyPress('0')}
              className="py-4 rounded-xl bg-stone-950 hover:bg-stone-850 active:bg-amber-500 active:text-stone-950 text-stone-200 font-mono text-xl font-bold border border-stone-800 transition-all duration-100 flex items-center justify-center cursor-pointer select-none"
            >
              0
            </button>
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all duration-100 flex items-center justify-center cursor-pointer select-none text-xs tracking-wider"
            >
              ENTER
            </button>
          </div>

          {/* Storefront Link */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xs text-stone-400 hover:text-stone-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* KDS Header Banner */}
      <header className="bg-stone-900 border-b border-stone-850 py-4 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2 text-stone-300 hover:text-amber-500 transition-colors mr-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Storefront</span>
          </Link>
          <div className="p-2.5 rounded-xl bg-amber-500 text-stone-950">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              KITCHEN TERMINAL <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2 py-0.5 rounded-md font-sans">LIVE</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-stone-400">Café Aroma KDS Display (Chinchwad)</p>
          </div>
        </div>

        {/* Tab Controls / Clear Action */}
        <div className="flex items-center space-x-4">
          <div className="bg-stone-950 p-1 rounded-lg border border-stone-850 flex space-x-1">
            <button
              onClick={() => setActiveTab('kds')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'kds' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              Order Board
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'history' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              History ({servedOrders.length})
            </button>
          </div>

          <button
            onClick={() => {
              if (confirm('Clear all order history?')) {
                clearAllOrders();
              }
            }}
            className="p-2 rounded-lg bg-stone-850 hover:bg-red-950/40 text-stone-400 hover:text-red-400 border border-stone-800 hover:border-red-900/30 transition-all cursor-pointer"
            title="Reset Board"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-400 hover:text-amber-500 border border-stone-800 hover:border-amber-500/30 transition-all cursor-pointer flex items-center space-x-1.5"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider hidden md:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* Analytics Insight Bar */}
      <section className="bg-stone-900/40 border-b border-stone-900 p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Revenue */}
          <div className="bg-stone-900 border border-stone-850 p-4 rounded-xl flex items-center space-x-3.5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500"><DollarSign className="w-5 h-5" /></div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-semibold">Served Sales</span>
              <span className="text-lg font-bold text-stone-100">₹{totalRevenue}</span>
            </div>
          </div>

          {/* Active Orders */}
          <div className="bg-stone-900 border border-stone-850 p-4 rounded-xl flex items-center space-x-3.5">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500"><ListOrdered className="w-5 h-5" /></div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-semibold">Active Orders</span>
              <span className="text-lg font-bold text-stone-100">{activeCount} Queued</span>
            </div>
          </div>

          {/* Popular Item */}
          <div className="bg-stone-900 border border-stone-850 p-4 rounded-xl flex items-center space-x-3.5 col-span-1">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500"><Utensils className="w-5 h-5" /></div>
            <div className="min-w-0">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-semibold">Popular Item</span>
              <span className="text-sm font-bold text-stone-100 block truncate">{popularItem}</span>
            </div>
          </div>

          {/* Sound alert instructions */}
          <div className="bg-stone-900 border border-stone-850 p-4 rounded-xl flex items-center space-x-3.5 col-span-1">
            <div className="p-2.5 rounded-lg bg-amber-500/5 text-amber-500/80"><Award className="w-5 h-5" /></div>
            <div className="text-[11px] leading-snug text-stone-400">
              <span className="font-semibold text-stone-200 block">Tab Sync Alert</span>
              Place customer orders in another tab to trigger audio bells here.
            </div>
          </div>
        </div>
      </section>

      {/* Main Board Display */}
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto h-full">
          {activeTab === 'kds' ? (
            /* ACTIVE BOARD VIEW */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-start">
              
              {/* COL 1: NEW PENDING ORDERS */}
              <div className="bg-stone-900 rounded-2xl border border-stone-850 flex flex-col max-h-[75vh]">
                <div className="p-4 border-b border-stone-850 flex items-center justify-between bg-stone-900/60 sticky top-0 z-10 rounded-t-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <h2 className="font-serif font-bold text-sm uppercase tracking-wider text-stone-200">New Orders</h2>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-stone-950 border border-stone-800 text-[10px] font-bold text-stone-400">
                    {pendingOrders.length}
                  </span>
                </div>

                <div className="p-4 overflow-y-auto space-y-4 flex-grow no-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {pendingOrders.length === 0 ? (
                      <div className="text-center py-12 text-stone-500 text-xs font-medium">No pending orders.</div>
                    ) : (
                      pendingOrders.map((o) => (
                        <motion.div
                          key={o.orderId}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-stone-950 border border-stone-800 p-4 rounded-xl space-y-3.5"
                        >
                          {/* Invoice / code */}
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-bold text-stone-200 text-sm block">{o.orderId}</span>
                              <span className="text-[10px] text-amber-500 font-bold">{o.pickupCode}</span>
                            </div>
                            <div className="text-right text-[10px] text-stone-400 font-mono">
                              <div>{o.pickupTime}</div>
                              <div className="text-stone-500 mt-0.5">via {o.paymentMethod}</div>
                            </div>
                          </div>

                          {/* Items */}
                          <div className="space-y-1.5 border-t border-stone-850 pt-3 text-xs text-stone-300">
                            {o.items.map((it, i) => (
                              <div key={i} className="flex justify-between font-bold">
                                <span>{it.quantity}x {it.title}</span>
                              </div>
                            ))}
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() => updateOrderStatus(o.orderId, 'Preparing')}
                            className="w-full py-2 bg-stone-850 hover:bg-amber-500 text-stone-200 hover:text-stone-950 rounded-lg text-xs font-bold transition-all cursor-pointer border border-stone-800 hover:border-amber-400"
                          >
                            Start Preparing
                          </button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* COL 2: IN PREPARATION */}
              <div className="bg-stone-900 rounded-2xl border border-stone-850 flex flex-col max-h-[75vh]">
                <div className="p-4 border-b border-stone-850 flex items-center justify-between bg-stone-900/60 sticky top-0 z-10 rounded-t-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-spin" />
                    <h2 className="font-serif font-bold text-sm uppercase tracking-wider text-stone-200">Preparing</h2>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-stone-950 border border-stone-800 text-[10px] font-bold text-stone-400">
                    {preparingOrders.length}
                  </span>
                </div>

                <div className="p-4 overflow-y-auto space-y-4 flex-grow no-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {preparingOrders.length === 0 ? (
                      <div className="text-center py-12 text-stone-500 text-xs font-medium">No items preparing.</div>
                    ) : (
                      preparingOrders.map((o) => (
                        <motion.div
                          key={o.orderId}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-stone-950 border border-amber-500/20 p-4 rounded-xl space-y-3.5"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-bold text-stone-200 text-sm block">{o.orderId}</span>
                              <span className="text-[10px] text-amber-500 font-bold">{o.pickupCode}</span>
                            </div>
                            <div className="text-right text-[10px] text-stone-400 font-mono">
                              <div>{o.pickupTime}</div>
                              <span className="text-amber-500/80 animate-pulse text-[9px] font-bold mt-1 inline-block">COOKING</span>
                            </div>
                          </div>

                          <div className="space-y-1.5 border-t border-stone-850 pt-3 text-xs text-stone-300">
                            {o.items.map((it, i) => (
                              <div key={i} className="flex justify-between font-bold">
                                <span>{it.quantity}x {it.title}</span>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => updateOrderStatus(o.orderId, 'Ready')}
                            className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-bold transition-all cursor-pointer border border-amber-400"
                          >
                            Mark as Ready
                          </button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* COL 3: READY FOR PICKUP */}
              <div className="bg-stone-900 rounded-2xl border border-stone-850 flex flex-col max-h-[75vh]">
                <div className="p-4 border-b border-stone-850 flex items-center justify-between bg-stone-900/60 sticky top-0 z-10 rounded-t-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <h2 className="font-serif font-bold text-sm uppercase tracking-wider text-stone-200">Ready</h2>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-stone-950 border border-stone-800 text-[10px] font-bold text-stone-400">
                    {readyOrders.length}
                  </span>
                </div>

                <div className="p-4 overflow-y-auto space-y-4 flex-grow no-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {readyOrders.length === 0 ? (
                      <div className="text-center py-12 text-stone-500 text-xs font-medium">No orders ready.</div>
                    ) : (
                      readyOrders.map((o) => (
                        <motion.div
                          key={o.orderId}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-stone-950 border border-emerald-500/20 p-4 rounded-xl space-y-3.5"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-bold text-stone-200 text-sm block">{o.orderId}</span>
                              <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 px-2 py-0.5 rounded-md mt-1 inline-block">{o.pickupCode}</span>
                            </div>
                            <div className="text-right text-[10px] text-stone-400 font-mono">
                              <div>{o.pickupTime}</div>
                              <span className="text-[10px] font-bold text-stone-400 block mt-1">{o.customerName}</span>
                            </div>
                          </div>

                          <div className="space-y-1.5 border-t border-stone-850 pt-3 text-xs text-stone-300">
                            {o.items.map((it, i) => (
                              <div key={i} className="flex justify-between font-bold">
                                <span>{it.quantity}x {it.title}</span>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => updateOrderStatus(o.orderId, 'Served')}
                            className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-lg text-xs font-bold transition-all cursor-pointer border border-emerald-400"
                          >
                            Serve / Hand Over
                          </button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          ) : (
            /* ARCHIVED / SERVED HISTORY VIEW */
            <div className="bg-stone-900 rounded-2xl border border-stone-850 p-6 max-h-[75vh] overflow-y-auto no-scrollbar">
              <h2 className="font-serif font-bold text-lg text-stone-200 mb-6 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-500" /> Served Order Archive
              </h2>

              {/* Today's Sales Summary Reports Widget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-stone-950 border border-stone-800 p-4 rounded-xl shadow-md">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-semibold mb-1">Today's Revenue</span>
                  <span className="text-xl font-bold text-amber-500 font-mono">₹{todayRevenue}</span>
                  <span className="text-[9px] text-stone-500 block mt-1">From served orders today</span>
                </div>
                <div className="bg-stone-950 border border-stone-800 p-4 rounded-xl shadow-md">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-semibold mb-1">Orders Completed Today</span>
                  <span className="text-xl font-bold text-stone-100 font-mono">{todayServed.length}</span>
                  <span className="text-[9px] text-stone-500 block mt-1">Ready/Served count</span>
                </div>
                <div className="bg-stone-950 border border-stone-800 p-4 rounded-xl shadow-md">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-semibold mb-1">Average Order Value</span>
                  <span className="text-xl font-bold text-stone-100 font-mono">₹{todayServed.length > 0 ? Math.round(todayRevenue / todayServed.length) : 0}</span>
                  <span className="text-[9px] text-stone-500 block mt-1">Mean spent today</span>
                </div>
              </div>

              {servedOrders.length === 0 ? (
                <div className="text-center py-16 text-stone-500 text-sm font-medium">No order history available.</div>
              ) : (
                <div className="space-y-4">
                  {servedOrders.map((o) => (
                    <div key={o.orderId} className="bg-stone-950 border border-stone-850 p-5 rounded-xl flex flex-col sm:flex-row justify-between gap-4">
                      {/* Left */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-stone-100 text-sm">{o.orderId}</span>
                          <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">{o.pickupCode}</span>
                          <span className="text-xs text-stone-500 font-mono">{new Date(o.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="text-xs text-stone-400">
                          Customer: <strong className="text-stone-300">{o.customerName}</strong> ({o.customerPhone}) | Schedule: {o.pickupTime}
                        </div>
                        {/* Items summary */}
                        <div className="text-xs text-stone-300 font-semibold pt-1">
                          {o.items.map((it) => `${it.quantity}x ${it.title}`).join(', ')}
                        </div>
                      </div>

                      {/* Right financials */}
                      <div className="text-right flex flex-col justify-center">
                        <span className="text-xs text-stone-500 font-mono">Paid via {o.paymentMethod}</span>
                        <span className="text-base font-bold text-amber-500 font-mono mt-1">₹{o.grandTotal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
