import { CalendarCheck, Car, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

const steps = [
  {
    icon: MapPin,
    title: "Choose your location",
    description:
      "Search by city or airport. Filter by pickup method — lot, airport curbside, or delivery to your door.",
  },
  {
    icon: Car,
    title: "Pick your exact vehicle",
    description:
      "See real photos, ratings, and specs. Book the specific car you want — not a mystery category.",
  },
  {
    icon: CalendarCheck,
    title: "Hit the road",
    description:
      "Skip the counter. Check in digitally, pick up on your schedule, and return with a simple drop-off.",
  },
];

export interface HowItWorksProps {
  title?: string;
  className?: string;
}

export function HowItWorks({
  title = "How Go rentals work",
  className,
}: HowItWorksProps) {
  return (
    <section className={cn("bg-go-muted-light py-12 sm:py-16", className)}>
      <div className="container-marketing">
        <h2 className="mb-10 text-center text-heading-lg font-bold text-go-ink">
          {title}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-go-gold text-go-ink">
                <step.icon className="size-6" aria-hidden="true" />
              </div>
              <span className="mb-2 block text-caption font-bold uppercase tracking-wide text-go-gold-dark">
                Step {index + 1}
              </span>
              <h3 className="text-heading-sm font-semibold text-go-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-body-md text-go-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
