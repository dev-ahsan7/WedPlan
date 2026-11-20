'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Eye, ShieldBan, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { getUserDetails, setUserBlocked } from '@/lib/admin';
import { formatDate } from '@/lib/formatDate';
import type { AdminUser, AdminUserDetails } from '@/lib/types';

const roleStyles = {
  admin: 'bg-violet-100 text-violet-800',
  vendor: 'bg-sky-100 text-sky-800',
  customer: 'bg-accent text-primary',
};

export function AdminUserRow({ user }: { user: AdminUser }) {
  const router = useRouter();
  const [details, setDetails] = useState<AdminUserDetails | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Loads the numbers the first time the details box opens
  const handleOpenDetails = async (open: boolean) => {
    if (!open || details) return;
    try {
      setDetails(await getUserDetails(user._id));
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleBlock = async () => {
    setIsSaving(true);
    try {
      const result = await setUserBlocked(user._id, !user.isBlocked);
      toast.success(result.message);
      setConfirmOpen(false);
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <li className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar size="lg">
          <AvatarImage referrerPolicy="no-referrer" src={user.image ?? undefined} alt="" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-medium">{user.name}</p>
            <span className={`rounded-full px-2.5 py-0.5 text-xs capitalize ${roleStyles[user.role]}`}>
              {user.role}
            </span>
            {user.isBlocked && (
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs text-red-800">
                Blocked
              </span>
            )}
            {user.subscriptionPlan === 'premium' && (
              <Crown className="size-4 text-amber-600" aria-label="Premium vendor" />
            )}
          </div>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
          {user.businessName && (
            <p className="truncate text-xs text-muted-foreground">{user.businessName}</p>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground sm:w-28">Joined {formatDate(user.createdAt)}</p>

      <div className="flex gap-2">
        <Dialog onOpenChange={handleOpenDetails}>
          <DialogTrigger render={<Button variant="outline" className="rounded-full" />}>
            <Eye aria-hidden />
            Details
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading text-3xl">{user.name}</DialogTitle>
              <DialogDescription>{user.email}</DialogDescription>
            </DialogHeader>
            {details ? (
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Role</dt>
                  <dd className="capitalize">{details.role}</dd>
                </div>
                {details.businessName && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Business</dt>
                    <dd className="text-right">{details.businessName}</dd>
                  </div>
                )}
                {details.role === 'vendor' && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Plan</dt>
                    <dd className="capitalize">{details.subscriptionPlan ?? 'free'}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd>{details.isBlocked ? 'Blocked' : 'Active'}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Joined</dt>
                  <dd>{formatDate(details.createdAt)}</dd>
                </div>
                {details.role === 'vendor' ? (
                  <>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Services</dt>
                      <dd>{details.stats.services}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Booking requests received</dt>
                      <dd>{details.stats.bookingsReceived}</dd>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Booking requests sent</dt>
                    <dd>{details.stats.bookingsSent}</dd>
                  </div>
                )}
              </dl>
            ) : (
              <div className="grid place-items-center py-8">
                <Spinner className="size-5 text-muted-foreground" />
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Admins can't be blocked, so the button only shows for other roles */}
        {user.role !== 'admin' && (
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogTrigger
              render={
                <Button
                  variant={user.isBlocked ? 'outline' : 'ghost'}
                  className={`rounded-full ${
                    user.isBlocked ? '' : 'text-destructive hover:bg-destructive/10 hover:text-destructive'
                  }`}
                />
              }
            >
              {user.isBlocked ? <ShieldCheck aria-hidden /> : <ShieldBan aria-hidden />}
              {user.isBlocked ? 'Unblock' : 'Block'}
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>
                  {user.isBlocked ? `Unblock ${user.name}?` : `Block ${user.name}?`}
                </DialogTitle>
                <DialogDescription>
                  {user.isBlocked
                    ? 'They will be able to sign in and use WedPlan again.'
                    : 'They will be signed out and can not use the dashboard or send bookings until you unblock them.'}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" className="rounded-full" />}>
                  Cancel
                </DialogClose>
                <Button
                  variant={user.isBlocked ? 'default' : 'destructive'}
                  className="rounded-full"
                  disabled={isSaving}
                  onClick={handleBlock}
                >
                  {isSaving && <Spinner />}
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </li>
  );
}
