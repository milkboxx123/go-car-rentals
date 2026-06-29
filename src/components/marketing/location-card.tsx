import Image from "next/image";
import { MapPin, Plane } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export interface LocationCardProps {
  city: string;
  state: string;
  brandName: string;
  airportName: string;
  airportCode: string;
  href: string;
  imageUrl?: string;
  badges?: string[];
  className?: string;
}

export function LocationCard({
  city,
  state,
  brandName,
  airportName,
  airportCode,
  href,
  imageUrl,
  badges = [],
  className,
}: LocationCardProps) {
  return (
    <Link
      href={href}
      variant="card"
      className={cn(
        "group overflow-hidden rounded-2xl border border-go-border bg-go-paper shadow-card transition-shadow hover:shadow-card-hover",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-go-muted-light">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${brandName} car rentals`}
            fill
            className="object-cover transition-transform duration-normal group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-go-gold/30 to-go-ink/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-go-ink/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-heading-md font-bold text-go-paper">{brandName}</p>
          <p className="flex items-center gap-1.5 text-body-sm text-go-paper/80">
            <MapPin className="size-3.5" aria-hidden="true" />
            {city}, {state}
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-1.5 text-body-sm text-go-muted">
          <Plane className="size-3.5 shrink-0" aria-hidden="true" />
          {airportCode} — {airportName}
        </p>
        {badges.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge} variant="default" className="text-caption">
                {badge}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
