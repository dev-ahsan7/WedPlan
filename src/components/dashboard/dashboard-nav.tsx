'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  CalendarCheck,
  ClipboardList,
  Crown,
  House,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Receipt,
  Settings,
  Store,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '@/components/layout/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { authClient } from '@/lib/auth-client';

const links = {
  vendor: [
    { label: 'Overview', href: '/dashboard/vendor', icon: LayoutDashboard },
    { label: 'My Services', href: '/dashboard/vendor/services', icon: Store },
    { label: 'Add Service', href: '/dashboard/vendor/add-service', icon: PlusCircle },
    { label: 'Booking Requests', href: '/dashboard/vendor/bookings', icon: Inbox },
    { label: 'Subscription', href: '/dashboard/vendor/subscription', icon: Crown },
    { label: 'Profile Settings', href: '/dashboard/profile', icon: Settings },
  ],
  customer: [
    { label: 'Overview', href: '/dashboard/customer', icon: LayoutDashboard },
    { label: 'My Bookings', href: '/dashboard/customer/bookings', icon: CalendarCheck },
    { label: 'Profile Settings', href: '/dashboard/profile', icon: Settings },
  ],
  admin: [
    { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
    { label: 'Manage Services', href: '/dashboard/admin/services', icon: ClipboardList },
    { label: 'Transactions', href: '/dashboard/admin/transactions', icon: Receipt },
  ],
};

type DashboardNavProps = {
  role: 'vendor' | 'customer' | 'admin';
  user: { name: string; email: string; image?: string | null };
};

export function DashboardNav({ role, user }: DashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success('You are logged out.');
    router.push('/');
    router.refresh();
  };

  // The same links are used in the sidebar and in the phone menu
  const navList = (
    <nav className="flex flex-1 flex-col gap-1 text-sm">
      <p className="px-3 pb-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {role} dashboard
      </p>
      {links[role].map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-3 rounded-full px-3 py-2.5 transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <link.icon className="size-4" aria-hidden />
            {link.label}
          </Link>
        );
      })}

      <div className="mt-auto space-y-1 border-t pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full px-3 py-2.5 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <House className="size-4" aria-hidden />
          Back to website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-full px-3 py-2.5 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="size-4" aria-hidden />
          Logout
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-secondary p-3">
        <Avatar>
          <AvatarImage referrerPolicy="no-referrer" src={user.image ?? undefined} alt="" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r bg-card p-5 lg:flex">
        <div className="mb-8 px-1">
          <Logo />
        </div>
        {navList}
      </aside>

      {/* Phone and tablet top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-card/95 px-4 backdrop-blur lg:hidden">
        <Logo />
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open dashboard menu"
                className="rounded-full"
              />
            }
          >
            <Menu aria-hidden />
          </SheetTrigger>
          <SheetContent side="left" className="flex w-72 flex-col bg-card p-5">
            <SheetHeader className="p-0 pb-6">
              <SheetTitle className="sr-only">Dashboard menu</SheetTitle>
              <Logo />
            </SheetHeader>
            {navList}
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
