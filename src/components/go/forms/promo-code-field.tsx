"use client";

import * as React from "react";
import { Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface PromoCodeFieldProps {
  id?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onApply?: (code: string) => void | Promise<void>;
  helperText?: string;
  error?: string;
  success?: boolean;
  successMessage?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

function PromoCodeField({
  id: idProp,
  label = "Promo code",
  value,
  defaultValue = "",
  onChange,
  onApply,
  helperText,
  error,
  success = false,
  successMessage,
  loading = false,
  disabled,
  className,
}: PromoCodeFieldProps) {
  const generatedId = React.useId();
  const fieldId = idProp ?? generatedId;
  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;
  const successId = `${fieldId}-success`;

  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const describedBy = [
    helperText ? helperId : null,
    error ? errorId : null,
    success && successMessage ? successId : null,
  ]
    .filter(Boolean)
    .join(" ");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event.target.value);
  }

  async function handleApply() {
    await onApply?.(currentValue.trim());
  }

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <div className="flex gap-2">
        <Input
          id={fieldId}
          value={currentValue}
          onChange={handleChange}
          placeholder="Enter promo code"
          disabled={disabled || loading}
          state={error ? "error" : success ? "success" : "default"}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          leftIcon={<Tag aria-hidden="true" />}
          className="flex-1"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={handleApply}
          loading={loading}
          disabled={disabled || !currentValue.trim()}
        >
          Apply
        </Button>
      </div>
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
      {success && successMessage && !error && (
        <p id={successId} className="text-body-sm text-go-success">
          {successMessage}
        </p>
      )}
    </div>
  );
}

export { PromoCodeField };
