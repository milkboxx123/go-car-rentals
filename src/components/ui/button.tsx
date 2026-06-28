import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-button transition-colors duration-fast",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    focusRing,
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-go-gold text-go-ink hover:bg-go-gold-hover active:bg-go-gold-dark",
        secondary:
          "bg-go-muted-light text-go-ink hover:bg-go-border active:bg-go-muted-light/80",
        outline:
          "border border-go-border bg-transparent text-go-ink hover:bg-go-muted-light active:bg-go-border/50",
        ghost:
          "bg-transparent text-go-ink hover:bg-go-muted-light active:bg-go-border/50",
        link: "rounded-none bg-transparent p-0 text-go-ink underline-offset-4 hover:underline active:text-go-ink-soft",
        destructive:
          "bg-go-danger text-go-paper hover:bg-go-danger/90 active:bg-go-danger/80",
        dark: "bg-go-ink text-go-paper hover:bg-go-ink-soft active:bg-go-ink",
        gold: "bg-go-gold text-go-ink shadow-sm hover:bg-go-gold-hover active:bg-go-gold-dark",
        white:
          "bg-go-paper text-go-ink shadow-sm hover:bg-go-cream active:bg-go-muted-light",
      },
      size: {
        xs: "h-8 px-3 text-body-sm [&_svg]:size-3.5",
        sm: "h-9 px-4 text-body-sm [&_svg]:size-4",
        md: "h-11 px-5 text-button [&_svg]:size-4",
        lg: "h-12 px-6 text-button [&_svg]:size-5",
        xl: "h-14 px-8 text-body-lg [&_svg]:size-5",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    if (asChild) {
      return (
        <Comp
          className={cn(
            buttonVariants({ variant, size, fullWidth, className }),
            "[&_a]:no-underline"
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
