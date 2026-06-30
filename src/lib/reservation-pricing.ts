import { randomBytes } from "crypto";

export function generateConfirmationNumber(): string {
  const segment = randomBytes(3).toString("hex").toUpperCase();
  return `GO-${segment}`;
}

export function calculateRentalDays(startDate: Date, endDate: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / msPerDay);
  return Math.max(1, days);
}

export function calculateReservationTotalCents(opts: {
  dailyRateCents: number;
  days: number;
  protectionPerDayCents?: number;
  taxRate?: number;
}): number {
  const { dailyRateCents, days, protectionPerDayCents = 0, taxRate = 0.15 } = opts;
  const subtotal = dailyRateCents * days;
  const protection = protectionPerDayCents * days;
  const taxable = subtotal + protection;
  const taxes = Math.round(taxable * taxRate);
  return subtotal + protection + taxes;
}
