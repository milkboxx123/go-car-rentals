"use client";

import * as React from "react";
import { Clock } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function generateTimeOptions(incrementMinutes = 15) {
  const options: { value: string; label: string }[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += incrementMinutes) {
      const value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const label = `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
      options.push({ value, label });
    }
  }

  return options;
}

const TIME_OPTIONS = generateTimeOptions(15);

export interface TimePickerProps {
  id?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

function TimePicker({
  id: idProp,
  label = "Time",
  value,
  defaultValue,
  onValueChange,
  helperText,
  error,
  disabled,
  placeholder = "Select time",
  className,
}: TimePickerProps) {
  const generatedId = React.useId();
  const fieldId = idProp ?? generatedId;
  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;

  const describedBy = [helperText ? helperId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <Label htmlFor={fieldId}>{label}</Label>
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={fieldId}
          selectSize="md"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            "relative pl-10",
            error && "border-go-danger focus:ring-go-danger"
          )}
        >
          <Clock
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 shrink-0 text-go-muted"
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1 truncate text-left">
            <SelectValue placeholder={placeholder} />
          </span>
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {TIME_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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

export { TimePicker, TIME_OPTIONS, generateTimeOptions };
