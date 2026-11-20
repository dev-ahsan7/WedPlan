'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const statuses = ['all', 'pending', 'accepted', 'rejected', 'cancelled'];

// Status filter for booking lists, kept in the URL as ?status=
export function StatusTabs({ counts }: { counts: Record<string, number> }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get('status') ?? 'all';

  return (
    <div className="mt-8 flex gap-2 overflow-x-auto pb-1 text-sm [scrollbar-width:none]">
      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          aria-pressed={current === status}
          onClick={() =>
            router.replace(status === 'all' ? pathname : `${pathname}?status=${status}`, {
              scroll: false,
            })
          }
          className={`shrink-0 rounded-full border px-4 py-1.5 capitalize transition-colors ${
            current === status
              ? 'border-primary bg-primary text-primary-foreground'
              : 'bg-card hover:border-primary/50'
          }`}
        >
          {status} <span className="opacity-70">({counts[status] ?? 0})</span>
        </button>
      ))}
    </div>
  );
}
