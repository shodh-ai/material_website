import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import styles from "./blog.module.css";

const syne = localFont({
  src: "../../../public/shodh-new/Syne/Syne-VariableFont_wght.ttf",
  display: "swap",
  weight: "400 800",
  variable: "--heading-font",
});

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.site} ${syne.variable}`}>
      <a href="#main" className={styles.skip}>Skip to content</a>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner} ${syne.className}`}>
          <Link href="/" className={styles.brand} aria-label="Shodh AI home">
            <Image src="/shodhai_logo.svg" alt="" width={136} height={32} priority />
            <span>Blogs</span>
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/blog" className={styles.navCurrent} aria-current="location">Blogs</Link>
            <Link href="/">Shodh AI</Link>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1} className={styles.container}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner} ${syne.className}`}>
          <Link href="/">Shodh AI</Link>
        </div>
      </footer>
    </div>
  );
}
