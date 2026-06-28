import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "flex w-full rounded-md border border-go-border bg-go-paper px-3 py-2 text-body-md text-go-ink",
    "placeholder:text-go-muted",
    "transition-colors duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-go-muted-light",
  ].join(" "),
  {
    variants: {
      inputSize: {
        sm: "h-9 text-body-sm",
        md: "h-11",
        lg: "h-12 text-body-lg",
      },
      state: {
        default: "",
        error: "border-go-danger focus-visible:ring-go-danger",
        success: "border-go-success focus-visible:ring-go-success",
      },
    },
    defaultVariants: {
      inputSize: "md",
      state: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      inputSize,
      state,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative flex w-full items-center">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 flex text-go-muted [&_svg]:size-4">
              {leftIcon}
            </span>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ inputSize, state }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 flex text-go-muted [&_svg]:size-4">
              {rightIcon}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ inputSize, state }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
