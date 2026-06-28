import {
  AdminSections,
  BookingSection,
  FoundationsSections,
  GoBrandSection,
  GoFormsSection,
  GoStatusSection,
  LayoutSections,
  MarketingSection,
  OverviewSection,
  UiActionsSections,
  UiDisplaySections,
  UiFeedbackSections,
  UiFormsSections,
  UiNavigationSections,
  UiOverlaysSections,
} from "@/components/design-system/sections";

export default function DesignSystemPage() {
  return (
    <div className="space-y-0">
      <OverviewSection />
      <FoundationsSections />
      <UiActionsSections />
      <UiDisplaySections />
      <UiFormsSections />
      <UiFeedbackSections />
      <UiOverlaysSections />
      <UiNavigationSections />
      <GoBrandSection />
      <GoStatusSection />
      <GoFormsSection />
      <MarketingSection />
      <BookingSection />
      <AdminSections />
      <LayoutSections />
    </div>
  );
}
