import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface AccountSectionCardProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function AccountSectionCard({
  title,
  description,
  actions,
  footer,
  children,
  className,
  contentClassName,
}: AccountSectionCardProps) {
  const hasHeader = title || description || actions;

  return (
    <section
      className={cn(
        "rounded-2xl border border-go-border bg-go-paper shadow-card",
        className
      )}
    >
      {hasHeader ? (
        <div className="flex flex-col gap-3 border-b border-go-border p-5 sm:flex-row sm:items-start sm:justify-between md:p-6">
          <div>
            {title ? (
              <h2 className="text-heading-sm font-bold text-go-ink">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-1 text-body-sm text-go-muted">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      ) : null}
      <div className={cn("p-5 md:p-6", contentClassName)}>{children}</div>
      {footer ? (
        <div className="border-t border-go-border px-5 py-4 md:px-6">{footer}</div>
      ) : null}
    </section>
  );
}
