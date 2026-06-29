"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { AuthCard } from "@/components/auth/auth-card";
import { TextInput } from "@/components/go/forms";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link as UiLink } from "@/components/ui/link";

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, acceptTerms }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Unable to create account");
        return;
      }

      toast.success("Account created! Check your email to verify your address.");
      router.push("/account/profile");
      router.refresh();
    } catch {
      toast.error("Unable to create account");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Create your account"
      description="Book rentals, manage trips, and save payment methods."
      footer={
        <>
          <span className="text-go-muted">Already have an account? </span>
          <UiLink href="/login">Sign in</UiLink>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="First name"
            autoComplete="given-name"
            required
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
          />
          <TextInput
            label="Last name"
            autoComplete="family-name"
            required
            value={form.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
          />
        </div>
        <TextInput
          label="Phone number"
          type="tel"
          autoComplete="tel"
          required
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />
        <TextInput
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
        <TextInput
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          helperText="At least 8 characters"
          value={form.password}
          onChange={(event) => updateField("password", event.target.value)}
        />
        <div className="flex items-start gap-3">
          <Checkbox
            id="acceptTerms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked === true)}
          />
          <Label htmlFor="acceptTerms" className="text-body-sm leading-snug text-go-muted">
            I agree to the terms and conditions and privacy policy.
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthCard>
  );
}
