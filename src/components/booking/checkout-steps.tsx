import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CheckoutStep {
  id: string;
  label: string;
}

const defaultSteps: CheckoutStep[] = [
  { id: "dates", label: "Dates" },
  { id: "pickup", label: "Pickup" },
  { id: "protection", label: "Protection" },
  { id: "payment", label: "Payment" },
];

export interface CheckoutStepsProps {
  steps?: CheckoutStep[];
  currentStep: string;
  className?: string;
}

export function CheckoutSteps({
  steps = defaultSteps,
  currentStep,
  className,
}: CheckoutStepsProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <nav aria-label="Checkout progress" className={cn(className)}>
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li
              key={step.id}
              className={cn(
                "flex flex-1 items-center",
                index < steps.length - 1 && "after:mx-2 after:h-px after:flex-1 after:bg-go-border last:after:hidden"
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-caption font-bold",
                    isComplete && "bg-go-success text-go-paper",
                    isCurrent && "bg-go-gold text-go-ink",
                    !isComplete && !isCurrent && "bg-go-muted-light text-go-muted"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isComplete ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={cn(
                    "hidden text-body-sm font-medium sm:inline",
                    isCurrent ? "text-go-ink" : "text-go-muted"
                  )}
                >
                  {step.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
