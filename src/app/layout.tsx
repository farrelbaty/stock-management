import type { Metadata } from "next";

import "./globals.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "CDL ",
  description: "Gestion de stock Centre diagnostic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
