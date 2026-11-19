'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight, LayoutDashboard, LogOut, Menu, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '@/components/layout/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { authClient } from '@/lib/auth-client';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Browse Services', href: '/services' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // The bar gets a white background and a shadow once the page scrolls
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Browse Services stays active on /services/[id] too
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success('You are logged out.');
    router.push('/');
    router.refresh();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        className={`mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center rounded-full border px-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? 'border-border bg-card/95 shadow-[0_8px_30px_-12px_rgba(120,60,75,0.25)] backdrop-blur'
            : 'border-transparent bg-transparent'
        }`}
      >
        {/* Left: page links on desktop, menu button on phone */}
        <div className="flex items-center">
          <ul className="hidden items-center gap-1 text-sm md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative block rounded-full px-4 py-2 transition-colors ${
                    isActive(link.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="rounded-full md:hidden"
                />
              }
            >
              <Menu aria-hidden />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <ul className="flex flex-col px-4">
                {links.map((link, index) => (
                  <li key={link.href} className="border-b border-dashed">
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-baseline gap-3 py-4"
                    >
                      <span className="text-xs text-muted-foreground">
                        0{index + 1}
                      </span>
                      <span
                        className={`font-heading text-3xl ${
                          isActive(link.href) ? 'text-primary italic' : ''
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {!isPending && !user && (
                <div className="mt-6 flex flex-col gap-2 px-4">
                  <Button
                    render={<Link href="/sign-up" onClick={closeMenu} />}
                    nativeButton={false}
                    size="lg"
                    className="rounded-full"
                  >
                    Sign Up
                  </Button>
                  <Button
                    render={<Link href="/sign-in" onClick={closeMenu} />}
                    nativeButton={false}
                    size="lg"
                    variant="outline"
                    className="rounded-full"
                  >
                    Sign In
                  </Button>
                </div>
              )}
              <p className="mt-auto p-4 font-heading text-lg text-muted-foreground italic">
                Plan the day. Enjoy the moment.
              </p>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center: logo, like the names on an invitation */}
        <Logo />

        {/* Right: sign in buttons or the profile menu */}
        <div className="flex items-center justify-end gap-1">
          {isPending ? (
            <div className="size-9" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Open profile menu"
                className="flex items-center gap-2 rounded-full p-0.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:border sm:py-1 sm:pr-4 sm:pl-1"
              >
                <Avatar className="ring-2 ring-primary/30">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user.image ?? undefined}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="hidden max-w-28 truncate text-sm sm:block">
                  {user.name.split(' ')[0]}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex items-center gap-3 py-2">
                    <Avatar size="lg">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image ?? undefined}
                        alt=""
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-foreground">
                        {user.name}
                      </span>
                      <span className="block truncate text-xs font-normal">
                        {user.email}
                      </span>
                    </span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/dashboard" />}>
                  <LayoutDashboard aria-hidden />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/dashboard/profile" />}>
                  <Settings aria-hidden />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOut aria-hidden />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
              >
                Sign In
              </Link>
              <Button
                render={<Link href="/sign-up" />}
                nativeButton={false}
                className="group h-9 rounded-full px-4 sm:h-10 sm:pr-1.5"
              >
                Sign Up
                <span className="hidden size-7 place-items-center rounded-full bg-primary-foreground text-primary transition-transform group-hover:rotate-45 sm:grid">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
