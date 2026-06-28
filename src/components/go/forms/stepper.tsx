import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface StepperStep {
  id: string;
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLElement> {
  steps: StepperStep[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
}

function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps) {
  return (
    <nav aria-label="Checkout progress" className={cn(className)} {...props}>
      <ol
        className={cn(
          orientation === "horizontal"
            ? "flex items-start justify-between gap-2"
            : "flex flex-col gap-4"
        )}
      >
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <li
              key={step.id}
              className={cn(
                "flex min-w-0",
                orientation === "horizontal" && "flex-1 flex-col items-center text-center"
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              <div
                className={cn(
                  "flex items-center gap-3",
                  orientation === "horizontal" && "w-full flex-col"
                )}
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-caption font-bold transition-colors",
                    isComplete && "border-go-success bg-go-success text-go-paper",
                    isCurrent && "border-go-gold bg-go-gold text-go-ink",
                    isUpcoming && "border-go-border bg-go-paper text-go-muted"
                  )}
                  aria-hidden="true"
                >
                  {isComplete ? (
                    <Check className="size-4" />
                  ) : (
                    stepNumber
                  )}
                </span>
                <div
                  className={cn(
                    orientation === "horizontal" ? "min-w-0 px-1" : "min-w-0"
                  )}
                >
                  <p
                    className={cn(
                      "text-body-sm font-semibold",
                      isCurrent ? "text-go-ink" : isComplete ? "text-go-ink" : "text-go-muted"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-caption text-go-muted">{step.description}</p>
                  )}
                </div>
              </div>
              {orientation === "horizontal" && index < steps.length - 1 && (
                <div
                  className={cn(
                    "mt-4 hidden h-0.5 flex-1 sm:block",
                    isComplete ? "bg-go-success" : "bg-go-border"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { Stepper };
