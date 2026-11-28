"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./engineering.module.css";
import { mountFluid, type Theme } from "./fluid-scene";

export type EngineeringCard = {
  slug: string;
  topic: string;
  title: string;
  description: string;
  cover: { src: string; width: number; height: number };
};

const ROOT_ID = "engineering-index";
// Dark is the default; the home page's light choice (`shodh-theme`) carries over.
// Runs while the HTML is parsed, so a light-mode visitor never sees a dark flash.
const THEME_BOOT = `try{if(localStorage.getItem('shodh-theme')==='light')document.getElementById('${ROOT_ID}').setAttribute('data-theme','light')}catch(e){}`;
// Without JavaScript the cards are shown immediately.
const NO_SCRIPT = `<style>[data-motion] [data-card]{opacity:1!important;animation:none!important}</style>`;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Cards fly in from the four corners, gather into a deck, then deal out into the grid. */
function playEntrance(grid: HTMLElement): () => void {
  const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-card]"));
  if (!cards.length || typeof cards[0].animate !== "function") {
    grid.dataset.motion = "done";
    return () => {};
  }
  grid.dataset.motion = "running";

  let animations: Animation[];
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animations = cards.map((card, i) =>
      card.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, delay: i * 40, fill: "both" }),
    );
  } else {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const g = grid.getBoundingClientRect();
    // The deck forms in the middle of the part of the grid that is on screen.
    const stackX = g.left + g.width / 2;
    const stackY = (Math.max(g.top, 0) + Math.min(g.bottom, vh)) / 2;
    const n = cards.length;
    const arriveStep = 0.06;
    const dealStep = 0.07;
    const holdEnd = 0.5 + (n - 1) * arriveStep + 0.25; // all cards in the deck, brief pause
    const total = holdEnd + 0.6 + (n - 1) * dealStep;

    animations = cards.map((card, i) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const corner = i % 4; // top-left, top-right, bottom-right, bottom-left
      const fromX = (corner === 0 || corner === 3 ? -r.width * 0.65 : vw + r.width * 0.65) - cx;
      const fromY = (corner < 2 ? -r.height * 0.65 : vh + r.height * 0.65) - cy;
      const deckX = stackX - cx + ((i % 3) - 1) * 6;
      const deckY = stackY - cy - i * 3;
      const tilt = (i % 2 ? 1 : -1) * (2 + ((i * 5) % 7));
      const spin = corner === 0 || corner === 2 ? -28 : 28;
      const arrive = 0.5 + i * arriveStep;
      const land = holdEnd + 0.6 + (n - 1 - i) * dealStep; // top card is dealt first
      const deck = `translate(${deckX}px, ${deckY}px) rotate(${tilt}deg) scale(0.8)`;
      card.style.zIndex = String(10 + i);
      return card.animate(
        [
          { offset: 0, opacity: 0, transform: `translate(${fromX}px, ${fromY}px) rotate(${spin}deg) scale(0.5)`, easing: "cubic-bezier(.16,.84,.3,1)" },
          { offset: arrive / total, opacity: 1, transform: deck, easing: "linear" },
          { offset: (land - 0.6) / total, opacity: 1, transform: deck, easing: "cubic-bezier(.22,1,.36,1)" },
          { offset: land / total, opacity: 1, transform: "none" },
          { offset: 1, opacity: 1, transform: "none" },
        ],
        { duration: total * 1000, fill: "both" },
      );
    });
  }

  let cancelled = false;
  Promise.all(animations.map((a) => a.finished))
    .then(() => {
      if (cancelled) return;
      grid.dataset.motion = "done";
      animations.forEach((a) => a.cancel());
      cards.forEach((card) => { card.style.zIndex = ""; });
    })
    .catch(() => { /* cancelled */ });

  return () => {
    cancelled = true;
    animations.forEach((a) => a.cancel());
    cards.forEach((card) => { card.style.zIndex = ""; });
  };
}

export default function EngineeringIndex({ posts, description }: { posts: EngineeringCard[]; description: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const rootRef = useRef<HTMLDivElement>(null);
  const fluidRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  // Pick up the theme the boot script applied before hydration.
  useIsoLayoutEffect(() => {
    if (rootRef.current?.dataset.theme === "light") setTheme("light");
  }, []);

  useIsoLayoutEffect(() => (gridRef.current ? playEntrance(gridRef.current) : undefined), []);

  useEffect(() => (fluidRef.current ? mountFluid(fluidRef.current, theme) : undefined), [theme]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("shodh-theme", next); } catch { /* storage blocked */ }
  };

  return (
    <div id={ROOT_ID} ref={rootRef} className={styles.root} data-eng-index="" data-theme={theme} suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      <noscript dangerouslySetInnerHTML={{ __html: NO_SCRIPT }} />
      <div ref={fluidRef} className={styles.fluid} aria-hidden="true" />

      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link href="/" className={styles.brand} aria-label="Shodh AI home">
            <Image src="/shodhai_logo.svg" alt="" width={136} height={32} priority />
            <span>Engineering</span>
          </Link>
          <div className={styles.topbarRight}>
            <nav aria-label="Main navigation">
              <Link href="/">Home</Link>
              <a href="/research">Research</a>
              <Link href="/careers">Careers</Link>
            </nav>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Use light mode" : "Use dark mode"}
              suppressHydrationWarning
            >
              <svg className={styles.iconSun} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg className={styles.iconMoon} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <section className={styles.intro}>
        <h1>Engineering<span>.</span></h1>
        <p>{description}</p>
      </section>

      <section ref={gridRef} className={styles.grid} data-motion="pending" aria-label="Articles">
        {posts.map((post) => (
          <article className={styles.card} data-card="" key={post.slug}>
            <Link href={`/engineering/${post.slug}`}>
              <div className={styles.media}>
                <Image
                  alt=""
                  src={post.cover.src}
                  width={post.cover.width}
                  height={post.cover.height}
                  sizes="(max-width: 640px) 88vw, (max-width: 1023px) 44vw, (max-width: 1309px) 29vw, 22rem"
                />
              </div>
              <span className={styles.eyebrow}>{post.topic}</span>
              <h2>{post.title}</h2>
              <p className={styles.summary}>{post.description}</p>
              <span className={styles.readMore}>Read article <span aria-hidden="true">→</span></span>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
