import {
  COMPONENT_COUNT,
  DsNote,
  DsSection,
} from "@/components/design-system";
import { BrandLockup } from "@/components/go";

const foundationLinks = [
  { id: "colors", label: "Colors", description: "Brand palette, gray scale, and semantic tokens" },
  { id: "typography", label: "Typography", description: "Display through button type scale" },
  { id: "spacing", label: "Spacing", description: "Spacing ruler and token values" },
  { id: "radius", label: "Radius", description: "Corner radius scale" },
  { id: "shadows", label: "Shadows", description: "Elevation and surface shadows" },
  { id: "motion", label: "Motion", description: "Duration, easing, and transitions" },
] as const;

export function OverviewSection() {
  return (
    <DsSection
      id="overview"
      title="Introduction"
      description="Living reference for Go brand tokens, primitives, and shared UI components used across marketing, booking, and admin surfaces."
    >
      <div className="flex flex-wrap items-center gap-6">
        <BrandLockup size="lg" />
      </div>

      <DsNote>
        This page is the canonical component reference for the Go project. It documents{" "}
        {COMPONENT_COUNT} components and foundations. Check here before building new UI — use the
        sidebar to jump to a section, or explore foundations below.
      </DsNote>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {foundationLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="group rounded-lg border border-go-border bg-go-paper p-4 transition-colors hover:border-go-gold/50 hover:bg-go-muted-light"
          >
            <p className="text-label text-go-ink group-hover:text-go-gold-dark">
              {link.label}
            </p>
            <p className="mt-1 text-body-sm text-go-muted">{link.description}</p>
          </a>
        ))}
      </div>
    </DsSection>
  );
}
