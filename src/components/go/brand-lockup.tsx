import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const brandLockupVariants = cva("inline-flex flex-col", {
  variants: {
    size: {
      sm: "gap-0.5",
      md: "gap-1",
      lg: "gap-1.5",
      xl: "gap-2",
    },
    align: {
      start: "items-start text-left",
      center: "items-center text-center",
    },
  },
  defaultVariants: {
    size: "md",
    align: "start",
  },
});

const taglineVariants = cva("text-go-muted", {
  variants: {
    size: {
      sm: "text-caption",
      md: "text-body-sm",
      lg: "text-body-md",
      xl: "text-body-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface BrandLockupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof brandLockupVariants> {
  location?: string;
  tagline?: string;
  showTagline?: boolean;
}

function BrandLockup({
  className,
  size = "md",
  align,
  location,
  tagline = "Car rentals, simplified.",
  showTagline = false,
  ...props
}: BrandLockupProps) {
  return (
    <div className={cn(brandLockupVariants({ size, align }), className)} {...props}>
      <Logo size={size} location={location} />
      {showTagline && (
        <p className={cn(taglineVariants({ size }))}>{tagline}</p>
      )}
    </div>
  );
}

export { BrandLockup, brandLockupVariants };
