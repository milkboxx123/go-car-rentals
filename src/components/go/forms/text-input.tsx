"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface TextInputProps extends InputProps {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  successMessage?: string;
  containerClassName?: string;
  required?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id: idProp,
      label,
      helperText,
      error,
      success = false,
      successMessage,
      containerClassName,
      required,
      state: stateProp,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = idProp ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const successId = `${inputId}-success`;

    const describedBy = [
      helperText ? helperId : null,
      error ? errorId : null,
      success && successMessage ? successId : null,
    ]
      .filter(Boolean)
      .join(" ");

    const inputState = error ? "error" : success ? "success" : stateProp;

    return (
      <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          id={inputId}
          state={inputState}
          className={className}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          required={required}
          {...props}
        />
        {helperText && !error && (
          <p id={helperId} className="text-body-sm text-go-muted">
            {helperText}
          </p>
        )}
        {error && (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1.5 text-body-sm text-go-danger"
          >
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
        {success && successMessage && !error && (
          <p
            id={successId}
            className="flex items-center gap-1.5 text-body-sm text-go-success"
          >
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
            {successMessage}
          </p>
        )}
      </div>
    );
  }
);
TextInput.displayName = "TextInput";

export { TextInput };
