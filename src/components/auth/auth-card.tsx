import type { ReactNode } from "react";

import { Logo } from "@/components/go/logo";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border border-go-border bg-go-paper p-6 shadow-card sm:p-8",
        className
      )}
    >
      <div className="mb-6 text-center">
        <Link href="/" className="inline-flex justify-center" aria-label="Go home">
          <Logo size="lg" />
        </Link>
        <h1 className="mt-6 text-heading-md font-bold text-go-ink">{title}</h1>
        {description ? (
          <p className="mt-2 text-body-md text-go-muted">{description}</p>
        ) : null}
      </div>
      {children}
      {footer ? <div className="mt-6 text-center text-body-sm">{footer}</div> : null}
    </div>
  );
}
