import type { ReactNode } from "react";

import { AccountSidebar } from "@/components/account/account-sidebar";
import { cn } from "@/lib/utils";

export interface AccountShellProps {
  children: ReactNode;
  className?: string;
}

export function AccountShell({
  children,
  className,
}: AccountShellProps) {
  return (
    <div className={cn("container-marketing py-5 md:py-8", className)}>
      <div className="grid max-w-6xl gap-6 lg:grid-cols-[240px_1fr] lg:gap-8">
        <AccountSidebar />
        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
}
