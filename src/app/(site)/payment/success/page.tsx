import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PaymentStatus } from '@/components/payment/payment-status';

export const metadata: Metadata = {
  title: 'Payment Success',
};

export default function PaymentSuccessPage() {
  return (
    // The status reads ?session_id= from the URL
    <Suspense>
      <PaymentStatus />
    </Suspense>
  );
}
