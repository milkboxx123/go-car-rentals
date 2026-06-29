import type { Metadata } from "next";
import { Suspense } from "react";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Choose a new password for your Go Car Rentals account.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-body-md text-go-muted">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
