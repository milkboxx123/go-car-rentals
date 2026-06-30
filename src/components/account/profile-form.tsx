"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { AccountFormGrid } from "@/components/account/account-form-grid";
import { AccountSectionCard } from "@/components/account/account-section-card";
import { TextInput } from "@/components/go/forms";
import { Button } from "@/components/ui/button";
import { UnsavedChangesDialog } from "@/components/ui/unsaved-changes-dialog";
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes";

function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export interface ProfileFormProps {
  initialData: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    emailVerified: boolean;
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [form, setForm] = useState({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    phone: formatPhoneInput(initialData.phone),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedBaseline, setSavedBaseline] = useState(() => ({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    phone: formatPhoneInput(initialData.phone),
  }));

  const isDirty = useMemo(
    () =>
      form.firstName !== savedBaseline.firstName ||
      form.lastName !== savedBaseline.lastName ||
      form.phone !== savedBaseline.phone,
    [form, savedBaseline]
  );

  function updateField(field: keyof typeof form, value: string) {
    const next =
      field === "phone" ? formatPhoneInput(value) : value;
    setForm((current) => ({ ...current, [field]: next }));
  }

  const saveForm = useCallback(async (): Promise<boolean> => {
    if (!isDirty) return true;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone.replace(/\D/g, ""),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Unable to update profile");
        return false;
      }

      toast.success("Profile updated");
      setSavedBaseline({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
      });
      return true;
    } catch {
      toast.error("Unable to update profile");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isDirty]);

  const { dialogProps } = useUnsavedChanges({
    isDirty,
    onSave: saveForm,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveForm();
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <AccountSectionCard
        title="Personal information"
        description="Keep your contact information up to date so the Go team can reach you about rentals."
        footer={
          <div className="flex justify-end">
            <Button type="submit" disabled={!isDirty || isSubmitting} loading={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <AccountFormGrid>
            <TextInput
              label="First name"
              required
              value={form.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
            />
            <TextInput
              label="Last name"
              required
              value={form.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
            />
          </AccountFormGrid>
          <TextInput
            label="Phone number"
            type="tel"
            required
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            helperText="Used for rental updates and pickup coordination."
          />
          <TextInput
            label="Email"
            type="email"
            value={initialData.email}
            disabled
            helperText={
              initialData.emailVerified
                ? undefined
                : "Check your inbox to verify your email address."
            }
          />
        </div>
      </AccountSectionCard>
    </form>
    <UnsavedChangesDialog {...dialogProps} />
    </>
  );
}
