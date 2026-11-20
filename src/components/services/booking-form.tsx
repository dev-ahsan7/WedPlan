'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CalendarHeart, CircleCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { createBooking } from '@/lib/bookings';

type BookingFormProps = {
  serviceId: string;
  serviceName: string;
  defaultLocation: string;
};

// Today as YYYY-MM-DD, so the date picker can't choose a past day
const getToday = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
};

export function BookingForm({ serviceId, serviceName, defaultLocation }: BookingFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setIsSubmitting(true);
    try {
      await createBooking({
        serviceId,
        eventDate: formData.get('eventDate') as string,
        eventLocation: formData.get('eventLocation') as string,
        message: formData.get('message') as string,
      });
      toast.success('Booking request sent! The vendor will reply soon.');
      setIsSent(true);
      setOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      {isSent ? (
        <p className="flex gap-2 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
          <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            Request sent. Track it in{' '}
            <Link href="/dashboard" className="underline underline-offset-4">
              your dashboard
            </Link>
            .
          </span>
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Pick your date and location, and the vendor will accept or decline your
          request.
        </p>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={<Button size="lg" className="mt-4 h-11 w-full rounded-full" />}
        >
          <CalendarHeart aria-hidden />
          {isSent ? 'Request another date' : 'Request a booking'}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl">Request a booking</DialogTitle>
            <DialogDescription>{serviceName}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventDate">Event date</Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                min={getToday()}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventLocation">Event location</Label>
              <Input
                id="eventLocation"
                name="eventLocation"
                defaultValue={defaultLocation}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea
                id="message"
                name="message"
                maxLength={500}
                rows={4}
                placeholder="Number of guests, timing, anything the vendor should know"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-11 w-full rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? 'Sending request...' : 'Send request'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
