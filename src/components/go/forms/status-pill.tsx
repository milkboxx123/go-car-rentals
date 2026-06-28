import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  PaymentStatus,
  ReservationStatus,
  VehicleStatus,
} from "@/types";

const statusPillVariants = cva("", {
  variants: {
    size: {
      sm: "text-caption px-2 py-0.5",
      md: "text-caption px-2.5 py-0.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const VEHICLE_STATUS_CONFIG: Record<
  VehicleStatus,
  { label: string; variant: React.ComponentProps<typeof Badge>["variant"] }
> = {
  available: { label: "Available", variant: "success" },
  booked: { label: "Booked", variant: "warning" },
  maintenance: { label: "Maintenance", variant: "default" },
  cleaning: { label: "Cleaning", variant: "default" },
  unavailable: { label: "Unavailable", variant: "danger" },
  "coming-soon": { label: "Coming soon", variant: "gold" },
  retired: { label: "Retired", variant: "default" },
};

const RESERVATION_STATUS_CONFIG: Record<
  ReservationStatus,
  { label: string; variant: React.ComponentProps<typeof Badge>["variant"] }
> = {
  draft: { label: "Draft", variant: "default" },
  pending: { label: "Pending", variant: "warning" },
  confirmed: { label: "Confirmed", variant: "success" },
  active: { label: "Active", variant: "success" },
  completed: { label: "Completed", variant: "default" },
  cancelled: { label: "Cancelled", variant: "danger" },
  refunded: { label: "Refunded", variant: "default" },
  "no-show": { label: "No show", variant: "danger" },
  "needs-review": { label: "Needs review", variant: "warning" },
};

const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; variant: React.ComponentProps<typeof Badge>["variant"] }
> = {
  pending: { label: "Pending", variant: "warning" },
  paid: { label: "Paid", variant: "success" },
  refunded: { label: "Refunded", variant: "default" },
  failed: { label: "Failed", variant: "danger" },
};

export interface StatusPillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusPillVariants> {
  status: VehicleStatus | ReservationStatus | PaymentStatus;
  label?: string;
  showDot?: boolean;
}

function StatusPill({
  status,
  label,
  size,
  showDot = true,
  className,
  ...props
}: StatusPillProps) {
  const config =
    status in VEHICLE_STATUS_CONFIG
      ? VEHICLE_STATUS_CONFIG[status as VehicleStatus]
      : status in RESERVATION_STATUS_CONFIG
        ? RESERVATION_STATUS_CONFIG[status as ReservationStatus]
        : PAYMENT_STATUS_CONFIG[status as PaymentStatus];

  return (
    <Badge
      variant={config.variant}
      className={cn(statusPillVariants({ size }), className)}
      role="status"
      aria-label={label ?? config.label}
      {...props}
    >
      {showDot && (
        <span
          className="mr-1.5 size-1.5 shrink-0 rounded-full bg-current opacity-80"
          aria-hidden="true"
        />
      )}
      {label ?? config.label}
    </Badge>
  );
}

export {
  StatusPill,
  statusPillVariants,
  VEHICLE_STATUS_CONFIG,
  RESERVATION_STATUS_CONFIG,
  PAYMENT_STATUS_CONFIG,
};
