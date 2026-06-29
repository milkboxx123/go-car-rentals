import type { Metadata } from "next";

import { VerifyEmailClient } from "@/components/auth/verify-email-client";

export const metadata: Metadata = {
  title: "Verify email",
  description: "Verify your Go Car Rentals email address.",
};

interface VerifyEmailPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = await searchParams;
  return <VerifyEmailClient token={params.token ?? null} />;
}
