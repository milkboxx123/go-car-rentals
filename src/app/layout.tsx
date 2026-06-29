import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { FavoritesProvider } from "@/components/booking/favorites-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.defaultDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className={`${GeistSans.className} min-h-screen`}>
        <FavoritesProvider>{children}</FavoritesProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
