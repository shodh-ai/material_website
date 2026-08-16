import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-17T00:00:00.000Z");

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
      url: "https://shodh.ai/world-model",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://shodh.ai/research/three-generations-of-foundation-models",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://shodh.ai/research/Foundation_World_Model_for_Physical_Intelligence.pdf",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
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
