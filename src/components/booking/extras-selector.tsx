"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { IconButton } from "@/components/ui/icon-button";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export interface ExtraItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  priceType: "per-day" | "per-trip";
  maxQuantity?: number;
}

const defaultExtras: ExtraItem[] = [
  {
    id: "child-seat",
    name: "Child seat",
    description: "Forward-facing seat for ages 2–7",
    price: 12,
    priceType: "per-trip",
    maxQuantity: 2,
  },
  {
    id: "gps",
    name: "GPS navigation",
    price: 8,
    priceType: "per-day",
    maxQuantity: 1,
  },
  {
    id: "additional-driver",
    name: "Additional driver",
    description: "Add a second authorized driver",
    price: 10,
    priceType: "per-day",
    maxQuantity: 1,
  },
  {
    id: "toll-pass",
    name: "Toll pass",
    description: "Unlimited toll road access",
    price: 6,
    priceType: "per-day",
    maxQuantity: 1,
  },
];

export interface ExtrasSelectorProps {
  extras?: ExtraItem[];
  selected?: Record<string, number>;
  onChange?: (selected: Record<string, number>) => void;
  className?: string;
}

export function ExtrasSelector({
  extras = defaultExtras,
  selected: controlledSelected,
  onChange,
  className,
}: ExtrasSelectorProps) {
  const [internalSelected, setInternalSelected] = React.useState<
    Record<string, number>
  >({});

  const selected = controlledSelected ?? internalSelected;

  const update = (id: string, quantity: number) => {
    const next = { ...selected };
    if (quantity <= 0) {
      delete next[id];
    } else {
      next[id] = quantity;
    }
    if (!controlledSelected) setInternalSelected(next);
    onChange?.(next);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-label text-go-ink">Add extras</h3>
      <ul className="space-y-2">
        {extras.map((extra) => {
          const qty = selected[extra.id] ?? 0;
          const max = extra.maxQuantity ?? 1;
          const isQuantityExtra = max > 1;

          return (
            <li
              key={extra.id}
              className="flex items-center gap-3 rounded-lg border border-go-border p-4"
            >
              {isQuantityExtra ? (
                <div className="flex flex-1 flex-col gap-1">
                  <span className="font-medium text-go-ink">{extra.name}</span>
                  {extra.description && (
                    <span className="text-body-sm text-go-muted">
                      {extra.description}
                    </span>
                  )}
                  <span className="text-body-sm tabular-nums text-go-muted">
                    {formatPrice(extra.price)}
                    {extra.priceType === "per-day" ? "/day" : " per trip"}
                  </span>
                </div>
              ) : (
                <>
                  <Checkbox
                    id={`extra-${extra.id}`}
                    checked={qty > 0}
                    onCheckedChange={(checked) =>
                      update(extra.id, checked ? 1 : 0)
                    }
                  />
                  <Label
                    htmlFor={`extra-${extra.id}`}
                    className="flex flex-1 cursor-pointer flex-col gap-0.5"
                  >
                    <span className="font-medium text-go-ink">{extra.name}</span>
                    {extra.description && (
                      <span className="text-body-sm text-go-muted">
                        {extra.description}
                      </span>
                    )}
                    <span className="text-body-sm tabular-nums text-go-muted">
                      {formatPrice(extra.price)}
                      {extra.priceType === "per-day" ? "/day" : " per trip"}
                    </span>
                  </Label>
                </>
              )}

              {isQuantityExtra && (
                <div className="flex items-center gap-1">
                  <IconButton
                    type="button"
                    variant="outline"
                    size="xs"
                    aria-label={`Decrease ${extra.name}`}
                    disabled={qty <= 0}
                    onClick={() => update(extra.id, qty - 1)}
                  >
                    <Minus aria-hidden="true" />
                  </IconButton>
                  <span className="w-6 text-center text-body-sm tabular-nums">
                    {qty}
                  </span>
                  <IconButton
                    type="button"
                    variant="outline"
                    size="xs"
                    aria-label={`Increase ${extra.name}`}
                    disabled={qty >= max}
                    onClick={() => update(extra.id, qty + 1)}
                  >
                    <Plus aria-hidden="true" />
                  </IconButton>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
