import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PaymentMethodCardProps {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault?: boolean;
  onRemove: (id: string) => void;
  onSetDefault?: (id: string) => void;
  className?: string;
}

export function PaymentMethodCard({
  id,
  brand,
  last4,
  expMonth,
  expYear,
  isDefault,
  onRemove,
  onSetDefault,
  className,
}: PaymentMethodCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-go-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-go-muted-light text-caption font-bold uppercase text-go-muted">
          {brand.slice(0, 2)}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium capitalize text-go-ink">{brand}</p>
            {isDefault ? <Badge variant="gold">Default</Badge> : null}
          </div>
          <p className="text-body-sm text-go-muted">
            •••• {last4} · Expires {expMonth}/{expYear}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {!isDefault && onSetDefault ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onSetDefault(id)}
          >
            Set as default
          </Button>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-go-danger"
          onClick={() => onRemove(id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
