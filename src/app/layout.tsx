import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Go — Car Rentals",
  description: "Find the right car for the way you move. Airport pickup, local delivery, and flexible rentals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className={`${GeistSans.className} min-h-screen`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
