import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, X } from "lucide-react";

import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2";

export const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-fast",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    focusRing,
  ].join(" "),
  {
    variants: {
      variant: {
        ghost:
          "bg-transparent text-go-ink hover:bg-go-muted-light active:bg-go-border/50",
        outline:
          "border border-go-border bg-transparent text-go-ink hover:bg-go-muted-light active:bg-go-border/50",
        solid:
          "bg-go-gold text-go-ink hover:bg-go-gold-hover active:bg-go-gold-dark",
        dark: "bg-go-ink text-go-paper hover:bg-go-ink-soft active:bg-go-ink",
        favorite:
          "bg-go-paper/90 text-go-ink shadow-sm backdrop-blur-sm hover:bg-go-paper active:scale-95 data-[active=true]:text-go-danger",
        close:
          "bg-go-muted-light text-go-ink hover:bg-go-border active:bg-go-muted",
      },
      size: {
        xs: "size-8 [&_svg]:size-3.5",
        sm: "size-9 [&_svg]:size-4",
        md: "size-11 [&_svg]:size-5",
        lg: "size-12 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  active?: boolean;
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      active = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        data-active={active || undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Loader2 className="animate-spin" aria-hidden="true" /> : children}
      </Comp>
    );
  }
);
IconButton.displayName = "IconButton";

const CloseIconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "aria-label" | "children"> & { label?: string }
>(({ label = "Close", ...props }, ref) => (
  <IconButton ref={ref} variant="close" aria-label={label} {...props}>
    <X aria-hidden="true" />
  </IconButton>
));
CloseIconButton.displayName = "CloseIconButton";

export { IconButton, CloseIconButton };
