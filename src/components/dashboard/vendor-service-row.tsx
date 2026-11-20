'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, MapPin, Pencil, Trash2 } from 'lucide-react';
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
import { formatPrice } from '@/lib/formatPrice';
import type { Service } from '@/lib/types';
import { deleteService, setServiceAvailability } from '@/lib/vendor';

export function VendorServiceRow({ service }: { service: Service }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    setIsSaving(true);
    try {
      const result = await setServiceAvailability(service._id, !service.isActive);
      toast.success(result.message);
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteService(service._id);
      toast.success('Service deleted.');
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
      setIsDeleting(false);
    }
  };

  return (
    <li className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.images[0]}
          alt=""
          className="size-16 shrink-0 rounded-2xl bg-muted object-cover sm:size-20"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-medium">{service.serviceName}</p>
            <StatusBadge status={service.status} />
          </div>
          <p className="mt-1 flex items-center gap-1 truncate text-sm text-muted-foreground">
            {service.category} · <MapPin className="size-3.5" aria-hidden /> {service.location}
          </p>
          <p className="mt-1 text-sm text-primary">{formatPrice(service.price)}</p>
          {service.status === 'rejected' && (
            <p className="mt-1 text-xs text-red-700">
              Not visible to customers. Edit it to send it for review again.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Availability: hidden services don't show on the website */}
        <button
          type="button"
          role="switch"
          aria-checked={service.isActive}
          aria-label="Available to customers"
          onClick={handleToggle}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm disabled:opacity-60"
        >
          <span
            className={`relative h-5 w-9 rounded-full transition-colors ${
              service.isActive ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          >
            <span
              className={`absolute top-0.5 size-4 rounded-full bg-white transition-all ${
                service.isActive ? 'left-4.5' : 'left-0.5'
              }`}
            />
          </span>
          {service.isActive ? 'Available' : 'Hidden'}
        </button>

        <Button
          render={<Link href={`/services/${service._id}`} />}
          nativeButton={false}
          variant="ghost"
          size="icon"
          aria-label="View service"
          className="rounded-full"
        >
          <Eye aria-hidden />
        </Button>
        <Button
          render={<Link href={`/dashboard/vendor/services/${service._id}/edit`} />}
          nativeButton={false}
          variant="ghost"
          size="icon"
          aria-label="Edit service"
          className="rounded-full"
        >
          <Pencil aria-hidden />
        </Button>

        <Dialog>
          <DialogTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete service"
                className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
              />
            }
          >
            <Trash2 aria-hidden />
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete this service?</DialogTitle>
              <DialogDescription>
                &ldquo;{service.serviceName}&rdquo; will be removed for good. This can&apos;t be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" className="rounded-full" />}>
                Keep it
              </DialogClose>
              <Button
                variant="destructive"
                className="rounded-full"
                disabled={isDeleting}
                onClick={handleDelete}
              >
                {isDeleting && <Spinner />}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
}
