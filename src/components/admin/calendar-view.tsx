"use client";

import * as React from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { StatusPill } from "@/components/go/forms/status-pill";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getVehicleById, reservations } from "@/mock";
import type { Reservation } from "@/types";

export type CalendarViewMode = "day" | "week" | "month";

export interface CalendarViewProps {
  data?: Reservation[];
  initialDate?: Date;
  className?: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function reservationOverlapsDay(reservation: Reservation, day: Date) {
  const start = parseISO(reservation.startDate);
  const end = parseISO(reservation.endDate);
  const dayStart = new Date(day);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(day);
  dayEnd.setHours(23, 59, 59, 999);
  return start <= dayEnd && end >= dayStart;
}

function reservationLabel(reservation: Reservation) {
  const vehicle = getVehicleById(reservation.vehicleId);
  const vehicleName = vehicle
    ? `${vehicle.make} ${vehicle.model}`
    : "Unknown vehicle";
  return `${reservation.guest.lastName} — ${vehicleName}`;
}

function DayView({
  date,
  reservations: dayReservations,
}: {
  date: Date;
  reservations: Reservation[];
}) {
  return (
    <div className="rounded-lg border border-go-border bg-go-paper">
      <div className="border-b border-go-border px-4 py-3">
        <h3 className="text-body-sm font-semibold text-go-ink">
          {format(date, "EEEE, MMMM d, yyyy")}
        </h3>
      </div>
      <div className="divide-y divide-go-border/70">
        {HOURS.map((hour) => {
          const hourReservations = dayReservations.filter((res) => {
            const startHour = parseInt(res.startTime.split(":")[0] ?? "0", 10);
            return startHour === hour;
          });

          return (
            <div key={hour} className="flex min-h-14">
              <div className="w-16 shrink-0 border-r border-go-border/70 px-3 py-2 text-caption text-go-muted tabular-nums">
                {format(new Date().setHours(hour, 0, 0, 0), "ha")}
              </div>
              <div className="flex-1 space-y-1 p-2">
                {hourReservations.map((res) => (
                  <div
                    key={res.id}
                    className="rounded-md border border-go-border bg-go-muted-light/60 px-3 py-2"
                  >
                    <p className="text-body-sm font-semibold text-go-ink">
                      {reservationLabel(res)}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <StatusPill status={res.status} />
                      <span className="text-caption text-go-muted tabular-nums">
                        {res.startTime} – {res.endTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekView({
  weekStart,
  reservations: weekReservations,
}: {
  weekStart: Date;
  reservations: Reservation[];
}) {
  const days = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  });

  return (
    <div className="overflow-hidden rounded-lg border border-go-border bg-go-paper">
      <div className="grid grid-cols-7 border-b border-go-border bg-go-muted-light/60">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(
              "border-r border-go-border/70 px-2 py-3 text-center last:border-r-0",
              isToday(day) && "bg-go-paper"
            )}
          >
            <p className="text-caption font-semibold uppercase text-go-muted">
              {format(day, "EEE")}
            </p>
            <p
              className={cn(
                "mt-0.5 text-body-sm font-bold tabular-nums",
                isToday(day) ? "text-go-ink" : "text-go-ink-soft"
              )}
            >
              {format(day, "d")}
            </p>
          </div>
        ))}
      </div>
      <div className="grid min-h-[320px] grid-cols-7">
        {days.map((day) => {
          const dayReservations = weekReservations.filter((res) =>
            reservationOverlapsDay(res, day)
          );

          return (
            <div
              key={day.toISOString()}
              className="space-y-1.5 border-r border-go-border/70 p-2 last:border-r-0"
            >
              {dayReservations.map((res) => (
                <div
                  key={res.id}
                  className="rounded-md border border-go-border bg-go-muted-light/50 px-2 py-1.5"
                >
                  <p className="truncate text-caption font-semibold text-go-ink">
                    {reservationLabel(res)}
                  </p>
                  <StatusPill
                    status={res.status}
                    className="mt-1 scale-90 origin-left"
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonthView({
  month,
  reservations: monthReservations,
}: {
  month: Date;
  reservations: Reservation[];
}) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="overflow-hidden rounded-lg border border-go-border bg-go-paper">
      <div className="grid grid-cols-7 border-b border-go-border bg-go-muted-light/60">
        {weekDays.map((day) => (
          <div
            key={day}
            className="border-r border-go-border/70 px-2 py-2 text-center text-caption font-semibold uppercase text-go-muted last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dayReservations = monthReservations.filter((res) =>
            reservationOverlapsDay(res, day)
          );
          const inMonth = isSameMonth(day, month);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-24 space-y-1 border-b border-r border-go-border/70 p-2 last:border-r-0",
                !inMonth && "bg-go-muted-light/30",
                isToday(day) && inMonth && "bg-go-muted-light/50"
              )}
            >
              <p
                className={cn(
                  "text-caption font-semibold tabular-nums",
                  inMonth ? "text-go-ink" : "text-go-muted",
                  isToday(day) && "inline-flex size-6 items-center justify-center rounded-full bg-go-ink text-go-paper"
                )}
              >
                {format(day, "d")}
              </p>
              {dayReservations.slice(0, 2).map((res) => (
                <div
                  key={res.id}
                  className="truncate rounded-sm bg-go-muted-light px-1.5 py-0.5 text-[11px] font-medium text-go-ink-soft"
                >
                  {reservationLabel(res)}
                </div>
              ))}
              {dayReservations.length > 2 && (
                <p className="text-[11px] text-go-muted">
                  +{dayReservations.length - 2} more
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CalendarView({
  data = reservations,
  initialDate = new Date(),
  className,
}: CalendarViewProps) {
  const [view, setView] = React.useState<CalendarViewMode>("month");
  const [currentDate, setCurrentDate] = React.useState(initialDate);

  const weekStart = startOfWeek(currentDate);

  function navigate(direction: -1 | 1) {
    if (view === "day") {
      setCurrentDate((prev) => addDays(prev, direction));
    } else if (view === "week") {
      setCurrentDate((prev) => addDays(prev, direction * 7));
    } else {
      setCurrentDate((prev) =>
        direction === 1 ? addMonths(prev, 1) : subMonths(prev, 1)
      );
    }
  }

  const headerLabel = React.useMemo(() => {
    if (view === "day") return format(currentDate, "MMMM d, yyyy");
    if (view === "week") {
      const weekEnd = addDays(weekStart, 6);
      return `${format(weekStart, "MMM d")} – ${format(weekEnd, "MMM d, yyyy")}`;
    }
    return format(currentDate, "MMMM yyyy");
  }, [currentDate, view, weekStart]);

  const visibleReservations = React.useMemo(() => {
    if (view === "day") {
      return data.filter((res) => reservationOverlapsDay(res, currentDate));
    }
    if (view === "week") {
      const weekEnd = addDays(weekStart, 6);
      return data.filter((res) => {
        const start = parseISO(res.startDate);
        const end = parseISO(res.endDate);
        return start <= weekEnd && end >= weekStart;
      });
    }
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    return data.filter((res) => {
      const start = parseISO(res.startDate);
      const end = parseISO(res.endDate);
      return start <= monthEnd && end >= monthStart;
    });
  }, [currentDate, data, view, weekStart]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => navigate(-1)}
            aria-label="Previous"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => navigate(1)}
            aria-label="Next"
          >
            <ChevronRight className="size-4" />
          </Button>
          <h2 className="text-heading-sm font-bold text-go-ink">{headerLabel}</h2>
          {!isSameDay(currentDate, new Date()) && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
          )}
        </div>

        <Tabs
          value={view}
          onValueChange={(value) => setView(value as CalendarViewMode)}
        >
          <TabsList variant="pill">
            <TabsTrigger variant="pill" value="day">
              Day
            </TabsTrigger>
            <TabsTrigger variant="pill" value="week">
              Week
            </TabsTrigger>
            <TabsTrigger variant="pill" value="month">
              Month
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {view === "day" && (
        <DayView date={currentDate} reservations={visibleReservations} />
      )}
      {view === "week" && (
        <WeekView weekStart={weekStart} reservations={visibleReservations} />
      )}
      {view === "month" && (
        <MonthView month={currentDate} reservations={visibleReservations} />
      )}
    </div>
  );
}
