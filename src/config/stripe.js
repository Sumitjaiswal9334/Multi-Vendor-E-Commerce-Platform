// Stripe configuration
export const STRIPE_CONFIG = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here',
  apiVersion: '2023-10-16'
};

// Currency configuration
export const CURRENCY = 'usd';

// Stripe fee calculation (2.9% + 30¢ for US cards)
export const calculateStripeFee = (amount) => {
  return Math.round(amount * 0.029 + 30);
};

// Platform fee (5% of transaction)
export const calculatePlatformFee = (amount) => {
  return Math.round(amount * 0.05);
};