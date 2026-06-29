import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export interface AccountEmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export interface AccountEmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  primaryAction?: AccountEmptyStateAction;
  secondaryAction?: AccountEmptyStateAction;
  className?: string;
}

function ActionButton({ action }: { action: AccountEmptyStateAction }) {
  const variant = action.variant ?? "primary";

  if (action.href) {
    return (
      <Button asChild variant={variant} className="w-full sm:w-auto">
        <Link href={action.href} variant="button">
          {action.label}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={variant}
      className="w-full sm:w-auto"
      onClick={action.onClick}
    >
      {action.label}
    </Button>
  );
}

export function AccountEmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: AccountEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-10 text-center sm:py-12",
        className
      )}
    >
      {icon ? (
        <div
          className="mb-4 flex size-14 items-center justify-center rounded-full bg-go-muted-light text-go-muted"
          aria-hidden="true"
        >
          {icon}
        </div>
      ) : null}
      <h3 className="text-heading-sm font-semibold text-go-ink">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-body-md text-go-muted">{description}</p>
      ) : null}
      {primaryAction || secondaryAction ? (
        <div className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          {primaryAction ? <ActionButton action={primaryAction} /> : null}
          {secondaryAction ? (
            <ActionButton
              action={{ variant: "outline", ...secondaryAction }}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
