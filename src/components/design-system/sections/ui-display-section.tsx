import {
  DsPreview,
  DsSection,
  DsSubsection,
} from "@/components/design-system";
import {
  Avatar,
  AvatarFallback,
  AvatarIconFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const badgeVariants = [
  "default",
  "gold",
  "dark",
  "success",
  "warning",
  "danger",
  "new",
  "verified",
  "airport",
  "delivery",
  "monthly",
  "luxury",
  "electric",
] as const;

export function UiDisplaySections() {
  return (
    <>
      <DsSection
        id="badge"
        title="Badge"
        description="Status and category labels for vehicles, pickup methods, and fleet tags."
        importPath="@/components/ui/badge"
      >
        <DsPreview>
          <div className="flex flex-wrap gap-2">
            {badgeVariants.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </div>
        </DsPreview>
        <DsSubsection title="In context">
          <DsPreview>
            <div className="flex flex-wrap gap-2">
              <Badge variant="airport">Airport pickup</Badge>
              <Badge variant="delivery">Delivered</Badge>
              <Badge variant="electric">Electric</Badge>
              <Badge variant="verified">Verified host</Badge>
              <Badge variant="luxury">Luxury</Badge>
            </div>
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="avatar"
        title="Avatar"
        description="User and host profile images with initials and icon fallbacks."
        importPath="@/components/ui/avatar"
      >
        <DsPreview>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="size-12">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop"
                  alt="Host profile"
                />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <span className="text-caption text-go-muted">Image</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar className="size-12">
                <AvatarFallback>EK</AvatarFallback>
              </Avatar>
              <span className="text-caption text-go-muted">Initials</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar className="size-12">
                <AvatarIconFallback />
              </Avatar>
              <span className="text-caption text-go-muted">Icon</span>
            </div>
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="separator"
        title="Separator"
        description="Visual dividers between content sections."
        importPath="@/components/ui/separator"
      >
        <DsPreview>
          <div className="space-y-4">
            <p className="text-body-sm text-go-muted">Trip details</p>
            <Separator />
            <p className="text-body-sm text-go-muted">Pickup: Tampa International (TPA)</p>
            <Separator />
            <p className="text-body-sm text-go-muted">Return: Same location</p>
          </div>
        </DsPreview>
        <DsSubsection title="Vertical">
          <DsPreview>
            <div className="flex h-8 items-center gap-4">
              <span className="text-body-sm">SUV</span>
              <Separator orientation="vertical" />
              <span className="text-body-sm">5 seats</span>
              <Separator orientation="vertical" />
              <span className="text-body-sm">Automatic</span>
            </div>
          </DsPreview>
        </DsSubsection>
      </DsSection>
    </>
  );
}
