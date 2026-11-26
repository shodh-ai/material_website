import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../posts";
import HeroMotion from "./hero-motion";
import styles from "./blog.module.css";

const description = "Engineering notes on physical simulation, scientific AI, and the systems behind Shodh’s research.";

export const metadata: Metadata = {
  title: "Blogs | Shodh AI",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blogs | Shodh AI",
    description,
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndex() {
  return (
    <>
      <header className={styles.hero}>
        <HeroMotion />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1>Blogs<span>.</span></h1>
            <p>{description}</p>
          </div>
          <Image
            className={styles.heroSymbol}
            src="/blog/hero/shodh-symbol.svg"
            width={144}
            height={144}
            alt=""
            unoptimized
          />
        </div>
      </header>
      <section className={styles.cardGrid} aria-label="Articles">
        {blogPosts.map((post) => (
          <article className={styles.card} key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <Image
                alt=""
                src={post.cover.src}
                width={post.cover.width}
                height={post.cover.height}
                sizes="(max-width: 640px) 88vw, (max-width: 1023px) 44vw, (max-width: 1309px) 29vw, 22rem"
              />
              <span className={styles.eyebrow}>{post.topic}</span>
              <h2>{post.title}</h2>
              <p className={styles.summary}>{post.description}</p>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
