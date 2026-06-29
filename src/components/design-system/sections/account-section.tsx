"use client";

import { Car, CreditCard } from "lucide-react";

import {
  AccountEmptyState,
  AccountPageHeader,
  AccountSectionCard,
  AccountSidebar,
  InlineNotice,
  ProfileSummaryCard,
  StatusBadge,
  TripsEmptyState,
} from "@/components/account";
import { DsPreview, DsSection } from "@/components/design-system";

export function AccountSections() {
  return (
    <>
      <DsSection
        id="account-page-header"
        title="AccountPageHeader"
        description="Consistent page title block for account pages."
        importPath='import { AccountPageHeader } from "@/components/account"'
      >
        <DsPreview>
          <AccountPageHeader
            title="Profile"
            description="Manage your personal information, contact details, and rental preferences."
          />
        </DsPreview>
      </DsSection>

      <DsSection
        id="account-section-card"
        title="AccountSectionCard"
        description="White card wrapper for grouped account content."
        importPath='import { AccountSectionCard } from "@/components/account"'
      >
        <DsPreview>
          <AccountSectionCard
            title="Personal information"
            description="Keep your contact information up to date."
          >
            <p className="text-body-sm text-go-muted">Form fields go here.</p>
          </AccountSectionCard>
        </DsPreview>
      </DsSection>

      <DsSection
        id="account-empty-state"
        title="AccountEmptyState"
        description="Empty state pattern for account pages."
        importPath='import { AccountEmptyState } from "@/components/account"'
      >
        <DsPreview>
          <AccountSectionCard contentClassName="p-0">
            <AccountEmptyState
              icon={<CreditCard className="size-6" aria-hidden="true" />}
              title="No saved payment methods"
              description="Add a card to make future bookings faster."
              primaryAction={{ label: "Add card", href: "/account/payment" }}
            />
          </AccountSectionCard>
        </DsPreview>
      </DsSection>

      <DsSection
        id="account-sidebar"
        title="AccountSidebar"
        description="Desktop account navigation sidebar."
        importPath='import { AccountSidebar } from "@/components/account"'
      >
        <DsPreview className="max-w-xs">
          <AccountSidebar />
        </DsPreview>
      </DsSection>

      <DsSection
        id="profile-summary-card"
        title="ProfileSummaryCard"
        description="Profile summary with avatar and verification badges."
        importPath='import { ProfileSummaryCard } from "@/components/account"'
      >
        <DsPreview>
          <ProfileSummaryCard
            firstName="Alex"
            lastName="Rivera"
            email="alex@example.com"
            emailVerified
            initials="AR"
          />
        </DsPreview>
      </DsSection>

      <DsSection
        id="trips-empty-state"
        title="TripsEmptyState"
        description="Rich empty state for the trips page."
        importPath='import { TripsEmptyState } from "@/components/account"'
      >
        <DsPreview>
          <TripsEmptyState />
        </DsPreview>
      </DsSection>

      <DsSection
        id="inline-notice"
        title="InlineNotice"
        description="Persistent inline alerts for account setup issues."
        importPath='import { InlineNotice } from "@/components/account"'
      >
        <DsPreview className="space-y-4">
          <InlineNotice variant="warning" title="Payment setup is not available">
            Saved cards could not be loaded. Try again or contact support.
          </InlineNotice>
        </DsPreview>
      </DsSection>

      <DsSection
        id="status-badge"
        title="StatusBadge"
        description="Account-specific status labels."
        importPath='import { StatusBadge } from "@/components/account"'
      >
        <DsPreview className="flex flex-wrap gap-2">
          <StatusBadge status="verified" />
          <StatusBadge status="upcoming" />
          <StatusBadge status="active" />
          <StatusBadge status="needs-action" />
        </DsPreview>
      </DsSection>

      <DsSection
        id="trip-card"
        title="TripCard"
        description="Reservation card for account trips."
        importPath='import { TripCard } from "@/components/account"'
      >
        <DsPreview>
          <AccountSectionCard contentClassName="p-6">
            <div className="flex items-center gap-3 text-go-muted">
              <Car className="size-5" aria-hidden="true" />
              <p className="text-body-sm">
                TripCard renders with live reservation data on the trips page.
              </p>
            </div>
          </AccountSectionCard>
        </DsPreview>
      </DsSection>
    </>
  );
}
