import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type AccountStatus =
  | "verified"
  | "needs-action"
  | "upcoming"
  | "active"
  | "past"
  | "payment-required"
  | "unread"
  | "cancelled"
  | "completed";

const STATUS_CONFIG: Record<
  AccountStatus,
  { label: string; variant: "verified" | "warning" | "gold" | "success" | "default" | "danger" }
> = {
  verified: { label: "Verified", variant: "verified" },
  "needs-action": { label: "Needs action", variant: "warning" },
  upcoming: { label: "Upcoming", variant: "gold" },
  active: { label: "Active", variant: "success" },
  past: { label: "Past", variant: "default" },
  "payment-required": { label: "Payment required", variant: "warning" },
  unread: { label: "Unread", variant: "gold" },
  cancelled: { label: "Cancelled", variant: "danger" },
  completed: { label: "Completed", variant: "default" },
};

export interface StatusBadgeProps {
  status: AccountStatus;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge variant={config.variant} className={cn(className)}>
      {label ?? config.label}
    </Badge>
  );
}
