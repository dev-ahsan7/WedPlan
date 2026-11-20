'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CalendarDays, Clock, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { cancelBooking } from '@/lib/bookings';
import { formatDate } from '@/lib/formatDate';
import type { Booking } from '@/lib/types';

// What each status means for the customer
const statusText = {
  pending: 'Waiting for the vendor to reply.',
  accepted: 'The vendor accepted. You are booked!',
  rejected: 'The vendor could not take this booking.',
  cancelled: 'You cancelled this request.',
};

export function CustomerBookingCard({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);
  const vendorName = booking.vendor?.businessName || booking.vendor?.name || 'Vendor';

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await cancelBooking(booking._id);
      toast.success('Booking request cancelled.');
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
      setIsCancelling(false);
    }
  };

  return (
    <article className="flex flex-col gap-4 rounded-3xl border bg-card p-4 sm:flex-row sm:p-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={booking.service?.images[0]}
        alt=""
        className="aspect-[16/9] w-full shrink-0 rounded-2xl bg-muted object-cover sm:aspect-[4/3] sm:w-40"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-lg font-medium">
              {booking.service?.serviceName ?? 'Removed service'}
            </p>
            <p className="truncate text-sm text-muted-foreground">by {vendorName}</p>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden />
            {formatDate(booking.eventDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" aria-hidden />
            {booking.eventLocation}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden />
            Requested {formatDate(booking.createdAt)}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 sm:mt-auto sm:pt-4">
          {/* Booking details */}
          <Dialog>
            <DialogTrigger render={<Button variant="outline" className="rounded-full" />}>
              View details
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-heading text-3xl">Booking details</DialogTitle>
                <DialogDescription>{statusText[booking.status]}</DialogDescription>
              </DialogHeader>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Service</dt>
                  <dd className="text-right">{booking.service?.serviceName ?? 'Removed service'}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Vendor</dt>
                  <dd className="text-right">{vendorName}</dd>
                </div>
                {booking.vendor?.email && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Contact</dt>
                    <dd className="text-right">
                      <a
                        href={`mailto:${booking.vendor.email}`}
                        className="inline-flex items-center gap-1 underline underline-offset-4"
                      >
                        <Mail className="size-3.5" aria-hidden />
                        {booking.vendor.email}
                      </a>
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Event date</dt>
                  <dd>{formatDate(booking.eventDate)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Event location</dt>
                  <dd className="text-right">{booking.eventLocation}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Requested on</dt>
                  <dd>{formatDate(booking.createdAt)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd>
                    <StatusBadge status={booking.status} />
                  </dd>
                </div>
                {booking.message && (
                  <div className="rounded-2xl bg-secondary p-3">
                    <dt className="text-xs text-muted-foreground">Your message</dt>
                    <dd className="mt-1">{booking.message}</dd>
                  </div>
                )}
              </dl>
              {booking.service && (
                <Button
                  render={<Link href={`/services/${booking.serviceId}`} />}
                  nativeButton={false}
                  variant="outline"
                  className="mt-2 rounded-full"
                >
                  Open service page
                </Button>
              )}
            </DialogContent>
          </Dialog>

          {/* Only pending requests can be cancelled */}
          {booking.status === 'pending' && (
            <Dialog>
              <DialogTrigger
                render={
                  <Button
                    variant="ghost"
                    className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                  />
                }
              >
                Cancel request
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Cancel this request?</DialogTitle>
                  <DialogDescription>
                    {vendorName} will no longer see your request for{' '}
                    {formatDate(booking.eventDate)}.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" className="rounded-full" />}>
                    Keep it
                  </DialogClose>
                  <Button
                    variant="destructive"
                    className="rounded-full"
                    disabled={isCancelling}
                    onClick={handleCancel}
                  >
                    {isCancelling && <Spinner />}
                    Cancel request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </article>
  );
}
