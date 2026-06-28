"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const defaultFaqs = [
  {
    question: "How does airport pickup work?",
    answer:
      "After booking, you'll receive curbside pickup instructions for your airport. Your vehicle will be ready at the designated zone — no shuttle or counter required.",
  },
  {
    question: "Can I get the car delivered to my hotel?",
    answer:
      "Yes. Many vehicles offer delivery to hotels, vacation rentals, or custom addresses. Delivery fees and availability are shown before you confirm your booking.",
  },
  {
    question: "What's included in the price?",
    answer:
      "Your daily rate includes the vehicle, standard mileage allowance, and basic insurance. Taxes, delivery fees, and optional protection plans are itemized at checkout.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancel free up to 24 hours before pickup for a full refund. Cancellations within 24 hours may incur a fee depending on the vehicle and rental length.",
  },
  {
    question: "Do I need to return with a full tank?",
    answer:
      "Vehicles are provided with a full tank or charge level. Return with the same level to avoid refueling fees. Electric vehicles should be returned with similar charge.",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  title?: string;
  items?: FaqItem[];
  className?: string;
}

export function FaqAccordion({
  title = "Frequently asked questions",
  items = defaultFaqs,
  className,
}: FaqAccordionProps) {
  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="container-marketing">
        <h2 className="mb-8 text-heading-lg font-bold text-go-ink">{title}</h2>
        <Accordion type="single" collapsible className="max-w-3xl">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
