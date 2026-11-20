import Link from 'next/link';
import { Crown, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/formatPrice';
import type { Service } from '@/lib/types';

export function ServiceCard({ service }: { service: Service }) {
  const vendorName = service.vendor.businessName || service.vendor.name;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-shadow hover:shadow-[0_18px_40px_-20px_rgba(120,60,75,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {/* Service photos come from ImgBB and other hosts */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.images[0]}
          alt={service.serviceName}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs backdrop-blur">
          {service.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-2xl leading-tight">{service.serviceName}</h3>
          <p className="shrink-0 pt-1 text-right">
            <span className="block text-xs text-muted-foreground">From</span>
            <span className="font-medium text-primary">{formatPrice(service.price)}</span>
          </p>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" aria-hidden />
          {service.location}
        </p>

        <div className="mt-5 flex items-center gap-2.5 border-t border-dashed pt-4">
          <Avatar size="sm">
            <AvatarImage src={service.vendor.image ?? undefined} alt="" />
            <AvatarFallback>{vendorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1 truncate text-sm">{vendorName}</span>
          {service.vendor.subscriptionPlan === 'premium' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
              <Crown className="size-3" aria-hidden />
              Premium
            </span>
          )}
        </div>

        <Button
          render={<Link href={`/services/${service._id}`} />}
          nativeButton={false}
          variant="outline"
          className="mt-5 h-10 w-full rounded-full"
        >
          View Details
        </Button>
      </div>
    </article>
  );
}
