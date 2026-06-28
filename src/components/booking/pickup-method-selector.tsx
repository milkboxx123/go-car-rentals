"use client";

import * as React from "react";
import { Building2, MapPin, Plane, Truck } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PICKUP_METHOD_OPTIONS } from "@/mock/filters";
import type { PickupMethod } from "@/types";
import { cn } from "@/lib/utils";

const methodIcons: Partial<Record<PickupMethod, React.ReactNode>> = {
  lot: <MapPin className="size-5" aria-hidden="true" />,
  airport: <Plane className="size-5" aria-hidden="true" />,
  delivery: <Truck className="size-5" aria-hidden="true" />,
  hotel: <Building2 className="size-5" aria-hidden="true" />,
  "custom-address": <MapPin className="size-5" aria-hidden="true" />,
};

export interface PickupMethodSelectorProps {
  value?: PickupMethod;
  onChange?: (value: PickupMethod) => void;
  availableMethods?: PickupMethod[];
  className?: string;
}

export function PickupMethodSelector({
  value = "airport",
  onChange,
  availableMethods,
  className,
}: PickupMethodSelectorProps) {
  const options = PICKUP_METHOD_OPTIONS.filter(
    (opt) =>
      !availableMethods ||
      availableMethods.includes(opt.value as PickupMethod)
  );

  return (
    <fieldset className={cn("space-y-3", className)}>
      <legend className="text-label text-go-ink">Pickup method</legend>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange?.(v as PickupMethod)}
        className="grid gap-2"
      >
        {options.map((option) => (
          <Label
            key={option.value}
            htmlFor={`pickup-${option.value}`}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border border-go-border p-4 transition-colors",
              "hover:bg-go-muted-light",
              value === option.value && "border-go-gold bg-go-gold/10"
            )}
          >
            <RadioGroupItem
              value={option.value}
              id={`pickup-${option.value}`}
            />
            <span className="text-go-gold-dark">
              {methodIcons[option.value as PickupMethod]}
            </span>
            <span className="font-medium text-go-ink">{option.label}</span>
          </Label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
