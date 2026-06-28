"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Car,
  ClipboardList,
  Globe,
  LayoutDashboard,
  MessageSquare,
  Receipt,
  Settings,
  Tag,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Logo } from "@/components/go/logo";
import { cn } from "@/lib/utils";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Fleet", href: "/admin/fleet", icon: Car },
  { label: "Reservations", href: "/admin/reservations", icon: ClipboardList },
  { label: "Calendar", href: "/admin/calendar", icon: Calendar },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Pricing", href: "/admin/pricing", icon: Tag },
  { label: "Maintenance", href: "/admin/maintenance", icon: Wrench },
  { label: "Expenses", href: "/admin/expenses", icon: Receipt },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Website", href: "/admin/website", icon: Globe },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items?: AdminNavItem[];
  collapsed?: boolean;
  onNavigate?: () => void;
}

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({
  items = ADMIN_NAV_ITEMS,
  collapsed = false,
  onNavigate,
  className,
  ...props
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-go-border bg-go-paper",
        collapsed ? "w-[4.5rem]" : "w-64",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-go-border px-4",
          collapsed && "justify-center px-2"
        )}
      >
        <Link
          href="/admin"
          className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2"
          aria-label="Go admin home"
          onClick={onNavigate}
        >
          {collapsed ? (
            <span className="text-heading-sm font-bold text-go-ink">Go</span>
          ) : (
            <Logo size="sm" />
          )}
        </Link>
      </div>

      <nav
        className="flex-1 overflow-y-auto p-3"
        aria-label="Admin navigation"
      >
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const active = isActivePath(pathname, item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm font-semibold transition-colors duration-fast",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2",
                    active
                      ? "bg-go-gold/20 text-go-ink"
                      : "text-go-muted hover:bg-go-muted-light hover:text-go-ink",
                    collapsed && "justify-center px-2"
                  )}
                  aria-current={active ? "page" : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      "size-5 shrink-0",
                      active ? "text-go-gold-dark" : "text-go-muted"
                    )}
                    aria-hidden="true"
                  />
                  {!collapsed ? <span>{item.label}</span> : null}
                  {collapsed ? (
                    <span className="sr-only">{item.label}</span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
