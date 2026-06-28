"use client";

import * as React from "react";
import {
  Calendar,
  ChevronDown,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Settings,
  User,
} from "lucide-react";

import { Logo } from "@/components/go/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import { formatDateRange } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export interface AppHeaderSearchSummary {
  location: string;
  startDate: Date;
  endDate: Date;
  href?: string;
}

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  searchSummary?: AppHeaderSearchSummary;
  userName?: string;
  userInitials?: string;
  favoritesCount?: number;
}

export function AppHeader({
  searchSummary,
  userName = "Guest",
  userInitials = "G",
  favoritesCount,
  className,
  ...props
}: AppHeaderProps) {
  const defaultSummary: AppHeaderSearchSummary = {
    location: "Tampa, FL",
    startDate: new Date(2026, 5, 28),
    endDate: new Date(2026, 6, 2),
    href: "/search",
  };

  const summary = searchSummary ?? defaultSummary;
  const searchHref = summary.href ?? "/search";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-go-border bg-go-paper/95 shadow-xs backdrop-blur-md",
        className
      )}
      {...props}
    >
      <div className="container-app flex h-16 items-center gap-3 sm:gap-4">
        <Link href="/" className="shrink-0" aria-label="Go home">
          <Logo size="sm" className="hidden sm:inline-flex" />
          <Logo size="sm" className="sm:hidden" />
        </Link>

        <Button
          asChild
          variant="outline"
          className="hidden min-w-0 flex-1 justify-start gap-3 rounded-xl px-4 md:flex lg:max-w-xl"
        >
          <Link href={searchHref} variant="button" aria-label="Edit search">
            <MapPin
              className="size-4 shrink-0 text-go-gold-dark"
              aria-hidden="true"
            />
            <span className="flex min-w-0 flex-col items-start gap-0.5 text-left">
              <span className="truncate text-body-sm font-semibold text-go-ink">
                {summary.location}
              </span>
              <span className="flex items-center gap-1.5 text-caption text-go-muted">
                <Calendar className="size-3" aria-hidden="true" />
                <span className="tabular-nums">
                  {formatDateRange(summary.startDate, summary.endDate)}
                </span>
              </span>
            </span>
            <ChevronDown
              className="ml-auto size-4 shrink-0 text-go-muted"
              aria-hidden="true"
            />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="min-w-0 flex-1 rounded-xl md:hidden"
        >
          <Link href={searchHref} variant="button" aria-label="Edit search">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate text-body-sm font-semibold">
              {summary.location}
            </span>
          </Link>
        </Button>

        <nav
          className="ml-auto flex items-center gap-1 sm:gap-2"
          aria-label="App navigation"
        >
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/account/trips" variant="button">Trips</Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="relative">
            <Link href="/account/favorites" variant="button" aria-label="Favorites">
              <Heart className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Favorites</span>
              {favoritesCount != null && favoritesCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-go-gold text-[10px] font-bold text-go-ink">
                  {favoritesCount > 9 ? "9+" : favoritesCount}
                </span>
              ) : null}
            </Link>
          </Button>

          <IconButton
            asChild
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
            aria-label="Help and support"
          >
            <Link href="/support">
              <HelpCircle aria-hidden="true" />
            </Link>
          </IconButton>

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
                <span className="hidden text-body-sm font-semibold text-go-ink lg:inline">
                  {userName}
                </span>
                <ChevronDown
                  className="hidden size-4 text-go-muted lg:inline"
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
                    Manage your account
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/account/trips" className="w-full">
                  <User className="size-4" aria-hidden="true" />
                  Trips
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account/favorites" className="w-full">
                  <Heart className="size-4" aria-hidden="true" />
                  Favorites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account/settings" className="w-full">
                  <Settings className="size-4" aria-hidden="true" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/support" className="w-full">
                  <HelpCircle className="size-4" aria-hidden="true" />
                  Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="w-full text-go-danger">
                  <LogOut className="size-4" aria-hidden="true" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
