import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { sendEmailNotification } from '../services/notificationService';

const CartContext = createContext();

// Helper to map Supabase database snake_case to React camelCase
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

// Helper to map React camelCase back to Supabase database snake_case
const mapJSToDB = (order) => ({
  order_id: order.orderId,
  pickup_code: order.pickupCode,
  customer_name: order.customerName,
  customer_phone: order.customerPhone,
  customer_email: order.customerEmail || '',
  pickup_time: order.pickupTime,
  items: order.items,
  subtotal: order.subtotal,
  gst: order.gst,
  packaging_fee: order.packagingFee,
  grand_total: order.grandTotal,
  payment_method: order.paymentMethod,
  status: order.status || 'Pending',
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('cafe_aroma_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart items', e);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('cafe_aroma_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Load orders from Supabase and set up real-time listener
  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching orders from Supabase:', error);
      } else if (data) {
        setOrders(data.map(mapDBToJS));
      }
    };

    fetchOrders();

    // Subscribe to Postgres changes on 'orders' table
    const channel = supabase
      .channel('realtime-orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newOrder = mapDBToJS(payload.new);
            setOrders((prev) => {
              if (prev.some((o) => o.orderId === newOrder.orderId)) return prev;
              return [newOrder, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            const updatedOrder = mapDBToJS(payload.new);
            setOrders((prev) =>
              prev.map((o) =>
                o.orderId === updatedOrder.orderId ? updatedOrder : o
              )
            );
          } else if (payload.eventType === 'DELETE') {
            const deletedId = payload.old.order_id;
            setOrders((prev) => prev.filter((o) => o.orderId !== deletedId));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.title === item.title);
      if (existingItem) {
        return prevItems.map((i) =>
          i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (title) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.title !== title));
  };

  const updateQuantity = (title, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((i) => {
          if (i.title === title) {
            const newQty = i.quantity + amount;
            return { ...i, quantity: newQty };
          }
          return i;
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Order Management Functions using Supabase
  const addOrder = async (newOrder) => {
    const orderDetails = {
      ...newOrder,
      status: 'Pending',
    };
    const dbPayload = mapJSToDB(orderDetails);
    const { error } = await supabase.from('orders').insert([dbPayload]);
    if (error) {
      console.error('Error adding order to Supabase:', error);
      return;
    }

    // Trigger confirmation alerts
    sendEmailNotification(orderDetails, 'confirmed');
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const order = orders.find((o) => o.orderId === orderId);

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('order_id', orderId);
    if (error) {
      console.error('Error updating order status in Supabase:', error);
      return;
    }

    // Trigger alerts if status becomes Ready
    if (newStatus === 'Ready' && order) {
      sendEmailNotification({ ...order, status: newStatus }, 'ready');
    }
  };

  const clearAllOrders = async () => {
    const { error } = await supabase
      .from('orders')
      .delete()
      .neq('order_id', '');
    if (error) {
      console.error('Error clearing orders in Supabase:', error);
    }
  };

  // Computations
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setCartOpen: setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        // Orders API
        orders,
        addOrder,
        updateOrderStatus,
        clearAllOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
