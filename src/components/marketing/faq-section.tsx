import { FaqAccordion, type FaqItem } from "./faq-accordion";
import { MarketingSection } from "./marketing-section";

export type { FaqItem };

export interface FAQSectionProps {
  title?: string;
  items: FaqItem[];
  className?: string;
  background?: "cream" | "white" | "muted" | "dark" | "gold";
}

export function FAQSection({
  title = "Frequently asked questions",
  items,
  className,
  background = "muted",
}: FAQSectionProps) {
  return (
    <MarketingSection background={background} className={className}>
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center text-heading-lg font-bold">{title}</h2>
        <FaqAccordion items={items} />
      </div>
    </MarketingSection>
  );
}
