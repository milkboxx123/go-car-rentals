"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cva, type VariantProps } from "class-variance-authority";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SelectItem,
} from "@/components/ui/select";
import { DateField, parseDateValue, SelectField } from "@/components/go/forms";
import { locations } from "@/mock";
import { buildSearchUrl } from "@/lib/search";
import { cn } from "@/lib/utils";

const searchPanelVariants = cva("bg-go-paper", {
  variants: {
    variant: {
      hero: "rounded-xl border border-go-border p-4 shadow-lg sm:p-6",
      compact:
        "flex flex-wrap items-center gap-2 rounded-pill border border-go-border px-3 py-2 shadow-sm",
      results:
        "flex flex-wrap items-center gap-3 rounded-lg border border-go-border px-4 py-3",
    },
  },
  defaultVariants: {
    variant: "hero",
  },
});

export interface SearchPanelValues {
  location?: string;
  pickupDate?: string;
  returnDate?: string;
}

export interface SearchPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof searchPanelVariants> {
  values?: SearchPanelValues;
  onValuesChange?: (values: SearchPanelValues) => void;
  onSearch?: (values: SearchPanelValues) => void;
  onFiltersClick?: () => void;
  resultCount?: number;
}

export function SearchPanel({
  variant = "hero",
  values: controlledValues,
  onValuesChange,
  onSearch,
  onFiltersClick,
  resultCount,
  className,
  ...props
}: SearchPanelProps) {
  const router = useRouter();
  const [internalValues, setInternalValues] = React.useState<SearchPanelValues>({
    location: locations[0]?.slug,
    pickupDate: "",
    returnDate: "",
  });

  const values = controlledValues ?? internalValues;
  const pickupDateValue = parseDateValue(values.pickupDate);

  const update = (patch: Partial<SearchPanelValues>) => {
    const next = { ...values, ...patch };
    if (!controlledValues) setInternalValues(next);
    onValuesChange?.(next);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(values);
      return;
    }

    router.push(buildSearchUrl(values));
  };

  if (variant === "compact") {
    return (
      <div
        className={cn(searchPanelVariants({ variant }), className)}
        {...props}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <SelectField
            hideLabel
            value={values.location}
            onValueChange={(location) => update({ location })}
            placeholder="Location"
            selectSize="compact"
            leftIcon={<MapPin aria-hidden="true" />}
            triggerClassName="border-0 bg-transparent shadow-none"
          >
            {locations.map((loc) => (
              <SelectItem key={loc.id} value={loc.slug}>
                {loc.city}, {loc.state}
              </SelectItem>
            ))}
          </SelectField>
        </div>
        <div className="hidden h-6 w-px bg-go-border sm:block" />
        <DateField
          hideLabel
          inputSize="sm"
          value={values.pickupDate}
          onChange={(pickupDate) => update({ pickupDate })}
          placeholder="Pickup"
          className="hidden sm:flex"
          triggerClassName="w-auto border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          minDate={new Date()}
        />
        <Button size="sm" onClick={handleSearch} leftIcon={<Search className="size-4" />}>
          Search
        </Button>
      </div>
    );
  }

  if (variant === "results") {
    return (
      <div
        className={cn(searchPanelVariants({ variant }), className)}
        {...props}
      >
        <div className="flex min-w-[180px] flex-1 items-center gap-2">
          <SelectField
            hideLabel
            value={values.location}
            onValueChange={(location) => update({ location })}
            placeholder="Location"
            selectSize="sm"
            leftIcon={<MapPin aria-hidden="true" />}
            triggerClassName="border-0 bg-go-muted-light"
          >
            {locations.map((loc) => (
              <SelectItem key={loc.id} value={loc.slug}>
                {loc.city}, {loc.state}
              </SelectItem>
            ))}
          </SelectField>
        </div>

        <div className="flex items-center gap-2">
          <DateField
            hideLabel
            inputSize="sm"
            value={values.pickupDate}
            onChange={(pickupDate) => update({ pickupDate })}
            placeholder="Pickup"
            className="w-[148px]"
            minDate={new Date()}
          />
          <span className="text-go-muted">–</span>
          <DateField
            hideLabel
            inputSize="sm"
            value={values.returnDate}
            onChange={(returnDate) => update({ returnDate })}
            placeholder="Return"
            className="w-[148px]"
            minDate={pickupDateValue ?? new Date()}
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          onClick={onFiltersClick}
          leftIcon={<SlidersHorizontal className="size-4" />}
        >
          Filters
        </Button>

        {resultCount !== undefined && (
          <span className="ml-auto text-body-sm text-go-muted">
            {resultCount} vehicles
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn(searchPanelVariants({ variant }), className)} {...props}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <SelectField
            id="search-location"
            label="Pickup location"
            value={values.location}
            onValueChange={(location) => update({ location })}
            placeholder="Select city"
            selectSize="lg"
            leftIcon={<MapPin aria-hidden="true" />}
          >
            {locations.map((loc) => (
              <SelectItem key={loc.id} value={loc.slug}>
                {loc.city}, {loc.state}
              </SelectItem>
            ))}
          </SelectField>
        </div>

        <DateField
          id="search-pickup"
          label="Pickup date"
          inputSize="lg"
          value={values.pickupDate}
          onChange={(pickupDate) => update({ pickupDate })}
          placeholder="Select pickup date"
          minDate={new Date()}
        />

        <DateField
          id="search-return"
          label="Return date"
          inputSize="lg"
          value={values.returnDate}
          onChange={(returnDate) => update({ returnDate })}
          placeholder="Select return date"
          minDate={pickupDateValue ?? new Date()}
        />

        <div className="flex items-end sm:col-span-2 lg:col-span-1">
          <Button
            size="lg"
            fullWidth
            onClick={handleSearch}
            leftIcon={<Search className="size-5" />}
          >
            Search vehicles
          </Button>
        </div>
      </div>
    </div>
  );
}
