"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Link as UiLink } from "@/components/ui/link";

interface VerifyEmailClientProps {
  token: string | null;
}

export function VerifyEmailClient({ token }: VerifyEmailClientProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error"
  );
  const [message, setMessage] = useState(
    token ? "Verifying your email..." : "Verification token is missing."
  );

  useEffect(() => {
    if (!token) return;

    async function verifyEmail() {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          setStatus("error");
          setMessage(data.error ?? "Unable to verify email");
          toast.error(data.error ?? "Unable to verify email");
          return;
        }

        setStatus("success");
        setMessage(data.message ?? "Email verified successfully");
        toast.success("Email verified!");
      } catch {
        setStatus("error");
        setMessage("Unable to verify email");
        toast.error("Unable to verify email");
      }
    }

    verifyEmail();
  }, [token]);

  return (
    <AuthCard
      title={status === "success" ? "Email verified" : "Email verification"}
      description={message}
      footer={
        status === "success" ? (
          <UiLink href="/account/profile">Go to your profile</UiLink>
        ) : (
          <UiLink href="/login">Back to sign in</UiLink>
        )
      }
    >
      {status === "loading" ? (
        <Button className="w-full" disabled>
          Verifying...
        </Button>
      ) : null}
    </AuthCard>
  );
}
