import { z } from "zod";

export const driverDetailsSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .regex(/^[\d\s()+-]+$/, "Enter a valid phone number"),
  dateOfBirth: z.coerce
    .date({ invalid_type_error: "Enter a valid date of birth" })
    .refine((date) => {
      const age = (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      return age >= 21;
    }, "Drivers must be at least 21 years old"),
  licenseNumber: z
    .string()
    .trim()
    .min(4, "License number is required")
    .max(20, "License number is too long"),
  licenseState: z
    .string()
    .trim()
    .length(2, "Use a two-letter state code")
    .toUpperCase(),
  licenseExpiry: z.coerce.date({
    invalid_type_error: "Enter a valid license expiry date",
  }),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

export type DriverDetails = z.infer<typeof driverDetailsSchema>;

export const driverDetailsPartialSchema = driverDetailsSchema.partial();

export type DriverDetailsPartial = z.infer<typeof driverDetailsPartialSchema>;
