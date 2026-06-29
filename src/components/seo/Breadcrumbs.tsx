import { ChevronRight } from "lucide-react";

import { Link } from "@/components/ui/link";
import type { BreadcrumbItem } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "default" | "onDark";
  className?: string;
}

export function Breadcrumbs({
  items,
  variant = "default",
  className,
}: BreadcrumbsProps) {
  const isOnDark = variant === "onDark";

  return (
    <nav aria-label="Breadcrumb" className={cn("py-4", className)}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1 text-body-sm",
          isOnDark ? "text-go-paper/70" : "text-go-muted"
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight
                  className={cn(
                    "size-3.5 shrink-0",
                    isOnDark ? "text-go-paper/40" : "text-go-border"
                  )}
                  aria-hidden="true"
                />
              ) : null}
              {isLast ? (
                <span
                  className={cn(
                    "font-medium",
                    isOnDark ? "text-go-paper" : "text-go-ink"
                  )}
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  variant="subtle"
                  className={
                    isOnDark
                      ? "text-go-paper/70 hover:text-go-paper"
                      : "text-go-muted hover:text-go-ink"
                  }
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
