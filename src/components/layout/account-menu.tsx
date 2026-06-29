"use client";

import {
  ChevronDown,
  Heart,
  HelpCircle,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export interface AccountMenuProps {
  userName?: string;
  userInitials?: string;
  isAuthenticated?: boolean;
  variant?: "default" | "dark";
  showName?: boolean;
}

export function AccountMenu({
  userName = "Guest",
  userInitials = "G",
  isAuthenticated = false,
  variant = "default",
  showName = true,
}: AccountMenuProps) {
  const isDark = variant === "dark";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-pill p-1 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2",
            isDark
              ? "hover:bg-go-ink-soft focus-visible:ring-offset-go-ink"
              : "hover:bg-go-muted-light focus-visible:ring-offset-go-paper"
          )}
          aria-label="Account menu"
        >
          <Avatar className="size-9">
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          {showName ? (
            <>
              <span
                className={cn(
                  "hidden text-body-sm font-semibold lg:inline",
                  isDark ? "text-go-paper" : "text-go-ink"
                )}
              >
                {userName}
              </span>
              <ChevronDown
                className={cn(
                  "hidden size-4 lg:inline",
                  isDark ? "text-go-paper/70" : "text-go-muted"
                )}
                aria-hidden="true"
              />
            </>
          ) : null}
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
          <Link href="/account/profile" className="w-full">
            <Settings className="size-4" aria-hidden="true" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/messages" className="w-full">
            <HelpCircle className="size-4" aria-hidden="true" />
            Messages
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isAuthenticated ? (
          <DropdownMenuItem
            className="w-full text-go-danger"
            onSelect={async (event) => {
              event.preventDefault();
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
          >
            <LogOut className="size-4" aria-hidden="true" />
            Log out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/login" className="w-full">
              <LogOut className="size-4" aria-hidden="true" />
              Sign in
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
