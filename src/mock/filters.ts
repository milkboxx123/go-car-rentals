import type { PickupMethod, VehicleType } from "@/types";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface RangeFilterConfig {
  min: number;
  max: number;
  step: number;
  unit?: string;
  formatLabel?: (value: number) => string;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: "checkbox" | "radio" | "range" | "toggle";
  options?: FilterOption[];
  range?: RangeFilterConfig;
}

export interface SortOption {
  value: string;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating-desc", label: "Highest rated" },
  { value: "newest", label: "Newest vehicles" },
  { value: "closest", label: "Closest pickup" },
];

export const VEHICLE_TYPE_OPTIONS: FilterOption[] = [
  { value: "car", label: "Cars", count: 1 },
  { value: "suv", label: "SUVs", count: 4 },
  { value: "truck", label: "Trucks", count: 1 },
  { value: "minivan", label: "Minivans", count: 1 },
  { value: "luxury", label: "Luxury", count: 3 },
  { value: "convertible", label: "Convertibles", count: 0 },
  { value: "electric", label: "Electric", count: 1 },
  { value: "van", label: "Vans", count: 0 },
];

export const PICKUP_METHOD_OPTIONS: FilterOption[] = [
  { value: "lot", label: "Pickup at lot" },
  { value: "airport", label: "Airport pickup" },
  { value: "delivery", label: "Delivered to me" },
  { value: "hotel", label: "Hotel delivery" },
  { value: "custom-address", label: "Custom address" },
];

export const TRANSMISSION_OPTIONS: FilterOption[] = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];

export const FEATURE_OPTIONS: FilterOption[] = [
  { value: "apple-carplay", label: "Apple CarPlay" },
  { value: "android-auto", label: "Android Auto" },
  { value: "bluetooth", label: "Bluetooth" },
  { value: "backup-camera", label: "Backup camera" },
  { value: "heated-seats", label: "Heated seats" },
  { value: "third-row", label: "Third-row seating" },
  { value: "4wd", label: "4WD / AWD" },
  { value: "child-seat", label: "Child seat available" },
];

export const SEATS_OPTIONS: FilterOption[] = [
  { value: "2", label: "2+ seats" },
  { value: "4", label: "4+ seats" },
  { value: "5", label: "5+ seats" },
  { value: "7", label: "7+ seats" },
];

export const RATING_OPTIONS: FilterOption[] = [
  { value: "4.5", label: "4.5+ stars" },
  { value: "4.0", label: "4.0+ stars" },
  { value: "3.5", label: "3.5+ stars" },
];

export const FILTER_GROUPS: FilterGroup[] = [
  {
    id: "price",
    label: "Price per day",
    type: "range",
    range: {
      min: 40,
      max: 250,
      step: 5,
      unit: "USD",
      formatLabel: (value) => `$${value}`,
    },
  },
  {
    id: "vehicleType",
    label: "Vehicle type",
    type: "checkbox",
    options: VEHICLE_TYPE_OPTIONS,
  },
  {
    id: "seats",
    label: "Seats",
    type: "radio",
    options: SEATS_OPTIONS,
  },
  {
    id: "pickupMethod",
    label: "Pickup method",
    type: "checkbox",
    options: PICKUP_METHOD_OPTIONS,
  },
  {
    id: "deliveryAvailable",
    label: "Delivery available",
    type: "toggle",
  },
  {
    id: "airportPickup",
    label: "Airport pickup",
    type: "toggle",
  },
  {
    id: "luxury",
    label: "Luxury",
    type: "toggle",
  },
  {
    id: "electric",
    label: "Electric",
    type: "toggle",
  },
  {
    id: "year",
    label: "Year",
    type: "range",
    range: {
      min: 2020,
      max: 2025,
      step: 1,
    },
  },
  {
    id: "rating",
    label: "Rating",
    type: "radio",
    options: RATING_OPTIONS,
  },
  {
    id: "features",
    label: "Features",
    type: "checkbox",
    options: FEATURE_OPTIONS,
  },
  {
    id: "transmission",
    label: "Transmission",
    type: "checkbox",
    options: TRANSMISSION_OPTIONS,
  },
  {
    id: "mileageAllowance",
    label: "Daily mileage allowance",
    type: "range",
    range: {
      min: 100,
      max: 300,
      step: 25,
      unit: "mi",
      formatLabel: (value) => `${value} mi/day`,
    },
  },
];

export const SEARCH_CATEGORY_TABS: FilterOption[] = [
  { value: "all", label: "All" },
  { value: "airports", label: "Airports" },
  { value: "monthly", label: "Monthly" },
  { value: "nearby", label: "Nearby" },
  { value: "delivered", label: "Delivered" },
  { value: "cities", label: "Cities" },
];

export type VehicleTypeFilter = VehicleType;
export type PickupMethodFilter = PickupMethod;

export interface SearchFilters {
  priceMin?: number;
  priceMax?: number;
  vehicleTypes?: VehicleType[];
  seatsMin?: number;
  pickupMethods?: PickupMethod[];
  deliveryAvailable?: boolean;
  airportPickup?: boolean;
  luxury?: boolean;
  electric?: boolean;
  yearMin?: number;
  yearMax?: number;
  ratingMin?: number;
  features?: string[];
  transmission?: string[];
  mileageAllowanceMin?: number;
  sort?: string;
  category?: string;
}

export const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  priceMin: 40,
  priceMax: 250,
  sort: "recommended",
  category: "all",
};
