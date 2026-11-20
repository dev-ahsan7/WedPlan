'use client';
import { useState } from 'react';
import { Crown } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { startCheckout } from '@/lib/subscription';

export function UpgradeButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const { url } = await startCheckout();
      // Go to Stripe's secure payment page
      window.location.href = url;
    } catch (error) {
      toast.error((error as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      className="h-11 w-full rounded-full"
      disabled={isLoading}
      onClick={handleUpgrade}
    >
      {isLoading ? <Spinner /> : <Crown aria-hidden />}
      {isLoading ? 'Opening Stripe...' : 'Upgrade to Premium'}
    </Button>
  );
}
