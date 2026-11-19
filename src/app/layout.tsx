import type { Metadata } from 'next';
import { Cormorant_Garamond, Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { SiteFooter } from '@/components/layout/site-footer';
import { Toaster } from '@/components/ui/sonner';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: {
    default: 'WedPlan',
    template: 'WedPlan | %s',
  },
  description:
    'Find wedding photographers, venues, caterers and more, and send booking requests in one place.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" forcedTheme="light">
          <Navbar />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
