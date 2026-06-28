"use client";

import * as React from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { dateFieldTriggerVariants } from "./date-field";

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

function isDateBlocked(date: Date, blockedDates: Date[], minDate?: Date, maxDate?: Date) {
  const day = startOfDay(date);
  if (minDate && isBefore(day, startOfDay(minDate))) return true;
  if (maxDate && isAfter(day, startOfDay(maxDate))) return true;
  return blockedDates.some((blocked) => isSameDay(blocked, day));
}

interface CalendarGridProps {
  month: Date;
  onMonthChange: (month: Date) => void;
  startDate?: Date;
  endDate?: Date;
  onSelectDate: (date: Date) => void;
  blockedDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

function CalendarGrid({
  month,
  onMonthChange,
  startDate,
  endDate,
  onSelectDate,
  blockedDates = [],
  minDate,
  maxDate,
}: CalendarGridProps) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Previous month"
          onClick={() => onMonthChange(subMonths(month, 1))}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>
        <span className="text-body-sm font-semibold text-go-ink">
          {format(month, "MMMM yyyy")}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Next month"
          onClick={() => onMonthChange(addMonths(month, 1))}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekDays.map((day) => (
          <span key={day} className="py-1 text-caption font-semibold text-go-muted">
            {day}
          </span>
        ))}
        {days.map((day) => {
          const blocked = isDateBlocked(day, blockedDates, minDate, maxDate);
          const inMonth = isSameMonth(day, month);
          const isStart = startDate && isSameDay(day, startDate);
          const isEnd = endDate && isSameDay(day, endDate);
          const inRange =
            startDate &&
            endDate &&
            isWithinInterval(day, {
              start: startOfDay(startDate),
              end: startOfDay(endDate),
            });

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={blocked}
              aria-label={format(day, "EEEE, MMMM d, yyyy")}
              aria-pressed={isStart || isEnd ? true : undefined}
              onClick={() => onSelectDate(day)}
              className={cn(
                "relative flex size-9 items-center justify-center rounded-md text-body-sm transition-colors",
                !inMonth && "text-go-muted/50",
                inMonth && !blocked && "text-go-ink hover:bg-go-muted-light",
                blocked &&
                  "cursor-not-allowed text-go-muted/40 line-through decoration-go-muted/60",
                inRange && !isStart && !isEnd && "bg-go-gold/20",
                (isStart || isEnd) && "bg-go-gold font-semibold text-go-ink"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface DatePickerPanelProps {
  startDate?: Date;
  endDate?: Date;
  onStartDateChange?: (date: Date | undefined) => void;
  onEndDateChange?: (date: Date | undefined) => void;
  blockedDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

function DatePickerPanel({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  blockedDates,
  minDate,
  maxDate,
}: DatePickerPanelProps) {
  const [month, setMonth] = React.useState(startDate ?? new Date());
  const [selectingEnd, setSelectingEnd] = React.useState(false);

  function handleSelectDate(date: Date) {
    if (isDateBlocked(date, blockedDates ?? [], minDate, maxDate)) return;

    if (!selectingEnd || !startDate) {
      onStartDateChange?.(date);
      onEndDateChange?.(undefined);
      setSelectingEnd(true);
      return;
    }

    if (isBefore(date, startDate)) {
      onStartDateChange?.(date);
      onEndDateChange?.(undefined);
      setSelectingEnd(true);
      return;
    }

    onEndDateChange?.(date);
    setSelectingEnd(false);
  }

  const rangeLabel =
    startDate && endDate
      ? `${format(startDate, "MMM d")} – ${format(endDate, "MMM d, yyyy")}`
      : startDate
        ? `${format(startDate, "MMM d")} – Select return`
        : "Select pickup and return dates";

  return (
    <div className="flex flex-col gap-4">
      <p className="text-body-sm font-medium text-go-ink">{rangeLabel}</p>
      <CalendarGrid
        month={month}
        onMonthChange={setMonth}
        startDate={startDate}
        endDate={endDate}
        onSelectDate={handleSelectDate}
        blockedDates={blockedDates}
        minDate={minDate}
        maxDate={maxDate}
      />
      {(blockedDates?.length ?? 0) > 0 && (
        <p className="text-caption text-go-muted">
          Crossed-out dates are unavailable.
        </p>
      )}
    </div>
  );
}

export interface DatePickerProps {
  id?: string;
  label?: string;
  startDate?: Date;
  endDate?: Date;
  onStartDateChange?: (date: Date | undefined) => void;
  onEndDateChange?: (date: Date | undefined) => void;
  blockedDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

function DatePicker({
  id: idProp,
  label = "Dates",
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  blockedDates,
  minDate,
  maxDate,
  helperText,
  error,
  disabled,
  className,
}: DatePickerProps) {
  const generatedId = React.useId();
  const fieldId = idProp ?? generatedId;
  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const describedBy = [helperText ? helperId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  const triggerLabel =
    startDate && endDate
      ? `${format(startDate, "MMM d")} – ${format(endDate, "MMM d, yyyy")}`
      : startDate
        ? `${format(startDate, "MMM d")} – Select return`
        : "Add dates";

  const trigger = (
    <button
      id={fieldId}
      type="button"
      disabled={disabled}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy || undefined}
      aria-haspopup="dialog"
      aria-expanded={open}
      className={cn(
        dateFieldTriggerVariants({ inputSize: "md" }),
        !startDate && "text-go-muted",
        error && "border-go-danger focus-visible:ring-go-danger"
      )}
    >
      <Calendar className="size-4 shrink-0 text-go-muted" aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate text-left">{triggerLabel}</span>
    </button>
  );

  const panel = (
    <DatePickerPanel
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
      blockedDates={blockedDates}
      minDate={minDate}
      maxDate={maxDate}
    />
  );

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <Label htmlFor={fieldId}>{label}</Label>
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>{trigger}</SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{label}</SheetTitle>
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
      )}
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

export { DatePicker, CalendarGrid, DatePickerPanel };
