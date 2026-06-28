"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const bookingCardVariants = cva("bg-go-paper", {
  variants: {
    layout: {
      sticky:
        "sticky top-24 rounded-xl border border-go-border p-5 shadow-card",
      mobile:
        "fixed inset-x-0 bottom-0 z-40 border-t border-go-border px-4 py-3 shadow-sticky sm:hidden",
    },
  },
  defaultVariants: {
    layout: "sticky",
  },
});

export interface BookingCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bookingCardVariants> {
  dailyRate: number;
  tripTotal?: number;
  days?: number;
  ctaLabel?: string;
  onBook?: () => void;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function BookingCard({
  layout = "sticky",
  dailyRate,
  tripTotal,
  days,
  ctaLabel = "Reserve now",
  onBook,
  loading,
  disabled,
  children,
  className,
  ...props
}: BookingCardProps) {
  const isMobile = layout === "mobile";

  return (
    <div
      className={cn(bookingCardVariants({ layout }), className)}
      {...props}
    >
      <div
        className={cn(
          isMobile && "flex items-center justify-between gap-4"
        )}
      >
        <div className={cn(!isMobile && "mb-4")}>
          <div className="flex items-baseline gap-1 tabular-nums">
            <span className="text-heading-sm font-bold text-go-ink">
              {formatPrice(dailyRate)}
            </span>
            <span className="text-body-sm text-go-muted">/day</span>
          </div>
          {tripTotal !== undefined && (
            <p className="mt-0.5 text-body-sm text-go-muted">
              {formatPrice(tripTotal)} total
              {days !== undefined && ` · ${days} days`}
            </p>
          )}
        </div>

        <Button
          size={isMobile ? "md" : "lg"}
          fullWidth={!isMobile}
          onClick={onBook}
          loading={loading}
          disabled={disabled}
          className={isMobile ? "shrink-0" : ""}
        >
          {ctaLabel}
        </Button>
      </div>

      {children && !isMobile && (
        <div className="mt-4 border-t border-go-border pt-4">{children}</div>
      )}
    </div>
  );
}
