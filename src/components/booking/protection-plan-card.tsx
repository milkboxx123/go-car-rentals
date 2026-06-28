"use client";

import * as React from "react";
import { Check, Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export interface ProtectionPlan {
  id: string;
  name: string;
  description: string;
  dailyRate: number;
  recommended?: boolean;
  features: string[];
}

const defaultPlans: ProtectionPlan[] = [
  {
    id: "basic",
    name: "Basic protection",
    description: "State minimum coverage included with every rental.",
    dailyRate: 0,
    features: ["Liability coverage", "Standard deductible"],
  },
  {
    id: "standard",
    name: "Standard protection",
    description: "Collision and comprehensive with reduced deductible.",
    dailyRate: 18,
    recommended: true,
    features: [
      "Collision damage waiver",
      "$500 deductible",
      "Roadside assistance",
    ],
  },
  {
    id: "premium",
    name: "Premium protection",
    description: "Maximum coverage with zero deductible peace of mind.",
    dailyRate: 32,
    features: [
      "Zero deductible",
      "Interior damage coverage",
      "24/7 priority support",
      "Trip interruption coverage",
    ],
  },
];

export interface ProtectionPlanCardProps {
  plan: ProtectionPlan;
  selected?: boolean;
  onSelect?: (planId: string) => void;
  className?: string;
}

export function ProtectionPlanCard({
  plan,
  selected,
  onSelect,
  className,
}: ProtectionPlanCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(plan.id)}
      className={cn(
        "w-full rounded-lg border p-4 text-left transition-colors",
        selected
          ? "border-go-gold bg-go-gold/10"
          : "border-go-border bg-go-paper hover:border-go-gold/50",
        className
      )}
      aria-pressed={selected}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Shield className="size-5 text-go-gold-dark" aria-hidden="true" />
          <span className="font-semibold text-go-ink">{plan.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {plan.recommended && <Badge variant="gold">Recommended</Badge>}
          {selected && (
            <span className="flex size-5 items-center justify-center rounded-full bg-go-gold text-go-ink">
              <Check className="size-3" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
      <p className="mb-3 text-body-sm text-go-muted">{plan.description}</p>
      <p className="mb-3 font-bold tabular-nums text-go-ink">
        {plan.dailyRate === 0
          ? "Included"
          : `${formatPrice(plan.dailyRate)}/day`}
      </p>
      <ul className="space-y-1">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-body-sm text-go-muted"
          >
            <Check className="size-3.5 shrink-0 text-go-success" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
    </button>
  );
}

export interface ProtectionPlanListProps {
  plans?: ProtectionPlan[];
  selectedId?: string;
  onSelect?: (planId: string) => void;
  className?: string;
}

export function ProtectionPlanList({
  plans = defaultPlans,
  selectedId,
  onSelect,
  className,
}: ProtectionPlanListProps) {
  return (
    <div className={cn("grid gap-3", className)}>
      {plans.map((plan) => (
        <ProtectionPlanCard
          key={plan.id}
          plan={plan}
          selected={selectedId === plan.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
