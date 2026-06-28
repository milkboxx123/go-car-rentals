import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "default" | "dark";
  className?: string;
}

export function CtaSection({
  title = "Ready to hit the road?",
  description = "Search available vehicles at airports and cities across Florida and beyond.",
  primaryHref = "/search",
  primaryLabel = "Search vehicles",
  secondaryHref = "/how-it-works",
  secondaryLabel = "Learn how it works",
  variant = "default",
  className,
}: CtaSectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "py-12 sm:py-16",
        isDark ? "bg-go-ink text-go-paper" : "bg-go-gold/20",
        className
      )}
    >
      <div className="container-marketing text-center">
        <h2 className="text-heading-lg font-bold">{title}</h2>
        <p
          className={cn(
            "mx-auto mt-3 max-w-xl text-body-lg",
            isDark ? "text-go-paper/80" : "text-go-muted"
          )}
        >
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant={isDark ? "gold" : "primary"}>
            <Link href={primaryHref} variant="button">{primaryLabel}</Link>
          </Button>
          {secondaryHref && (
            <Button
              asChild
              size="lg"
              variant={isDark ? "outline" : "secondary"}
              className={isDark ? "border-go-paper/30 text-go-paper hover:bg-go-paper/10" : ""}
            >
              <Link href={secondaryHref} variant="button">{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
