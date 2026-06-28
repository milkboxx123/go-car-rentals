import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Badge } from "@/components/ui/badge";
import type { ReservationStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusVariantMap: Record<
  ReservationStatus,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  draft: "default",
  pending: "warning",
  confirmed: "success",
  active: "airport",
  completed: "default",
  cancelled: "danger",
  refunded: "default",
  "no-show": "danger",
  "needs-review": "warning",
};

const statusLabelMap: Record<ReservationStatus, string> = {
  draft: "Draft",
  pending: "Pending",
  confirmed: "Confirmed",
  active: "Active",
  completed: "Completed",
  cancelled: "Cancelled",
  refunded: "Refunded",
  "no-show": "No show",
  "needs-review": "Needs review",
};

const badgeSizeVariants = cva("", {
  variants: {
    size: {
      sm: "text-[0.65rem]",
      md: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ReservationStatusBadgeProps
  extends VariantProps<typeof badgeSizeVariants> {
  status: ReservationStatus;
  className?: string;
}

export function ReservationStatusBadge({
  status,
  size,
  className,
}: ReservationStatusBadgeProps) {
  return (
    <Badge
      variant={statusVariantMap[status]}
      className={cn(badgeSizeVariants({ size }), "capitalize", className)}
    >
      {statusLabelMap[status]}
    </Badge>
  );
}
