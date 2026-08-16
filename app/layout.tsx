import type { Metadata } from "next";
 import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shodh.ai"),
  title: "Shodh AI | Physical Design Foundation Models",
  description:
    "Shodh AI builds Physical Design Foundation Models that predict, optimize, and design coupled physical systems from molecules to factories.",
  applicationName: "Shodh AI",
  authors: [{ name: "Shodh AI", url: "https://shodh.ai" }],
  creator: "Shodh AI",
  publisher: "Shodh AI",
  keywords: [
    "Shodh AI",
    "Physical Design Foundation Models",
    "physical intelligence",
    "foundation World Model",
    "inverse design",
    "industrial AI",
    "AI for manufacturing",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Shodh AI",
    title: "Shodh AI | Physical Design Foundation Models",
    description:
      "Physical Design Foundation Models for coupled physical systems, from molecules to factories.",
    images: [{ url: "/webgl-bg-foundation-v2.png", width: 1600, height: 900, alt: "Shodh AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shodh AI | Physical Design Foundation Models",
    description:
      "Physical Design Foundation Models for coupled physical systems, from molecules to factories.",
    images: ["/webgl-bg-foundation-v2.png"],
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
                  "@id": "https://shodh.ai/#website",
                  name: "Shodh AI",
                  alternateName: "Shodh",
                  url: "https://shodh.ai/",
                },
                {
                  "@type": "Organization",
                  "@id": "https://shodh.ai/#organization",
                  name: "Shodh AI",
                  alternateName: "Shodh",
                  url: "https://shodh.ai/",
                  logo: "https://shodh.ai/Logo_White%20BG.png",
                  sameAs: ["https://www.linkedin.com/company/shodh-ai/"],
                  description:
                    "Shodh AI builds Physical Design Foundation Models for cross-scale physical intelligence, inverse design, industrial scale-up, and manufacturing.",
                  knowsAbout: [
                    "Physical Design Foundation Models",
                    "Physical intelligence",
                    "Cross-scale inverse design",
                    "Industrial scale-up",
                    "AI for manufacturing",
                  ],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
