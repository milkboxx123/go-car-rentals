import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const priceDisplayVariants = cva("tabular-nums font-bold text-go-ink", {
  variants: {
    size: {
      sm: "text-body-md",
      md: "text-heading-sm",
      lg: "text-heading-md",
      xl: "text-heading-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const suffixVariants = cva("font-normal text-go-muted", {
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

export interface PriceDisplayProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof priceDisplayVariants> {
  amount: number;
  currency?: string;
  minimumFractionDigits?: number;
  suffix?: string;
}

function PriceDisplay({
  className,
  size,
  amount,
  currency,
  minimumFractionDigits,
  suffix,
  ...props
}: PriceDisplayProps) {
  const formatted = formatPrice(amount, { currency, minimumFractionDigits });

  return (
    <span className={cn("inline-flex items-baseline gap-1", className)} {...props}>
      <span className={cn(priceDisplayVariants({ size }))}>{formatted}</span>
      {suffix && (
        <span className={cn(suffixVariants({ size }))}>{suffix}</span>
      )}
    </span>
  );
}

export { PriceDisplay, priceDisplayVariants };
