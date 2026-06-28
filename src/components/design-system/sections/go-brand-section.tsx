import {
  DsPreview,
  DsSection,
  DsSubsection,
  DsVariantCell,
  DsVariantGrid,
} from "@/components/design-system";
import { BrandLockup, Logo, PriceDisplay } from "@/components/go";

const LOGO_SIZES = ["sm", "md", "lg", "xl"] as const;
const LOCKUP_LOCATIONS = ["Tampa", "Boston", "Miami"] as const;

export function GoBrandSection() {
  return (
    <>
      <DsSection
        id="logo"
        title="Logo"
        description="The Go wordmark with optional city lockup for market-specific branding. Use location variants on landing pages, headers, and confirmation emails."
        importPath='import { Logo } from "@/components/go"'
      >
        <DsSubsection title="Sizes">
          <DsPreview>
            <DsVariantGrid columns={4}>
              {LOGO_SIZES.map((size) => (
                <DsVariantCell key={size} label={size}>
                  <Logo size={size} />
                </DsVariantCell>
              ))}
            </DsVariantGrid>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="Color variants">
          <DsVariantGrid columns={3}>
            <DsVariantCell label="default">
              <DsPreview>
                <Logo size="lg" />
              </DsPreview>
            </DsVariantCell>
            <DsVariantCell label="light">
              <DsPreview surface="dark">
                <Logo size="lg" variant="light" />
              </DsPreview>
            </DsVariantCell>
            <DsVariantCell label="dark">
              <DsPreview surface="cream">
                <Logo size="lg" variant="dark" />
              </DsPreview>
            </DsVariantCell>
          </DsVariantGrid>
        </DsSubsection>

        <DsSubsection title="Location lockups">
          <DsPreview>
            <DsVariantGrid columns={3}>
              {LOCKUP_LOCATIONS.map((location) => (
                <DsVariantCell key={location} label={location}>
                  <Logo size="lg" location={location} />
                </DsVariantCell>
              ))}
            </DsVariantGrid>
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="brand-lockup"
        title="BrandLockup"
        description="Stacked logo and optional tagline for hero sections, footers, and empty states. Pair with a city name for localized marketing pages."
        importPath='import { BrandLockup } from "@/components/go"'
      >
        <DsSubsection title="Sizes">
          <DsPreview>
            <DsVariantGrid columns={2}>
              {LOGO_SIZES.map((size) => (
                <DsVariantCell key={size} label={size}>
                  <BrandLockup size={size} showTagline />
                </DsVariantCell>
              ))}
            </DsVariantGrid>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="With location">
          <DsPreview>
            <DsVariantGrid columns={3}>
              {LOCKUP_LOCATIONS.map((location) => (
                <DsVariantCell key={location} label={location}>
                  <BrandLockup
                    size="lg"
                    location={location}
                    tagline="Skip the counter. Drive in minutes."
                    showTagline
                  />
                </DsVariantCell>
              ))}
            </DsVariantGrid>
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="price-display"
        title="PriceDisplay"
        description="Formatted currency for daily rates, trip totals, and promotional pricing. Tabular numerals keep price columns aligned in search results and checkout."
        importPath='import { PriceDisplay } from "@/components/go"'
      >
        <DsSubsection title="Sizes">
          <DsPreview>
            <div className="flex flex-wrap items-end gap-8">
              <DsVariantCell label="sm">
                <PriceDisplay amount={58} suffix="/day" size="sm" />
              </DsVariantCell>
              <DsVariantCell label="md">
                <PriceDisplay amount={72} suffix="/day" size="md" />
              </DsVariantCell>
              <DsVariantCell label="lg">
                <PriceDisplay amount={89} suffix="/day" size="lg" />
              </DsVariantCell>
              <DsVariantCell label="xl">
                <PriceDisplay amount={124} suffix="/day" size="xl" />
              </DsVariantCell>
            </div>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="Booking contexts">
          <DsPreview>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-caption text-go-muted">Daily rate</p>
                <PriceDisplay amount={67} suffix="/day" size="lg" />
                <p className="text-caption text-go-muted">Toyota Camry · 4 days</p>
              </div>
              <div className="space-y-1">
                <p className="text-caption text-go-muted">Trip total</p>
                <PriceDisplay amount={331.2} size="md" />
                <p className="text-caption text-go-muted">Includes taxes &amp; fees</p>
              </div>
              <div className="space-y-1">
                <p className="text-caption text-go-muted">Weekly special</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-body-sm text-go-muted line-through">$420</span>
                  <PriceDisplay amount={349} suffix="/week" size="md" />
                </div>
                <p className="text-caption text-go-muted">Save 17% on 7+ day rentals</p>
              </div>
            </div>
          </DsPreview>
        </DsSubsection>
      </DsSection>
    </>
  );
}
