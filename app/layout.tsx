import type { Metadata } from "next";
 import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shodh.ai"),
  title: "Shodh AI | AI for Materials Discovery & Physical Invention",
  description:
    "Shodh AI builds foundation models for physical invention—accelerating materials discovery, process design, and manufacturing from atoms to factories.",
  applicationName: "Shodh AI",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Shodh AI",
    title: "Shodh AI | AI for Materials Discovery & Physical Invention",
    description:
      "Foundation models for physical invention, from atoms to factories.",
  },
  twitter: {
    card: "summary",
    title: "Shodh AI | AI for Materials Discovery & Physical Invention",
    description:
      "Foundation models for physical invention, from atoms to factories.",
  },
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
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "Shodh AI",
                  alternateName: "Shodh",
                  url: "https://shodh.ai/",
                },
                {
                  "@type": "Organization",
                  name: "Shodh AI",
                  url: "https://shodh.ai/",
                  logo: "https://shodh.ai/Logo_White%20BG.png",
                  sameAs: ["https://www.linkedin.com/company/shodh-ai/"],
                  description:
                    "Shodh AI builds foundation models for physical invention, materials discovery, process design, and manufacturing.",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
