"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";

import { StatusPill } from "@/components/go/forms/status-pill";
import { formatPrice } from "@/lib/formatters";
import { getVehicleById, reservations } from "@/mock";
import type { Reservation } from "@/types";

import { DataTable, type SortState } from "./data-table";

export interface ReservationTableProps {
  data?: Reservation[];
  className?: string;
}

function formatGuestName(reservation: Reservation) {
  return `${reservation.guest.firstName} ${reservation.guest.lastName}`;
}

export function ReservationTable({
  data = reservations,
  className,
}: ReservationTableProps) {
  const [sort, setSort] = React.useState<SortState>({
    columnId: "startDate",
    direction: "desc",
  });

  const columns = React.useMemo(
    () => [
      {
        id: "confirmation",
        header: "Confirmation",
        sortable: true,
        sortValue: (row: Reservation) => row.confirmationNumber,
        accessor: (row: Reservation) => (
          <div>
            <p className="font-mono text-caption font-semibold text-go-ink">
              {row.confirmationNumber}
            </p>
            <p className="text-caption text-go-muted">{formatGuestName(row)}</p>
          </div>
        ),
      },
      {
        id: "vehicle",
        header: "Vehicle",
        sortable: true,
        sortValue: (row: Reservation) => {
          const vehicle = getVehicleById(row.vehicleId);
          return vehicle ? `${vehicle.make} ${vehicle.model}` : "";
        },
        accessor: (row: Reservation) => {
          const vehicle = getVehicleById(row.vehicleId);
          if (!vehicle) return "—";
          return (
            <span>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          );
        },
      },
      {
        id: "startDate",
        header: "Dates",
        sortable: true,
        sortValue: (row: Reservation) => row.startDate,
        accessor: (row: Reservation) => (
          <span className="tabular-nums">
            {format(parseISO(row.startDate), "MMM d")} –{" "}
            {format(parseISO(row.endDate), "MMM d, yyyy")}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        sortable: true,
        sortValue: (row: Reservation) => row.status,
        accessor: (row: Reservation) => <StatusPill status={row.status} />,
      },
      {
        id: "payment",
        header: "Payment",
        sortable: true,
        sortValue: (row: Reservation) => row.paymentStatus,
        accessor: (row: Reservation) => (
          <StatusPill status={row.paymentStatus} />
        ),
      },
      {
        id: "total",
        header: "Total",
        sortable: true,
        headerClassName: "text-right",
        cellClassName: "text-right tabular-nums font-semibold",
        sortValue: (row: Reservation) => row.total,
        accessor: (row: Reservation) => formatPrice(row.total, { minimumFractionDigits: 2 }),
      },
    ],
    []
  );

  return (
    <DataTable
      className={className}
      columns={columns}
      data={data}
      getRowKey={(row) => row.id}
      sort={sort}
      onSortChange={setSort}
      emptyMessage="No reservations found."
    />
  );
}
