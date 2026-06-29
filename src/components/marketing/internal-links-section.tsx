import { Link } from "@/components/ui/link";
import { MarketingSection } from "./marketing-section";

export interface InternalLinkGroup {
  title: string;
  links: { href: string; label: string }[];
}

export interface InternalLinksSectionProps {
  title?: string;
  groups?: InternalLinkGroup[];
  links?: { href: string; label: string }[];
  className?: string;
}

export function InternalLinksSection({
  title = "Related pages",
  groups,
  links,
  className,
}: InternalLinksSectionProps) {
  return (
    <MarketingSection background="white" spacing="compact" className={className}>
      <h2 className="mb-6 text-heading-md font-bold">{title}</h2>
      {groups ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-label text-go-ink">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} variant="footer">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : links ? (
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} variant="footer">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </MarketingSection>
  );
}
