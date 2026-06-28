"use client";

import * as React from "react";

import { NoVehiclesFound, VehicleCard } from "@/components/booking";
import { SearchPanel } from "@/components/marketing";
import { AppHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  FILTER_GROUPS,
  SORT_OPTIONS,
  vehicles,
  type FilterGroup,
  type SearchFilters,
} from "@/mock";
import { DEFAULT_SEARCH_FILTERS } from "@/mock/filters";
import type { Vehicle } from "@/types";
import { cn } from "@/lib/utils";

function sortVehicles(list: Vehicle[], sort: string): Vehicle[] {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.dailyRate - b.dailyRate);
    case "price-desc":
      return sorted.sort((a, b) => b.dailyRate - a.dailyRate);
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort((a, b) => b.year - a.year);
    default:
      return sorted;
  }
}

function filterVehicles(list: Vehicle[], filters: SearchFilters): Vehicle[] {
  const priceMin = filters.priceMin ?? 40;
  const priceMax = filters.priceMax ?? 250;

  return list.filter((vehicle) => {
    if (vehicle.dailyRate < priceMin || vehicle.dailyRate > priceMax) {
      return false;
    }
    if (
      filters.vehicleTypes &&
      filters.vehicleTypes.length > 0 &&
      !filters.vehicleTypes.includes(vehicle.type)
    ) {
      return false;
    }
    if (filters.seatsMin && vehicle.seats < filters.seatsMin) {
      return false;
    }
    if (filters.deliveryAvailable && !vehicle.deliveryAvailable) {
      return false;
    }
    if (filters.airportPickup && !vehicle.airportAvailable) {
      return false;
    }
    if (filters.luxury && vehicle.type !== "luxury") {
      return false;
    }
    if (filters.electric && vehicle.fuelType !== "electric") {
      return false;
    }
    if (filters.yearMin && vehicle.year < filters.yearMin) {
      return false;
    }
    if (filters.yearMax && vehicle.year > filters.yearMax) {
      return false;
    }
    if (filters.ratingMin && vehicle.rating < filters.ratingMin) {
      return false;
    }
    if (
      filters.transmission &&
      filters.transmission.length > 0 &&
      !filters.transmission.includes(vehicle.transmission)
    ) {
      return false;
    }
    return true;
  });
}

function FilterGroupSection({
  group,
  filters,
  onChange,
}: {
  group: FilterGroup;
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
}) {
  if (group.type === "range" && group.range) {
    const isPrice = group.id === "price";
    const isYear = group.id === "year";
    const min = isPrice
      ? (filters.priceMin ?? group.range.min)
      : isYear
        ? (filters.yearMin ?? group.range.min)
        : group.range.min;
    const max = isPrice
      ? (filters.priceMax ?? group.range.max)
      : isYear
        ? (filters.yearMax ?? group.range.max)
        : group.range.max;

    return (
      <div className="space-y-3">
        <p className="text-label text-go-ink">{group.label}</p>
        <Slider
          min={group.range.min}
          max={group.range.max}
          step={group.range.step}
          value={[min, max]}
          onValueChange={([nextMin, nextMax]) => {
            if (isPrice) {
              onChange({ priceMin: nextMin, priceMax: nextMax });
            } else if (isYear) {
              onChange({ yearMin: nextMin, yearMax: nextMax });
            }
          }}
        />
        <p className="text-caption text-go-muted">
          {group.range.formatLabel
            ? `${group.range.formatLabel(min)} – ${group.range.formatLabel(max)}`
            : `${min} – ${max}`}
        </p>
      </div>
    );
  }

  if (group.type === "toggle") {
    const key = group.id as keyof SearchFilters;
    const checked = Boolean(filters[key]);

    return (
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={`filter-${group.id}`} className="text-body-sm text-go-ink">
          {group.label}
        </Label>
        <Switch
          id={`filter-${group.id}`}
          checked={checked}
          onCheckedChange={(value) => onChange({ [key]: value } as Partial<SearchFilters>)}
        />
      </div>
    );
  }

  if (group.type === "radio" && group.options) {
    const value =
      group.id === "seats"
        ? filters.seatsMin?.toString()
        : group.id === "rating"
          ? filters.ratingMin?.toString()
          : undefined;

    return (
      <div className="space-y-3">
        <p className="text-label text-go-ink">{group.label}</p>
        <RadioGroup
          value={value ?? ""}
          onValueChange={(next) => {
            if (group.id === "seats") {
              onChange({ seatsMin: next ? Number(next) : undefined });
            } else if (group.id === "rating") {
              onChange({ ratingMin: next ? Number(next) : undefined });
            }
          }}
          className="space-y-2"
        >
          {group.options.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem value={option.value} id={`${group.id}-${option.value}`} />
              <Label htmlFor={`${group.id}-${option.value}`} className="text-body-sm font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (group.type === "checkbox" && group.options) {
    const selected =
      group.id === "vehicleType"
        ? (filters.vehicleTypes ?? [])
        : group.id === "pickupMethod"
          ? (filters.pickupMethods ?? [])
          : group.id === "features"
            ? (filters.features ?? [])
            : group.id === "transmission"
              ? (filters.transmission ?? [])
              : [];

    const toggleValue = (value: string) => {
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      if (group.id === "vehicleType") {
        onChange({ vehicleTypes: next as SearchFilters["vehicleTypes"] });
      }
      if (group.id === "pickupMethod") {
        onChange({ pickupMethods: next as SearchFilters["pickupMethods"] });
      }
      if (group.id === "features") onChange({ features: next });
      if (group.id === "transmission") onChange({ transmission: next });
    };

    return (
      <div className="space-y-3">
        <p className="text-label text-go-ink">{group.label}</p>
        <div className="space-y-2">
          {group.options.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`${group.id}-${option.value}`}
                checked={selected.includes(option.value)}
                onCheckedChange={() => toggleValue(option.value)}
              />
              <Label
                htmlFor={`${group.id}-${option.value}`}
                className="flex-1 text-body-sm font-normal"
              >
                {option.label}
                {option.count !== undefined && (
                  <span className="ml-1 text-go-muted">({option.count})</span>
                )}
              </Label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function FiltersSidebar({
  filters,
  onChange,
  onReset,
  className,
}: {
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
  onReset: () => void;
  className?: string;
}) {
  return (
    <aside className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-heading-sm font-bold text-go-ink">Filters</h2>
        <Button variant="link" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
      {FILTER_GROUPS.map((group) => (
        <FilterGroupSection
          key={group.id}
          group={group}
          filters={filters}
          onChange={onChange}
        />
      ))}
    </aside>
  );
}

export function SearchPageClient() {
  const [filters, setFilters] = React.useState<SearchFilters>(DEFAULT_SEARCH_FILTERS);
  const [sort, setSort] = React.useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  const availableVehicles = React.useMemo(
    () => vehicles.filter((v) => v.status === "available"),
    []
  );

  const results = React.useMemo(() => {
    const filtered = filterVehicles(availableVehicles, filters);
    return sortVehicles(filtered, sort);
  }, [availableVehicles, filters, sort]);

  const updateFilters = (patch: Partial<SearchFilters>) => {
    setFilters((current) => ({ ...current, ...patch }));
  };

  const resetFilters = () => setFilters(DEFAULT_SEARCH_FILTERS);

  return (
    <div className="min-h-screen bg-go-cream">
      <AppHeader
        searchSummary={{
          location: "Tampa, FL",
          startDate: new Date("2026-07-10"),
          endDate: new Date("2026-07-14"),
          href: "/search",
        }}
        userName="Sarah Mitchell"
        userInitials="SM"
      />

      <div className="container-marketing py-6">
        <SearchPanel
          variant="results"
          values={{ location: "tampa", sort }}
          resultCount={results.length}
          onFiltersClick={() => setMobileFiltersOpen(true)}
          onValuesChange={(values) => {
            if (values.sort) setSort(values.sort);
          }}
        />

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-body-sm text-go-muted">
            <span className="font-semibold text-go-ink">{results.length}</span> vehicles available
          </p>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-body-sm text-go-muted">Sort by</span>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
          <FiltersSidebar
            filters={filters}
            onChange={updateFilters}
            onReset={resetFilters}
            className="hidden lg:block"
          />

          <div>
            {results.length === 0 ? (
              <NoVehiclesFound onClearFilters={resetFilters} />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    href={`/vehicles/${vehicle.id}`}
                    showTripTotal
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetTrigger asChild>
          <span className="sr-only">Open filters</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-sm overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FiltersSidebar
              filters={filters}
              onChange={updateFilters}
              onReset={resetFilters}
            />
            <Button
              className="mt-6 w-full"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Show {results.length} vehicles
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
