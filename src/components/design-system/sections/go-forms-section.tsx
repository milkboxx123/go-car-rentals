"use client";

import * as React from "react";
import { addDays } from "date-fns";
import { Car, Shield, CreditCard, ClipboardCheck } from "lucide-react";

import {
  DsPreview,
  DsSection,
  DsSubsection,
  DsVariantGrid,
} from "@/components/design-system";
import {
  DateField,
  DatePicker,
  LocationField,
  MultiSelect,
  PromoCodeField,
  SearchInput,
  SelectField,
  Stepper,
  TextInput,
  TimePicker,
  Toggle,
  type LocationFieldMode,
} from "@/components/go/forms";
import { SelectItem } from "@/components/ui/select";
import { MapPin } from "lucide-react";

const CHECKOUT_STEPS = [
  {
    id: "vehicle",
    label: "Vehicle",
    description: "Choose your car",
  },
  {
    id: "protection",
    label: "Protection",
    description: "Add coverage",
  },
  {
    id: "extras",
    label: "Extras",
    description: "GPS, child seat",
  },
  {
    id: "review",
    label: "Review",
    description: "Confirm trip details",
  },
  {
    id: "payment",
    label: "Payment",
    description: "Secure checkout",
  },
] as const;

const EXTRAS_OPTIONS = [
  { value: "gps", label: "GPS navigation" },
  { value: "child-seat", label: "Child seat" },
  { value: "toll-pass", label: "Toll pass" },
  { value: "additional-driver", label: "Additional driver" },
  { value: "wifi", label: "In-car Wi‑Fi hotspot" },
];

function LocationFieldDemo() {
  const [mode, setMode] = React.useState<LocationFieldMode>("city");
  const [value, setValue] = React.useState("Tampa, FL");

  return (
    <LocationField
      mode={mode}
      onModeChange={setMode}
      value={value}
      onChange={setValue}
    />
  );
}

function MultiSelectDemo() {
  const [selected, setSelected] = React.useState(["gps", "toll-pass"]);

  return (
    <MultiSelect
      label="Trip extras"
      placeholder="Add extras to your rental"
      options={EXTRAS_OPTIONS}
      value={selected}
      onValueChange={setSelected}
      helperText="Selected extras are added to your trip total at checkout."
    />
  );
}

function DateFieldDemo() {
  const [pickupDate, setPickupDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");

  return (
    <DsVariantGrid columns={2}>
      <DateField
        label="Pickup date"
        placeholder="Select pickup date"
        value={pickupDate}
        onChange={setPickupDate}
        minDate={new Date()}
      />
      <DateField
        label="Return date"
        placeholder="Select return date"
        inputSize="lg"
        value={returnDate}
        onChange={setReturnDate}
        minDate={pickupDate ? new Date(`${pickupDate}T00:00:00`) : new Date()}
      />
    </DsVariantGrid>
  );
}

function DatePickerDemo() {
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    addDays(new Date(), 3)
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    addDays(new Date(), 7)
  );

  return (
    <DatePicker
      label="Trip dates"
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
      minDate={new Date()}
      helperText="Minimum rental is 1 day. Weekly rates apply for 7+ days."
    />
  );
}

function PromoCodeDemo() {
  const [success, setSuccess] = React.useState(false);

  return (
    <PromoCodeField
      defaultValue="GOSUMMER"
      helperText="One promo code per reservation."
      success={success}
      successMessage="15% off applied to your trip total."
      onApply={async () => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        setSuccess(true);
      }}
    />
  );
}

function ToggleDemo() {
  const [delivery, setDelivery] = React.useState(true);
  const [monthly, setMonthly] = React.useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <Toggle pressed={delivery} onPressedChange={setDelivery}>
        Delivery to my address
      </Toggle>
      <Toggle pressed={monthly} onPressedChange={setMonthly}>
        Monthly rental
      </Toggle>
    </div>
  );
}

export function GoFormsSection() {
  return (
    <>
      <DsSection
        id="text-input"
        title="TextInput"
        description="Labeled text field with helper text, validation errors, and success states. Used for driver details, contact info, and checkout forms."
        importPath='import { TextInput } from "@/components/go/forms"'
      >
        <DsPreview>
          <DsVariantGrid columns={3}>
            <TextInput
              label="Driver's license number"
              placeholder="D123-456-78-901-0"
              helperText="Must match the name on your reservation."
              defaultValue="D123-456-78-901-0"
            />
            <TextInput
              label="Email address"
              placeholder="you@example.com"
              error="Enter a valid email address"
              defaultValue="alex.tampa"
            />
            <TextInput
              label="Mobile phone"
              placeholder="(555) 555-0123"
              success
              successMessage="We'll text pickup instructions here."
              defaultValue="(813) 555-0142"
            />
          </DsVariantGrid>
        </DsPreview>
      </DsSection>

      <DsSection
        id="search-input"
        title="SearchInput"
        description="Large search field with clear action and location icon. Primary entry point for finding cars by city, airport, or address."
        importPath='import { SearchInput } from "@/components/go/forms"'
      >
        <DsPreview>
          <div className="max-w-xl">
            <SearchInput
              label="Where do you need a car?"
              defaultValue="Tampa International Airport (TPA)"
              helperText="Search by city, airport code, or neighborhood."
            />
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="multi-select"
        title="MultiSelect"
        description="Popover checklist for selecting multiple trip extras, vehicle features, or filter options."
        importPath='import { MultiSelect } from "@/components/go/forms"'
      >
        <DsPreview>
          <div className="max-w-md">
            <MultiSelectDemo />
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="select-field"
        title="SelectField"
        description="Labeled dropdown with design-system styling. Use instead of native select elements for location, vehicle class, and filter controls."
        importPath='import { SelectField } from "@/components/go/forms"'
      >
        <DsPreview>
          <DsVariantGrid columns={2}>
            <SelectField
              label="Pickup location"
              defaultValue="tpa"
              leftIcon={<MapPin aria-hidden="true" />}
              placeholder="Select city"
            >
              <SelectItem value="tpa">Tampa, FL</SelectItem>
              <SelectItem value="mco">Orlando, FL</SelectItem>
              <SelectItem value="mia">Miami, FL</SelectItem>
            </SelectField>
            <SelectField
              label="Vehicle class"
              defaultValue="suv"
              selectSize="lg"
              placeholder="Select class"
            >
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
            </SelectField>
          </DsVariantGrid>
        </DsPreview>
      </DsSection>

      <DsSection
        id="date-field"
        title="DateField"
        description="Single-date picker with a custom calendar popover. Matches input field styling with one calendar icon — no native browser date controls."
        importPath='import { DateField } from "@/components/go/forms"'
      >
        <DsPreview>
          <div className="max-w-3xl">
            <DateFieldDemo />
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="date-picker"
        title="DatePicker"
        description="Range calendar for pickup and return dates. Opens in a popover on desktop and a bottom sheet on mobile."
        importPath='import { DatePicker } from "@/components/go/forms"'
      >
        <DsPreview>
          <div className="max-w-sm">
            <DatePickerDemo />
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="time-picker"
        title="TimePicker"
        description="15-minute increment time selector for pickup and return scheduling."
        importPath='import { TimePicker } from "@/components/go/forms"'
      >
        <DsPreview>
          <DsVariantGrid columns={2}>
            <TimePicker
              label="Pickup time"
              defaultValue="10:00"
              helperText="TPA curbside pickup opens at 6:00 AM."
            />
            <TimePicker
              label="Return time"
              defaultValue="18:00"
              helperText="Late returns may incur an additional day charge."
            />
          </DsVariantGrid>
        </DsPreview>
      </DsSection>

      <DsSection
        id="location-field"
        title="LocationField"
        description="Combined mode switcher and location input for airport, city, and delivery address searches."
        importPath='import { LocationField } from "@/components/go/forms"'
      >
        <DsPreview>
          <div className="max-w-xl">
            <LocationFieldDemo />
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="promo-code-field"
        title="PromoCodeField"
        description="Promo code input with apply action and async validation feedback."
        importPath='import { PromoCodeField } from "@/components/go/forms"'
      >
        <DsPreview>
          <div className="max-w-md">
            <PromoCodeDemo />
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="toggle"
        title="Toggle"
        description="Pill-shaped toggle buttons for optional booking preferences like delivery and monthly rentals."
        importPath='import { Toggle } from "@/components/go/forms"'
      >
        <DsPreview>
          <ToggleDemo />
        </DsPreview>
      </DsSection>

      <DsSection
        id="stepper"
        title="Stepper"
        description="Checkout progress indicator showing completed, current, and upcoming steps."
        importPath='import { Stepper } from "@/components/go/forms"'
      >
        <DsSubsection title="Checkout flow">
          <DsPreview>
            <Stepper steps={[...CHECKOUT_STEPS]} currentStep={2} />
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="With icons in labels">
          <DsPreview>
            <div className="space-y-6">
              <Stepper
                steps={[
                  { id: "vehicle", label: "Vehicle", description: "2024 Toyota RAV4" },
                  { id: "protection", label: "Protection", description: "Standard plan" },
                  { id: "extras", label: "Extras", description: "GPS + toll pass" },
                  { id: "review", label: "Review", description: "Jul 12–16 · TPA" },
                  { id: "payment", label: "Payment", description: "Due at checkout" },
                ]}
                currentStep={1}
              />
              <div className="flex flex-wrap gap-4 text-body-sm text-go-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Car className="size-4" aria-hidden="true" />
                  Vehicle selected
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="size-4" aria-hidden="true" />
                  Choose protection
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ClipboardCheck className="size-4" aria-hidden="true" />
                  Review trip
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CreditCard className="size-4" aria-hidden="true" />
                  Pay securely
                </span>
              </div>
            </div>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="Vertical orientation">
          <DsPreview>
            <Stepper
              steps={[...CHECKOUT_STEPS]}
              currentStep={3}
              orientation="vertical"
            />
          </DsPreview>
        </DsSubsection>
      </DsSection>
    </>
  );
}
