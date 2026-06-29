import { cn } from "@/lib/utils";

export interface StepCardProps {
  step: number;
  title: string;
  description: string;
  className?: string;
}

export function StepCard({ step, title, description, className }: StepCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-go-border bg-go-paper p-6 shadow-card",
        className
      )}
    >
      <span
        className="mb-4 flex size-10 items-center justify-center rounded-full bg-go-gold text-body-sm font-bold text-go-ink"
        aria-hidden="true"
      >
        {step}
      </span>
      <h3 className="text-heading-sm font-semibold">{title}</h3>
      <p className="mt-2 text-body-sm text-go-muted">{description}</p>
    </div>
  );
}
