"use client";

import * as React from "react";

import { AdminHeader, type AdminHeaderProps } from "@/components/layout/admin-header";
import { Sidebar } from "@/components/layout/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export interface AdminShellProps {
  children: React.ReactNode;
  headerProps?: Omit<AdminHeaderProps, "onSidebarToggle">;
  className?: string;
  contentClassName?: string;
}

export function AdminShell({
  children,
  headerProps,
  className,
  contentClassName,
}: AdminShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <div className={cn("flex min-h-screen bg-go-muted-light", className)}>
      <div className="hidden lg:block">
        <Sidebar className="fixed inset-y-0 left-0 z-40" />
      </div>

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0" showClose={false}>
          <Sidebar onNavigate={() => setMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <AdminHeader
          {...headerProps}
          onSidebarToggle={() => setMobileSidebarOpen(true)}
        />

        <main
          className={cn(
            "flex-1 p-4 sm:p-6 lg:p-8",
            contentClassName
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
