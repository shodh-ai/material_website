import PlainEnglishSummary from "../../blog/plain-english-summary";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogAuthor, blogPosts, postDate } from "../../blog/posts";
import styles from "../../blog/(public)/blog.module.css";

type PageProps = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

function getPost(slug: string) {
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) notFound();
  return post;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPost(params.slug);
  const canonical = `/engineering/${post.slug}`;

  return {
    title: `${post.title} | Shodh AI`,
    description: post.description,
    alternates: { canonical },
    authors: [{ name: blogAuthor }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      authors: [blogAuthor],
      images: [{ url: post.cover.src, alt: post.cover.alt, width: post.cover.width, height: post.cover.height, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover.src],
    },
  };
}

export default function BlogArticle({ params }: PageProps) {
  const post = getPost(params.slug);
  const { Content } = post;

  return (
    <article>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/engineering">Engineering</Link>
        <span aria-hidden="true">/</span>
        <span>{post.topic}</span>
      </nav>
      <header className={styles.articleHeading}>
        <h1>{post.title}</h1>
        <p className={styles.summary}>{post.subtitle ?? post.description}</p>
        <p className={styles.byline}>
          {blogAuthor}<span aria-hidden="true">·</span>
          <time dateTime={post.date}>{postDate.format(new Date(post.date))}</time>
        </p>
      </header>
      <PlainEnglishSummary {...post.plainEnglish} />
      <div className={styles.articleLayout}>
        <nav className={styles.contents} aria-label="On this page">
          <p>On this page</p>
          <ul>
            {post.sections.map(({ id, title }) => (
              <li key={id}><a href={`#${id}`}>{title}</a></li>
            ))}
          </ul>
        </nav>
        <div className={styles.prose}><Content /></div>
      </div>
    </article>
  );
}

