import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(20, "Enter a valid phone number"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
