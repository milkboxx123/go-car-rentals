import { cn } from "@/lib/utils";

export function DsSection({
  id,
  title,
  description,
  importPath,
  children,
  className,
}: {
  id: string;
  title: string;
  description?: string;
  importPath?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 space-y-6 border-b border-go-border pb-16 last:border-0", className)}
    >
      <div className="space-y-2">
        <h2 className="text-heading-md font-bold text-go-ink">{title}</h2>
        {description && <p className="max-w-3xl text-body-sm text-go-muted">{description}</p>}
        {importPath && (
          <code className="inline-block rounded-md bg-go-muted-light px-2 py-1 font-mono text-caption text-go-ink-soft">
            {importPath}
          </code>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

export function DsSubsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-label uppercase tracking-wide text-go-muted">{title}</h3>
      {children}
    </div>
  );
}

export function DsNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-md border border-go-border bg-go-muted-light px-3 py-2 text-body-sm text-go-muted">
      {children}
    </p>
  );
}
