"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Inbox,
  Search,
  User,
  Calendar,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface MobileNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const MOBILE_NAV_ITEMS: MobileNavItem[] = [
  { label: "Search", href: "/search", icon: Search },
  { label: "Favorites", href: "/account/favorites", icon: Heart },
  { label: "Trips", href: "/account/trips", icon: Calendar },
  { label: "Inbox", href: "/account/inbox", icon: Inbox },
  { label: "Account", href: "/account", icon: User },
];

export interface MobileBottomNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: MobileNavItem[];
}

function isActivePath(pathname: string, href: string) {
  if (href === "/search") {
    return pathname === "/search" || pathname.startsWith("/vehicles");
  }
  if (href === "/account") {
    return pathname === "/account";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileBottomNav({
  items = MOBILE_NAV_ITEMS,
  className,
  ...props
}: MobileBottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-go-border bg-go-paper/95 pb-[env(safe-area-inset-bottom)] shadow-sticky backdrop-blur-md md:hidden",
        className
      )}
      aria-label="Mobile app navigation"
      {...props}
    >
      <ul className="flex items-stretch">
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);
          const Icon = item.icon;

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex min-h-[3.75rem] flex-col items-center justify-center gap-1 px-1 py-2 text-caption font-semibold transition-colors duration-fast",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-go-gold",
                  active
                    ? "text-go-ink"
                    : "text-go-muted hover:text-go-ink-soft"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "size-5",
                    active ? "text-go-gold-dark" : "text-go-muted"
                  )}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
