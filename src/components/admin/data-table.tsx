"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc";

export interface SortState {
  columnId: string;
  direction: SortDirection;
}

export interface DataTableColumn<T> {
  id: string;
  header: string;
  sortable?: boolean;
  headerClassName?: string;
  cellClassName?: string;
  accessor: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  sort?: SortState;
  onSortChange?: (sort: SortState) => void;
  emptyMessage?: string;
  className?: string;
}

function compareValues(a: string | number, b: string | number) {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  return String(a).localeCompare(String(b), undefined, { sensitivity: "base" });
}

function sortData<T>(
  data: T[],
  columns: DataTableColumn<T>[],
  sort: SortState
): T[] {
  const column = columns.find((col) => col.id === sort.columnId);
  if (!column?.sortValue) return data;

  return [...data].sort((a, b) => {
    const result = compareValues(column.sortValue!(a), column.sortValue!(b));
    return sort.direction === "asc" ? result : -result;
  });
}

function SortIcon({
  columnId,
  sort,
}: {
  columnId: string;
  sort?: SortState;
}) {
  if (!sort || sort.columnId !== columnId) {
    return <ArrowUpDown className="size-3.5 text-go-muted" aria-hidden="true" />;
  }

  return sort.direction === "asc" ? (
    <ArrowUp className="size-3.5 text-go-ink" aria-hidden="true" />
  ) : (
    <ArrowDown className="size-3.5 text-go-ink" aria-hidden="true" />
  );
}

export function DataTable<T>({
  columns,
  data,
  getRowKey,
  sort,
  onSortChange,
  emptyMessage = "No results found.",
  className,
}: DataTableProps<T>) {
  const sortedData = React.useMemo(
    () => (sort ? sortData(data, columns, sort) : data),
    [columns, data, sort]
  );

  function handleSort(column: DataTableColumn<T>) {
    if (!column.sortable || !onSortChange) return;

    const isActive = sort?.columnId === column.id;
    const direction: SortDirection =
      isActive && sort.direction === "asc" ? "desc" : "asc";

    onSortChange({ columnId: column.id, direction });
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-go-border bg-go-paper shadow-xs",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-go-border bg-go-muted-light/60">
              {columns.map((column) => {
                const isSortable = column.sortable && !!onSortChange;
                const isActive = sort?.columnId === column.id;

                return (
                  <th
                    key={column.id}
                    scope="col"
                    className={cn(
                      "px-4 py-3 text-caption font-semibold uppercase tracking-wide text-go-muted",
                      column.headerClassName
                    )}
                  >
                    {isSortable ? (
                      <button
                        type="button"
                        role="columnheader"
                        onClick={() => handleSort(column)}
                        className={cn(
                          "inline-flex items-center gap-1.5 transition-colors hover:text-go-ink",
                          isActive && "text-go-ink"
                        )}
                        aria-sort={
                          isActive
                            ? sort.direction === "asc"
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                      >
                        {column.header}
                        <SortIcon columnId={column.id} sort={sort} />
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-body-sm text-go-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row) => (
                <tr
                  key={getRowKey(row)}
                  className="border-b border-go-border/70 last:border-b-0 hover:bg-go-muted-light/40"
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        "px-4 py-3 text-body-sm text-go-ink",
                        column.cellClassName
                      )}
                    >
                      {column.accessor(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
