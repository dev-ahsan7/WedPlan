'use client';
import { useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

type AdminFiltersProps = {
  placeholder: string;
  filterName: string;
  filterLabel: string;
  options: { value: string; label: string }[];
};

// Search box plus one dropdown, both saved in the URL
export function AdminFilters({ placeholder, filterName, filterLabel, options }: AdminFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => updateParam('search', value.trim()), 400);
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <label className="relative flex-1">
        <span className="sr-only">{placeholder}</span>
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-full border bg-card pr-4 pl-11 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </label>
      <NativeSelect
        aria-label={filterLabel}
        value={searchParams.get(filterName) ?? ''}
        onChange={(e) => updateParam(filterName, e.target.value)}
        className="w-full sm:w-48 [&_select]:h-11 [&_select]:rounded-full [&_select]:bg-card [&_select]:pl-4"
      >
        {options.map((option) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}
