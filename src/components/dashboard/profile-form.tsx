'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { uploadImage } from '@/lib/uploadImage';

type ProfileFormProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
    role: string;
    businessName?: string | null;
  };
};

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState(user.image ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const isVendor = user.role === 'vendor';

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file.');
      return;
    }
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string).trim();
    if (!name) {
      toast.error('Please enter your name.');
      return;
    }

    setIsSaving(true);

    // Upload a new photo only when one was picked
    let image = user.image ?? undefined;
    if (photo) {
      try {
        image = await uploadImage(photo);
      } catch {
        toast.error('Could not upload your photo. Please try another one.');
        setIsSaving(false);
        return;
      }
    }

    // Role and plan are never sent, and the server refuses them anyway
    const { error } = await authClient.updateUser({
      name,
      image,
      ...(isVendor && { businessName: (formData.get('businessName') as string).trim() }),
    });

    setIsSaving(false);
    if (error) {
      toast.error(error.message || 'Could not save your profile.');
      return;
    }

    setPhoto(null);
    toast.success('Your profile is saved.');
    router.refresh();
  };

  return (
    <form onSubmit={handleSave} className="mt-8 max-w-2xl rounded-3xl border bg-card p-5 sm:p-8">
      <div className="flex flex-wrap items-center gap-5">
        <Avatar className="size-20">
          <AvatarImage referrerPolicy="no-referrer" src={preview || undefined} alt="" />
          <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <Label
            htmlFor="photo"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50"
          >
            <Camera className="size-4" aria-hidden />
            Change photo
          </Label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="sr-only"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {photo ? `${photo.name} will be uploaded when you save.` : 'JPG or PNG'}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" defaultValue={user.name} required className="h-11" />
        </div>

        {isVendor && (
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="businessName">Business name</Label>
            <Input
              id="businessName"
              name="businessName"
              defaultValue={user.businessName ?? ''}
              required
              className="h-11"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user.email} readOnly disabled className="h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Account type</Label>
          <Input id="role" value={user.role} readOnly disabled className="h-11 capitalize" />
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Email and account type can&apos;t be changed here.
      </p>

      <Button
        type="submit"
        size="lg"
        className="mt-8 h-11 rounded-full px-8"
        disabled={isSaving}
      >
        {isSaving && <Spinner />}
        {isSaving ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  );
}
