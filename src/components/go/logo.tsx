import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { Location } from "@/types";

export const logoVariants = cva("inline-flex items-baseline gap-1 tracking-tight", {
  variants: {
    variant: {
      default: "",
      dark: "",
      light: "",
    },
    size: {
      sm: "text-body-md",
      md: "text-heading-sm",
      lg: "text-heading-md",
      xl: "text-heading-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const wordmarkVariants = cva("font-bold", {
  variants: {
    variant: {
      default: "text-go-ink",
      dark: "text-go-paper",
      light: "text-go-paper",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const locationVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-go-ink-soft",
      dark: "text-go-paper/80",
      light: "text-go-paper/80",
    },
    size: {
      sm: "text-body-sm",
      md: "text-body-md",
      lg: "text-body-lg",
      xl: "text-heading-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface LogoProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof logoVariants> {
  location?: string | Location;
}

function resolveLocationLabel(location?: string | Location) {
  if (!location) return undefined;
  if (typeof location === "string") return location;
  return location.city;
}

export function Logo({
  location,
  variant,
  size,
  className,
  ...props
}: LogoProps) {
  const locationLabel = resolveLocationLabel(location);

  return (
    <span
      className={cn(logoVariants({ variant, size }), className)}
      {...props}
    >
      <span className={wordmarkVariants({ variant })}>GO</span>
      {locationLabel ? (
        <span className={locationVariants({ variant, size })}>
          {locationLabel}
        </span>
      ) : null}
    </span>
  );
}
