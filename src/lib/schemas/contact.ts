import { z } from "zod";

export const contactTopicValues = [
  "booking",
  "pickup",
  "change",
  "payment",
  "vehicle",
  "lost-item",
  "general",
] as const;

export type ContactTopic = (typeof contactTopicValues)[number];

export const contactTopicLabels: Record<ContactTopic, string> = {
  booking: "Booking question",
  pickup: "Pickup or delivery",
  change: "Change or extend a trip",
  payment: "Payment question",
  vehicle: "Vehicle issue",
  "lost-item": "Lost item",
  general: "General support",
};

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  topic: z.enum(contactTopicValues, {
    errorMap: () => ({ message: "Select a topic" }),
  }),
  message: z
    .string()
    .min(10, "Please provide more detail in your message")
    .max(2000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;
