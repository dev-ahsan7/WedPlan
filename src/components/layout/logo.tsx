import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" aria-label="WedPlan home" className="flex items-center gap-2">
      {/* Two wedding rings */}
      <svg
        viewBox="0 0 32 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-8 text-primary"
        aria-hidden
      >
        <circle cx="11" cy="13" r="8" />
        <circle cx="21" cy="13" r="8" />
        <path d="M21 1.5l2 2.5-2 2.5-2-2.5z" fill="currentColor" stroke="none" />
      </svg>
      <span className="font-heading text-2xl leading-none sm:text-[1.7rem] font-semibold tracking-tight">
        Wed<span className="text-primary italic">Plan</span>
      </span>
    </Link>
  );
}
