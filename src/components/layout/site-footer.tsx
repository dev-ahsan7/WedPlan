import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/categories';

const explore = [
  { label: 'Home', href: '/' },
  { label: 'Browse Services', href: '/services' },
  { label: 'Sign In', href: '/sign-in' },
  { label: 'Sign Up', href: '/sign-up' },
];

const contact = [
  { label: 'hello@wedplan.com', href: 'mailto:hello@wedplan.com', icon: Mail },
  { label: '+880 1700 000 000', href: 'tel:+8801700000000', icon: Phone },
];

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.39A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.39 2.12a5.86 5.86 0 0 0 2.12 1.39c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.39 5.86 5.86 0 0 0 1.39-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.39-2.12A5.86 5.86 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88" />
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
  {
    label: 'X',
    href: 'https://x.com',
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
];

export function SiteFooter() {
  return (
    // The footer is dark, so primary is switched to a lighter rose here
    <footer className="relative mt-24 overflow-hidden bg-[#2a1a20] text-[#f3e9e4] [--primary:#e9a6b6]">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        {/* Invitation style call to action */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-xl text-4xl leading-tight font-medium sm:text-5xl">
            Your big day, <span className="text-primary italic">beautifully</span>{' '}
            planned.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button
              render={<Link href="/services" />}
              nativeButton={false}
              size="lg"
              className="rounded-full bg-[#f3e9e4] px-5 text-[#2a1a20] hover:bg-white"
            >
              Explore Wedding Services
            </Button>
            <Button
              render={<Link href="/sign-up" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full border-white/25 bg-transparent px-5 text-[#f3e9e4] hover:bg-white/10 hover:text-white"
            >
              Join as a Vendor
            </Button>
          </div>
        </div>

        {/* Small ring ornament between two lines */}
        <div className="my-12 flex items-center gap-4 text-primary" aria-hidden>
          <span className="h-px flex-1 bg-white/15" />
          <svg viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-7">
            <circle cx="11" cy="13" r="8" />
            <circle cx="21" cy="13" r="8" />
          </svg>
          <span className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              WedPlan brings photographers, venues, florists, caterers and more
              into one place, so you can find the right people and send booking
              requests in minutes.
            </p>
            <ul className="mt-6 flex items-center gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:text-primary"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                      {social.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.2em] text-white/45 uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.2em] text-white/45 uppercase">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/services?category=${encodeURIComponent(category)}`}
                    className="text-white/75 transition-colors hover:text-primary"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.2em] text-white/45 uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {contact.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2.5 transition-colors hover:text-primary"
                  >
                    <item.icon className="size-4 text-primary" aria-hidden />
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                House 12, Road 7, Gulshan, Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} WedPlan. All rights reserved.</p>
          <p>Made with love for every couple.</p>
        </div>
      </div>

      {/* Big faded name at the very bottom */}
      <p
        className="pointer-events-none -mb-[0.22em] text-center font-heading text-[22vw] leading-none font-semibold text-white/[0.04] select-none"
        aria-hidden
      >
        WedPlan
      </p>
    </footer>
  );
}
