"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const progressVariants = cva("relative h-2 w-full overflow-hidden rounded-pill bg-go-muted-light", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
}

function Progress({
  className,
  value = 0,
  max = 100,
  size,
  indeterminate = false,
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      className={cn(progressVariants({ size }), className)}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-pill bg-go-gold transition-all duration-normal",
          indeterminate && "w-1/3 animate-[progress-indeterminate_1.5s_ease-in-out_infinite]"
        )}
        style={indeterminate ? undefined : { width: `${percentage}%` }}
      />
    </div>
  );
}

export { Progress };
