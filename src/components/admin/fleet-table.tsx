"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";

import { StatusPill } from "@/components/go/forms/status-pill";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPrice, formatVehicleName } from "@/lib/formatters";
import { vehicles } from "@/mock";
import type { Vehicle } from "@/types";

import { DataTable, type SortState } from "./data-table";

export interface FleetTableProps {
  data?: Vehicle[];
  onEdit?: (vehicle: Vehicle) => void;
  onView?: (vehicle: Vehicle) => void;
  className?: string;
}

export function FleetTable({
  data = vehicles,
  onEdit,
  onView,
  className,
}: FleetTableProps) {
  const [sort, setSort] = React.useState<SortState>({
    columnId: "vehicle",
    direction: "asc",
  });

  const columns = React.useMemo(
    () => [
      {
        id: "vehicle",
        header: "Vehicle",
        sortable: true,
        sortValue: (row: Vehicle) => formatVehicleName(row),
        accessor: (row: Vehicle) => (
          <div>
            <p className="font-semibold text-go-ink">
              {formatVehicleName(row)}
            </p>
            <p className="text-caption text-go-muted">{row.type}</p>
          </div>
        ),
      },
      {
        id: "plate",
        header: "Plate",
        sortable: true,
        sortValue: (row: Vehicle) => row.plate ?? "",
        accessor: (row: Vehicle) => (
          <span className="font-mono text-caption">{row.plate ?? "—"}</span>
        ),
      },
      {
        id: "location",
        header: "Location",
        sortable: true,
        sortValue: (row: Vehicle) => row.location,
        accessor: (row: Vehicle) => row.location,
      },
      {
        id: "status",
        header: "Status",
        sortable: true,
        sortValue: (row: Vehicle) => row.status,
        accessor: (row: Vehicle) => <StatusPill status={row.status} />,
      },
      {
        id: "rate",
        header: "Daily rate",
        sortable: true,
        headerClassName: "text-right",
        cellClassName: "text-right tabular-nums",
        sortValue: (row: Vehicle) => row.dailyRate,
        accessor: (row: Vehicle) => formatPrice(row.dailyRate),
      },
      {
        id: "actions",
        header: "",
        headerClassName: "w-12",
        cellClassName: "text-right",
        accessor: (row: Vehicle) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="xs"
                className="size-8 p-0"
                aria-label={`Actions for ${formatVehicleName(row)}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView?.(row)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(row)}>
                Edit vehicle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [onEdit, onView]
  );

  return (
    <DataTable
      className={className}
      columns={columns}
      data={data}
      getRowKey={(row) => row.id}
      sort={sort}
      onSortChange={setSort}
      emptyMessage="No vehicles in fleet."
    />
  );
}
