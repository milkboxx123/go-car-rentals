import type { Metadata } from "next";

import { DesignSystemShell } from "@/components/design-system";

export const metadata: Metadata = {
  title: "Design System — Go (internal)",
  description: "Internal component reference for the Go design system.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DesignSystemShell>{children}</DesignSystemShell>;
}
