import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import styles from "./benchmark.module.css";
import AdditionalEvidence from "./AdditionalEvidence";
import CrossScaleComparison from "./CrossScaleComparison";

const syne = localFont({
  src: "../../../public/shodh-new/Syne/Syne-VariableFont_wght.ttf",
  display: "swap",
  weight: "100 900",
});

type BenchmarkValue = {
  label: string;
  shortLabel: string;
  value: number;
  lucan?: boolean;
};

type BenchmarkPanel = {
  title: string;
  direction: "up" | "down";
  axis: string;
  decimals: number;
  suffix?: string;
  note: string;
  values: BenchmarkValue[];
};

const panels: BenchmarkPanel[] = [
  {
    title: "Transition-state barrier",
    direction: "down",
    axis: "Barrier MAE (eV)",
    decimals: 3,
    note: "Matched comparator · n=250",
    values: [
      { label: "LUCAN", shortLabel: "LUCAN", value: 0.043, lucan: true },
      { label: "MACE-OMol25", shortLabel: "MACE-OMol25", value: 0.051 },
    ],
  },
  {
    title: "Valid TS Hessians",
    direction: "up",
    axis: "Valid fraction (%)",
    decimals: 1,
    suffix: "%",
    note: "214/250 vs 178/250",
    values: [
      { label: "LUCAN", shortLabel: "LUCAN", value: 85.6, lucan: true },
      { label: "MACE-OMol25", shortLabel: "MACE-OMol25", value: 71.2 },
    ],
  },
  {
    title: "Impeller shear stress",
    direction: "down",
    axis: "Relative error (%)",
    decimals: 1,
    suffix: "%",
    note: "Held-out geometry Sim-to-Sim",
    values: [
      { label: "LUCAN", shortLabel: "LUCAN", value: 5.8, lucan: true },
      { label: "Geo-FNO", shortLabel: "Geo-FNO", value: 18.6 },
    ],
  },
  {
    title: "Mass transfer (kLa)",
    direction: "down",
    axis: "Relative error (%)",
    decimals: 1,
    suffix: "%",
    note: "Held-out geometry Sim-to-Sim",
    values: [
      { label: "LUCAN", shortLabel: "LUCAN", value: 6.4, lucan: true },
      { label: "Geo-FNO", shortLabel: "Geo-FNO", value: 15.2 },
    ],
  },
  {
    title: "Irregular sampling",
    direction: "down",
    axis: "Mean nRMSE",
    decimals: 3,
    note: "15% random missingness",
    values: [
      { label: "LUCAN pipeline", shortLabel: "LUCAN pipeline", value: 0.041, lucan: true },
      { label: "Neural ODE", shortLabel: "Neural ODE", value: 0.129 },
    ],
  },
  {
    title: "Event-response timing",
    direction: "down",
    axis: "Timing error (ms)",
    decimals: 0,
    suffix: " ms",
    note: "50 ms physical step",
    values: [
      { label: "LUCAN", shortLabel: "LUCAN", value: 19, lucan: true },
      { label: "Declared baseline", shortLabel: "Declared baseline", value: 92 },
    ],
  },
  {
    title: "Long-horizon stability",
    direction: "down",
    axis: "Rollout failures (%)",
    decimals: 0,
    suffix: "%",
    note: "1,000 steps · 50 trajectories",
    values: [
      { label: "LUCAN", shortLabel: "LUCAN", value: 0, lucan: true },
      { label: "AR baseline", shortLabel: "AR baseline", value: 18 },
    ],
  },
  {
    title: "Crystallisation coupling",
    direction: "down",
    axis: "PBE/PSD nRMSE",
    decimals: 3,
    note: "Full LUCAN vs coupling ablations",
    values: [
      { label: "Full LUCAN", shortLabel: "Full", value: 0.072, lucan: true },
      { label: "Unstructured", shortLabel: "Unstructured", value: 0.115 },
      { label: "Detached", shortLabel: "Detached", value: 0.184 },
    ],
  },
];

function formatValue(value: number, decimals: number, suffix = "") {
  return `${value.toFixed(decimals)}${suffix}`;
}

function formatTick(value: number, panel: BenchmarkPanel) {
  const decimals = panel.decimals === 3 ? 2 : 0;
  return value.toFixed(decimals);
}

function BenchmarkChart({ panel, index }: { panel: BenchmarkPanel; index: number }) {
  const width = 600;
  const height = 335;
  const plot = { left: 72, right: 24, top: 42, bottom: 74 };
  const innerWidth = width - plot.left - plot.right;
  const innerHeight = height - plot.top - plot.bottom;
  const rawMax = Math.max(...panel.values.map((item) => item.value), 1e-6);
  const max = rawMax * 1.22;
  const ticks = [0, max / 3, (max * 2) / 3, max];
  const slotWidth = innerWidth / panel.values.length;
  const barWidth = Math.min(112, slotWidth * 0.46);

  return (
    <article className={styles.chartPanel}>
      <div className={styles.panelHeading}>
        <div>
          <p className={styles.panelNumber}>{String(index + 1).padStart(2, "0")}</p>
          <h2>{panel.title}</h2>
          <p>{panel.note}</p>
        </div>
        <span className={styles.direction} aria-label={panel.direction === "down" ? "Lower is better" : "Higher is better"}>
          {panel.direction === "down" ? "↓" : "↑"}
        </span>
      </div>

      <svg
        className={styles.chart}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={`chart-title-${index} chart-desc-${index}`}
      >
        <title id={`chart-title-${index}`}>{panel.title}</title>
        <desc id={`chart-desc-${index}`}>
          {panel.axis}. {panel.values.map((item) => `${item.label}: ${formatValue(item.value, panel.decimals, panel.suffix)}`).join("; ")}.
        </desc>

        <text className={styles.axisTitle} x="18" y={plot.top + innerHeight / 2} textAnchor="middle" transform={`rotate(-90 18 ${plot.top + innerHeight / 2})`}>
          {panel.axis}
        </text>

        {ticks.map((tick, tickIndex) => {
          const y = plot.top + innerHeight - (tick / max) * innerHeight;
          return (
            <g key={tickIndex}>
              <line className={styles.gridLine} x1={plot.left} x2={width - plot.right} y1={y} y2={y} />
              <text className={styles.tickLabel} x={plot.left - 12} y={y + 4} textAnchor="end">{formatTick(tick, panel)}</text>
            </g>
          );
        })}

        <rect className={styles.frame} x={plot.left} y={plot.top} width={innerWidth} height={innerHeight} />

        {panel.values.map((item, itemIndex) => {
          const barHeight = item.value === 0 ? 3 : (item.value / max) * innerHeight;
          const x = plot.left + slotWidth * itemIndex + (slotWidth - barWidth) / 2;
          const y = plot.top + innerHeight - barHeight;
          return (
            <g key={item.label}>
              <rect
                className={item.lucan ? styles.lucanBar : styles.comparatorBar}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="3"
              >
                <title>{`${item.label}: ${formatValue(item.value, panel.decimals, panel.suffix)}`}</title>
              </rect>
              <text className={styles.valueLabel} x={x + barWidth / 2} y={Math.max(24, y - 10)} textAnchor="middle">
                {formatValue(item.value, panel.decimals, panel.suffix)}
              </text>
              <text className={item.lucan ? styles.lucanLabel : styles.xLabel} x={x + barWidth / 2} y={plot.top + innerHeight + 28} textAnchor="middle">
                {item.shortLabel}
              </text>
            </g>
          );
        })}

        <text className={styles.xAxisTitle} x={plot.left + innerWidth / 2} y={height - 8} textAnchor="middle">Model / configuration</text>
      </svg>
    </article>
  );
}

export default function LucanScientificPerformancePage() {
  return (
    <main className={`${syne.className} ${styles.page}`}>
      <header className={styles.siteHeader}>
        <Link href="/" aria-label="Shodh AI home">
          <Image src="/shodhai_logo.svg" alt="Shodh AI" width={150} height={36} priority />
        </Link>
        <Link href="/research" className={styles.backLink}>
          <ArrowLeft aria-hidden="true" /> Research
        </Link>
      </header>

      <article>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>Research · Model evaluation</p>
            <h1>LUCAN Scientific<br />Performance Evaluation</h1>
            <p className={styles.dek}>Eight task-qualified comparisons under the report&apos;s declared evaluation protocols</p>
            <div className={styles.heroMeta}>
              <span>26 July 2026</span>
              <span>8 benchmark tasks</span>
              <span>Molecular · Process · Temporal</span>
            </div>
          </div>
        </section>

        <section className={styles.introduction}>
          <div>
            <p className={styles.kicker}>Evaluation overview</p>
            <h2>One model, tested across distinct physical regimes.</h2>
          </div>
          <div className={styles.introCopy}>
            <p>Each comparison follows the task qualification and evaluation protocol declared in the underlying report. The panels retain independent scales so that performance is legible within each scientific task.</p>
            <div className={styles.legend} aria-label="Chart legend">
              <span><i className={styles.lucanSwatch} /> LUCAN</span>
              <span><i className={styles.comparatorSwatch} /> Comparator or ablation</span>
              <span><strong>↓</strong> Lower is better</span>
              <span><strong>↑</strong> Higher is better</span>
            </div>
          </div>
        </section>

        <section className={styles.benchmarkSection} aria-label="LUCAN benchmark comparison charts">
          <div className={styles.chartGrid}>
            {panels.map((panel, index) => (
              <BenchmarkChart key={panel.title} panel={panel} index={index} />
            ))}
          </div>
        </section>

        <CrossScaleComparison />

        <AdditionalEvidence />

        <section className={styles.notes}>
          <p className={styles.kicker}>Method note</p>
          <p>Each panel uses an independent scale. LUCAN is highlighted; grey bars are the declared comparator or ablation.</p>
          <p>Source: SHODH/INDIAAI/PHASE-II/2026/01-D, 26 July 2026, Sections 4.1, 4.4 and 4.5. Temporal results are task-level pipeline comparisons and their baselines are not parameter-matched to LUCAN. This is not a universal physical-AI SOTA leaderboard.</p>
        </section>

        <section className={styles.cta}>
          <p className={styles.kicker}>Continue exploring</p>
          <h2>Physical intelligence from molecules to factories.</h2>
          <Link href="/research">Explore Shodh research <ArrowUpRight aria-hidden="true" /></Link>
        </section>
      </article>

      <footer className={styles.footer}>
        <Image src="/shodhai_logo.svg" alt="Shodh AI" width={136} height={32} />
        <p>2026 Shodh AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
