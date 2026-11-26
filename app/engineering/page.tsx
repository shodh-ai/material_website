import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../blog/posts";
import styles from "../blog/(public)/blog.module.css";

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
  return (
    <>
      <header className={styles.hero}>
        
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1>Engineering<span>.</span></h1>
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
            <Link href={`/engineering/${post.slug}`}>
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

