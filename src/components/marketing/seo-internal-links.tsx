import { Link } from "@/components/ui/link";
import { VEHICLE_TYPE_OPTIONS } from "@/mock/filters";
import { cn } from "@/lib/utils";

export interface SeoInternalLinksProps {
  title?: string;
  className?: string;
}

export function SeoInternalLinks({
  title = "Explore Go rentals",
  className,
}: SeoInternalLinksProps) {
  const vehicleTypes = VEHICLE_TYPE_OPTIONS.filter((t) => (t.count ?? 0) > 0);

  return (
    <section
      className={cn("border-t border-go-border py-10", className)}
      aria-label="Site navigation links"
    >
      <div className="container-marketing">
        <h2 className="sr-only">{title}</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-label text-go-ink">Vehicle types</h3>
            <ul className="space-y-2">
              {vehicleTypes.map((type) => (
                <li key={type.value}>
                  <Link href={`/search?type=${type.value}`} variant="footer">
                    {type.label} for rent
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-label text-go-ink">Popular searches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search?category=airports" variant="footer">
                  Airport car rental
                </Link>
              </li>
              <li>
                <Link href="/search?category=delivered" variant="footer">
                  Car delivery rental
                </Link>
              </li>
              <li>
                <Link href="/search?type=luxury" variant="footer">
                  Luxury car rental
                </Link>
              </li>
              <li>
                <Link href="/search?type=electric" variant="footer">
                  Electric car rental
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
