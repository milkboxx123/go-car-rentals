import { z } from "zod";

const vehicleTypeSchema = z.enum([
  "car",
  "suv",
  "truck",
  "minivan",
  "luxury",
  "convertible",
  "electric",
  "van",
]);

const pickupMethodSchema = z.enum([
  "lot",
  "airport",
  "delivery",
  "hotel",
  "custom-address",
]);

const sortOptionSchema = z.enum([
  "recommended",
  "price-asc",
  "price-desc",
  "rating-desc",
  "newest",
  "closest",
]);

const categorySchema = z.enum([
  "all",
  "airports",
  "monthly",
  "nearby",
  "delivered",
  "cities",
]);

const timeStringSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):(00|15|30|45)$/, "Time must be in 15-minute increments");

export const searchParamsSchema = z
  .object({
    location: z.string().trim().min(1).optional(),
    locationId: z.string().trim().min(1).optional(),
    query: z.string().trim().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    startTime: timeStringSchema.optional(),
    endTime: timeStringSchema.optional(),
    priceMin: z.coerce.number().min(0).optional(),
    priceMax: z.coerce.number().min(0).optional(),
    vehicleTypes: z.array(vehicleTypeSchema).optional(),
    seatsMin: z.coerce.number().int().min(1).optional(),
    pickupMethods: z.array(pickupMethodSchema).optional(),
    deliveryAvailable: z.coerce.boolean().optional(),
    airportPickup: z.coerce.boolean().optional(),
    luxury: z.coerce.boolean().optional(),
    electric: z.coerce.boolean().optional(),
    yearMin: z.coerce.number().int().optional(),
    yearMax: z.coerce.number().int().optional(),
    ratingMin: z.coerce.number().min(0).max(5).optional(),
    features: z.array(z.string()).optional(),
    transmission: z.array(z.enum(["automatic", "manual"])).optional(),
    mileageAllowanceMin: z.coerce.number().min(0).optional(),
    sort: sortOptionSchema.optional(),
    category: categorySchema.optional(),
    promoCode: z.string().trim().optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate >= data.startDate;
      }
      return true;
    },
    { message: "End date must be on or after start date", path: ["endDate"] }
  )
  .refine(
    (data) => {
      if (data.priceMin !== undefined && data.priceMax !== undefined) {
        return data.priceMax >= data.priceMin;
      }
      return true;
    },
    { message: "Maximum price must be greater than or equal to minimum price", path: ["priceMax"] }
  );

export type SearchParams = z.infer<typeof searchParamsSchema>;

export {
  vehicleTypeSchema,
  pickupMethodSchema,
  sortOptionSchema,
  categorySchema,
  timeStringSchema,
};
