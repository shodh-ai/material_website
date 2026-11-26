import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogAuthor, blogPosts, postDate } from "../posts";
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
  const [featured, ...otherPosts] = blogPosts;

  return (
    <>
      <header className={styles.hero}>
        <h1>Blogs<span>.</span></h1>
        <p>{description}</p>
      </header>
      <article className={styles.featured}>
        <div className={styles.featuredCopy}>
          <p className={styles.eyebrow}>{featured.topic}</p>
          <h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
          <p className={styles.summary}>{featured.description}</p>
          <p className={styles.byline}>
            {blogAuthor}<span aria-hidden="true">·</span>
            <time dateTime={featured.date}>{postDate.format(new Date(featured.date))}</time>
          </p>
          <div className={styles.actions}>
            <Link className={styles.button} href={`/blog/${featured.slug}`}>Read article</Link>
          </div>
        </div>
        <div className={styles.cover}>
          <Image
            src={featured.cover.src}
            alt={featured.cover.alt}
            width={featured.cover.width}
            height={featured.cover.height}
            priority
            sizes="(max-width: 760px) 90vw, 48vw"
          />
        </div>
      </article>
      {otherPosts.length > 0 && (
        <section className={styles.collection} aria-labelledby="posts-title">
          <h2 id="posts-title">More articles</h2>
          <div className={styles.cardGrid}>
            {otherPosts.map((post) => (
              <article className={styles.card} key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <Image alt="" src={post.cover.src} width={post.cover.width} height={post.cover.height} sizes="(max-width: 760px) 90vw, 30vw" />
                  <span className={styles.eyebrow}>{post.topic}</span>
                  <h3>{post.title}</h3>
                  <p className={styles.summary}>{post.description}</p>
                  <p className={styles.byline}>
                    {blogAuthor}<span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{postDate.format(new Date(post.date))}</time>
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
