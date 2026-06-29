import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface AccountPageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  className?: string;
}

export function AccountPageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
}: AccountPageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div>
        {eyebrow ? (
          <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-go-muted">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-heading-lg font-bold text-go-ink">{title}</h1>
        {description ? (
          <p className="mt-1 text-body-md text-go-muted">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
