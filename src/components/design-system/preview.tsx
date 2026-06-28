import { cn } from "@/lib/utils";

type PreviewSurface = "default" | "cream" | "dark" | "admin";

export function DsPreview({
  children,
  surface = "default",
  fullBleed = false,
  className,
}: {
  children: React.ReactNode;
  surface?: PreviewSurface;
  fullBleed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-go-border",
        surface === "default" && "bg-go-paper",
        surface === "cream" && "bg-go-cream",
        surface === "dark" && "bg-go-ink",
        surface === "admin" && "bg-[#faf9f7]",
        !fullBleed && "p-4 sm:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
