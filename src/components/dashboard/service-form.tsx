'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImagePlus, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { categories } from '@/lib/categories';
import type { Service } from '@/lib/types';
import { uploadImage } from '@/lib/uploadImage';
import { createService, updateService } from '@/lib/vendor';

const MAX_IMAGES = 5;

type NewPhoto = { file: File; preview: string };

// Used for both Add Service and Edit Service
export function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const [savedImages, setSavedImages] = useState<string[]>(service?.images ?? []);
  const [newPhotos, setNewPhotos] = useState<NewPhoto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const photoCount = savedImages.length + newPhotos.length;

  const handleAddPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';

    const images = files.filter((file) => file.type.startsWith('image/'));
    if (images.length < files.length) {
      toast.error('Only image files can be added.');
    }

    const space = MAX_IMAGES - photoCount;
    if (images.length > space) {
      toast.error(`You can add up to ${MAX_IMAGES} photos.`);
    }

    const added = images
      .slice(0, space)
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setNewPhotos([...newPhotos, ...added]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (photoCount === 0) {
      toast.error('Please add at least one photo.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    setIsSubmitting(true);

    // Upload the new photos first, then save the service with all photo links
    let uploaded: string[] = [];
    try {
      uploaded = await Promise.all(newPhotos.map((photo) => uploadImage(photo.file)));
    } catch {
      toast.error('Could not upload a photo. Please try another one.');
      setIsSubmitting(false);
      return;
    }

    const data = {
      serviceName: formData.get('serviceName') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      location: formData.get('location') as string,
      images: [...savedImages, ...uploaded],
    };

    try {
      if (service) {
        await updateService(service._id, data);
        toast.success('Service updated and sent for review.');
      } else {
        await createService(data);
        toast.success('Service added. An admin will review it soon.');
      }
      router.push('/dashboard/vendor/services');
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-5 rounded-3xl border bg-card p-5 sm:p-6">
        <div className="space-y-2">
          <Label htmlFor="serviceName">Service name</Label>
          <Input
            id="serviceName"
            name="serviceName"
            defaultValue={service?.serviceName}
            required
            placeholder="e.g. Full Day Wedding Photography"
            className="h-11"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <NativeSelect
              id="category"
              name="category"
              defaultValue={service?.category ?? ''}
              required
              className="w-full [&_select]:h-11"
            >
              <NativeSelectOption value="" disabled>
                Choose a category
              </NativeSelectOption>
              {categories.map((category) => (
                <NativeSelectOption key={category} value={category}>
                  {category}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (৳)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min={1}
              step={1}
              defaultValue={service?.price}
              required
              placeholder="45000"
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            defaultValue={service?.location}
            required
            placeholder="e.g. Gulshan, Dhaka"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={service?.description}
            required
            rows={6}
            placeholder="What is included, how long you stay, what makes you different"
          />
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-3xl border bg-card p-5 sm:p-6">
          <p className="text-sm font-medium">Photos</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Up to {MAX_IMAGES} photos. The first one is the cover.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {savedImages.map((image) => (
              <div key={image} className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className="size-full object-cover" />
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => setSavedImages(savedImages.filter((item) => item !== image))}
                  className="absolute top-1.5 right-1.5 grid size-6 place-items-center rounded-full bg-card/90 shadow"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              </div>
            ))}
            {newPhotos.map((photo) => (
              <div key={photo.preview} className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.preview} alt="" className="size-full object-cover" />
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => setNewPhotos(newPhotos.filter((item) => item !== photo))}
                  className="absolute top-1.5 right-1.5 grid size-6 place-items-center rounded-full bg-card/90 shadow"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              </div>
            ))}
            {photoCount < MAX_IMAGES && (
              <label className="grid aspect-square cursor-pointer place-items-center rounded-2xl border-2 border-dashed text-muted-foreground transition-colors hover:border-primary hover:text-primary has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50">
                <span className="flex flex-col items-center gap-1 text-xs">
                  <ImagePlus className="size-5" aria-hidden />
                  Add photo
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  aria-label="Add photos"
                  onChange={handleAddPhotos}
                  className="sr-only"
                />
              </label>
            )}
          </div>
        </div>

        <p className="rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">
          {service
            ? 'After you save, the service goes back to the admin for review.'
            : 'New services stay pending until an admin approves them. Customers only see approved services.'}
        </p>

        <Button
          type="submit"
          size="lg"
          className="h-11 w-full rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner />}
          {isSubmitting ? 'Saving...' : service ? 'Save changes' : 'Add service'}
        </Button>
      </div>
    </form>
  );
}
