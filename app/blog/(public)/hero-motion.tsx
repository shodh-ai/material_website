"use client";

import { useEffect, useState } from "react";
import styles from "./blog.module.css";

export default function HeroMotion() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setEnabled(!preference.matches);
      if (preference.matches) {
        setReady(false);
      }
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <video
      className={styles.heroVideo}
      data-ready={ready}
      src="/blog/hero/wind-background.mp4"
      poster="/blog/hero/wind-background.webp"
      aria-hidden="true"
      autoPlay
      muted
      loop
      playsInline
      onCanPlay={() => setReady(true)}
      onError={() => setReady(false)}
    />
  );
}
