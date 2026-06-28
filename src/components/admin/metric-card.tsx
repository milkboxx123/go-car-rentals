import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

export interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon?: LucideIcon;
  className?: string;
}

export function MetricCard({
  title,
  value,
  description,
  change,
  icon: Icon,
  className,
}: MetricCardProps) {
  const TrendIcon =
    change?.trend === "down"
      ? TrendingDown
      : change?.trend === "up"
        ? TrendingUp
        : null;

  return (
    <article
      className={cn(
        "rounded-lg border border-go-border bg-go-paper p-5 shadow-xs",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-caption font-semibold uppercase tracking-wide text-go-muted">
            {title}
          </p>
          <p className="text-heading-md font-bold tabular-nums text-go-ink">
            {value}
          </p>
        </div>
        {Icon && (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-go-muted-light text-go-muted">
            <Icon className="size-5" aria-hidden="true" />
          </div>
        )}
      </div>

      {(description || change) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          {change && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-caption font-semibold",
                change.trend === "up" && "text-go-success",
                change.trend === "down" && "text-go-danger",
                change.trend === "neutral" && "text-go-muted"
              )}
            >
              {TrendIcon && <TrendIcon className="size-3.5" aria-hidden="true" />}
              {change.value}
            </span>
          )}
          {description && (
            <p className="text-caption text-go-muted">{description}</p>
          )}
        </div>
      )}
    </article>
  );
}
