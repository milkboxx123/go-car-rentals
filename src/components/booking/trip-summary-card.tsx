import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

import { formatDateRange, formatPrice, formatVehicleName } from "@/lib/formatters";
import { getVehicleById } from "@/mock";
import type { Reservation } from "@/types";
import { cn } from "@/lib/utils";
import { ReservationStatusBadge } from "./reservation-status-badge";

export interface TripSummaryCardProps {
  reservation: Reservation;
  className?: string;
}

export function TripSummaryCard({
  reservation,
  className,
}: TripSummaryCardProps) {
  const vehicle = getVehicleById(reservation.vehicleId);
  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);
  const image = vehicle?.images[0];

  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border border-go-border bg-go-paper shadow-card",
        className
      )}
    >
      <div className="flex gap-4 p-4">
        {image && vehicle && (
          <div className="relative hidden aspect-square w-24 shrink-0 overflow-hidden rounded-md sm:block">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <ReservationStatusBadge status={reservation.status} size="sm" />
            <span className="text-caption text-go-muted">
              {reservation.confirmationNumber}
            </span>
          </div>

          {vehicle && (
            <h3 className="font-semibold text-go-ink">
              {formatVehicleName(vehicle)}
            </h3>
          )}

          <div className="flex items-center gap-2 text-body-sm text-go-muted">
            <Calendar className="size-4 shrink-0" aria-hidden="true" />
            <span>{formatDateRange(start, end)}</span>
            <span>· {reservation.totalDays} days</span>
          </div>

          <div className="flex items-start gap-2 text-body-sm text-go-muted">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span className="line-clamp-2">{reservation.pickupLocation}</span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-bold tabular-nums text-go-ink">
            {formatPrice(reservation.total)}
          </p>
          <p className="text-caption text-go-muted">total</p>
        </div>
      </div>
    </article>
  );
}
