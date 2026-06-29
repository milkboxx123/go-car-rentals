import * as React from "react";
import {
  Instagram,
  Smartphone,
} from "lucide-react";

import { Logo } from "@/components/go/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import {
  footerBrand,
  footerCompanyLinks,
  footerLegalLinks,
  footerPopularRentalLinks,
} from "@/content/footer-links";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  { href: siteConfig.social.instagram, label: "Instagram", icon: Instagram },
] as const;

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-label text-go-paper">{title}</h3>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLinkItem({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        variant="footer"
        external={external}
        className="text-go-paper/70 hover:text-go-paper"
      >
        {label}
      </Link>
    </li>
  );
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  showNewsletter?: boolean;
}

export function Footer({
  showNewsletter = true,
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn("bg-go-ink text-go-paper", className)}
      {...props}
    >
      <div className="container-marketing py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Go home">
              <Logo variant="light" size="lg" />
            </Link>
            <p className="mt-4 max-w-sm text-body-sm text-go-paper/70">
              {footerBrand.tagline}
            </p>
            <Button asChild variant="gold" size="sm" className="mt-6">
              <Link href={footerBrand.cta.href} variant="button">
                {footerBrand.cta.label}
              </Link>
            </Button>

            {showNewsletter ? (
              <div className="mt-8">
                <h3 className="mb-3 text-label text-go-paper">
                  Get rental tips &amp; deals
                </h3>
                <form
                  className="flex flex-col gap-2 sm:flex-row"
                  aria-label="Newsletter signup"
                  action="#"
                >
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="border-go-ink-soft bg-go-ink-soft text-go-paper placeholder:text-go-paper/50"
                    inputSize="md"
                  />
                  <Button type="submit" variant="gold" className="shrink-0">
                    Subscribe
                  </Button>
                </form>
              </div>
            ) : null}

            <div className="mt-8 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    external
                    className="flex size-10 items-center justify-center rounded-full bg-go-ink-soft text-go-paper/70 transition-colors hover:bg-go-gold hover:text-go-ink"
                    aria-label={social.label}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            <FooterColumn title="Popular rentals">
              {footerPopularRentalLinks.map((link) => (
                <FooterLinkItem key={link.href} {...link} />
              ))}
            </FooterColumn>

            <FooterColumn title="Company">
              {footerCompanyLinks.map((link) => (
                <FooterLinkItem key={link.href} {...link} />
              ))}
            </FooterColumn>

            <FooterColumn title="Legal">
              {footerLegalLinks.map((link) => (
                <FooterLinkItem key={`${link.href}-${link.label}`} {...link} />
              ))}
            </FooterColumn>
          </div>
        </div>

        <Separator className="my-10 bg-go-ink-soft" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-body-sm text-go-paper/70">
              <Smartphone className="size-4 shrink-0" aria-hidden="true" />
              <span>Go app coming soon</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-go-ink-soft bg-go-ink-soft text-go-paper hover:bg-go-paper hover:text-go-ink"
                disabled
              >
                App Store
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-go-ink-soft bg-go-ink-soft text-go-paper hover:bg-go-paper hover:text-go-ink"
                disabled
              >
                Google Play
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-caption text-go-paper/50">
          &copy; {new Date().getFullYear()} Go Car Rentals. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export { Footer as MarketingFooter };
