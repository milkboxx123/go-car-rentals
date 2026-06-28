"use client";

import * as React from "react";
import { Calendar, Car, DollarSign, Users } from "lucide-react";

import {
  AdminVehicleForm,
  CalendarView,
  DataTable,
  FleetTable,
  MetricCard,
  ReservationTable,
  type SortState,
} from "@/components/admin";
import { DsPreview, DsSection } from "@/components/design-system";
import { StatusPill } from "@/components/go/forms/status-pill";
import { formatPrice } from "@/lib/formatters";
import { reservations, vehicles } from "@/mock";
import type { Reservation } from "@/types";

type FleetActivityRow = {
  id: string;
  guest: string;
  vehicle: string;
  pickup: string;
  status: Reservation["status"];
  total: number;
};

const fleetActivityRows: FleetActivityRow[] = reservations.slice(0, 6).map((res) => {
  const vehicle = vehicles.find((v) => v.id === res.vehicleId);
  return {
    id: res.id,
    guest: `${res.guest.firstName} ${res.guest.lastName}`,
    vehicle: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "—",
    pickup: res.startDate,
    status: res.status,
    total: res.total,
  };
});

function DataTableDemo() {
  const [sort, setSort] = React.useState<SortState>({
    columnId: "guest",
    direction: "asc",
  });

  const columns = React.useMemo(
    () => [
      {
        id: "guest",
        header: "Guest",
        sortable: true,
        sortValue: (row: FleetActivityRow) => row.guest,
        accessor: (row: FleetActivityRow) => (
          <span className="font-semibold">{row.guest}</span>
        ),
      },
      {
        id: "vehicle",
        header: "Vehicle",
        sortable: true,
        sortValue: (row: FleetActivityRow) => row.vehicle,
        accessor: (row: FleetActivityRow) => row.vehicle,
      },
      {
        id: "pickup",
        header: "Pickup",
        sortable: true,
        sortValue: (row: FleetActivityRow) => row.pickup,
        accessor: (row: FleetActivityRow) => (
          <span className="tabular-nums">{row.pickup}</span>
        ),
      },
      {
        id: "status",
        header: "Status",
        sortable: true,
        sortValue: (row: FleetActivityRow) => row.status,
        accessor: (row: FleetActivityRow) => <StatusPill status={row.status} />,
      },
      {
        id: "total",
        header: "Total",
        sortable: true,
        headerClassName: "text-right",
        cellClassName: "text-right tabular-nums font-semibold",
        sortValue: (row: FleetActivityRow) => row.total,
        accessor: (row: FleetActivityRow) =>
          formatPrice(row.total, { minimumFractionDigits: 2 }),
      },
    ],
    []
  );

  return (
    <DataTable
      columns={columns}
      data={fleetActivityRows}
      getRowKey={(row) => row.id}
      sort={sort}
      onSortChange={setSort}
      emptyMessage="No activity to display."
    />
  );
}

const sampleVehicle = vehicles[0];

export function AdminSections() {
  return (
    <>
      <DsSection
        id="metric-card"
        title="MetricCard"
        description="Summary KPI cards for admin dashboards — revenue, fleet utilization, and booking trends."
        importPath='import { MetricCard } from "@/components/admin"'
      >
        <DsPreview surface="admin">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Active reservations"
              value="24"
              icon={Calendar}
              change={{ value: "+12%", trend: "up" }}
              description="vs. last week"
            />
            <MetricCard
              title="Fleet utilization"
              value="87%"
              icon={Car}
              change={{ value: "+5%", trend: "up" }}
              description="vehicles on trip"
            />
            <MetricCard
              title="Revenue (MTD)"
              value="$48,290"
              icon={DollarSign}
              change={{ value: "+18%", trend: "up" }}
              description="June 2026"
            />
            <MetricCard
              title="New customers"
              value="156"
              icon={Users}
              change={{ value: "-3%", trend: "down" }}
              description="vs. last month"
            />
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="data-table"
        title="DataTable"
        description="Generic sortable table primitive used by fleet and reservation views."
        importPath='import { DataTable } from "@/components/admin"'
      >
        <DsPreview surface="admin">
          <DataTableDemo />
        </DsPreview>
      </DsSection>

      <DsSection
        id="fleet-table"
        title="FleetTable"
        description="Fleet inventory table with status pills, daily rates, and row actions."
        importPath='import { FleetTable } from "@/components/admin"'
      >
        <DsPreview surface="admin">
          <FleetTable data={vehicles.slice(0, 8)} />
        </DsPreview>
      </DsSection>

      <DsSection
        id="reservation-table"
        title="ReservationTable"
        description="Reservation list with confirmation numbers, trip dates, and payment status."
        importPath='import { ReservationTable } from "@/components/admin"'
      >
        <DsPreview surface="admin">
          <ReservationTable data={reservations.slice(0, 8)} />
        </DsPreview>
      </DsSection>

      <DsSection
        id="calendar-view"
        title="CalendarView"
        description="Day, week, and month calendar for visualizing fleet bookings and pickups."
        importPath='import { CalendarView } from "@/components/admin"'
      >
        <DsPreview surface="admin">
          <CalendarView data={reservations} />
        </DsPreview>
      </DsSection>

      <DsSection
        id="admin-vehicle-form"
        title="AdminVehicleForm"
        description="Full vehicle create/edit form for fleet management."
        importPath='import { AdminVehicleForm } from "@/components/admin"'
      >
        <DsPreview surface="admin">
          <AdminVehicleForm
            initialValues={{
              year: sampleVehicle.year,
              make: sampleVehicle.make,
              model: sampleVehicle.model,
              trim: sampleVehicle.trim ?? "",
              type: sampleVehicle.type,
              seats: sampleVehicle.seats,
              doors: sampleVehicle.doors,
              fuelType: sampleVehicle.fuelType,
              transmission: sampleVehicle.transmission,
              drivetrain: sampleVehicle.drivetrain,
              dailyRate: sampleVehicle.dailyRate,
              mileageAllowance: sampleVehicle.mileageAllowance,
              locationId: sampleVehicle.locationId,
              airportAvailable: sampleVehicle.airportAvailable,
              deliveryAvailable: sampleVehicle.deliveryAvailable,
              status: sampleVehicle.status,
              description: sampleVehicle.description,
              vin: sampleVehicle.vin ?? "",
              plate: sampleVehicle.plate ?? "",
            }}
            onCancel={() => undefined}
          />
        </DsPreview>
      </DsSection>
    </>
  );
}
