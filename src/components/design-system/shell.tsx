"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/go/logo";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

import { DESIGN_SYSTEM_REGISTRY } from "./component-registry";

function NavLinks({
  activeId,
  onNavigate,
}: {
  activeId: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-6" aria-label="Design system sections">
      {DESIGN_SYSTEM_REGISTRY.map((group) => (
        <div key={group.id}>
          <p className="mb-2 px-3 text-caption font-semibold uppercase tracking-wider text-go-muted">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-md px-3 py-1.5 text-body-sm transition-colors",
                    activeId === item.id
                      ? "bg-go-gold/30 font-medium text-go-ink"
                      : "text-go-muted hover:bg-go-muted-light hover:text-go-ink"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function SidebarNav() {
  const [activeId, setActiveId] = React.useState("overview");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const ids = DESIGN_SYSTEM_REGISTRY.flatMap((g) => g.items.map((i) => i.id));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button
        type="button"
        className="fixed bottom-4 right-4 z-50 flex size-12 items-center justify-center rounded-full bg-go-ink text-go-paper shadow-lg lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open design system navigation"
      >
        <Menu className="size-5" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-go-ink/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 w-[min(100%,20rem)] overflow-y-auto bg-go-paper p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <Logo size="sm" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-2 hover:bg-go-muted-light"
                aria-label="Close navigation"
              >
                <X className="size-5" />
              </button>
            </div>
            <NavLinks activeId={activeId} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8 pr-4">
          <NavLinks activeId={activeId} />
        </div>
      </aside>
    </>
  );
}

export function DesignSystemTopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-go-border bg-go-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <div className="hidden h-6 w-px bg-go-border sm:block" />
          <span className="hidden text-label text-go-muted sm:block">Design System</span>
        </div>
        <div className="flex items-center gap-4 text-body-sm">
          <Link href="/" variant="nav">
            Marketing site
          </Link>
        </div>
      </div>
    </header>
  );
}

export function DesignSystemShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-go-cream">
      <DesignSystemTopBar />
      <div className="mx-auto flex max-w-[1600px] gap-0 px-4 sm:px-6 lg:gap-8 lg:px-8">
        <SidebarNav />
        <main className="min-w-0 flex-1 py-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
