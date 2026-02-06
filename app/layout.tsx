import type { Metadata } from "next";
 import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shodh AI",
  description: "Generative AI for material science.",
  icons: {
    icon: "/Logo_White%20BG.png",
    apple: "/Logo_White%20BG.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
