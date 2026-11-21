'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
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
import { cancelSubscription } from '@/lib/subscription';

export function CancelSubscriptionButton({ endDate }: { endDate: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      const result = await cancelSubscription();
      toast.success(result.message);
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            className="mt-3 w-full rounded-full text-muted-foreground hover:text-destructive"
          />
        }
      >
        Cancel subscription
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Cancel Premium?</DialogTitle>
          <DialogDescription>
            You keep Premium until {endDate}. After that you move to the Free plan, and only 3 of
            your services can stay active.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" className="rounded-full" />}>
            Keep Premium
          </DialogClose>
          <Button
            variant="destructive"
            className="rounded-full"
            disabled={isCancelling}
            onClick={handleCancel}
          >
            {isCancelling && <Spinner />}
            Cancel subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
