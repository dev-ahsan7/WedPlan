'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Eye, MapPin, Trash2, X } from 'lucide-react';
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
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Spinner } from '@/components/ui/spinner';
import { setServiceStatus } from '@/lib/admin';
import { formatPrice } from '@/lib/formatPrice';
import type { Service } from '@/lib/types';
import { deleteService } from '@/lib/vendor';

export function AdminServiceRow({ service }: { service: Service }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const vendorName = service.vendor.businessName || service.vendor.name;

  const changeStatus = async (status: string) => {
    setIsSaving(true);
    try {
      const result = await setServiceStatus(service._id, status);
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
    <li className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:p-5">
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
            {!service.isActive && (
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                Hidden by vendor
              </span>
            )}
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            by {vendorName} · {service.category}
          </p>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden />
            {service.location} · <span className="text-primary">{formatPrice(service.price)}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Quick actions for services waiting for review */}
        {service.status === 'pending' ? (
          <>
            <Button
              variant="outline"
              className="rounded-full"
              disabled={isSaving}
              onClick={() => changeStatus('rejected')}
            >
              <X aria-hidden />
              Reject
            </Button>
            <Button className="rounded-full" disabled={isSaving} onClick={() => changeStatus('approved')}>
              {isSaving ? <Spinner /> : <Check aria-hidden />}
              Approve
            </Button>
          </>
        ) : (
          <NativeSelect
            aria-label={`Change status of ${service.serviceName}`}
            value={service.status}
            disabled={isSaving}
            onChange={(e) => changeStatus(e.target.value)}
            className="[&_select]:h-9 [&_select]:rounded-full [&_select]:pl-3"
          >
            <NativeSelectOption value="approved">Approved</NativeSelectOption>
            <NativeSelectOption value="pending">Pending</NativeSelectOption>
            <NativeSelectOption value="rejected">Rejected</NativeSelectOption>
          </NativeSelect>
        )}

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
                &ldquo;{service.serviceName}&rdquo; by {vendorName} will be removed for good. Use
                this for inappropriate services.
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
