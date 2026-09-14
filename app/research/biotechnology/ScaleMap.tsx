"use client";

import { useId, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { Scale } from "./content";
import styles from "./biotechnology.module.css";

export default function ScaleMap({ title, caption, scales, outcome, pathways }: { title: string; caption: string; scales: Scale[]; outcome: string; pathways?: { name: string; stages: string[] }[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const node = scales[selected];
  return <figure className={styles.scaleFigure} aria-labelledby={`${id}-title`}>
    <div className={styles.figureHeading}><span className={styles.eyebrow}>The physical scales</span><h2 id={`${id}-title`}>{title}</h2><p>Select a scale to trace its consequences and the requirements that travel back.</p></div>
    {pathways && <div className={styles.pathways} aria-label="Distinct manufacturing routes">{pathways.map(pathway => <div key={pathway.name}><strong>{pathway.name}</strong><ol>{pathway.stages.map(stage => <li key={stage}>{stage}</li>)}</ol></div>)}</div>}
    <div className={styles.forwardLabel}><span>Physical consequences</span><ArrowRight aria-hidden="true" /></div>
    <div className={styles.scaleNodes} role="group" aria-label="Select a physical scale">
      {scales.map((scale, index) => <button type="button" key={scale.name} aria-pressed={selected === index} aria-controls={`${id}-detail`} onClick={() => setSelected(index)}>
        <span className={styles.nodeNumber}>0{index + 1}</span><small>{scale.scale}</small><strong>{scale.name}</strong><span>{scale.variable}</span>
        {index < scales.length - 1 && <ArrowRight className={styles.nodeArrow} aria-hidden="true" />}
      </button>)}
    </div>
    <div className={styles.returnPath}><ArrowLeft aria-hidden="true" /><span>Manufacturing requirements constrain earlier choices</span></div>
    <div id={`${id}-detail`} className={styles.scaleDetail} aria-live="polite">
      <div><span className={styles.eyebrow}>Forward / {node.name}</span><p>{node.effect}</p></div>
      <div><span className={styles.eyebrow}>Backward / Design constraint</span><p>{node.feedback}</p></div>
    </div>
    <div className={styles.outcome}><span>Shared objective</span><strong>{outcome}</strong></div>
    <figcaption>{caption}</figcaption>
  </figure>;
}
