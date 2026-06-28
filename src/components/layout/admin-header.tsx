"use client";

import * as React from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export interface AdminBreadcrumbItem {
  label: string;
  href?: string;
}

export interface AdminHeaderProps extends React.HTMLAttributes<HTMLElement> {
  breadcrumbs?: AdminBreadcrumbItem[];
  onSidebarToggle?: () => void;
  notificationCount?: number;
  userName?: string;
  userInitials?: string;
  showSearch?: boolean;
}

export function AdminHeader({
  breadcrumbs = [{ label: "Overview" }],
  onSidebarToggle,
  notificationCount = 3,
  userName = "Admin",
  userInitials = "AD",
  showSearch = true,
  className,
  ...props
}: AdminHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-go-border bg-go-paper px-4 sm:px-6",
        className
      )}
      {...props}
    >
      <IconButton
        variant="ghost"
        size="sm"
        className="lg:hidden"
        aria-label="Toggle sidebar"
        onClick={onSidebarToggle}
      >
        <Menu aria-hidden="true" />
      </IconButton>

      <Breadcrumb className="hidden min-w-0 sm:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <React.Fragment key={`${item.label}-${index}`}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {showSearch ? (
          <div className="relative hidden w-full max-w-xs md:block">
            <Input
              type="search"
              placeholder="Search fleet, guests, reservations…"
              aria-label="Search admin"
              leftIcon={<Search aria-hidden="true" />}
              inputSize="sm"
              className="rounded-lg bg-go-muted-light/50"
            />
          </div>
        ) : null}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="relative flex size-10 items-center justify-center rounded-full outline-none transition-colors hover:bg-go-muted-light focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2"
              aria-label={
                notificationCount > 0
                  ? `Notifications, ${notificationCount} unread`
                  : "Notifications"
              }
            >
              <Bell className="size-5 text-go-ink" aria-hidden="true" />
              {notificationCount > 0 ? (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-go-gold text-[10px] font-bold text-go-ink">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              ) : null}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-semibold">New reservation</span>
              <span className="text-caption text-go-muted">
                2024 Toyota RAV4 — confirmed for Jun 30
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-semibold">Maintenance due</span>
              <span className="text-caption text-go-muted">
                Jeep Wrangler — oil change scheduled
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-semibold">Payment received</span>
              <span className="text-caption text-go-muted">
                Reservation #GO-2847 — $412.00
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-pill p-1 outline-none transition-colors hover:bg-go-muted-light focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2"
              aria-label="Account menu"
            >
              <Avatar className="size-9">
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <span className="hidden text-body-sm font-semibold text-go-ink md:inline">
                {userName}
              </span>
              <ChevronDown
                className="hidden size-4 text-go-muted md:inline"
                aria-hidden="true"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <span className="text-body-sm font-semibold text-go-ink">
                  {userName}
                </span>
                <span className="text-caption text-go-muted">
                  Fleet administrator
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="w-full">
                <User className="size-4" aria-hidden="true" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="w-full">
                <Settings className="size-4" aria-hidden="true" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" className="w-full text-go-danger">
                <LogOut className="size-4" aria-hidden="true" />
                Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
