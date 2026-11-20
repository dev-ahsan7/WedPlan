'use client';
import { useState } from 'react';

type ServiceGalleryProps = {
  images: string[];
  name: string;
};

export function ServiceGallery({ images, name }: ServiceGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
        {/* Photos come from ImgBB and other hosts */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={`${name}, photo ${active + 1} of ${images.length}`}
          className="size-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={active === index}
              className={`aspect-square w-20 overflow-hidden rounded-2xl border-2 transition-opacity sm:w-24 ${
                active === index
                  ? 'border-primary'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
