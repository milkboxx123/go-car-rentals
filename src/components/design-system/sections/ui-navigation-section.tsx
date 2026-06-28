import {
  DsPreview,
  DsSection,
  DsSubsection,
} from "@/components/design-system";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const vehicleCategories = [
  { value: "all", label: "All vehicles" },
  { value: "suv", label: "SUVs" },
  { value: "luxury", label: "Luxury" },
  { value: "electric", label: "Electric" },
] as const;

export function UiNavigationSections() {
  return (
    <>
      <DsSection
        id="tabs"
        title="Tabs"
        description="Segmented navigation for search filters and account views."
        importPath="@/components/ui/tabs"
      >
        <DsSubsection title="Underline">
          <DsPreview>
            <Tabs defaultValue="suv">
              <TabsList variant="underline">
                {vehicleCategories.map((cat) => (
                  <TabsTrigger key={cat.value} value={cat.value} variant="underline">
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="suv">
                <p className="text-body-sm text-go-muted">
                  24 SUVs available near Tampa International Airport.
                </p>
              </TabsContent>
            </Tabs>
          </DsPreview>
        </DsSubsection>

        <DsSubsection title="Pill">
          <DsPreview>
            <Tabs defaultValue="upcoming">
              <TabsList variant="pill">
                <TabsTrigger value="upcoming" variant="pill">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="past" variant="pill">
                  Past trips
                </TabsTrigger>
                <TabsTrigger value="cancelled" variant="pill">
                  Cancelled
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                <p className="text-body-sm text-go-muted">
                  Your Tampa pickup starts in 2 days.
                </p>
              </TabsContent>
            </Tabs>
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="breadcrumbs"
        title="Breadcrumbs"
        description="Hierarchical navigation for search and vehicle detail pages."
        importPath="@/components/ui/breadcrumb"
      >
        <DsPreview>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/search">Tampa rentals</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/search?class=suv">SUVs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>2024 Toyota RAV4</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DsPreview>
      </DsSection>
    </>
  );
}
