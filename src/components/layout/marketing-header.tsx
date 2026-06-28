"use client";

import * as React from "react";
import { Menu, Search } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { Logo } from "@/components/go/logo";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { locations } from "@/mock";
import { cn } from "@/lib/utils";
import type { Location } from "@/types";

const NAV_LINKS = [
  { href: "/search", label: "Browse cars" },
  { href: "/locations", label: "Locations" },
  { href: "/monthly", label: "Monthly rentals" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/partner", label: "List with us" },
] as const;

const headerVariants = cva(
  "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-normal",
  {
    variants: {
      variant: {
        default: "",
        dark: "bg-go-ink text-go-paper",
      },
      scrolled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        scrolled: true,
        className: "border-b border-go-border bg-go-paper/95 shadow-sticky backdrop-blur-md",
      },
      {
        variant: "default",
        scrolled: false,
        className: "border-b border-transparent bg-transparent",
      },
      {
        variant: "dark",
        scrolled: true,
        className: "border-b border-go-ink-soft bg-go-ink/95 shadow-sticky backdrop-blur-md",
      },
      {
        variant: "dark",
        scrolled: false,
        className: "border-b border-transparent bg-go-ink/80 backdrop-blur-sm",
      },
    ],
    defaultVariants: {
      variant: "default",
      scrolled: false,
    },
  }
);

export interface MarketingHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  location?: string | Location;
  transparent?: boolean;
}

function resolveLocation(location?: string | Location) {
  if (!location) return undefined;
  if (typeof location === "string") return location;
  return location.city;
}

export function MarketingHeader({
  location,
  variant = "default",
  transparent = true,
  className,
  ...props
}: MarketingHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isDark = variant === "dark";
  const logoVariant = isDark ? "light" : "default";
  const locationLabel = resolveLocation(location);

  React.useEffect(() => {
    if (!transparent) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  const showSolid = !transparent || scrolled;

  return (
    <header
      className={cn(
        headerVariants({
          variant,
          scrolled: showSolid,
        }),
        className
      )}
      {...props}
    >
      <div className="container-marketing flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <div className="flex min-w-0 items-center gap-6">
          <Link
            href={locationLabel ? `/locations/${locationLabel.toLowerCase()}` : "/"}
            className="shrink-0 rounded-md"
            aria-label={locationLabel ? `Go ${locationLabel} home` : "Go home"}
          >
            <Logo location={location} variant={logoVariant} size="md" />
          </Link>

          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                variant="nav"
                className={cn(
                  "text-body-sm",
                  isDark && "text-go-paper hover:text-go-gold"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            asChild
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/search" variant="button">
              <Search className="size-4" aria-hidden="true" />
              Book a car
            </Link>
          </Button>

          <Link
            href="/account"
            variant="nav"
            className={cn(
              "hidden text-body-sm md:inline-flex",
              isDark && "text-go-paper hover:text-go-gold"
            )}
          >
            Log in
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <IconButton
                variant={isDark ? "outline" : "ghost"}
                size="sm"
                className={cn(isDark && "border-go-ink-soft text-go-paper")}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu aria-hidden="true" />
              </IconButton>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <Logo location={location} size="md" />
                </SheetTitle>
              </SheetHeader>

              <nav
                className="mt-6 flex flex-col gap-1"
                aria-label="Mobile navigation"
              >
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    variant="nav"
                    className="rounded-md px-3 py-3 text-body-md"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Separator className="my-6" />

              <div className="space-y-3">
                <p className="px-3 text-caption font-semibold uppercase tracking-wide text-go-muted">
                  Locations
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {locations.map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/locations/${loc.slug}`}
                      variant="subtle"
                      className="rounded-md px-3 py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      Go {loc.city}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Button asChild fullWidth>
                  <Link href="/search" variant="button" onClick={() => setMobileOpen(false)}>
                    <Search className="size-4" aria-hidden="true" />
                    Book a car
                  </Link>
                </Button>
                <Button asChild variant="outline" fullWidth>
                  <Link href="/account" variant="button" onClick={() => setMobileOpen(false)}>
                    Log in
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
