"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";

import { TextInput, SelectField } from "@/components/go/forms";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import {
  contactSchema,
  contactTopicLabels,
  contactTopicValues,
} from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";

type FormData = z.infer<typeof contactSchema>;

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  topic: "general",
  message: "",
};

export interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
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

    const payload = {
      ...form,
      phone: form.phone?.trim() || undefined,
    };

    const result = contactSchema.safeParse(payload);
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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        toast.error(data.error ?? "Unable to send your message. Please try again.");
        setSubmitting(false);
        return;
      }

      toast.success(data.message ?? "Thanks for reaching out. We will get back to you soon.");
      setForm(initialFormData);
    } catch {
      toast.error("Unable to send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-go-border bg-go-paper p-6 shadow-card sm:p-8",
        className
      )}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          error={errors.name}
          required
          className="sm:col-span-2"
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
          value={form.phone ?? ""}
          onChange={(e) => updateField("phone", e.target.value)}
          error={errors.phone}
          helperText="Optional"
        />
        <SelectField
          label="Topic"
          value={form.topic}
          onValueChange={(value) => updateField("topic", value as FormData["topic"])}
          placeholder="Select a topic"
          error={errors.topic}
          className="sm:col-span-2"
        >
          {contactTopicValues.map((value) => (
            <SelectItem key={value} value={value}>
              {contactTopicLabels[value]}
            </SelectItem>
          ))}
        </SelectField>
        <div className="sm:col-span-2">
          <Label htmlFor="contact-message" className="mb-1.5 block text-label">
            Message
          </Label>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            className={cn(
              "w-full rounded-lg border border-go-border bg-go-paper px-3 py-2 text-body-md text-go-ink placeholder:text-go-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold",
              errors.message && "border-go-danger"
            )}
            placeholder="Tell us how we can help."
            required
          />
          {errors.message ? (
            <p className="mt-1 text-caption text-go-danger">{errors.message}</p>
          ) : null}
        </div>
      </div>
      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="mt-8 w-full sm:w-auto"
        disabled={submitting}
        loading={submitting}
      >
        Send message
      </Button>
    </form>
  );
}
