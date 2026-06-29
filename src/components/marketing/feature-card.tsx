import type { LucideIcon } from "lucide-react";

import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  className,
}: FeatureCardProps) {
  const content = (
    <>
      {Icon ? (
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-go-gold/20 text-go-gold-dark">
          <Icon className="size-5" aria-hidden="true" />
        </div>
      ) : null}
      <h3 className="text-heading-sm font-semibold">{title}</h3>
      <p className="mt-2 text-body-sm text-go-muted">{description}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        variant="card"
        className={cn(
          "block rounded-2xl border border-go-border bg-go-paper p-6 shadow-card transition-shadow hover:shadow-card-hover",
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-go-border bg-go-paper p-6 shadow-card",
        className
      )}
    >
      {content}
    </div>
  );
}
