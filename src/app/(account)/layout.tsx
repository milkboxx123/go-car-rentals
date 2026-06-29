import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AccountShell } from "@/components/account/account-shell";
import { AppHeaderShell } from "@/components/layout/app-header-shell";
import { Footer } from "@/components/layout";
import { getCurrentUser } from "@/lib/auth-server";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-go-cream">
      <AppHeaderShell className="bg-go-paper" />

      <AccountShell>{children}</AccountShell>

      <Footer />
    </div>
  );
}
