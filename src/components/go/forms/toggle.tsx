"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-pill border font-semibold transition-colors duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-body-sm",
        md: "h-9 px-4 text-body-sm",
        lg: "h-11 px-5 text-body-md",
      },
      pressed: {
        true: "border-go-gold bg-go-gold/20 text-go-ink",
        false: "border-go-border bg-go-paper text-go-muted hover:bg-go-muted-light hover:text-go-ink",
      },
    },
    defaultVariants: {
      size: "md",
      pressed: false,
    },
  }
);

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children: React.ReactNode;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      size,
      pressed = false,
      onPressedChange,
      children,
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      onPressedChange?.(!pressed);
      onClick?.(event);
    }

    return (
      <button
        ref={ref}
        type={type}
        role="switch"
        aria-checked={pressed}
        data-state={pressed ? "on" : "off"}
        className={cn(toggleVariants({ size, pressed }), className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
