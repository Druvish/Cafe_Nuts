import emailjs from '@emailjs/browser';

// To connect your real email notifications:
// 1. Create a free account at emailjs.com
// 2. Create an Email Service (e.g. Gmail) and copy the Service ID
// 3. Create an Email Template (using variables: {{to_name}}, {{to_email}}, {{order_id}}, {{pickup_code}}, {{pickup_time}}, {{items_list}}, {{grand_total}}, {{message_type}})
// 4. Copy your Account Public Key (from Account -> API Keys)
// 5. Fill them in below:
const EMAILJS_SERVICE_ID = ''; // Leave blank to run in simulated console mode
const EMAILJS_TEMPLATE_ID = ''; 
const EMAILJS_PUBLIC_KEY = ''; 

// Send email notification (falls back to logging if keys are unconfigured)

export const sendEmailNotification = async (order, type = 'confirmed') => {
  const itemsText = order.items
    .map((item) => `${item.quantity}x ${item.title} (₹${item.price})`)
    .join(', ');

  const templateParams = {
    to_name: order.customerName,
    to_email: order.customerEmail,
    order_id: order.orderId,
    pickup_code: order.pickupCode,
    pickup_time: order.pickupTime,
    items_list: itemsText,
    grand_total: `₹${order.grandTotal}`,
    message_type: type, // 'confirmed' or 'ready'
  };

  // If no keys are set, run in simulator mode
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.log(
      `%c[Email Simulator] Outbound Email to ${order.customerEmail} (${type.toUpperCase()}):`,
      'color: #D47A55; font-weight: bold; font-size: 11px;',
      templateParams
    );
    return { status: 'simulated' };
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    console.log('Email sent successfully via EmailJS!', response.status, response.text);
    return response;
  } catch (error) {
    console.error('EmailJS failed to send email:', error);
    return { error };
  }
};
