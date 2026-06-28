import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  [
    "flex min-h-[120px] w-full rounded-md border border-go-border bg-go-paper px-3 py-2 text-body-md text-go-ink",
    "placeholder:text-go-muted",
    "transition-colors duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-go-muted-light",
  ].join(" "),
  {
    variants: {
      state: {
        default: "",
        error: "border-go-danger focus-visible:ring-go-danger",
        success: "border-go-success focus-visible:ring-go-success",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state, ...props }, ref) => (
    <textarea
      className={cn(textareaVariants({ state }), className)}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
