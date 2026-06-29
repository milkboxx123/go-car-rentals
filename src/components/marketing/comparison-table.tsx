import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ComparisonTableProps {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  className?: string;
}

function CellValue({ value }: { value: string }) {
  const lower = value.toLowerCase();
  if (lower === "yes" || lower.startsWith("yes ")) {
    return (
      <span className="flex items-center gap-2">
        <Check className="size-4 shrink-0 text-go-success" aria-hidden="true" />
        <span>{value}</span>
      </span>
    );
  }
  if (lower === "no" || lower.startsWith("no ")) {
    return (
      <span className="flex items-center gap-2">
        <X className="size-4 shrink-0 text-go-muted" aria-hidden="true" />
        <span>{value}</span>
      </span>
    );
  }
  return <span>{value}</span>;
}

export function ComparisonTable({ headers, rows, className }: ComparisonTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-go-border", className)}>
      <table className="w-full min-w-[640px] border-collapse text-left text-body-sm">
        <thead>
          <tr className="border-b border-go-border bg-go-muted-light">
            {headers.map((header, i) => (
              <th
                key={header || i}
                scope="col"
                className={cn(
                  "px-4 py-4 font-semibold",
                  i === 0 ? "text-go-ink" : i === 1 ? "text-go-gold-dark bg-go-gold/10" : "text-go-ink"
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-go-border last:border-b-0 odd:bg-go-paper even:bg-go-cream/50"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cn(
                    "px-4 py-4 align-top",
                    cellIndex === 1 && "bg-go-gold/5 font-medium"
                  )}
                >
                  {cellIndex === 0 ? (
                    <span className="font-medium text-go-ink">{cell}</span>
                  ) : (
                    <CellValue value={cell} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
