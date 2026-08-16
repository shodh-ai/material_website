"use client";

import { useState } from "react";
import styles from "./benchmark.module.css";

type Series = "2.93B" | "10B";
type MetricValue = { series: Series; value?: number | null; low?: number; high?: number; label: string };
type Metric = {
  kind: "bar" | "range";
  title: string;
  axis: string;
  values: MetricValue[];
  reference?: { value: number; label: string };
  domainMax?: number;
  log?: boolean;
};
type Test = { number: string; title: string; note: string; charts: Metric[] };

const tests: Test[] = [
  {
    number: "Test 1",
    title: "Domain-responsive routing",
    note: "Permutation p: 0.000155 (2.93B) → 0.000040 (10B)",
    charts: [
      { kind: "range", title: "Cross-domain routing separation", axis: "Separation (× within-domain noise)", values: [{ series: "2.93B", low: 11, high: 33, label: "11–33×" }, { series: "10B", value: 45, label: "45×" }] },
      { kind: "bar", title: "Shared pathway overlap", axis: "Shared pathway overlap (%)", values: [{ series: "2.93B", value: 65.21, label: "65.21%" }, { series: "10B", value: 52, label: "52.00%" }] },
    ],
  },
  {
    number: "Test 2",
    title: "Quantum → reactor intervention",
    note: "Lower error is better · same frozen intervention contract and gates",
    charts: [
      { kind: "bar", title: "Temperature response error", axis: "Temperature nRMSE", log: true, reference: { value: 0.05, label: "Gate 0.05" }, values: [{ series: "2.93B", value: 0.0072, label: "0.00720" }, { series: "10B", value: 0.003, label: "0.00300" }] },
      { kind: "bar", title: "Energy response error", axis: "Teacher-relative error", log: true, reference: { value: 0.05, label: "Gate 0.05" }, values: [{ series: "2.93B", value: 0.02322, label: "0.02322" }, { series: "10B", value: 0.011, label: "0.01100" }] },
    ],
  },
  {
    number: "Test 3",
    title: "Reactor → cell BioFSI",
    note: "High-shear positive control · both checkpoints cross rupture criteria",
    charts: [
      { kind: "bar", title: "Maximum tensile stress", axis: "Maximum tensile stress (Pa)", reference: { value: 250, label: "Criterion 250 Pa" }, values: [{ series: "2.93B", value: 312.45, label: "312.45 Pa" }, { series: "10B", value: 340, label: "340 Pa" }] },
      { kind: "bar", title: "Cell area strain", axis: "Area strain (%)", reference: { value: 3.5, label: "Criterion 3.50%" }, values: [{ series: "2.93B", value: 4.12, label: "4.12%" }, { series: "10B", value: 4.8, label: "4.80%" }] },
    ],
  },
  {
    number: "Test 4",
    title: "Full molecule → reactor → cell",
    note: "End-to-end chain across all three physical scales",
    charts: [
      { kind: "bar", title: "Full-chain pass rate", axis: "Passing chains (%)", domainMax: 100, values: [{ series: "2.93B", value: null, label: "Not evaluated" }, { series: "10B", value: 91.3, label: "91.3%" }] },
    ],
  },
];

function MetricChart({ metric, active, id }: { metric: Metric; active: Set<Series>; id: string }) {
  const width = 430;
  const height = 270;
  const margin = { top: 40, right: 20, bottom: 56, left: 70 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const observed = metric.values.flatMap((item) => item.low !== undefined ? [item.low, item.high ?? item.low] : item.value === null || item.value === undefined ? [] : [item.value]);
  if (metric.reference) observed.push(metric.reference.value);
  const logFloor = metric.log ? Math.min(...observed.filter((value) => value > 0)) / 2 : 0;
  const max = metric.domainMax ?? (metric.log ? Math.max(...observed) * 1.08 : Math.max(...observed, 1) * 1.2);
  const y = (value: number) => metric.log
    ? margin.top + innerHeight - ((Math.log10(value) - Math.log10(logFloor)) / (Math.log10(max) - Math.log10(logFloor))) * innerHeight
    : margin.top + innerHeight - (value / max) * innerHeight;
  const ticks = metric.log
    ? [0.001, 0.003, 0.01, metric.reference?.value ?? max].filter((value, index, array) => value >= logFloor && value <= max && array.indexOf(value) === index)
    : [0, max / 2, max];
  const slot = innerWidth / 2;
  const barWidth = 76;

  return (
    <svg className={styles.crossMetricChart} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${metric.title}. ${metric.axis}. ${metric.values.map((item) => `${item.series}: ${item.label}`).join("; ")}.`}>
      <desc id={`${id}-desc`}>{metric.axis}. {metric.values.map((item) => `${item.series}: ${item.label}`).join("; ")}.</desc>
      {ticks.map((tick) => {
        const lineY = metric.log && tick === 0 ? margin.top + innerHeight : y(tick);
        const label = metric.log ? (tick < 0.01 ? tick.toFixed(3) : tick.toFixed(2)) : Number.isInteger(tick) ? tick.toFixed(0) : tick.toFixed(2);
        return <g key={tick}><line className={styles.gridLine} x1={margin.left} x2={width - margin.right} y1={lineY} y2={lineY} /><text className={styles.crossTickLabel} x={margin.left - 10} y={lineY + 4} textAnchor="end">{label}</text></g>;
      })}
      <rect className={styles.frame} x={margin.left} y={margin.top} width={innerWidth} height={innerHeight} />
      <text className={styles.crossAxisTitle} x="17" y={margin.top + innerHeight / 2} textAnchor="middle" transform={`rotate(-90 17 ${margin.top + innerHeight / 2})`}>{metric.axis}</text>
      {metric.log ? <text className={styles.logScaleLabel} x={width - margin.right} y="20" textAnchor="end">Log scale</text> : null}
      {metric.reference ? <g><line className={styles.referenceLine} x1={margin.left} x2={width - margin.right} y1={y(metric.reference.value)} y2={y(metric.reference.value)} /><text className={styles.referenceLabel} x={width - margin.right - 4} y={y(metric.reference.value) - 6} textAnchor="end">{metric.reference.label}</text></g> : null}
      {metric.values.map((item, index) => {
        if (!active.has(item.series)) return null;
        const center = margin.left + slot * index + slot / 2;
        const seriesClass = item.series === "10B" ? styles.series10 : styles.series293;
        if (item.value === null) return <g key={item.series}><line className={seriesClass} x1={center - 38} x2={center + 38} y1={margin.top + innerHeight - 2} y2={margin.top + innerHeight - 2} strokeDasharray="5 5" strokeWidth="3" /><text className={styles.emptyLabel} x={center} y={margin.top + innerHeight - 12} textAnchor="middle">Not evaluated</text><text className={styles.crossXLabel} x={center} y={height - 21} textAnchor="middle">{item.series}</text></g>;
        if (metric.kind === "range" && item.low !== undefined && item.high !== undefined) return <g key={item.series}><line className={seriesClass} x1={center} x2={center} y1={y(item.low)} y2={y(item.high)} strokeWidth="11" strokeLinecap="round" /><circle className={seriesClass} cx={center} cy={y(item.low)} r="5" /><circle className={seriesClass} cx={center} cy={y(item.high)} r="5" /><text className={styles.crossValue} x={center} y={y(item.high) - 12} textAnchor="middle">{item.label}</text><text className={styles.crossXLabel} x={center} y={height - 21} textAnchor="middle">{item.series}</text></g>;
        const value = item.value ?? 0;
        if (metric.log) {
          const pointY = y(value);
          return <g key={item.series}><line className={seriesClass} x1={center} x2={center} y1={y(logFloor)} y2={pointY} strokeWidth="5" strokeLinecap="round" /><circle className={seriesClass} cx={center} cy={pointY} r="8" /><text className={styles.crossValue} x={center} y={pointY - 15} textAnchor="middle">{item.label}</text><text className={styles.crossXLabel} x={center} y={height - 21} textAnchor="middle">{item.series}</text></g>;
        }
        const barHeight = (value / max) * innerHeight;
        return <g key={item.series}><rect className={seriesClass} x={center - barWidth / 2} y={margin.top + innerHeight - barHeight} width={barWidth} height={barHeight} rx="3" /><text className={styles.crossValue} x={center} y={Math.max(22, margin.top + innerHeight - barHeight - 10)} textAnchor="middle">{item.label}</text><text className={styles.crossXLabel} x={center} y={height - 21} textAnchor="middle">{item.series}</text></g>;
      })}
      <text className={styles.crossAxisTitle} x={margin.left + innerWidth / 2} y={height - 3} textAnchor="middle">Model checkpoint</text>
    </svg>
  );
}

export default function CrossScaleComparison() {
  const [activeSeries, setActiveSeries] = useState<Set<Series>>(new Set(["2.93B", "10B"]));
  const toggle = (series: Series) => setActiveSeries((current) => {
    const next = new Set(current);
    if (next.has(series)) next.delete(series); else next.add(series);
    return next;
  });

  return (
    <section id="cross-scale-comparison" className={styles.crossScaleSection}>
      <header className={styles.crossScaleHeader}>
        <div><p className={styles.kicker}>Cross-scale integration evaluation</p><h2>LUCAN 2.93B vs 10B</h2><p>Four frozen tests spanning domain routing, reactor intervention and cell mechanics</p></div>
        <div className={styles.seriesControls} aria-label="Toggle model checkpoints">
          {(["2.93B", "10B"] as Series[]).map((series) => <button key={series} type="button" aria-pressed={activeSeries.has(series)} onClick={() => toggle(series)}><i className={series === "10B" ? styles.control10 : styles.control293} />{series}</button>)}
        </div>
      </header>
      <div className={styles.crossTestGrid}>
        {tests.map((test, testIndex) => <section className={styles.crossTest} key={test.number}><header><p>{test.number}</p><h3>{test.title}</h3><span>{test.note}</span></header><div className={styles.crossSubplotGrid}>{test.charts.map((metric, chartIndex) => <article className={test.charts.length === 1 ? styles.crossWidePlot : undefined} key={metric.title}><h4>{metric.title}</h4><MetricChart metric={metric} active={activeSeries} id={`cross-${testIndex}-${chartIndex}`} /></article>)}</div></section>)}
      </div>
      <footer className={styles.crossNotes}>
        <p>Each metric has an independent axis. Dashed lines show frozen gates or rupture criteria; they are not rescaled between checkpoints.</p>
        <p>Test 4 was not evaluated at 2.93B. In Test 3, the 10B work-transfer error was &lt;1×10⁻⁷; the 2.93B result was reported as within numerical precision without a numeric value.</p>
        <p>Simulation-based, scoped evaluation; these results do not establish universal cross-domain generalisation.</p>
      </footer>
    </section>
  );
}
