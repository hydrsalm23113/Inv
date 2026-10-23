import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "INVITO — دعوات إلكترونية بتفاصيل لا تُنسى",
  description: "صمّم دعوتك الإلكترونية وشارك لحظاتك المميزة مع INVITO.",
  metadataBase: new URL("https://invito.example"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
