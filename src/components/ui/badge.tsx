import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-pill border px-2.5 py-0.5 text-caption font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-go-border bg-go-muted-light text-go-ink",
        gold: "border-go-gold/30 bg-go-gold/20 text-go-gold-dark",
        dark: "border-go-ink bg-go-ink text-go-paper",
        success:
          "border-go-success/20 bg-go-success/10 text-go-success",
        warning:
          "border-go-warning/20 bg-go-warning/10 text-go-warning",
        danger:
          "border-go-danger/20 bg-go-danger/10 text-go-danger",
        new: "border-go-gold bg-go-gold text-go-ink",
        verified:
          "border-go-success/30 bg-go-success/15 text-go-success",
        airport:
          "border-go-info/20 bg-go-info/10 text-go-info",
        delivery:
          "border-go-gold/30 bg-go-gold/15 text-go-gold-dark",
        monthly:
          "border-go-ink/10 bg-go-ink/5 text-go-ink",
        luxury:
          "border-go-ink bg-go-ink text-go-gold",
        electric:
          "border-go-success/30 bg-go-success/10 text-go-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
