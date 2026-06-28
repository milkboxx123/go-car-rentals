import {
  DsPreview,
  DsSection,
  DsSubsection,
  DsVariantGrid,
} from "@/components/design-system";
import {
  RESERVATION_STATUS_CONFIG,
  StatusPill,
  VEHICLE_STATUS_CONFIG,
} from "@/components/go/forms";
import type {
  PaymentStatus,
  ReservationStatus,
  VehicleStatus,
} from "@/types";

const VEHICLE_STATUSES = Object.keys(VEHICLE_STATUS_CONFIG) as VehicleStatus[];
const RESERVATION_STATUSES = Object.keys(
  RESERVATION_STATUS_CONFIG
) as ReservationStatus[];
const PAYMENT_STATUSES: PaymentStatus[] = [
  "pending",
  "paid",
  "refunded",
  "failed",
];

export function GoStatusSection() {
  return (
    <DsSection
      id="status-pill"
      title="StatusPill"
      description="Semantic status badges for fleet inventory, reservations, and payments. Maps domain statuses to badge variants with optional status dots for scanability in tables and cards."
      importPath='import { StatusPill } from "@/components/go/forms"'
    >
      <DsSubsection title="Vehicle statuses">
        <DsPreview surface="admin">
          <DsVariantGrid columns={4}>
            {VEHICLE_STATUSES.map((status) => (
              <StatusPill key={status} status={status} />
            ))}
          </DsVariantGrid>
        </DsPreview>
      </DsSubsection>

      <DsSubsection title="Reservation statuses">
        <DsPreview surface="admin">
          <DsVariantGrid columns={4}>
            {RESERVATION_STATUSES.map((status) => (
              <StatusPill key={status} status={status} />
            ))}
          </DsVariantGrid>
        </DsPreview>
      </DsSubsection>

      <DsSubsection title="Payment statuses">
        <DsPreview surface="admin">
          <DsVariantGrid columns={4}>
            {PAYMENT_STATUSES.map((status) => (
              <StatusPill key={status} status={status} />
            ))}
          </DsVariantGrid>
        </DsPreview>
      </DsSubsection>

      <DsSubsection title="Sizes">
        <DsPreview>
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill status="confirmed" size="sm" />
            <StatusPill status="confirmed" size="md" />
            <StatusPill status="available" size="sm" />
            <StatusPill status="paid" size="md" />
          </div>
        </DsPreview>
      </DsSubsection>

      <DsSubsection title="In context">
        <DsPreview>
          <div className="space-y-3 text-body-sm">
            <div className="flex items-center justify-between rounded-md border border-go-border bg-go-paper px-4 py-3">
              <div>
                <p className="font-semibold text-go-ink">2024 Honda CR-V</p>
                <p className="text-caption text-go-muted">VIN · 5J6RW2H89NL012345</p>
              </div>
              <StatusPill status="available" />
            </div>
            <div className="flex items-center justify-between rounded-md border border-go-border bg-go-paper px-4 py-3">
              <div>
                <p className="font-semibold text-go-ink">GO-TPA-8F2K9M</p>
                <p className="text-caption text-go-muted">Tampa · Jul 12–16 · Tesla Model 3</p>
              </div>
              <StatusPill status="active" />
            </div>
            <div className="flex items-center justify-between rounded-md border border-go-border bg-go-paper px-4 py-3">
              <div>
                <p className="font-semibold text-go-ink">Trip total · $412.80</p>
                <p className="text-caption text-go-muted">Visa ending in 4242</p>
              </div>
              <StatusPill status="paid" />
            </div>
          </div>
        </DsPreview>
      </DsSubsection>
    </DsSection>
  );
}
