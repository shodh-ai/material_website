import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://shodh.ai/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://shodh.ai/research",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://shodh.ai/materials-discovery",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://shodh.ai/project-skanda",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://shodh.ai/careers",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
