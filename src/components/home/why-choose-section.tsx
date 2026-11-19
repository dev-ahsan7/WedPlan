import { CalendarHeart, Check, Clock, LayoutGrid, ShieldCheck, Wallet } from 'lucide-react';
import { FadeIn } from '@/components/shared/fade-in';

// Each benefit matches a real feature of the platform
const benefits = [
  {
    number: 'i',
    title: 'Every service is checked first',
    text: 'Our team reviews each service before it goes live, so you only see vendors that are approved and active.',
    icon: ShieldCheck,
  },
  {
    number: 'ii',
    title: 'Everything in one place',
    text: 'Venues, photographers, florists, caterers, makeup artists and fashion, all searchable by name, category and location.',
    icon: LayoutGrid,
  },
  {
    number: 'iii',
    title: 'Send a request, not ten emails',
    text: 'Pick your date and location, add a message and send it. The vendor accepts or declines right from their dashboard.',
    icon: CalendarHeart,
  },
  {
    number: 'iv',
    title: 'Free for couples',
    text: 'Browsing and booking requests cost nothing. Changed your mind? Cancel any request while it is still pending.',
    icon: Wallet,
  },
];

export function WhyChooseSection() {
  return (
    <section className="px-3 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-secondary px-5 py-14 sm:px-10 lg:px-14 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <p className="text-xs tracking-[0.2em] text-primary uppercase">
              Why choose WedPlan?
            </p>
            <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">
              Less planning stress, more{' '}
              <span className="text-primary italic">&ldquo;I do&rdquo;</span>.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
              Wedding planning usually means endless calls, lost messages and
              guessing who is free on your date. WedPlan keeps the whole thing
              in one calm place.
            </p>

            {/* A small preview of how a request moves */}
            <div className="mt-10 max-w-sm rounded-3xl border bg-card p-5 shadow-sm">
              <p className="text-xs text-muted-foreground">Your booking request</p>
              <p className="mt-1 font-heading text-2xl font-semibold">
                Golden Hour Studio
              </p>
              <p className="text-sm text-muted-foreground">
                Photography · 14 Feb · Dhaka
              </p>

              <ol className="mt-5 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  Request sent
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full border border-primary text-primary">
                    <Clock className="size-3.5" aria-hidden />
                  </span>
                  <span>
                    Waiting for the vendor{' '}
                    <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                      Pending
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="grid size-6 place-items-center rounded-full border border-dashed border-muted-foreground/50" />
                  Accepted, you are booked
                </li>
              </ol>
            </div>
          </FadeIn>

          <div className="divide-y divide-dashed divide-primary/25 border-y border-dashed border-primary/25">
            {benefits.map((benefit, index) => (
              <FadeIn
                key={benefit.title}
                delay={index * 0.1}
                className="grid grid-cols-[3rem_1fr] gap-4 py-7 sm:grid-cols-[4rem_1fr_auto] sm:gap-6"
              >
                <span className="font-heading text-4xl leading-none text-primary italic sm:text-5xl">
                  {benefit.number}
                </span>
                <div>
                  <h3 className="text-2xl">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                    {benefit.text}
                  </p>
                </div>
                <span className="hidden size-12 place-items-center rounded-full bg-card text-primary sm:grid">
                  <benefit.icon className="size-5" aria-hidden />
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
