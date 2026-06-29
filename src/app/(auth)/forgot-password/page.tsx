import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your Go Car Rentals password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
