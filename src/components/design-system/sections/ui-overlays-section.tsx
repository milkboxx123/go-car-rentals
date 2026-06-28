import { DsPreview, DsSection } from "@/components/design-system";

import {
  DialogDemo,
  DropdownMenuDemo,
  PopoverDemo,
  SheetDemo,
  ToastDemo,
  TooltipDemo,
} from "./demos/ui-overlays-demo";

export function UiOverlaysSections() {
  return (
    <>
      <DsSection
        id="dialog"
        title="Dialog"
        description="Modal confirmations for cancellations, policy notices, and checkout steps."
        importPath="@/components/ui/dialog"
      >
        <DsPreview>
          <DialogDemo />
        </DsPreview>
      </DsSection>

      <DsSection
        id="sheet"
        title="Sheet"
        description="Slide-over panels for filters, mobile navigation, and trip details."
        importPath="@/components/ui/sheet"
      >
        <DsPreview>
          <SheetDemo />
        </DsPreview>
      </DsSection>

      <DsSection
        id="popover"
        title="Popover"
        description="Contextual panels for pickup windows, pricing hints, and calendar details."
        importPath="@/components/ui/popover"
      >
        <DsPreview>
          <PopoverDemo />
        </DsPreview>
      </DsSection>

      <DsSection
        id="dropdown-menu"
        title="DropdownMenu"
        description="Action menus for trip management and account options."
        importPath="@/components/ui/dropdown-menu"
      >
        <DsPreview>
          <DropdownMenuDemo />
        </DsPreview>
      </DsSection>

      <DsSection
        id="tooltip"
        title="Tooltip"
        description="Brief hints for deposits, fees, and icon-only controls."
        importPath="@/components/ui/tooltip"
      >
        <DsPreview>
          <TooltipDemo />
        </DsPreview>
      </DsSection>

      <DsSection
        id="toast"
        title="Toast"
        description="Transient notifications powered by Sonner for booking confirmations and errors."
        importPath="@/components/ui/sonner"
      >
        <DsPreview>
          <ToastDemo />
        </DsPreview>
      </DsSection>
    </>
  );
}
