"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectTrigger>;

export interface SelectFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Select>, "children"> {
  id?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  hideLabel?: boolean;
  leftIcon?: React.ReactNode;
  selectSize?: SelectTriggerProps["selectSize"];
  variant?: SelectTriggerProps["variant"];
  triggerClassName?: string;
  contentClassName?: string;
  className?: string;
  children: React.ReactNode;
}

function SelectField({
  id: idProp,
  label,
  placeholder,
  helperText,
  error,
  hideLabel = false,
  leftIcon,
  selectSize = "md",
  variant,
  triggerClassName,
  contentClassName,
  className,
  children,
  disabled,
  ...selectProps
}: SelectFieldProps) {
  const generatedId = React.useId();
  const fieldId = idProp ?? generatedId;
  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;

  const describedBy = [helperText ? helperId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && !hideLabel && <Label htmlFor={fieldId}>{label}</Label>}
      <Select disabled={disabled} {...selectProps}>
        <SelectTrigger
          id={fieldId}
          selectSize={selectSize}
          variant={variant}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            leftIcon && "relative pl-10",
            error && "border-go-danger focus:ring-go-danger",
            triggerClassName
          )}
        >
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-go-muted [&_svg]:size-4">
              {leftIcon}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate text-left">
            <SelectValue placeholder={placeholder} />
          </span>
        </SelectTrigger>
        <SelectContent className={contentClassName}>{children}</SelectContent>
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

export { SelectField };
