"use client";

import * as React from "react";
import { Heart, HelpCircle } from "lucide-react";

import { AccountMenu } from "@/components/layout/account-menu";
import { Logo } from "@/components/go/logo";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  userName?: string;
  userInitials?: string;
  favoritesCount?: number;
  isAuthenticated?: boolean;
}

export function AppHeader({
  userName = "Guest",
  userInitials = "G",
  favoritesCount,
  isAuthenticated = false,
  className,
  ...props
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-go-border bg-go-paper/95 shadow-xs backdrop-blur-md",
        className
      )}
      {...props}
    >
      <div className="container-marketing flex h-16 items-center gap-3 sm:gap-4">
        <Link href="/" className="shrink-0" aria-label="Go home">
          <Logo size="md" className="hidden sm:inline-flex" />
          <Logo size="md" className="sm:hidden" />
        </Link>

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

          <AccountMenu
            userName={userName}
            userInitials={userInitials}
            isAuthenticated={isAuthenticated}
          />
        </nav>
      </div>
    </header>
  );
}
