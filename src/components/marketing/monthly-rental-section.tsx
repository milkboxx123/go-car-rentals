import Image from "next/image";
import { CalendarRange } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { formatPrice } from "@/lib/formatters";
import { vehicles } from "@/mock";
import { cn } from "@/lib/utils";

const monthlyVehicles = vehicles.filter((v) =>
  v.badges.some((b) => b.type === "monthly")
);

export interface MonthlyRentalSectionProps {
  title?: string;
  className?: string;
}

export function MonthlyRentalSection({
  title = "Monthly rentals that save",
  className,
}: MonthlyRentalSectionProps) {
  const startingRate = Math.min(
    ...vehicles.filter((v) => v.status === "available").map((v) => v.dailyRate)
  );

  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="container-marketing">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1485291571159-792bcaa1ff02?w=1200&q=80"
              alt="Long-term rental vehicle on a suburban street"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-go-muted-light text-go-ink">
              <CalendarRange className="size-6" aria-hidden="true" />
            </div>
            <h2 className="text-heading-lg font-bold text-go-ink">{title}</h2>
            <p className="mt-4 text-body-lg text-go-muted">
              Need a car for 30 days or more? Monthly rates start at{" "}
              <span className="font-semibold text-go-ink">
                {formatPrice(startingRate)}/day
              </span>{" "}
              with flexible pickup and delivery options.
            </p>
            {monthlyVehicles.length > 0 && (
              <p className="mt-3 text-body-sm text-go-muted">
                {monthlyVehicles.length} vehicle
                {monthlyVehicles.length !== 1 ? "s" : ""} currently offer
                monthly pricing.
              </p>
            )}
            <Button asChild size="lg" className="mt-8">
              <Link href="/search" variant="button">Explore monthly rates</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
