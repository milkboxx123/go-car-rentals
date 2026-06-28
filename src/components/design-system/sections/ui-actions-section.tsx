import {
  DsNote,
  DsPreview,
  DsSection,
  DsSubsection,
  DsVariantCell,
  DsVariantGrid,
} from "@/components/design-system";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import { ArrowRight, Heart, Search, Share2, X } from "lucide-react";

const buttonVariants = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
  "dark",
  "gold",
  "white",
] as const;

const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const;

const iconButtonVariants = ["ghost", "outline", "solid", "dark", "favorite", "close"] as const;

const linkVariants = ["text", "underline", "nav", "footer", "subtle", "card", "button"] as const;

export function UiActionsSections() {
  return (
    <>
      <DsSection
        id="button"
        title="Button"
        description="Primary actions for booking flows, marketing CTAs, and admin tasks."
        importPath="@/components/ui/button"
      >
        <DsSubsection title="Variants">
          <DsPreview>
            <div className="flex flex-wrap gap-3">
              {buttonVariants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </div>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="Sizes">
          <DsPreview>
            <div className="flex flex-wrap items-center gap-3">
              {buttonSizes.map((size) => (
                <Button key={size} size={size}>
                  {size}
                </Button>
              ))}
            </div>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="States">
          <DsPreview>
            <DsVariantGrid columns={3}>
              <DsVariantCell label="Default">
                <Button>Book vehicle</Button>
              </DsVariantCell>
              <DsVariantCell label="Loading">
                <Button loading>Processing</Button>
              </DsVariantCell>
              <DsVariantCell label="Disabled">
                <Button disabled>Unavailable</Button>
              </DsVariantCell>
            </DsVariantGrid>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="With icons">
          <DsPreview>
            <div className="flex flex-wrap gap-3">
              <Button leftIcon={<Search aria-hidden="true" />}>Search cars</Button>
              <Button rightIcon={<ArrowRight aria-hidden="true" />}>Continue</Button>
              <Button
                leftIcon={<Search aria-hidden="true" />}
                rightIcon={<ArrowRight aria-hidden="true" />}
              >
                Search Tampa
              </Button>
            </div>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="Full width">
          <DsPreview>
            <div className="w-80">
              <Button fullWidth variant="primary">
                Search available cars
              </Button>
            </div>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="On dark background">
          <DsPreview surface="dark">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Book now</Button>
              <Button variant="white">Learn more</Button>
              <Button
                variant="ghost"
                className="text-go-paper hover:bg-go-ink-soft hover:text-go-paper"
              >
                Browse fleet
              </Button>
            </div>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="Button + Link (asChild)">
          <DsNote>
            Use <code className="font-mono text-caption">Link variant=&quot;button&quot;</code> inside{" "}
            <code className="font-mono text-caption">Button asChild</code> so link styles do not
            override button text colors. Marketing headers use <code className="font-mono text-caption">primary</code>{" "}
            for the &quot;Book a car&quot; CTA.
          </DsNote>
          <DsPreview surface="dark">
            <Button asChild variant="primary" size="sm">
              <Link href="#" variant="button">
                <Search className="size-4" aria-hidden="true" />
                Book a car
              </Link>
            </Button>
          </DsPreview>
          <DsPreview>
            <Button asChild variant="primary" size="sm">
              <Link href="#" variant="button">
                <Search className="size-4" aria-hidden="true" />
                Book a car
              </Link>
            </Button>
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="icon-button"
        title="IconButton"
        description="Icon-only controls for favorites, search, share, and dismiss actions."
        importPath="@/components/ui/icon-button"
      >
        <DsPreview>
          <DsVariantGrid columns={3}>
            {iconButtonVariants.map((variant) => (
              <DsVariantCell key={variant} label={variant}>
                <IconButton variant={variant} aria-label={variant}>
                  {variant === "favorite" ? (
                    <Heart className="size-5" />
                  ) : variant === "close" ? (
                    <X className="size-5" />
                  ) : (
                    <Search className="size-5" />
                  )}
                </IconButton>
              </DsVariantCell>
            ))}
          </DsVariantGrid>
        </DsPreview>
        <DsPreview surface="dark">
          <div className="flex gap-3">
            <IconButton variant="favorite" active aria-label="Saved to favorites">
              <Heart className="size-5 fill-current" />
            </IconButton>
            <IconButton variant="ghost" className="text-go-paper hover:bg-go-ink-soft" aria-label="Share vehicle">
              <Share2 className="size-5" />
            </IconButton>
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="link"
        title="Link"
        description="Text links for navigation, footers, and card overlays."
        importPath="@/components/ui/link"
      >
        <DsPreview>
          <div className="flex flex-col gap-4">
            {linkVariants
              .filter((v) => v !== "button")
              .map((variant) => (
                <Link key={variant} href="#" variant={variant}>
                  {variant} — View Tampa rentals
                </Link>
              ))}
            <div>
              <p className="mb-2 text-caption text-go-muted">button (inside Button asChild)</p>
              <Button asChild size="sm">
                <Link href="#" variant="button">
                  Book a car
                </Link>
              </Button>
            </div>
          </div>
        </DsPreview>
      </DsSection>
    </>
  );
}
