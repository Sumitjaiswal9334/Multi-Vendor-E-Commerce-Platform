import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG, CURRENCY, calculateStripeFee, calculatePlatformFee } from '../config/stripe';

// Initialize Stripe
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);
  }
  return stripePromise;
};

export class StripeService {
  static async createPaymentIntent(orderData) {
    try {
      // In a real app, this would be an API call to your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(orderData.total * 100), // Convert to cents
          currency: CURRENCY,
          metadata: {
            orderId: orderData.orderId,
            customerId: orderData.customerId,
            items: JSON.stringify(orderData.items.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              vendor: item.vendor
            })))
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment intent:', error);
      // Mock response for demo purposes
      return {
        clientSecret: 'pi_mock_client_secret_' + Date.now(),
        paymentIntentId: 'pi_mock_' + Date.now()
      };
    }
  }

  static async confirmPayment(clientSecret, paymentMethod) {
    const stripe = await getStripe();
    
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.paymentIntent;
    } catch (error) {
      console.error('Error confirming payment:', error);
      // Mock successful payment for demo
      return {
        id: 'pi_mock_' + Date.now(),
        status: 'succeeded',
        amount: 1000,
        currency: CURRENCY
      };
    }
  }

  static async processRefund(paymentIntentId, amount, reason = 'requested_by_customer') {
    try {
      // In a real app, this would be an API call to your backend
      const response = await fetch('/api/create-refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId,
          amount: amount ? Math.round(amount * 100) : undefined, // Convert to cents
          reason
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process refund');
      }

      return await response.json();
    } catch (error) {
      console.error('Error processing refund:', error);
      // Mock refund response for demo
      return {
        id: 're_mock_' + Date.now(),
        status: 'succeeded',
        amount: amount ? Math.round(amount * 100) : 1000,
        currency: CURRENCY,
        reason
      };
    }
  }

  static async retrievePaymentIntent(paymentIntentId) {
    try {
      // In a real app, this would be an API call to your backend
      const response = await fetch(`/api/payment-intent/${paymentIntentId}`);
      
      if (!response.ok) {
        throw new Error('Failed to retrieve payment intent');
      }

      return await response.json();
    } catch (error) {
      console.error('Error retrieving payment intent:', error);
      // Mock response for demo
      return {
        id: paymentIntentId,
        status: 'succeeded',
        amount: 1000,
        currency: CURRENCY
      };
    }
  }

  static calculateOrderTotals(items) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const stripeFee = calculateStripeFee(subtotal + tax);
    const platformFee = calculatePlatformFee(subtotal);
    const total = subtotal + tax;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      stripeFee: Number((stripeFee / 100).toFixed(2)),
      platformFee: Number((platformFee / 100).toFixed(2)),
      total: Number(total.toFixed(2))
    };
  }
}

export default StripeService;