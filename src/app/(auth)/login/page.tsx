import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Go Car Rentals account.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-body-md text-go-muted">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
