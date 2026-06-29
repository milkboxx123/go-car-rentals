"use client";

import { usePathname } from "next/navigation";

import {
  ACCOUNT_NAV_ITEMS,
  isAccountNavActive,
} from "@/components/account/account-nav";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export interface AccountSidebarProps {
  className?: string;
}

export function AccountSidebar({ className }: AccountSidebarProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Account navigation"
      className={cn(
        "rounded-xl border border-go-border bg-go-paper p-4 shadow-card lg:sticky lg:top-24 lg:self-start",
        className
      )}
    >
      <ul className="space-y-1">
        {ACCOUNT_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isAccountNavActive(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm font-medium transition-colors",
                  active
                    ? "bg-go-gold/15 text-go-ink"
                    : "text-go-muted hover:bg-go-muted-light hover:text-go-ink"
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
