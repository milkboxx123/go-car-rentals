import { Car, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-16 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-go-muted-light text-go-muted">
          {icon}
        </div>
      )}
      <h3 className="text-heading-sm font-semibold text-go-ink">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-body-md text-go-muted">{description}</p>
      )}
      {actionLabel && (actionHref || onAction) && (
        <div className="mt-6">
          {actionHref ? (
            <Button asChild>
              <Link href={actionHref} variant="button">{actionLabel}</Link>
            </Button>
          ) : (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
        </div>
      )}
    </div>
  );
}

export function NoVehiclesFound({
  className,
  onClearFilters,
}: {
  className?: string;
  onClearFilters?: () => void;
}) {
  return (
    <EmptyState
      icon={<Car className="size-6" aria-hidden="true" />}
      title="No vehicles match your search"
      description="Try adjusting your dates, location, or filters to see more options."
      actionLabel="Clear filters"
      onAction={onClearFilters}
      className={className}
    />
  );
}

export function NoSearchResults({ className }: { className?: string }) {
  return (
    <EmptyState
      icon={<Search className="size-6" aria-hidden="true" />}
      title="Start your search"
      description="Enter a location and dates to browse available vehicles."
      actionLabel="Search vehicles"
      actionHref="/search"
      className={className}
    />
  );
}

export function NoReservations({ className }: { className?: string }) {
  return (
    <EmptyState
      icon={<Car className="size-6" aria-hidden="true" />}
      title="No reservations yet"
      description="When you book a vehicle, your trips will appear here."
      actionLabel="Browse vehicles"
      actionHref="/search"
      className={className}
    />
  );
}

export function FiltersEmpty({ className }: { className?: string }) {
  return (
    <EmptyState
      icon={<SlidersHorizontal className="size-6" aria-hidden="true" />}
      title="No filters applied"
      description="Use filters to narrow down vehicles by type, price, and features."
      className={className}
    />
  );
}
