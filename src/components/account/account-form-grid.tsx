import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface AccountFormGridProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2;
}

export function AccountFormGrid({
  children,
  className,
  columns = 2,
}: AccountFormGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "md:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  );
}
