import { formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export interface PriceLineItem {
  label: string;
  amount: number;
  emphasis?: boolean;
  negative?: boolean;
}

export interface PriceBreakdownProps {
  items: PriceLineItem[];
  total: number;
  totalLabel?: string;
  className?: string;
}

export function PriceBreakdown({
  items,
  total,
  totalLabel = "Total",
  className,
}: PriceBreakdownProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <dl className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-body-sm"
          >
            <dt className={cn("text-go-muted", item.emphasis && "font-medium text-go-ink")}>
              {item.label}
            </dt>
            <dd
              className={cn(
                "tabular-nums",
                item.emphasis && "font-medium text-go-ink",
                item.negative && "text-go-success"
              )}
            >
              {item.negative ? "−" : ""}
              {formatPrice(Math.abs(item.amount))}
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex items-center justify-between border-t border-go-border pt-3">
        <span className="font-semibold text-go-ink">{totalLabel}</span>
        <span className="text-heading-sm font-bold tabular-nums text-go-ink">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
