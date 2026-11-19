'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Camera, Heart, Store } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleButton } from '@/components/auth/google-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { uploadImage } from '@/lib/uploadImage';

const roles = [
  {
    value: 'customer',
    title: 'Customer',
    text: "I'm planning a wedding",
    icon: Heart,
  },
  {
    value: 'vendor',
    title: 'Vendor',
    text: 'I offer wedding services',
    icon: Store,
  },
];

const getPasswordError = (password: string) => {
  if (password.length < 6) return 'Password must be at least 6 characters.';
  if (!/[A-Z]/.test(password)) return 'Password must have an uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Password must have a lowercase letter.';
  return '';
};

export function SignUpForm() {
  const router = useRouter();
  const [role, setRole] = useState('customer');
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && !file.type.startsWith('image/')) {
      toast.error('Please choose an image file.');
      return;
    }
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : '');
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;

    const error = getPasswordError(password);
    setPasswordError(error);
    if (error) return;

    setIsSubmitting(true);

    // The photo is optional, so only upload it when one was picked
    let image = '';
    if (photo) {
      try {
        image = await uploadImage(photo);
      } catch {
        toast.error('Could not upload your photo. Try another one or skip it.');
        setIsSubmitting(false);
        return;
      }
    }

    const result = await authClient.signUp.email({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password,
      image,
      role,
      businessName:
        role === 'vendor' ? (formData.get('businessName') as string) : undefined,
    });

    if (result.error) {
      toast.error(result.error.message || 'Could not create your account.');
      setIsSubmitting(false);
      return;
    }

    toast.success('Welcome to WedPlan! Your account is ready.');
    router.push('/');
    router.refresh();
  };

  return (
    <div>
      <p className="text-xs tracking-[0.2em] text-primary uppercase">
        Create account
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Join WedPlan</h1>
      <p className="mt-2 text-muted-foreground">
        Plan your wedding or grow your wedding business.
      </p>

      <form onSubmit={handleSignUp} className="mt-8 space-y-5">
        <fieldset>
          <legend className="text-sm font-medium">I am a</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {roles.map((item) => (
              <label
                key={item.value}
                className={`flex cursor-pointer flex-col gap-2 rounded-2xl border p-4 transition-colors has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50 ${
                  role === item.value
                    ? 'border-primary bg-accent'
                    : 'bg-card hover:border-primary/40'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={item.value}
                  checked={role === item.value}
                  onChange={() => setRole(item.value)}
                  className="sr-only"
                />
                <item.icon className="size-5 text-primary" aria-hidden />
                <span className="font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.text}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" required className="h-11" />
        </div>

        {role === 'vendor' && (
          <div className="space-y-2">
            <Label htmlFor="businessName">Business name</Label>
            <Input
              id="businessName"
              name="businessName"
              required
              placeholder="e.g. Golden Hour Studio"
              className="h-11"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="h-11" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            aria-invalid={Boolean(passwordError)}
            aria-describedby="password-help"
            className="h-11"
          />
          <p
            id="password-help"
            role={passwordError ? 'alert' : undefined}
            className={`text-xs ${passwordError ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            {passwordError ||
              'At least 6 characters, with one uppercase and one lowercase letter.'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-full border bg-muted text-muted-foreground">
            {preview ? (
              // A local preview of the chosen file
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="size-full object-cover" />
            ) : (
              <Camera className="size-5" aria-hidden />
            )}
          </span>
          <div>
            <Label
              htmlFor="photo"
              className="cursor-pointer text-sm underline decoration-primary/40 underline-offset-4 hover:text-primary"
            >
              {photo ? 'Change photo' : 'Upload a profile photo'}
            </Label>
            <p className="mt-1 text-xs text-muted-foreground">Optional · JPG or PNG</p>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="sr-only"
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-11 w-full rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner />}
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton role={role} />
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Google sign up uses the account type you picked above.
      </p>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-foreground underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}
