"use client";

import * as React from "react";
import { format, isValid, parseISO } from "date-fns";
import { Calendar } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { CalendarGrid } from "./date-picker";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

function parseDateValue(value?: string): Date | undefined {
  if (!value) return undefined;
  const parsed = parseISO(value);
  return isValid(parsed) ? parsed : undefined;
}

function toIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

const dateFieldTriggerVariants = cva(
  [
    "flex w-full items-center rounded-md border border-go-border bg-go-paper text-left",
    "transition-colors duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-go-muted-light",
  ].join(" "),
  {
    variants: {
      inputSize: {
        sm: "h-9 gap-2 px-3 text-body-sm",
        md: "h-11 gap-2 px-3 text-body-md",
        lg: "h-12 gap-2 px-3 text-body-lg",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  }
);

export interface DateFieldProps
  extends VariantProps<typeof dateFieldTriggerVariants> {
  id?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  blockedDates?: Date[];
  className?: string;
  triggerClassName?: string;
  hideLabel?: boolean;
}

function DateField({
  id: idProp,
  label,
  value,
  onChange,
  placeholder = "Select date",
  helperText,
  error,
  disabled,
  minDate,
  maxDate,
  blockedDates,
  inputSize,
  className,
  triggerClassName,
  hideLabel = false,
}: DateFieldProps) {
  const generatedId = React.useId();
  const fieldId = idProp ?? generatedId;
  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState(() => parseDateValue(value) ?? new Date());

  const selectedDate = parseDateValue(value);

  React.useEffect(() => {
    const parsed = parseDateValue(value);
    if (parsed) setMonth(parsed);
  }, [value]);

  const describedBy = [helperText ? helperId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  const displayValue = selectedDate
    ? format(selectedDate, "MMM d, yyyy")
    : placeholder;

  function handleSelectDate(date: Date) {
    onChange?.(toIsoDate(date));
    setOpen(false);
  }

  const trigger = (
    <button
      id={fieldId}
      type="button"
      disabled={disabled}
      aria-describedby={describedBy || undefined}
      aria-haspopup="dialog"
      aria-expanded={open}
      className={cn(
        dateFieldTriggerVariants({ inputSize }),
        error && "border-go-danger focus-visible:ring-go-danger",
        triggerClassName
      )}
    >
      <Calendar
        className="size-4 shrink-0 text-go-muted"
        aria-hidden="true"
      />
      <span
        className={cn(
          "min-w-0 flex-1 truncate",
          selectedDate ? "text-go-ink" : "text-go-muted"
        )}
      >
        {displayValue}
      </span>
    </button>
  );

  const panel = (
    <CalendarGrid
      month={month}
      onMonthChange={setMonth}
      startDate={selectedDate}
      onSelectDate={handleSelectDate}
      blockedDates={blockedDates}
      minDate={minDate}
      maxDate={maxDate}
    />
  );

  const picker = isMobile ? (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{label ?? "Select date"}</SheetTitle>
        </SheetHeader>
        <div className="px-6 pb-6">{panel}</div>
      </SheetContent>
    </Sheet>
  ) : (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-4">
        {panel}
      </PopoverContent>
    </Popover>
  );

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && !hideLabel && <Label htmlFor={fieldId}>{label}</Label>}
      {picker}
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

export { DateField, dateFieldTriggerVariants, parseDateValue, toIsoDate };
