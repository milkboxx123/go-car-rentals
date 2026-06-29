import Image from "next/image";
import {
  Calendar,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import type { Reservation as DbReservation } from "@prisma/client";

import { ReservationStatusBadge } from "@/components/booking/reservation-status-badge";
import { Button } from "@/components/ui/button";
import { Link as GoLink } from "@/components/ui/link";
import {
  formatDateRange,
  formatPrice,
  formatVehicleName,
} from "@/lib/formatters";
import { getVehicleById } from "@/mock";
import type { ReservationStatus } from "@/types";
import { cn } from "@/lib/utils";

function mapDbStatus(status: DbReservation["status"]): ReservationStatus {
  const map: Record<DbReservation["status"], ReservationStatus> = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    ACTIVE: "active",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
  };
  return map[status];
}

function getTotalDays(startDate: Date, endDate: Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(
    1,
    Math.ceil((endDate.getTime() - startDate.getTime()) / msPerDay)
  );
}

export interface TripCardProps {
  reservation: DbReservation;
  className?: string;
}

export function TripCard({ reservation, className }: TripCardProps) {
  const vehicle = getVehicleById(reservation.vehicleId);
  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);
  const image = vehicle?.images[0];
  const totalDays = getTotalDays(start, end);
  const status = mapDbStatus(reservation.status);
  const isActive = reservation.status === "ACTIVE";
  const isPast =
    reservation.status === "COMPLETED" || reservation.status === "CANCELLED";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-go-border bg-go-paper shadow-card",
        className
      )}
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5">
        {image && vehicle ? (
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl sm:aspect-square sm:w-28">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 112px"
            />
          </div>
        ) : null}

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <ReservationStatusBadge status={status} size="sm" />
            <span className="text-caption text-go-muted">
              {reservation.confirmationNumber}
            </span>
          </div>

          {vehicle ? (
            <h3 className="text-heading-sm font-bold text-go-ink">
              {formatVehicleName(vehicle)}
            </h3>
          ) : (
            <h3 className="text-heading-sm font-bold text-go-ink">
              Vehicle {reservation.vehicleId}
            </h3>
          )}

          <div className="flex items-center gap-2 text-body-sm text-go-muted">
            <Calendar className="size-4 shrink-0" aria-hidden="true" />
            <span>{formatDateRange(start, end)}</span>
            <span>· {totalDays} days</span>
          </div>

          <div className="flex items-start gap-2 text-body-sm text-go-muted">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{reservation.pickupLocation}</span>
          </div>

          {isActive ? (
            <div className="rounded-xl border border-go-gold/30 bg-go-gold/10 p-3 text-body-sm text-go-ink">
              <p className="font-medium">Pickup instructions</p>
              <p className="mt-1 text-go-muted">
                Check your confirmation email for pickup details. Return by{" "}
                {end.toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
                .
              </p>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button asChild variant="outline" size="sm">
              <GoLink href={`/vehicles/${reservation.vehicleId}`} variant="button">
                View details
              </GoLink>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <GoLink href="/account/messages" variant="button">
                <MessageSquare className="size-4" aria-hidden="true" />
                Message support
              </GoLink>
            </Button>
            {isActive ? (
              <Button type="button" variant="ghost" size="sm" disabled>
                <Phone className="size-4" aria-hidden="true" />
                Roadside support
              </Button>
            ) : null}
            {!isPast ? (
              <>
                <Button type="button" variant="ghost" size="sm" disabled>
                  Modify trip
                </Button>
                <Button type="button" variant="ghost" size="sm" disabled>
                  Cancel trip
                </Button>
              </>
            ) : (
              <>
                <Button type="button" variant="ghost" size="sm" disabled>
                  Receipt
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <GoLink href="/search" variant="button">
                    Book again
                  </GoLink>
                </Button>
                <Button type="button" variant="ghost" size="sm" disabled>
                  Review vehicle
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="shrink-0 sm:text-right">
          <p className="text-heading-sm font-bold tabular-nums text-go-ink">
            {formatPrice(reservation.totalAmount / 100)}
          </p>
          <p className="text-caption text-go-muted">total</p>
        </div>
      </div>
    </article>
  );
}

// Mock active trip example for design/dev reference:
// { status: "ACTIVE", pickupLocation: "Tampa International Airport", ... }
