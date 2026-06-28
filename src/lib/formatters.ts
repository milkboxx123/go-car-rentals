import { format, differenceInDays } from "date-fns";

export function formatPrice(
  amount: number,
  options?: { currency?: string; minimumFractionDigits?: number }
) {
  const { currency = "USD", minimumFractionDigits = 0 } = options ?? {};
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits: minimumFractionDigits,
  }).format(amount);
}

export function formatDateRange(start: Date, end: Date) {
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${format(start, "MMM d")} – ${format(end, "d, yyyy")}`;
  }
  return `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;
}

export function formatVehicleName(vehicle: {
  year: number;
  make: string;
  model: string;
  trim?: string;
}) {
  const base = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  return vehicle.trim ? `${base} ${vehicle.trim}` : base;
}

export function calculateTripTotal(dailyRate: number, start: Date, end: Date) {
  const days = Math.max(1, differenceInDays(end, start));
  return dailyRate * days;
}
