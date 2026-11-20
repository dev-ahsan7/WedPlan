import Link from 'next/link';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

type BookingCardProps = {
  role?: string;
  isOwner: boolean;
  isPublic: boolean;
  serviceId: string;
};

// Shows who can book. The server checks the same rules again.
export function BookingCard({ role, isOwner, isPublic, serviceId }: BookingCardProps) {
  let message = '';
  if (!role) {
    message = 'Sign in with a customer account to send a booking request.';
  } else if (isOwner) {
    message = 'This is your own service, so you can not book it.';
  } else if (role === 'admin') {
    message = 'Admins can not send booking requests.';
  } else if (role === 'vendor') {
    message = 'Vendors can not book services. Use a customer account to book.';
  } else if (!isPublic) {
    message = 'This service is not available for booking right now.';
  }

  if (message) {
    return (
      <div className="mt-6">
        <p className="flex gap-2 rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {message}
        </p>
        {!role && (
          <Button
            render={<Link href={`/sign-in?redirect=/services/${serviceId}`} />}
            nativeButton={false}
            size="lg"
            className="mt-4 h-11 w-full rounded-full"
          >
            Sign in to book
          </Button>
        )}
        {isOwner && (
          <Button
            render={<Link href="/dashboard" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="mt-4 h-11 w-full rounded-full"
          >
            Manage my services
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <p className="text-sm text-muted-foreground">
        Pick your date and location, and the vendor will accept or decline your
        request.
      </p>
      {/* The booking form is added together with the bookings API */}
      <Button size="lg" className="mt-4 h-11 w-full rounded-full" disabled>
        Request a booking
      </Button>
    </div>
  );
}
