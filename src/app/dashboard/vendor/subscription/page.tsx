import type { Metadata } from 'next';
import { Check, Crown, ShieldCheck } from 'lucide-react';
import { CancelSubscriptionButton } from '@/components/dashboard/cancel-subscription-button';
import { PageHeader } from '@/components/dashboard/page-header';
import { UpgradeButton } from '@/components/dashboard/upgrade-button';
import { getMySubscription } from '@/lib/dashboard';
import { formatDate } from '@/lib/formatDate';

export const metadata: Metadata = {
  title: 'Subscription',
};

const freeFeatures = ['Up to 3 active services', 'Basic vendor dashboard', 'Booking request management'];
const premiumFeatures = [
  'Unlimited active services',
  'Premium vendor badge on your services',
  'Everything in the Free plan',
];

export default async function SubscriptionPage() {
  // The server decides the plan, including Premium that has run out
  const subscription = await getMySubscription();
  const isPremium = subscription.plan === 'premium';
  const expiresAt = subscription.subscriptionExpiresAt;

  return (
    <>
      <PageHeader
        title="Subscription"
        text="Start free. Upgrade when you are ready to show couples everything you offer."
      />

      <div className="mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
        {/* Free plan */}
        <div className="flex flex-col rounded-3xl border bg-card p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-3xl">Free</h2>
            {!isPremium && (
              <span className="rounded-full bg-secondary px-3 py-1 text-xs">Your current plan</span>
            )}
          </div>
          <p className="mt-3">
            <span className="font-heading text-5xl font-semibold">$0</span>
            <span className="text-muted-foreground"> / month</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {freeFeatures.map((feature) => (
              <li key={feature} className="flex gap-2">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Premium plan */}
        <div className="relative flex flex-col overflow-hidden rounded-3xl border-2 border-primary bg-card p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-3xl">
              <Crown className="size-6 text-amber-600" aria-hidden />
              Premium
            </h2>
            {isPremium ? (
              <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                Your current plan
              </span>
            ) : (
              <span className="rounded-full bg-accent px-3 py-1 text-xs text-primary">
                Most popular
              </span>
            )}
          </div>
          <p className="mt-3">
            <span className="font-heading text-5xl font-semibold">$9.99</span>
            <span className="text-muted-foreground"> / month</span>
          </p>
          <ul className="mt-6 mb-8 space-y-3 text-sm">
            {premiumFeatures.map((feature) => (
              <li key={feature} className="flex gap-2">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            {isPremium && subscription.cancelAtPeriodEnd ? (
              <p className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
                Your subscription is cancelled. Premium stays active
                {expiresAt ? ` until ${formatDate(expiresAt)}` : ''}, then you move to the Free
                plan.
              </p>
            ) : isPremium ? (
              <>
                <p className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                  Premium is active
                  {expiresAt ? ` and renews on ${formatDate(expiresAt)}.` : '.'}
                </p>
                <CancelSubscriptionButton
                  endDate={expiresAt ? formatDate(expiresAt) : 'the end of this month'}
                />
              </>
            ) : (
              <>
                <UpgradeButton />
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="size-3.5" aria-hidden />
                  Secure payment with Stripe. Cancel any time.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
