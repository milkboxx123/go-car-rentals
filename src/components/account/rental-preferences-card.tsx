"use client";

import { useState } from "react";

import { AccountSectionCard } from "@/components/account/account-section-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const PICKUP_OPTIONS = [
  { value: "local", label: "Local pickup" },
  { value: "airport", label: "Airport pickup" },
  { value: "delivery", label: "Delivery" },
] as const;

const VEHICLE_TYPES = [
  "SUV",
  "Sedan",
  "Luxury",
  "Electric",
  "Family",
] as const;

const COMM_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "both", label: "Both" },
] as const;

export function RentalPreferencesCard() {
  const [pickup, setPickup] = useState("local");
  const [vehicleTypes, setVehicleTypes] = useState<string[]>(["SUV"]);
  const [communication, setCommunication] = useState("both");

  function toggleVehicleType(type: string) {
    setVehicleTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    );
  }

  return (
    <AccountSectionCard
      title="Rental preferences"
      description="Set your preferred pickup method, vehicle types, and communication options."
    >
      <div className="space-y-6">
        <fieldset>
          <legend className="text-body-sm font-semibold text-go-ink">
            Preferred pickup method
          </legend>
          <RadioGroup
            value={pickup}
            onValueChange={setPickup}
            className="mt-3 space-y-2"
          >
            {PICKUP_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem
                  value={option.value}
                  id={`pickup-${option.value}`}
                />
                <Label htmlFor={`pickup-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>

        <fieldset>
          <legend className="text-body-sm font-semibold text-go-ink">
            Preferred vehicle types
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {VEHICLE_TYPES.map((type) => {
              const id = `vehicle-${type.toLowerCase()}`;
              const checked = vehicleTypes.includes(type);

              return (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={() => toggleVehicleType(type)}
                  />
                  <Label htmlFor={id}>{type}</Label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-body-sm font-semibold text-go-ink">
            Communication preference
          </legend>
          <RadioGroup
            value={communication}
            onValueChange={setCommunication}
            className="mt-3 space-y-2"
          >
            {COMM_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem
                  value={option.value}
                  id={`comm-${option.value}`}
                />
                <Label htmlFor={`comm-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>

        <p className={cn("text-caption text-go-muted")}>
          Preferences are saved locally for now and will apply to future
          bookings once connected.
        </p>
      </div>
    </AccountSectionCard>
  );
}
