import type { Metadata } from "next";
import { blogPosts } from "../blog/posts";
import EngineeringIndex, { type EngineeringCard } from "./engineering-index";

const description = "Engineering notes on physical simulation, scientific AI, and the systems behind Shodh’s research.";

export const metadata: Metadata = {
  title: "Engineering | Shodh AI",
  description,
  alternates: { canonical: "/engineering" },
  openGraph: {
    title: "Engineering | Shodh AI",
    description,
    url: "/engineering",
    type: "website",
  },
};

export default function BlogIndex() {
  // Only plain card data crosses into the client component (not the article bodies).
  const posts: EngineeringCard[] = blogPosts.map(({ slug, topic, title, description, cover }) => ({
    slug,
    topic,
    title,
    description,
    // Cards prefer the crisp vector cover (720 × 405) when a post provides one.
    cover: cover.cardSrc
      ? { src: cover.cardSrc, width: 720, height: 405 }
      : { src: cover.src, width: cover.width, height: cover.height },
  }));
  return <EngineeringIndex posts={posts} description={description} />;
}
