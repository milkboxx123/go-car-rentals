import {
  DsPreview,
  DsSection,
  DsSubsection,
  DsVariantCell,
  DsVariantGrid,
} from "@/components/design-system";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

const alertVariants = ["info", "success", "warning", "danger", "neutral"] as const;

export function UiFeedbackSections() {
  return (
    <>
      <DsSection
        id="alert"
        title="Alert"
        description="Inline messages for trip status, payments, and policy notices."
        importPath="@/components/ui/alert"
      >
        <DsPreview>
          <div className="grid gap-4 sm:grid-cols-2">
            {alertVariants.map((variant) => (
              <Alert
                key={variant}
                variant={variant}
                title={
                  variant === "info"
                    ? "Airport pickup available"
                    : variant === "success"
                      ? "Reservation confirmed"
                      : variant === "warning"
                        ? "Limited availability"
                        : variant === "danger"
                          ? "Payment failed"
                          : "Cancellation policy"
                }
              >
                {variant === "info" && "Curbside pickup at TPA Terminal B, Level 1."}
                {variant === "success" && "Confirmation GO-TPA-8F2K9M sent to your email."}
                {variant === "warning" && "Only 2 SUVs left for your dates in Tampa."}
                {variant === "danger" && "Update your card to keep this reservation."}
                {variant === "neutral" && "Free cancellation up to 24 hours before pickup."}
              </Alert>
            ))}
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="progress"
        title="Progress"
        description="Loading and checkout step indicators."
        importPath="@/components/ui/progress"
      >
        <DsPreview>
          <DsVariantGrid columns={2}>
            <DsVariantCell label="Determinate (65%)">
              <Progress value={65} className="w-full max-w-xs" />
            </DsVariantCell>
            <DsVariantCell label="Indeterminate">
              <Progress indeterminate className="w-full max-w-xs" />
            </DsVariantCell>
            <DsVariantCell label="Small">
              <Progress value={40} size="sm" className="w-full max-w-xs" />
            </DsVariantCell>
            <DsVariantCell label="Large">
              <Progress value={80} size="lg" className="w-full max-w-xs" />
            </DsVariantCell>
          </DsVariantGrid>
        </DsPreview>
      </DsSection>

      <DsSection
        id="skeleton"
        title="Skeleton"
        description="Placeholder loading states for vehicle cards and trip details."
        importPath="@/components/ui/skeleton"
      >
        <DsPreview>
          <div className="flex max-w-sm gap-4">
            <Skeleton className="size-20 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </DsPreview>
        <DsSubsection title="Vehicle card placeholder">
          <DsPreview>
            <div className="max-w-xs space-y-3">
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="accordion"
        title="Accordion"
        description="Expandable FAQ and policy sections."
        importPath="@/components/ui/accordion"
      >
        <DsPreview>
          <Accordion type="single" collapsible className="w-full max-w-lg">
            <AccordionItem value="insurance">
              <AccordionTrigger>What insurance is included?</AccordionTrigger>
              <AccordionContent>
                Every trip includes liability coverage. You can add supplemental
                protection at checkout for lower deductibles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="fuel">
              <AccordionTrigger>What is the fuel policy?</AccordionTrigger>
              <AccordionContent>
                Return the vehicle with the same fuel level as pickup. Prepaid
                fuel options are available at select locations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="late">
              <AccordionTrigger>What if I return the car late?</AccordionTrigger>
              <AccordionContent>
                Grace period is 29 minutes. After that, an additional day may be
                charged at the daily rate.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DsPreview>
      </DsSection>
    </>
  );
}
