import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CircleCheck, Sparkles } from 'lucide-react';
import { FadeIn } from '@/components/shared/fade-in';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/categories';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft rose glow behind the photos */}
      <div
        className="pointer-events-none absolute top-10 -right-40 size-[38rem] rounded-full bg-[radial-gradient(circle,#f3d6dc_0%,transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16">
        <FadeIn>
          <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" aria-hidden />
            Wedding planning, made simple
          </p>

          <h1 className="mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Every detail of your{' '}
            <span className="text-primary italic">forever</span>, in one place.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Find photographers, venues, florists, caterers and more. Compare
            what they offer and send booking requests to the vendors you love,
            all from WedPlan.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              render={<Link href="/services" />}
              nativeButton={false}
              size="lg"
              className="group h-12 rounded-full pr-2 pl-6 text-base"
            >
              Explore Wedding Services
              <span className="grid size-8 place-items-center rounded-full bg-primary-foreground text-primary transition-transform group-hover:rotate-45">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </Button>
            <Link
              href="/sign-up"
              className="text-sm underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
            >
              Are you a vendor? List your services
            </Link>
          </div>

          {/* Quick links to a few categories */}
          <div className="mt-10 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 text-muted-foreground">Popular:</span>
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category}
                href={`/services?category=${encodeURIComponent(category)}`}
                className="rounded-full border bg-card px-3 py-1 transition-colors hover:border-primary hover:text-primary"
              >
                {category}
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* Photos in an arch, like a chapel window */}
        <FadeIn
          delay={0.2}
          className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
        >
          <div
            className="absolute inset-0 translate-x-4 -translate-y-4 rounded-t-full border border-primary/30"
            aria-hidden
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl">
            <Image
              src="/images/hero-couple.jpg"
              alt="Bride and groom kissing while guests throw flower petals"
              fill
              priority
              sizes="(min-width: 1024px) 460px, 90vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-4 size-32 overflow-hidden rounded-full border-4 border-background shadow-lg sm:-left-10 sm:size-40">
            <Image
              src="/images/hero-bouquet.jpg"
              alt="Bridal bouquet of peach and white roses"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>

          <div className="absolute top-1/3 -right-2 flex max-w-56 items-start gap-3 rounded-2xl border bg-card/95 p-3 shadow-lg backdrop-blur sm:-right-8">
            <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden />
            <div>
              <p className="text-sm font-medium">Booking accepted</p>
              <p className="text-xs text-muted-foreground">
                Bloom &amp; Petal Florist · 14 Feb
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
