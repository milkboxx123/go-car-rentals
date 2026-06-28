import type { Metadata } from "next";
import { Calendar, Car, DollarSign, Users } from "lucide-react";

import { MetricCard, ReservationTable } from "@/components/admin";
import { reservations, vehicles } from "@/mock";
import { formatPrice } from "@/lib/formatters";

export const metadata: Metadata = {
  title: "Admin Dashboard — Go",
  description: "Fleet operations, reservations, and performance metrics.",
};

export default function AdminDashboardPage() {
  const activeReservations = reservations.filter(
    (reservation) =>
      reservation.status === "confirmed" || reservation.status === "active"
  ).length;
  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "available"
  ).length;
  const monthlyRevenue = reservations
    .filter((reservation) => reservation.paymentStatus === "paid")
    .reduce((sum, reservation) => sum + reservation.total, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-heading-lg font-bold text-go-ink">Dashboard</h1>
        <p className="mt-1 text-body-md text-go-muted">
          Overview of reservations, fleet availability, and revenue.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Active reservations"
          value={String(activeReservations)}
          description="Confirmed and in-progress trips"
          change={{ value: "+12%", trend: "up" }}
          icon={Calendar}
        />
        <MetricCard
          title="Available vehicles"
          value={String(availableVehicles)}
          description={`of ${vehicles.length} total fleet`}
          change={{ value: "3 in maintenance", trend: "neutral" }}
          icon={Car}
        />
        <MetricCard
          title="Paid revenue"
          value={formatPrice(monthlyRevenue)}
          description="From mock reservations"
          change={{ value: "+8.4%", trend: "up" }}
          icon={DollarSign}
        />
        <MetricCard
          title="Unique guests"
          value={String(new Set(reservations.map((r) => r.guest.email)).size)}
          description="Across all reservations"
          icon={Users}
        />
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-heading-sm font-bold text-go-ink">Recent reservations</h2>
          <p className="text-body-sm text-go-muted">
            Latest bookings across all Go locations.
          </p>
        </div>
        <ReservationTable />
      </section>
    </div>
  );
}
