import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative flex w-full gap-3 rounded-lg border p-4 text-body-sm",
  {
    variants: {
      variant: {
        info: "border-go-info/20 bg-go-info/5 text-go-ink [&>svg]:text-go-info",
        success:
          "border-go-success/20 bg-go-success/5 text-go-ink [&>svg]:text-go-success",
        warning:
          "border-go-warning/20 bg-go-warning/5 text-go-ink [&>svg]:text-go-warning",
        danger:
          "border-go-danger/20 bg-go-danger/5 text-go-ink [&>svg]:text-go-danger",
        neutral:
          "border-go-border bg-go-muted-light text-go-ink [&>svg]:text-go-muted",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

const alertIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
  neutral: Info,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  onDismiss?: () => void;
}

function Alert({
  className,
  variant = "neutral",
  title,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const Icon = alertIcons[variant ?? "neutral"];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      <div className="flex-1 space-y-1">
        {title && <AlertTitle>{title}</AlertTitle>}
        {children && <AlertDescription>{children}</AlertDescription>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-md p-1 text-go-muted transition-colors hover:bg-go-border/50 hover:text-go-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2"
          aria-label="Dismiss alert"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-go-muted [&_p]:leading-relaxed", className)} {...props} />
  );
}

export { Alert, AlertTitle, AlertDescription };
