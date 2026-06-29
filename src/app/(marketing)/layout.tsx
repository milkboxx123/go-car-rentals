import { Footer } from "@/components/layout";
import { MarketingHeaderShell } from "@/components/layout/marketing-header-shell";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-go-cream">
      <MarketingHeaderShell variant="dark" />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
