import { sendWithToken } from './sendWithToken';

export type PaymentStatus = {
  status: 'pending' | 'paid' | 'cancelled' | 'failed';
  amount: number;
  currency: string;
  plan: string;
  subscriptionExpiresAt?: string;
};

// The server creates the Stripe Checkout page and sends back its address
export const startCheckout = (): Promise<{ url: string }> =>
  sendWithToken('POST', '/subscriptions/checkout');

export const getPaymentStatus = (sessionId: string): Promise<PaymentStatus> =>
  sendWithToken('GET', `/subscriptions/session/${sessionId}`);
