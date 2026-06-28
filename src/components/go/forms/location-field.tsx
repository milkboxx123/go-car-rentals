"use client";

import * as React from "react";
import { Building2, Home, Plane } from "lucide-react";

import { cn } from "@/lib/utils";
import { SearchInput } from "./search-input";
import { TextInput } from "./text-input";

export type LocationFieldMode = "airport" | "city" | "address";

const MODE_CONFIG: Record<
  LocationFieldMode,
  {
    label: string;
    placeholder: string;
    helperText: string;
    icon: React.ReactNode;
  }
> = {
  airport: {
    label: "Airport",
    placeholder: "Search by airport code or name",
    helperText: "Enter an airport code like TPA or BOS.",
    icon: <Plane aria-hidden="true" />,
  },
  city: {
    label: "City",
    placeholder: "Search by city or region",
    helperText: "Find cars available in your destination city.",
    icon: <Building2 aria-hidden="true" />,
  },
  address: {
    label: "Address",
    placeholder: "Street address for delivery",
    helperText: "We'll deliver the vehicle to this address when available.",
    icon: <Home aria-hidden="true" />,
  },
};

export interface LocationFieldProps {
  id?: string;
  mode?: LocationFieldMode;
  onModeChange?: (mode: LocationFieldMode) => void;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

function LocationField({
  id: idProp,
  mode = "city",
  onModeChange,
  value,
  defaultValue,
  onChange,
  error,
  disabled,
  className,
}: LocationFieldProps) {
  const generatedId = React.useId();
  const fieldId = idProp ?? generatedId;
  const config = MODE_CONFIG[mode];

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event.target.value);
  }

  function handleClear() {
    if (!isControlled) {
      setInternalValue("");
    }
    onChange?.("");
  }

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      <div
        role="radiogroup"
        aria-label="Location type"
        className="flex flex-wrap gap-2"
      >
        {(Object.keys(MODE_CONFIG) as LocationFieldMode[]).map((option) => {
          const optionConfig = MODE_CONFIG[option];
          const selected = mode === option;

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onModeChange?.(option)}
              className={cn(
                "inline-flex items-center gap-2 rounded-pill border px-3 py-1.5 text-body-sm font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2",
                selected
                  ? "border-go-gold bg-go-gold/20 text-go-ink"
                  : "border-go-border bg-go-paper text-go-muted hover:bg-go-muted-light"
              )}
            >
              {optionConfig.icon}
              {optionConfig.label}
            </button>
          );
        })}
      </div>

      {mode === "address" ? (
        <TextInput
          id={fieldId}
          label={config.label}
          placeholder={config.placeholder}
          helperText={config.helperText}
          error={error}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          leftIcon={config.icon}
        />
      ) : (
        <SearchInput
          id={fieldId}
          label={config.label}
          placeholder={config.placeholder}
          helperText={config.helperText}
          error={error}
          value={currentValue}
          onChange={handleChange}
          onClear={handleClear}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export { LocationField, MODE_CONFIG };
