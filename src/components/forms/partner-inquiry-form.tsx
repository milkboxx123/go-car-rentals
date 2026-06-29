"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";

import { TextInput } from "@/components/go/forms";
import { SelectField } from "@/components/go/forms";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const partnerTypes = [
  "Individual vehicle owner",
  "Fleet owner",
  "Dealership",
  "Hotel/property owner",
  "Property manager",
  "Maintenance partner",
  "Investor",
  "Other",
] as const;

const ownershipOptions = ["Own", "Lease", "Mix of own and lease"] as const;

const partnerInquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  company: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required"),
  partnerType: z.string().min(1, "Select a partner type"),
  vehicleCount: z.string().min(1, "Enter number of vehicles"),
  vehicleTypes: z.string().min(1, "Describe vehicle types"),
  ownership: z.string().min(1, "Select ownership type"),
  hasLocation: z.string().min(1, "Select an option"),
  message: z.string().min(10, "Please provide more detail in your message"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
});

type FormData = z.infer<typeof partnerInquirySchema>;

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  city: "",
  state: "",
  partnerType: "",
  vehicleCount: "",
  vehicleTypes: "",
  ownership: "",
  hasLocation: "",
  message: "",
  consent: false,
};

export interface PartnerInquiryFormProps {
  className?: string;
}

export function PartnerInquiryForm({ className }: PartnerInquiryFormProps) {
  const [form, setForm] = React.useState<FormData>(initialFormData);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = React.useState(false);

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);

    const result = partnerInquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Thanks for your inquiry! We'll review your submission and be in touch.");
    setForm(initialFormData);
    setSubmitting(false);
  }

  return (
    <form
      id="partner-form"
      onSubmit={handleSubmit}
      className={cn("rounded-2xl border border-go-border bg-go-paper p-6 shadow-card sm:p-8", className)}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="First name"
          value={form.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          error={errors.firstName}
          required
        />
        <TextInput
          label="Last name"
          value={form.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          error={errors.lastName}
          required
        />
        <TextInput
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
          required
        />
        <TextInput
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          error={errors.phone}
          required
        />
        <TextInput
          label="Company"
          value={form.company}
          onChange={(e) => updateField("company", e.target.value)}
          className="sm:col-span-2"
        />
        <TextInput
          label="City"
          value={form.city}
          onChange={(e) => updateField("city", e.target.value)}
          error={errors.city}
          required
        />
        <TextInput
          label="State"
          value={form.state}
          onChange={(e) => updateField("state", e.target.value)}
          error={errors.state}
          required
        />
        <SelectField
          label="Partner type"
          value={form.partnerType}
          onValueChange={(value) => updateField("partnerType", value)}
          placeholder="Select partner type"
          error={errors.partnerType}
        >
          {partnerTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectField>
        <TextInput
          label="Number of vehicles"
          value={form.vehicleCount}
          onChange={(e) => updateField("vehicleCount", e.target.value)}
          error={errors.vehicleCount}
          required
        />
        <TextInput
          label="Vehicle types"
          value={form.vehicleTypes}
          onChange={(e) => updateField("vehicleTypes", e.target.value)}
          placeholder="e.g. SUVs, sedans, luxury"
          error={errors.vehicleTypes}
          className="sm:col-span-2"
          required
        />
        <SelectField
          label="Do you own or lease the vehicles?"
          value={form.ownership}
          onValueChange={(value) => updateField("ownership", value)}
          placeholder="Select ownership"
          error={errors.ownership}
        >
          {ownershipOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectField>
        <SelectField
          label="Is there an operating location?"
          value={form.hasLocation}
          onValueChange={(value) => updateField("hasLocation", value)}
          placeholder="Select an option"
          error={errors.hasLocation}
        >
          <SelectItem value="Yes">Yes</SelectItem>
          <SelectItem value="No">No</SelectItem>
          <SelectItem value="Planned">Planned</SelectItem>
        </SelectField>
        <div className="sm:col-span-2">
          <Label htmlFor="message" className="mb-1.5 block text-label">
            Message
          </Label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            className={cn(
              "w-full rounded-lg border border-go-border bg-go-paper px-3 py-2 text-body-md text-go-ink placeholder:text-go-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold",
              errors.message && "border-go-danger"
            )}
            placeholder="Tell us about your vehicles, location, and goals."
            required
          />
          {errors.message ? (
            <p className="mt-1 text-caption text-go-danger">{errors.message}</p>
          ) : null}
        </div>
        <div className="flex items-start gap-3 sm:col-span-2">
          <Checkbox
            id="consent"
            checked={form.consent}
            onCheckedChange={(checked) => updateField("consent", checked === true)}
          />
          <Label htmlFor="consent" className="text-body-sm text-go-muted leading-relaxed">
            I agree to be contacted about partnership opportunities. Go will use this
            information to review my inquiry.
          </Label>
        </div>
        {errors.consent ? (
          <p className="text-caption text-go-danger sm:col-span-2">{errors.consent}</p>
        ) : null}
      </div>
      <Button type="submit" variant="gold" size="lg" className="mt-8 w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit inquiry"}
      </Button>
    </form>
  );
}
