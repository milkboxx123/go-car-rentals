import type { Metadata } from "next";

import { FleetTable } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/mock";

export const metadata: Metadata = {
  title: "Fleet Management — Go Admin",
  description: "Manage vehicle inventory, status, and pricing across locations.",
};

export default function AdminFleetPage() {
  const availableCount = vehicles.filter((v) => v.status === "available").length;
  const maintenanceCount = vehicles.filter((v) => v.status === "maintenance").length;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-heading-lg font-bold text-go-ink">Fleet</h1>
          <p className="mt-1 text-body-md text-go-muted">
            {vehicles.length} vehicles · {availableCount} available ·{" "}
            {maintenanceCount} in maintenance
          </p>
        </div>
        <Button>Add vehicle</Button>
      </header>

      <FleetTable />
    </div>
  );
}
