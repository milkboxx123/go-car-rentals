"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  id?: string;
  label?: string;
  placeholder?: string;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

function MultiSelect({
  id: idProp,
  label,
  placeholder = "Select options",
  options,
  value,
  defaultValue = [],
  onValueChange,
  helperText,
  error,
  disabled,
  className,
}: MultiSelectProps) {
  const generatedId = React.useId();
  const fieldId = idProp ?? generatedId;
  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;
  const listboxId = `${fieldId}-listbox`;

  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internalValue;

  const describedBy = [helperText ? helperId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  function updateSelected(next: string[]) {
    if (!isControlled) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  }

  function toggleOption(optionValue: string) {
    const next = selected.includes(optionValue)
      ? selected.filter((v) => v !== optionValue)
      : [...selected, optionValue];
    updateSelected(next);
  }

  const triggerLabel =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? options.find((o) => o.value === selected[0])?.label ?? placeholder
        : `${selected.length} selected`;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={fieldId}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy || undefined}
            disabled={disabled}
            className={cn(
              "h-11 w-full justify-between font-normal",
              error && "border-go-danger"
            )}
          >
            <span className={cn(selected.length === 0 && "text-go-muted")}>
              {triggerLabel}
            </span>
            <ChevronDown className="size-4 shrink-0 text-go-muted" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          id={listboxId}
          role="listbox"
          aria-multiselectable="true"
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-2"
        >
          <ul className="flex max-h-60 flex-col gap-1 overflow-y-auto">
            {options.map((option) => {
              const checked = selected.includes(option.value);
              const optionId = `${fieldId}-${option.value}`;

              return (
                <li key={option.value}>
                  <label
                    htmlFor={optionId}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-body-sm hover:bg-go-muted-light",
                      option.disabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <Checkbox
                      id={optionId}
                      checked={checked}
                      disabled={option.disabled}
                      onCheckedChange={() => toggleOption(option.value)}
                      aria-label={option.label}
                    />
                    <span>{option.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>
      {helperText && !error && (
        <p id={helperId} className="text-body-sm text-go-muted">
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-body-sm text-go-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export { MultiSelect };
