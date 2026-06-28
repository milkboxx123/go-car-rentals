import { Headphones, ShieldCheck, Star, Wallet } from "lucide-react";

import { reviewSummary } from "@/mock";
import { cn } from "@/lib/utils";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Verified fleet",
    description: "Every vehicle is inspected, cleaned, and photo-documented before each trip.",
  },
  {
    icon: Wallet,
    title: "Transparent pricing",
    description: "See your total upfront — no counter upsells or surprise fees at pickup.",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    description: "Text or call our team anytime during your rental for roadside help or changes.",
  },
  {
    icon: Star,
    title: `${reviewSummary.averageRating} average rating`,
    description: `Trusted by travelers across ${reviewSummary.totalReviews}+ verified reviews.`,
  },
];

export interface TrustSectionProps {
  title?: string;
  className?: string;
}

export function TrustSection({
  title = "Why travelers choose Go",
  className,
}: TrustSectionProps) {
  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="container-marketing">
        <h2 className="mb-10 text-center text-heading-lg font-bold text-go-ink">
          {title}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-go-border bg-go-paper p-6 shadow-card"
            >
              <item.icon
                className="mb-4 size-8 text-go-gold-dark"
                aria-hidden="true"
              />
              <h3 className="text-heading-sm font-semibold text-go-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-body-sm text-go-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
