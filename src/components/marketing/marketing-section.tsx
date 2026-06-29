import { cn } from "@/lib/utils";

export interface MarketingSectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "cream" | "white" | "muted" | "dark" | "gold";
  spacing?: "default" | "compact" | "loose";
  id?: string;
}

const backgroundClasses = {
  cream: "bg-go-cream",
  white: "bg-go-paper",
  muted: "bg-go-muted-light",
  dark: "bg-go-ink text-go-paper",
  gold: "bg-go-gold/15",
};

const spacingClasses = {
  default: "py-12 sm:py-16",
  compact: "py-8 sm:py-10",
  loose: "py-16 sm:py-24",
};

export function MarketingSection({
  children,
  className,
  background = "cream",
  spacing = "default",
  id,
}: MarketingSectionProps) {
  return (
    <section
      id={id}
      className={cn(backgroundClasses[background], spacingClasses[spacing], className)}
    >
      <div className="container-marketing">{children}</div>
    </section>
  );
}
