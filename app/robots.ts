import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://shodh.ai/sitemap.xml",
    host: "https://shodh.ai",
  };
}
