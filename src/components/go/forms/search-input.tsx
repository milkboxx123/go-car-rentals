"use client";

import * as React from "react";
import { MapPin, Search, X } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  onClear?: () => void;
  containerClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      id: idProp,
      label,
      helperText,
      error,
      value,
      defaultValue,
      onClear,
      onChange,
      placeholder = "City, airport, or address",
      containerClassName,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = idProp ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const [internalValue, setInternalValue] = React.useState(
      defaultValue?.toString() ?? ""
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value?.toString() ?? "" : internalValue;
    const hasValue = currentValue.length > 0;

    const describedBy = [helperText ? helperId : null, error ? errorId : null]
      .filter(Boolean)
      .join(" ");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      onChange?.(event);
    }

    function handleClear() {
      if (!isControlled) {
        setInternalValue("");
      }
      onClear?.();
    }

    return (
      <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Input
          ref={ref}
          id={inputId}
          type="search"
          inputSize="lg"
          state={error ? "error" : "default"}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          leftIcon={<Search aria-hidden="true" />}
          rightIcon={
            hasValue ? (
              <IconButton
                type="button"
                variant="ghost"
                size="xs"
                aria-label="Clear search"
                className="pointer-events-auto -mr-1 size-7"
                onClick={handleClear}
              >
                <X aria-hidden="true" />
              </IconButton>
            ) : (
              <MapPin aria-hidden="true" />
            )
          }
          className={cn("text-body-lg", className)}
          {...props}
        />
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
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
