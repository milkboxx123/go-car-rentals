"use client";

import {
  AdminHeader,
  AppHeader,
  Footer,
  MarketingHeader,
  MobileBottomNav,
  Sidebar,
} from "@/components/layout";
import { DsNote, DsPreview, DsSection, DsSubsection } from "@/components/design-system";
import { locations } from "@/mock";

export function LayoutSections() {
  const tampa = locations.find((loc) => loc.slug === "tampa");

  return (
    <>
      <DsSection
        id="marketing-header"
        title="MarketingHeader"
        description="Fixed marketing site header with location lockup, nav links, and mobile sheet menu."
        importPath='import { MarketingHeader } from "@/components/layout"'
      >
        <DsNote>
          The &quot;Book a car&quot; CTA uses <code className="font-mono text-caption">Button variant=&quot;primary&quot;</code>{" "}
          with <code className="font-mono text-caption">Link variant=&quot;button&quot;</code> so text stays
          readable on both dark heroes and solid white scroll states.
        </DsNote>
        <DsSubsection title="Light — solid (scrolled)">
          <DsPreview fullBleed surface="cream" className="relative h-[4.5rem] overflow-hidden">
            <MarketingHeader
              location={tampa}
              transparent={false}
              className="relative inset-auto"
            />
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="Dark — over hero">
          <DsPreview fullBleed surface="dark" className="relative h-[4.5rem] overflow-hidden">
            <MarketingHeader
              location={tampa}
              variant="dark"
              transparent={false}
              className="relative inset-auto"
            />
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="app-header"
        title="AppHeader"
        description="Booking flow header with favorites and account menu."
        importPath='import { AppHeader } from "@/components/layout"'
      >
        <DsPreview fullBleed className="overflow-hidden">
          <AppHeader
            userName="Jordan Lee"
            userInitials="JL"
            favoritesCount={4}
          />
        </DsPreview>
      </DsSection>

      <DsSection
        id="admin-header"
        title="AdminHeader"
        description="Admin shell header with breadcrumb trail, search, notifications, and account menu."
        importPath='import { AdminHeader } from "@/components/layout"'
      >
        <DsPreview fullBleed surface="admin" className="overflow-hidden">
          <AdminHeader
            breadcrumbs={[
              { label: "Fleet", href: "/admin/fleet" },
              { label: "Vehicles" },
            ]}
            userName="Alex Rivera"
            userInitials="AR"
            notificationCount={3}
          />
        </DsPreview>
      </DsSection>

      <DsSection
        id="footer"
        title="Footer"
        description="Marketing site footer with locations, vehicle types, newsletter signup, and legal links."
        importPath='import { Footer } from "@/components/layout"'
      >
        <DsPreview fullBleed surface="dark" className="overflow-hidden">
          <Footer />
        </DsPreview>
      </DsSection>

      <DsSection
        id="sidebar"
        title="Sidebar"
        description="Admin navigation sidebar with active route highlighting and optional collapsed mode."
        importPath='import { Sidebar } from "@/components/layout"'
      >
        <DsPreview surface="admin" className="h-[28rem] overflow-hidden p-0">
          <Sidebar className="h-full" />
        </DsPreview>
      </DsSection>

      <DsSection
        id="mobile-bottom-nav"
        title="MobileBottomNav"
        description="Fixed bottom tab bar for mobile booking and account flows."
        importPath='import { MobileBottomNav } from "@/components/layout"'
      >
        <DsPreview fullBleed className="relative mx-auto max-w-sm overflow-hidden">
          <div className="relative h-16 bg-go-cream">
            <MobileBottomNav className="relative inset-auto" />
          </div>
        </DsPreview>
      </DsSection>
    </>
  );
}
