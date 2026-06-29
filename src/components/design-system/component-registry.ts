export type RegistryItem = {
  id: string;
  label: string;
};

export type RegistryGroup = {
  id: string;
  label: string;
  items: RegistryItem[];
};

export const DESIGN_SYSTEM_REGISTRY: RegistryGroup[] = [
  {
    id: "overview",
    label: "Overview",
    items: [{ id: "overview", label: "Introduction" }],
  },
  {
    id: "foundations",
    label: "Foundations",
    items: [
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "spacing", label: "Spacing" },
      { id: "radius", label: "Radius" },
      { id: "shadows", label: "Shadows" },
      { id: "motion", label: "Motion" },
    ],
  },
  {
    id: "ui-actions",
    label: "UI · Actions",
    items: [
      { id: "button", label: "Button" },
      { id: "icon-button", label: "IconButton" },
      { id: "link", label: "Link" },
    ],
  },
  {
    id: "ui-display",
    label: "UI · Display",
    items: [
      { id: "badge", label: "Badge" },
      { id: "avatar", label: "Avatar" },
      { id: "separator", label: "Separator" },
    ],
  },
  {
    id: "ui-forms",
    label: "UI · Forms",
    items: [
      { id: "input", label: "Input" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio-group", label: "RadioGroup" },
      { id: "switch", label: "Switch" },
      { id: "slider", label: "Slider" },
      { id: "textarea", label: "Textarea" },
      { id: "select", label: "Select" },
    ],
  },
  {
    id: "ui-feedback",
    label: "UI · Feedback",
    items: [
      { id: "alert", label: "Alert" },
      { id: "progress", label: "Progress" },
      { id: "skeleton", label: "Skeleton" },
      { id: "accordion", label: "Accordion" },
    ],
  },
  {
    id: "ui-overlays",
    label: "UI · Overlays",
    items: [
      { id: "dialog", label: "Dialog" },
      { id: "sheet", label: "Sheet" },
      { id: "popover", label: "Popover" },
      { id: "dropdown-menu", label: "DropdownMenu" },
      { id: "tooltip", label: "Tooltip" },
      { id: "toast", label: "Toast" },
    ],
  },
  {
    id: "ui-navigation",
    label: "UI · Navigation",
    items: [
      { id: "tabs", label: "Tabs" },
      { id: "breadcrumbs", label: "Breadcrumbs" },
    ],
  },
  {
    id: "go-brand",
    label: "Go · Brand",
    items: [
      { id: "logo", label: "Logo" },
      { id: "brand-lockup", label: "BrandLockup" },
      { id: "price-display", label: "PriceDisplay" },
      { id: "status-pill", label: "StatusPill" },
    ],
  },
  {
    id: "go-forms",
    label: "Go · Forms",
    items: [
      { id: "text-input", label: "TextInput" },
      { id: "search-input", label: "SearchInput" },
      { id: "multi-select", label: "MultiSelect" },
      { id: "select-field", label: "SelectField" },
      { id: "date-field", label: "DateField" },
      { id: "date-picker", label: "DatePicker" },
      { id: "time-picker", label: "TimePicker" },
      { id: "location-field", label: "LocationField" },
      { id: "promo-code-field", label: "PromoCodeField" },
      { id: "toggle", label: "Toggle" },
      { id: "stepper", label: "Stepper" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    items: [
      { id: "hero-search-section", label: "HeroSearchSection" },
      { id: "search-panel", label: "SearchPanel" },
      { id: "location-landing-hero", label: "LocationLandingHero" },
      { id: "vehicle-carousel-section", label: "VehicleCarouselSection" },
      { id: "vehicle-type-grid", label: "VehicleTypeGrid" },
      { id: "how-it-works", label: "HowItWorks" },
      { id: "trust-section", label: "TrustSection" },
      { id: "airport-rental-section", label: "AirportRentalSection" },
      { id: "monthly-rental-section", label: "MonthlyRentalSection" },
      { id: "cta-section", label: "CtaSection" },
      { id: "faq-accordion", label: "FaqAccordion" },
      { id: "faq-section", label: "FAQSection" },
      { id: "review-section", label: "ReviewSection" },
      { id: "seo-internal-links", label: "SeoInternalLinks" },
      { id: "page-hero", label: "PageHero" },
      { id: "marketing-section", label: "MarketingSection" },
      { id: "feature-card", label: "FeatureCard" },
      { id: "step-card", label: "StepCard" },
      { id: "location-card", label: "LocationCard" },
      { id: "location-grid", label: "LocationGrid" },
      { id: "internal-links-section", label: "InternalLinksSection" },
      { id: "comparison-table", label: "ComparisonTable" },
    ],
  },
  {
    id: "booking",
    label: "Booking",
    items: [
      { id: "vehicle-card", label: "VehicleCard" },
      { id: "vehicle-image-gallery", label: "VehicleImageGallery" },
      { id: "vehicle-detail-header", label: "VehicleDetailHeader" },
      { id: "vehicle-specs-grid", label: "VehicleSpecsGrid" },
      { id: "booking-card", label: "BookingCard" },
      { id: "price-breakdown", label: "PriceBreakdown" },
      { id: "pickup-method-selector", label: "PickupMethodSelector" },
      { id: "protection-plan-card", label: "ProtectionPlanCard" },
      { id: "extras-selector", label: "ExtrasSelector" },
      { id: "checkout-steps", label: "CheckoutSteps" },
      { id: "reservation-status-badge", label: "ReservationStatusBadge" },
      { id: "trip-summary-card", label: "TripSummaryCard" },
      { id: "empty-states", label: "EmptyStates" },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    items: [
      { id: "metric-card", label: "MetricCard" },
      { id: "data-table", label: "DataTable" },
      { id: "fleet-table", label: "FleetTable" },
      { id: "reservation-table", label: "ReservationTable" },
      { id: "calendar-view", label: "CalendarView" },
      { id: "admin-vehicle-form", label: "AdminVehicleForm" },
    ],
  },
  {
    id: "account",
    label: "Account",
    items: [
      { id: "account-page-header", label: "AccountPageHeader" },
      { id: "account-section-card", label: "AccountSectionCard" },
      { id: "account-empty-state", label: "AccountEmptyState" },
      { id: "account-sidebar", label: "AccountSidebar" },
      { id: "profile-summary-card", label: "ProfileSummaryCard" },
      { id: "trips-empty-state", label: "TripsEmptyState" },
      { id: "inline-notice", label: "InlineNotice" },
      { id: "status-badge", label: "StatusBadge" },
      { id: "trip-card", label: "TripCard" },
    ],
  },
  {
    id: "layout",
    label: "Layout",
    items: [
      { id: "marketing-header", label: "MarketingHeader" },
      { id: "app-header", label: "AppHeader" },
      { id: "admin-header", label: "AdminHeader" },
      { id: "footer", label: "Footer" },
      { id: "sidebar", label: "Sidebar" },
      { id: "mobile-bottom-nav", label: "MobileBottomNav" },
    ],
  },
];

export const ALL_REGISTRY_IDS = DESIGN_SYSTEM_REGISTRY.flatMap((g) =>
  g.items.map((i) => i.id)
);

export const COMPONENT_COUNT = ALL_REGISTRY_IDS.length - 1; // exclude overview
