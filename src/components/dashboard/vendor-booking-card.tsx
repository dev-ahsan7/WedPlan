'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, Check, Mail, MapPin, X } from 'lucide-react';
import { toast } from 'sonner';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/lib/formatDate';
import type { Booking } from '@/lib/types';
import { respondToBooking } from '@/lib/vendor';

export function VendorBookingCard({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [saving, setSaving] = useState<'accepted' | 'rejected' | null>(null);
  const customer = booking.customer;

  const handleRespond = async (status: 'accepted' | 'rejected') => {
    setSaving(status);
    try {
      await respondToBooking(booking._id, status);
      toast.success(status === 'accepted' ? 'Booking accepted.' : 'Booking rejected.');
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSaving(null);
    }
  };

  return (
    <article className="rounded-3xl border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="lg">
            <AvatarImage referrerPolicy="no-referrer" src={customer?.image ?? undefined} alt="" />
            <AvatarFallback>{customer?.name.charAt(0) ?? '?'}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-medium">{customer?.name ?? 'Deleted user'}</p>
            {customer?.email && (
              <a
                href={`mailto:${customer.email}`}
                className="flex items-center gap-1 truncate text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="size-3.5 shrink-0" aria-hidden />
                {customer.email}
              </a>
            )}
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-4 rounded-2xl bg-secondary p-4">
        <p className="font-medium">{booking.service?.serviceName ?? 'Removed service'}</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden />
            Event on {formatDate(booking.eventDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" aria-hidden />
            {booking.eventLocation}
          </span>
        </div>
        {booking.message && (
          <p className="mt-3 border-l-2 border-primary/40 pl-3 text-sm italic">
            &ldquo;{booking.message}&rdquo;
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Requested on {formatDate(booking.createdAt)}
        </p>

        {/* Only pending requests can be answered, and only once */}
        {booking.status === 'pending' && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-full"
              disabled={saving !== null}
              onClick={() => handleRespond('rejected')}
            >
              {saving === 'rejected' ? <Spinner /> : <X aria-hidden />}
              Reject
            </Button>
            <Button
              className="rounded-full"
              disabled={saving !== null}
              onClick={() => handleRespond('accepted')}
            >
              {saving === 'accepted' ? <Spinner /> : <Check aria-hidden />}
              Accept
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
