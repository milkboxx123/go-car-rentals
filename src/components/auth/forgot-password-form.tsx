"use client";

import { useState } from "react";
import { toast } from "sonner";

import { AuthCard } from "@/components/auth/auth-card";
import { TextInput } from "@/components/go/forms";
import { Button } from "@/components/ui/button";
import { Link as UiLink } from "@/components/ui/link";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Unable to send reset link");
        return;
      }

      setSubmitted(true);
      toast.success("If an account exists, a reset link has been sent.");
    } catch {
      toast.error("Unable to send reset link");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Forgot password"
      description={
        submitted
          ? "Check your email for a link to reset your password."
          : "Enter your email and we'll send you a reset link."
      }
      footer={
        <>
          <span className="text-go-muted">Remember your password? </span>
          <UiLink href="/login">Sign in</UiLink>
        </>
      }
    >
      {submitted ? (
        <p className="text-body-md text-go-muted">
          If an account exists for that email, you&apos;ll receive a password reset
          link shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
