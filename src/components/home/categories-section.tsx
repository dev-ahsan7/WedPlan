import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const categoryCards = [
  {
    name: 'Photography & Videography',
    text: 'Capture every glance and every dance.',
    image: '/images/category-photography.jpg',
  },
  {
    name: 'Wedding Venues',
    text: 'Halls, gardens and rooftops for your day.',
    image: '/images/category-venues.jpg',
  },
  {
    name: 'Decoration & Florist',
    text: 'Flowers, stages and lights that set the mood.',
    image: '/images/category-decoration.jpg',
  },
  {
    name: 'Catering Services',
    text: 'Menus your guests will still talk about.',
    image: '/images/category-catering.jpg',
  },
  {
    name: 'Makeup & Styling',
    text: 'Bridal looks for you and your whole party.',
    image: '/images/category-makeup.jpg',
  },
  {
    name: 'Wedding Fashion',
    text: 'Gowns, sherwanis and outfits made to fit.',
    image: '/images/category-fashion.jpg',
  },
];

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs tracking-[0.2em] text-primary uppercase">
            Wedding service categories
          </p>
          <h2 className="mt-3 max-w-xl text-4xl leading-tight sm:text-5xl">
            The right people for every part of the day
          </h2>
        </div>
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-primary"
        >
          View all services
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
        {categoryCards.map((category, index) => (
          <li key={category.name}>
            <Link
              href={`/services?category=${encodeURIComponent(category.name)}`}
              className="group block"
            >
              {/* Arch shaped photo, same idea as the banner */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-2xl bg-muted">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 340px, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-card text-primary shadow transition-transform group-hover:rotate-45 sm:size-10">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                0{index + 1}
              </p>
              <h3 className="mt-1 text-xl leading-tight transition-colors group-hover:text-primary sm:text-2xl">
                {category.name}
              </h3>
              <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
                {category.text}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
