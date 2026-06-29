import Image from "next/image";
import { Plane } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { locations } from "@/mock";
import { cn } from "@/lib/utils";

export interface AirportRentalSectionProps {
  title?: string;
  description?: string;
  airportName?: string;
  airportCode?: string;
  searchHref?: string;
  id?: string;
  className?: string;
}

export function AirportRentalSection({
  title = "Airport pickup, simplified",
  description = "Land and go. Curbside pickup at major airports with clear instructions sent before you arrive. No shuttle buses, no rental counter lines.",
  airportName,
  airportCode,
  searchHref = "/search?category=airports",
  id = "airport",
  className,
}: AirportRentalSectionProps) {
  const displayTitle =
    airportName && airportCode
      ? `${airportName} (${airportCode})`
      : title;

  return (
    <section id={id} className={cn("bg-go-ink py-12 text-go-paper sm:py-16", className)}>
      <div className="container-marketing">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-go-gold text-go-ink">
              <Plane className="size-6" aria-hidden="true" />
            </div>
            <h2 className="text-heading-lg font-bold">{displayTitle}</h2>
            <p className="mt-4 text-body-lg text-go-paper/80">
              {description}
            </p>
            {!airportName ? (
              <ul className="mt-6 space-y-3">
                {locations.map((loc) => (
                  <li key={loc.id}>
                    <Link
                      href={`/search?location=${loc.slug}`}
                      variant="underline"
                      className="text-go-paper hover:text-go-gold"
                    >
                      {loc.airport.code} — {loc.city}, {loc.state}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <Button asChild variant="gold" size="lg" className="mt-8">
              <Link href={searchHref} variant="button">Search airport rentals</Link>
            </Button>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80"
              alt="Traveler picking up a rental car at the airport"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
