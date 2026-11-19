import Image from 'next/image';

type AuthShellProps = {
  children: React.ReactNode;
  image: string;
  quote: string;
};

// Form on the left, an arched wedding photo on the right (desktop only)
export function AuthShell({ children, image, quote }: AuthShellProps) {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-14">
      <div className="mx-auto w-full max-w-md">{children}</div>

      <div className="relative hidden lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl">
            <Image src={image} alt="" fill sizes="520px" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-8 pt-24">
              <p className="font-heading text-3xl leading-tight text-white italic">
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
