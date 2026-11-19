'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  BadgeCheck,
  CalendarHeart,
  Inbox,
  Search,
  Store,
  UserRoundPlus,
} from 'lucide-react';
import { FadeIn } from '@/components/shared/fade-in';
import { Button } from '@/components/ui/button';

const steps = {
  couples: [
    {
      title: 'Explore services',
      text: 'Browse by category, search by name, filter by location and sort by price.',
      icon: Search,
    },
    {
      title: 'Send a booking request',
      text: 'Pick your event date and location, add a short message and send it.',
      icon: CalendarHeart,
    },
    {
      title: 'Get your answer',
      text: 'Follow the status in your dashboard until the vendor accepts or declines.',
      icon: BadgeCheck,
    },
  ],
  vendors: [
    {
      title: 'Create your account',
      text: 'Sign up as a vendor and add your business name and photo.',
      icon: UserRoundPlus,
    },
    {
      title: 'Publish your services',
      text: 'Add photos, price and location. Our team approves them before they go live.',
      icon: Store,
    },
    {
      title: 'Manage requests',
      text: 'Accept or reject booking requests from your vendor dashboard.',
      icon: Inbox,
    },
  ],
};

export function HowItWorksSection() {
  const [tab, setTab] = useState<'couples' | 'vendors'>('couples');

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <FadeIn className="text-center">
        <p className="text-xs tracking-[0.2em] text-primary uppercase">
          How WedPlan works
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl">
          From &ldquo;yes&rdquo; to booked in three steps
        </h2>

        <div
          role="tablist"
          aria-label="Who is it for"
          className="mt-8 inline-flex rounded-full border bg-card p-1 text-sm"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'couples'}
            onClick={() => setTab('couples')}
            className={`rounded-full px-5 py-2 transition-colors ${
              tab === 'couples'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            For couples
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'vendors'}
            onClick={() => setTab('vendors')}
            className={`rounded-full px-5 py-2 transition-colors ${
              tab === 'vendors'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            For vendors
          </button>
        </div>
      </FadeIn>

      <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
        {/* Dashed line that joins the steps, like an aisle */}
        <span
          className="absolute top-10 right-[16%] left-[16%] hidden border-t-2 border-dashed border-primary/25 md:block"
          aria-hidden
        />

        {steps[tab].map((step, index) => (
          <FadeIn key={step.title} delay={index * 0.15} className="relative text-center">
            <div className="relative mx-auto grid size-20 place-items-center rounded-full border border-primary/30 bg-background">
              <span className="grid size-14 place-items-center rounded-full bg-accent text-primary">
                <step.icon className="size-6" aria-hidden />
              </span>
              <span className="absolute -top-1 -right-1 grid size-7 place-items-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {index + 1}
              </span>
            </div>
            <h3 className="mt-6 text-2xl">{step.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
              {step.text}
            </p>
          </FadeIn>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Button
          render={<Link href={tab === 'couples' ? '/services' : '/sign-up'} />}
          nativeButton={false}
          size="lg"
          className="h-11 rounded-full px-6"
        >
          {tab === 'couples' ? 'Start exploring' : 'Join as a vendor'}
        </Button>
      </div>
    </section>
  );
}
