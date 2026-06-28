"use client";

import * as React from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { Heart, MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, formatVehicleName } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Vehicle, VehicleBadgeType } from "@/types";

const badgeVariantMap: Record<
  VehicleBadgeType,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  new: "new",
  verified: "verified",
  airport: "airport",
  delivery: "delivery",
  monthly: "monthly",
  luxury: "luxury",
  electric: "electric",
  discount: "gold",
};

const vehicleCardVariants = cva(
  "group relative flex overflow-hidden bg-go-paper transition-shadow duration-normal",
  {
    variants: {
      variant: {
        grid: "h-full flex-col rounded-lg border border-go-border shadow-card hover:shadow-md",
        compact:
          "flex-row gap-3 rounded-md border border-go-border p-2 hover:shadow-sm",
        carousel:
          "w-[280px] shrink-0 flex-col rounded-lg border border-go-border shadow-card hover:shadow-md sm:w-[300px]",
      },
    },
    defaultVariants: {
      variant: "grid",
    },
  }
);

const imageContainerVariants = cva("relative overflow-hidden bg-go-muted-light", {
  variants: {
    variant: {
      grid: "aspect-[4/3] w-full",
      compact: "aspect-square w-24 shrink-0 rounded-md sm:w-28",
      carousel: "aspect-[4/3] w-full",
    },
  },
  defaultVariants: {
    variant: "grid",
  },
});

export interface VehicleCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof vehicleCardVariants> {
  vehicle: Vehicle;
  href?: string;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: (vehicleId: string) => void;
  showTripTotal?: boolean;
  maxBadges?: number;
}

function VehicleCardImage({
  vehicle,
  variant,
  showFavorite,
  isFavorite,
  onFavoriteToggle,
}: Pick<
  VehicleCardProps,
  "vehicle" | "variant" | "showFavorite" | "isFavorite" | "onFavoriteToggle"
>) {
  const image = vehicle.images[0];

  return (
    <div className={imageContainerVariants({ variant })}>
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes={
          variant === "compact"
            ? "112px"
            : variant === "carousel"
              ? "300px"
              : "(max-width: 768px) 100vw, 33vw"
        }
        className="object-cover transition-transform duration-slow group-hover:scale-[1.03]"
      />
      {vehicle.status !== "available" && (
        <div className="absolute inset-0 flex items-center justify-center bg-go-ink/50">
          <Badge variant="dark" className="capitalize">
            {vehicle.status.replace("-", " ")}
          </Badge>
        </div>
      )}
      {showFavorite && (
        <IconButton
          type="button"
          variant="favorite"
          size="sm"
          active={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-2 top-2 z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavoriteToggle?.(vehicle.id);
          }}
        >
          <Heart
            className={cn(isFavorite && "fill-current")}
            aria-hidden="true"
          />
        </IconButton>
      )}
    </div>
  );
}

function VehicleCardBadges({
  vehicle,
  maxBadges = 2,
  className,
}: {
  vehicle: Vehicle;
  maxBadges?: number;
  className?: string;
}) {
  const badges = vehicle.badges.slice(0, maxBadges);

  if (badges.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {badges.map((badge) => (
        <Badge
          key={`${badge.type}-${badge.label}`}
          variant={badgeVariantMap[badge.type] ?? "default"}
          className="text-[0.65rem]"
        >
          {badge.label}
        </Badge>
      ))}
    </div>
  );
}

function VehicleCardContent({
  vehicle,
  variant,
  showTripTotal,
  maxBadges,
}: Pick<
  VehicleCardProps,
  "vehicle" | "variant" | "showTripTotal" | "maxBadges"
>) {
  const name = formatVehicleName(vehicle);
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "flex flex-1 flex-col",
        isCompact ? "justify-center gap-1 py-0.5" : "gap-2 p-4"
      )}
    >
      {!isCompact && (
        <VehicleCardBadges vehicle={vehicle} maxBadges={maxBadges} />
      )}

      <div>
        <h3
          className={cn(
            "font-semibold text-go-ink",
            isCompact ? "text-body-sm line-clamp-1" : "text-body-md"
          )}
        >
          {name}
        </h3>
        <div
          className={cn(
            "mt-0.5 flex items-center gap-1 text-go-muted",
            isCompact ? "text-caption" : "text-body-sm"
          )}
        >
          <Star
            className="size-3.5 fill-go-gold text-go-gold"
            aria-hidden="true"
          />
          <span className="font-medium text-go-ink">{vehicle.rating}</span>
          <span>({vehicle.reviewCount})</span>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center gap-1 text-go-muted",
          isCompact ? "text-caption" : "text-body-sm"
        )}
      >
        <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
        <span className="line-clamp-1">{vehicle.location}</span>
      </div>

      {isCompact && (
        <VehicleCardBadges vehicle={vehicle} maxBadges={1} className="mt-0.5" />
      )}

      <div
        className={cn(
          "mt-auto flex items-baseline gap-1 tabular-nums",
          isCompact ? "text-body-sm" : ""
        )}
      >
        <span className="font-bold text-go-ink">
          {formatPrice(vehicle.dailyRate)}
        </span>
        <span className="text-go-muted">/day</span>
        {showTripTotal && vehicle.tripTotal && !isCompact && (
          <span className="ml-auto text-body-sm text-go-muted">
            {formatPrice(vehicle.tripTotal)} total
          </span>
        )}
      </div>
    </div>
  );
}

export function VehicleCard({
  vehicle,
  variant = "grid",
  href,
  showFavorite = true,
  isFavorite = false,
  onFavoriteToggle,
  showTripTotal = false,
  maxBadges = 2,
  className,
  ...props
}: VehicleCardProps) {
  const cardHref = href ?? `/vehicles/${vehicle.id}`;

  return (
    <article
      className={cn(vehicleCardVariants({ variant }), className)}
      {...props}
    >
      <Link
        href={cardHref}
        variant="card"
        className="flex h-full flex-col"
        aria-label={`View ${formatVehicleName(vehicle)}`}
      >
        <VehicleCardImage
          vehicle={vehicle}
          variant={variant}
          showFavorite={showFavorite}
          isFavorite={isFavorite}
          onFavoriteToggle={onFavoriteToggle}
        />
        <VehicleCardContent
          vehicle={vehicle}
          variant={variant}
          showTripTotal={showTripTotal}
          maxBadges={maxBadges}
        />
      </Link>
    </article>
  );
}

export function VehicleCardSkeleton({
  variant = "grid",
  className,
}: VariantProps<typeof vehicleCardVariants> & { className?: string }) {
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(vehicleCardVariants({ variant }), className)}
      aria-hidden="true"
    >
      <Skeleton
        className={cn(
          imageContainerVariants({ variant }),
          "rounded-none",
          isCompact && "rounded-md"
        )}
      />
      <div
        className={cn(
          "flex flex-1 flex-col gap-2",
          isCompact ? "justify-center py-1" : "p-4"
        )}
      >
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="mt-auto h-5 w-1/3" />
      </div>
    </div>
  );
}
