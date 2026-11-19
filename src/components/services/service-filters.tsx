'use client';
import { useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { categories } from '@/lib/categories';

export function ServiceFilters({ locations }: { locations: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const category = searchParams.get('category') ?? '';
  const location = searchParams.get('location') ?? '';
  const sort = searchParams.get('sort') ?? '';

  // Filters live in the URL, so the page can be shared or refreshed.
  // It reads the current URL so a late search never brings back old filters.
  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Wait until the user stops typing before searching
  const handleSearchChange = (value: string) => {
    setSearch(value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => updateParam('search', value.trim()), 400);
  };

  const clearAll = () => {
    clearTimeout(searchTimer.current);
    setSearch('');
    router.replace(pathname, { scroll: false });
  };

  const hasFilters = search || category || location || sort;

  return (
    <div className="rounded-3xl border bg-card p-3 sm:p-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search services</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search photographers, venues, caterers..."
            className="h-11 w-full rounded-full border bg-background pr-4 pl-11 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>

        <div className="grid grid-cols-2 gap-3 md:flex">
          <NativeSelect
            aria-label="Filter by location"
            value={location}
            onChange={(e) => updateParam('location', e.target.value)}
            className="w-full md:w-44 [&_select]:h-11 [&_select]:rounded-full [&_select]:bg-background [&_select]:pl-4"
          >
            <NativeSelectOption value="">All locations</NativeSelectOption>
            {locations.map((item) => (
              <NativeSelectOption key={item} value={item}>
                {item}
              </NativeSelectOption>
            ))}
          </NativeSelect>

          <NativeSelect
            aria-label="Sort services"
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="w-full md:w-48 [&_select]:h-11 [&_select]:rounded-full [&_select]:bg-background [&_select]:pl-4"
          >
            <NativeSelectOption value="">Newest first</NativeSelectOption>
            <NativeSelectOption value="price_asc">Price: low to high</NativeSelectOption>
            <NativeSelectOption value="price_desc">Price: high to low</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>

      {/* Category chips, one can be picked at a time */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 text-sm [scrollbar-width:none]">
        <button
          type="button"
          onClick={() => updateParam('category', '')}
          aria-pressed={!category}
          className={`shrink-0 rounded-full border px-4 py-1.5 transition-colors ${
            !category ? 'border-primary bg-primary text-primary-foreground' : 'hover:border-primary/50'
          }`}
        >
          All
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => updateParam('category', item)}
            aria-pressed={category === item}
            className={`shrink-0 rounded-full border px-4 py-1.5 transition-colors ${
              category === item
                ? 'border-primary bg-primary text-primary-foreground'
                : 'hover:border-primary/50'
            }`}
          >
            {item}
          </button>
        ))}
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto inline-flex shrink-0 items-center gap-1 px-2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" aria-hidden />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
