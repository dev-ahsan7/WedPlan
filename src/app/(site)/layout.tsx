import { Navbar } from '@/components/layout/navbar';
import { SiteFooter } from '@/components/layout/site-footer';

// Public pages share the navbar and footer. The dashboard has its own layout.
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
