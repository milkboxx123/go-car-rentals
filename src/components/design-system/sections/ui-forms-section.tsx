import {
  DsPreview,
  DsSection,
  DsSubsection,
  DsVariantCell,
  DsVariantGrid,
} from "@/components/design-system";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";

const inputSizes = ["sm", "md", "lg"] as const;
const inputStates = ["default", "error", "success"] as const;
const selectVariants = ["default", "filter", "dashboard"] as const;

export function UiFormsSections() {
  return (
    <>
      <DsSection
        id="input"
        title="Input"
        description="Text inputs for search, contact, and booking details."
        importPath="@/components/ui/input"
      >
        <DsSubsection title="Default">
          <DsPreview>
            <div className="max-w-sm space-y-2">
              <Label htmlFor="ds-pickup-location">Pickup location</Label>
              <Input
                id="ds-pickup-location"
                placeholder="City, airport, or address"
                leftIcon={<MapPin />}
              />
            </div>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="Sizes">
          <DsPreview>
            <DsVariantGrid columns={3}>
              {inputSizes.map((size) => (
                <DsVariantCell key={size} label={size}>
                  <Input inputSize={size} placeholder="Driver's license number" />
                </DsVariantCell>
              ))}
            </DsVariantGrid>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="States">
          <DsPreview>
            <DsVariantGrid columns={3}>
              {inputStates.map((state) => (
                <DsVariantCell key={state} label={state}>
                  <Input
                    state={state}
                    defaultValue={state === "error" ? "invalid-email" : "alex@email.com"}
                    placeholder="Email for confirmation"
                  />
                </DsVariantCell>
              ))}
            </DsVariantGrid>
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="checkbox"
        title="Checkbox"
        description="Multi-select options for extras and policies."
        importPath="@/components/ui/checkbox"
      >
        <DsPreview>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox id="ds-gps" defaultChecked />
              <Label htmlFor="ds-gps">Add GPS navigation ($8/day)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="ds-child-seat" />
              <Label htmlFor="ds-child-seat">Child safety seat ($12/trip)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="ds-toll" defaultChecked />
              <Label htmlFor="ds-toll">Florida SunPass toll coverage</Label>
            </div>
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="radio-group"
        title="RadioGroup"
        description="Single-select options for pickup method and protection tier."
        importPath="@/components/ui/radio-group"
      >
        <DsPreview>
          <div className="space-y-2">
            <Label>Pickup method</Label>
            <RadioGroup defaultValue="curbside" className="gap-4">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="curbside" id="ds-curbside" />
                <Label htmlFor="ds-curbside" className="font-normal">
                  Curbside at TPA — Terminal B
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="delivery" id="ds-delivery" />
                <Label htmlFor="ds-delivery" className="font-normal">
                  Delivered to hotel downtown
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="lot" id="ds-lot" />
                <Label htmlFor="ds-lot" className="font-normal">
                  Self-park at partner lot
                </Label>
              </div>
            </RadioGroup>
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="switch"
        title="Switch"
        description="Toggle settings for notifications and add-ons."
        importPath="@/components/ui/switch"
      >
        <DsPreview>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="ds-sms">SMS trip reminders</Label>
              <Switch id="ds-sms" defaultChecked />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="ds-preauth">Pre-authorize security deposit</Label>
              <Switch id="ds-preauth" />
            </div>
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="slider"
        title="Slider"
        description="Range control for price filters and trip duration."
        importPath="@/components/ui/slider"
      >
        <DsPreview>
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <Label>Daily rate: $45 – $120</Label>
              <Slider defaultValue={[45, 95]} min={25} max={150} step={5} />
            </div>
            <div className="space-y-2">
              <Label>Trip length: 3 days</Label>
              <Slider defaultValue={[3]} min={1} max={30} step={1} />
            </div>
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="textarea"
        title="Textarea"
        description="Multi-line input for special requests and host notes."
        importPath="@/components/ui/textarea"
      >
        <DsPreview>
          <div className="max-w-md space-y-2">
            <Label htmlFor="ds-requests">Special requests</Label>
            <Textarea
              id="ds-requests"
              placeholder="Late arrival after 11pm, need car seat installed…"
            />
          </div>
        </DsPreview>
        <DsSubsection title="Error state">
          <DsPreview>
            <div className="max-w-md space-y-2">
              <Label htmlFor="ds-notes-error">Host notes</Label>
              <Textarea
                id="ds-notes-error"
                state="error"
                defaultValue="Too short"
                placeholder="Describe vehicle condition at return"
              />
            </div>
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="select"
        title="Select"
        description="Dropdown selection for vehicle class, airports, and filters."
        importPath="@/components/ui/select"
      >
        <DsSubsection title="Default">
          <DsPreview>
            <div className="max-w-xs space-y-2">
              <Label>Vehicle class</Label>
              <Select defaultValue="suv">
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="van">Passenger van</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="Sizes">
          <DsPreview>
            <DsVariantGrid columns={4}>
              {(["sm", "md", "lg", "compact"] as const).map((size) => (
                <DsVariantCell key={size} label={size}>
                  <Select defaultValue="tpa">
                    <SelectTrigger selectSize={size}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tpa">TPA</SelectItem>
                      <SelectItem value="mco">MCO</SelectItem>
                    </SelectContent>
                  </Select>
                </DsVariantCell>
              ))}
            </DsVariantGrid>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="Variants">
          <DsPreview>
            <DsVariantGrid columns={3}>
              {selectVariants.map((variant) => (
                <DsVariantCell key={variant} label={variant}>
                  <Select defaultValue="tpa">
                    <SelectTrigger variant={variant}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tpa">TPA</SelectItem>
                      <SelectItem value="mco">MCO</SelectItem>
                    </SelectContent>
                  </Select>
                </DsVariantCell>
              ))}
            </DsVariantGrid>
          </DsPreview>
        </DsSubsection>
      </DsSection>
    </>
  );
}
