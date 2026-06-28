"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { VehicleCard } from "@/components/booking/vehicle-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { vehicles } from "@/mock";
import type { Vehicle } from "@/types";
import { cn } from "@/lib/utils";

export interface VehicleCarouselSectionProps {
  title?: string;
  subtitle?: string;
  vehicles?: Vehicle[];
  viewAllHref?: string;
  className?: string;
}

export function VehicleCarouselSection({
  title = "Popular vehicles",
  subtitle = "Hand-picked from our verified fleet",
  vehicles: vehicleList = vehicles.filter((v) => v.status === "available").slice(0, 8),
  viewAllHref = "/search",
  className,
}: VehicleCarouselSectionProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -320 : 320;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="container-marketing">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-heading-lg font-bold text-go-ink">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-body-md text-go-muted">{subtitle}</p>
            )}
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-thin sm:-mx-0 sm:px-0"
        >
          {vehicleList.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              variant="carousel"
            />
          ))}
        </div>

        {viewAllHref && (
          <div className="mt-6 text-center">
            <Link href={viewAllHref} variant="underline" className="font-semibold">
              View all vehicles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
