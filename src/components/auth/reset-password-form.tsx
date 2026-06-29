"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { AuthCard } from "@/components/auth/auth-card";
import { TextInput } from "@/components/go/forms";
import { Button } from "@/components/ui/button";
import { Link as UiLink } from "@/components/ui/link";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Unable to reset password");
        return;
      }

      toast.success("Password updated. You can sign in now.");
      router.push("/login");
    } catch {
      toast.error("Unable to reset password");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <AuthCard
        title="Invalid reset link"
        description="This password reset link is missing or invalid."
        footer={<UiLink href="/forgot-password">Request a new link</UiLink>}
      />
    );
  }

  return (
    <AuthCard
      title="Reset password"
      description="Choose a new password for your account."
      footer={
        <>
          <span className="text-go-muted">Back to </span>
          <UiLink href="/login">Sign in</UiLink>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="New password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextInput
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update password"}
        </Button>
      </form>
    </AuthCard>
  );
}
