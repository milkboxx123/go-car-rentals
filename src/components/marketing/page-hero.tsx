import Image from "next/image";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import type { BreadcrumbItem } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  variant?: "dark" | "cream" | "white";
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = "cream",
  backgroundImage,
  breadcrumbs,
  children,
  className,
}: PageHeroProps) {
  const hasImage = Boolean(backgroundImage);
  const isDark = variant === "dark" || hasImage;

  return (
    <section
      className={cn(
        "pt-28 pb-12 sm:pt-32 sm:pb-16",
        hasImage && "relative overflow-hidden bg-go-ink text-go-paper",
        !hasImage && isDark && "bg-go-ink text-go-paper",
        !hasImage && variant === "cream" && "bg-go-cream",
        !hasImage && variant === "white" && "bg-go-paper",
        className
      )}
    >
      {hasImage ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage!}
            alt=""
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-go-ink/90 via-go-ink/70 to-go-ink/40" />
        </div>
      ) : null}

      <div className={cn("container-marketing", hasImage && "relative")}>
        {breadcrumbs ? (
          <Breadcrumbs items={breadcrumbs} variant={hasImage ? "onDark" : "default"} />
        ) : null}
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <p
              className={cn(
                "mb-3 text-label uppercase tracking-wider",
                isDark ? "text-go-gold" : "text-go-muted"
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-display-md font-bold sm:text-display-lg">{title}</h1>
          {subtitle ? (
            <p
              className={cn(
                "mx-auto mt-4 max-w-2xl text-body-lg",
                isDark ? "text-go-paper/80" : "text-go-muted"
              )}
            >
              {subtitle}
            </p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {primaryCta ? (
                <Button asChild variant="gold" size="lg">
                  <Link href={primaryCta.href} variant="button">
                    {primaryCta.label}
                  </Link>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button
                  asChild
                  variant={isDark ? "outline" : "secondary"}
                  size="lg"
                  className={
                    isDark
                      ? "border-go-paper/30 text-go-paper hover:bg-go-paper/10"
                      : undefined
                  }
                >
                  <Link href={secondaryCta.href} variant="button">
                    {secondaryCta.label}
                  </Link>
                </Button>
              ) : null}
            </div>
          )}
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
