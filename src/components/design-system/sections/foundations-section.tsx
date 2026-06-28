import {
  DsNote,
  DsPreview,
  DsSection,
  DsSubsection,
  TokenSwatch,
} from "@/components/design-system";
import { goColors, semanticColors } from "@/design-system/tokens/colors";
import { motion } from "@/design-system/tokens/motion";
import { radius } from "@/design-system/tokens/radius";
import { shadows } from "@/design-system/tokens/shadows";
import { spacing } from "@/design-system/tokens/spacing";
import { typography } from "@/design-system/tokens/typography";

import { MotionDemo } from "./demos/motion-demo";

const goColorSwatches: Array<{
  name: string;
  token: string;
  hex: string;
  border?: boolean;
}> = [
  { name: "Ink", token: "go-ink", hex: goColors.ink },
  { name: "Ink Soft", token: "go-ink-soft", hex: goColors.inkSoft },
  { name: "Gold", token: "go-gold", hex: goColors.gold },
  { name: "Gold Hover", token: "go-gold-hover", hex: goColors.goldHover },
  { name: "Gold Dark", token: "go-gold-dark", hex: goColors.goldDark },
  { name: "Cream", token: "go-cream", hex: goColors.cream },
  { name: "Paper", token: "go-paper", hex: goColors.paper, border: true },
  { name: "Border", token: "go-border", hex: goColors.border, border: true },
  { name: "Muted", token: "go-muted", hex: goColors.muted },
  { name: "Muted Light", token: "go-muted-light", hex: goColors.mutedLight, border: true },
  { name: "Success", token: "go-success", hex: goColors.success },
  { name: "Warning", token: "go-warning", hex: goColors.warning },
  { name: "Danger", token: "go-danger", hex: goColors.danger },
  { name: "Info", token: "go-info", hex: goColors.info },
];

const graySwatches = Object.entries(goColors.gray).map(([step, hex]) => ({
  name: `Gray ${step}`,
  token: `go-gray-${step}`,
  hex,
  border: Number(step) <= 200,
}));

const typographySamples = [
  { className: "text-display-xl", label: "Display XL", sample: "Drive your way" },
  { className: "text-display-lg", label: "Display LG", sample: "Rent the exact car" },
  { className: "text-display-md", label: "Display MD", sample: "Skip the counter" },
  { className: "text-heading-xl", label: "Heading XL", sample: "Tampa airport pickup" },
  { className: "text-heading-lg", label: "Heading LG", sample: "Popular vehicles" },
  { className: "text-heading-md", label: "Heading MD", sample: "Trip summary" },
  { className: "text-heading-sm", label: "Heading SM", sample: "Protection options" },
  { className: "text-body-lg", label: "Body LG", sample: "Skip the counter and pick up on your schedule." },
  { className: "text-body-md", label: "Body MD", sample: "Airport pickup and delivery available." },
  { className: "text-body-sm", label: "Body SM", sample: "4 days · Tampa, FL" },
  { className: "text-caption", label: "Caption", sample: "Confirmation GO-TPA-8F2K9M" },
  { className: "text-label", label: "Label", sample: "Pickup location" },
  { className: "text-button", label: "Button", sample: "Book now" },
] as const;

function ColorsSection() {
  return (
    <DsSection
      id="colors"
      title="Colors"
      description="Brand palette, neutral gray scale, and semantic color mappings for light and dark surfaces."
      importPath="@/design-system/tokens/colors"
    >
      <DsSubsection title="Brand colors">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {goColorSwatches.map((swatch) => (
            <TokenSwatch key={swatch.token} {...swatch} />
          ))}
        </div>
      </DsSubsection>

      <DsSubsection title="Gray scale">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {graySwatches.map((swatch) => (
            <TokenSwatch key={swatch.token} {...swatch} />
          ))}
        </div>
      </DsSubsection>

      <DsSubsection title="Semantic tokens">
        <div className="grid gap-4 sm:grid-cols-2">
          <DsPreview>
            <p className="mb-2 text-label text-go-ink">Light</p>
            <pre className="overflow-x-auto text-caption text-go-muted">
              {JSON.stringify(semanticColors.light, null, 2)}
            </pre>
          </DsPreview>
          <DsPreview surface="dark">
            <p className="mb-2 text-label text-go-paper">Dark</p>
            <pre className="overflow-x-auto text-caption text-go-paper/70">
              {JSON.stringify(semanticColors.dark, null, 2)}
            </pre>
          </DsPreview>
        </div>
      </DsSubsection>
    </DsSection>
  );
}

function TypographySection() {
  return (
    <DsSection
      id="typography"
      title="Typography"
      description="Type scale from display-xl through button, mapped to Tailwind utility classes."
      importPath="@/design-system/tokens/typography"
    >
      <DsPreview>
        <div className="space-y-4">
          {typographySamples.map((item) => (
            <div
              key={item.className}
              className="flex flex-col gap-1 border-b border-go-border pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span className="w-28 shrink-0 text-caption font-semibold uppercase tracking-wide text-go-muted">
                {item.label}
              </span>
              <p className={`${item.className} text-go-ink`}>{item.sample}</p>
            </div>
          ))}
        </div>
      </DsPreview>
      <details className="rounded-lg border border-go-border bg-go-muted-light p-4">
        <summary className="cursor-pointer text-label text-go-ink">Raw token values</summary>
        <pre className="mt-3 overflow-x-auto text-caption text-go-muted">
          {JSON.stringify(typography, null, 2)}
        </pre>
      </details>
    </DsSection>
  );
}

function SpacingSection() {
  return (
    <DsSection
      id="spacing"
      title="Spacing"
      description="Spacing scale used for layout rhythm, padding, and gaps."
      importPath="@/design-system/tokens/spacing"
    >
      <DsPreview>
        <div className="space-y-3">
          {Object.entries(spacing).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="w-8 shrink-0 font-mono text-caption text-go-muted">{key}</span>
              <div
                className="h-4 rounded-sm bg-go-gold"
                style={{ width: value }}
              />
              <span className="font-mono text-caption text-go-muted">{value}</span>
            </div>
          ))}
        </div>
      </DsPreview>
    </DsSection>
  );
}

function RadiusSection() {
  return (
    <DsSection
      id="radius"
      title="Radius"
      description="Corner radius tokens for cards, inputs, and pills."
      importPath="@/design-system/tokens/radius"
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Object.entries(radius).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center gap-2">
            <div
              className="size-20 border-2 border-go-gold bg-go-muted-light"
              style={{ borderRadius: value }}
            />
            <span className="text-caption font-medium text-go-ink">{key}</span>
            <span className="font-mono text-caption text-go-muted">{value}</span>
          </div>
        ))}
      </div>
    </DsSection>
  );
}

function ShadowsSection() {
  return (
    <DsSection
      id="shadows"
      title="Shadows"
      description="Elevation tokens for cards, popovers, and sticky surfaces."
      importPath="@/design-system/tokens/shadows"
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Object.entries(shadows).map(([key, value]) => (
          <div
            key={key}
            className="flex h-24 flex-col items-center justify-center rounded-lg bg-go-paper p-4"
            style={{ boxShadow: value }}
          >
            <span className="text-label text-go-ink">{key}</span>
          </div>
        ))}
      </div>
    </DsSection>
  );
}

function MotionSection() {
  return (
    <DsSection
      id="motion"
      title="Motion"
      description="Duration and easing tokens for transitions and animations."
      importPath="@/design-system/tokens/motion"
    >
      <DsPreview>
        <MotionDemo />
      </DsPreview>
      <DsNote>Respects prefers-reduced-motion in production components.</DsNote>
      <details className="rounded-lg border border-go-border bg-go-muted-light p-4">
        <summary className="cursor-pointer text-label text-go-ink">Raw token values</summary>
        <pre className="mt-3 overflow-x-auto text-caption text-go-muted">
          {JSON.stringify(motion, null, 2)}
        </pre>
      </details>
    </DsSection>
  );
}

export function FoundationsSections() {
  return (
    <>
      <ColorsSection />
      <TypographySection />
      <SpacingSection />
      <RadiusSection />
      <ShadowsSection />
      <MotionSection />
    </>
  );
}
