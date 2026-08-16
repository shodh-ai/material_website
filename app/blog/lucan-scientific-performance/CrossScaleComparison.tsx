"use client";

import { useState } from "react";
import type { ReactNode } from "react";
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
type Test = { number: string; title: string; note: string; explanation: ReactNode; charts: Metric[] };

const tests: Test[] = [
  {
    number: "Test 1",
    title: "Domain-responsive routing",
    note: "Permutation p: 0.000155 (2.93B) → 0.000040 (10B)",
    explanation: (
      <>
        <p>A shared model should use common computational pathways across physical domains while still adapting its internal routing to the structure of each domain.</p>
        <p>At 2.93B, molecular and reactor inputs produced routing differences approximately <strong>11–33 times greater than within-domain routing noise</strong>, while retaining <strong>65.21% shared pathway overlap</strong>. At 10B, cross-domain routing separation increased to approximately <strong>45 times within-domain noise</strong>, with <strong>52% pathway overlap</strong>.</p>
        <p>The permutation-test probability decreased from <strong>0.000155 at 2.93B to 0.000040 at 10B</strong>, confirming that the routing differences remained statistically significant. At 10B, <strong>45× routing separation</strong> coexists with <strong>52% shared pathway overlap</strong>, indicating stronger domain-responsive specialisation within a still-shared computational substrate.</p>
      </>
    ),
    charts: [
      { kind: "range", title: "Cross-domain routing separation", axis: "Separation (× within-domain noise)", values: [{ series: "2.93B", low: 11, high: 33, label: "11–33×" }, { series: "10B", value: 45, label: "45×" }] },
      { kind: "bar", title: "Shared pathway overlap", axis: "Shared pathway overlap (%)", values: [{ series: "2.93B", value: 65.21, label: "65.21%" }, { series: "10B", value: 52, label: "52.00%" }] },
    ],
  },
  {
    number: "Test 2",
    title: "Quantum → reactor intervention",
    note: "Lower error is better · same frozen intervention contract and gates",
    explanation: (
      <>
        <p>This test evaluates whether a controlled change in molecular reaction enthalpy produces the corresponding macroscopic temperature and energy response in a held-out reactor.</p>
        <p>Temperature nRMSE decreased from <strong>0.00720 at 2.93B to 0.00300 at 10B</strong>, representing an approximately <strong>58.3% reduction in error</strong>. Teacher-relative energy error decreased from <strong>0.02322 to 0.01100</strong>, an approximately <strong>52.6% reduction</strong>.</p>
        <p>Both checkpoints remained below the <strong>0.05 acceptance gates</strong>. At 10B, the quantum-to-reactor pathway retained the expected response while reducing both numerical errors.</p>
      </>
    ),
    charts: [
      { kind: "bar", title: "Temperature response error", axis: "Temperature nRMSE", log: true, reference: { value: 0.05, label: "Gate 0.05" }, values: [{ series: "2.93B", value: 0.0072, label: "0.00720" }, { series: "10B", value: 0.003, label: "0.00300" }] },
      { kind: "bar", title: "Energy response error", axis: "Teacher-relative error", log: true, reference: { value: 0.05, label: "Gate 0.05" }, values: [{ series: "2.93B", value: 0.02322, label: "0.02322" }, { series: "10B", value: 0.011, label: "0.01100" }] },
    ],
  },
  {
    number: "Test 3",
    title: "Reactor → cell BioFSI",
    note: "High-shear positive control · both checkpoints cross rupture criteria",
    explanation: (
      <>
        <p>This test examines whether reactor-scale turbulent flow can be transferred into cell-scale membrane mechanics through an active two-way fluid-solid interaction pathway.</p>
        <p>At 2.93B, the predicted maximum tensile stress was <strong>312.45 Pa</strong>, exceeding the <strong>250 Pa rupture criterion</strong>, while maximum area strain reached <strong>4.12%</strong>, exceeding the <strong>3.50% strain criterion</strong>.</p>
        <p>At 10B, maximum tensile stress increased to <strong>340 Pa</strong> and maximum area strain reached <strong>4.8%</strong>. Both quantities again crossed the same rupture criteria. The 10B work-transfer error was <strong>less than 1×10⁻⁷</strong>, supporting numerical consistency of the coupling operation.</p>
      </>
    ),
    charts: [
      { kind: "bar", title: "Maximum tensile stress", axis: "Maximum tensile stress (Pa)", reference: { value: 250, label: "Criterion 250 Pa" }, values: [{ series: "2.93B", value: 312.45, label: "312.45 Pa" }, { series: "10B", value: 340, label: "340 Pa" }] },
      { kind: "bar", title: "Cell area strain", axis: "Area strain (%)", reference: { value: 3.5, label: "Criterion 3.50%" }, values: [{ series: "2.93B", value: 4.12, label: "4.12%" }, { series: "10B", value: 4.8, label: "4.80%" }] },
    ],
  },
  {
    number: "Test 4",
    title: "Competing multiphysics regimes",
    note: "Matched nonlinear oxygen-transfer and shear trade-off evaluation",
    explanation: (
      <>
        <p>Real bioreactor operation involves competing physical effects. Increasing impeller speed may initially improve oxygen transfer, but once oxygenation saturates, additional agitation can continue increasing mechanical shear without providing further oxygen-transfer benefit.</p>
        <p>At 2.93B, increasing agitation from <strong>200 RPM to 250 RPM</strong> decreased mean oxygen concentration by <strong>0.17%</strong>, with an oxygen nRMSE of <strong>0.01835</strong>. Near-blade p95 hydrodynamic shear increased by <strong>17.9%</strong>.</p>
        <p>At 10B, mean oxygen concentration changed by only <strong>0.08%</strong>, with a lower oxygen nRMSE of <strong>0.0087</strong>. Near-blade p95 shear increased by <strong>18.3%</strong>, preserving the expected mechanical escalation as oxygen transfer remained near its plateau.</p>
        <p>Shear-field spatial correlation increased from <strong>0.325 at 2.93B to 0.59 at 10B</strong>. The 2.93B result remained below the required <strong>0.50 correlation gate</strong>, while the 10B result <strong>passed the gate</strong>.</p>
      </>
    ),
    charts: [
      { kind: "bar", title: "Absolute mean oxygen concentration change", axis: "Absolute oxygen change (%)", domainMax: 0.2, values: [{ series: "2.93B", value: 0.17, label: "0.17%" }, { series: "10B", value: 0.08, label: "0.08%" }] },
      { kind: "bar", title: "Oxygen prediction error", axis: "Oxygen nRMSE", log: true, reference: { value: 0.05, label: "Gate 0.05" }, values: [{ series: "2.93B", value: 0.01835, label: "0.01835" }, { series: "10B", value: 0.0087, label: "0.0087" }] },
      { kind: "bar", title: "Near-blade p95 shear increase", axis: "Shear increase (%)", domainMax: 22, values: [{ series: "2.93B", value: 17.9, label: "+17.9%" }, { series: "10B", value: 18.3, label: "+18.3%" }] },
      { kind: "bar", title: "Shear-field spatial correlation", axis: "Spatial correlation", domainMax: 0.7, reference: { value: 0.5, label: "Gate 0.50" }, values: [{ series: "2.93B", value: 0.325, label: "0.325 · Fail" }, { series: "10B", value: 0.59, label: "0.59 · Pass" }] },
    ],
  },
];

const fullChainMetric: Metric = {
  kind: "bar",
  title: "Full-chain pass rate",
  axis: "Passing chains (%)",
  domainMax: 100,
  values: [
    { series: "2.93B", value: null, label: "Not supported" },
    { series: "10B", value: 91.3, label: "91.3%" },
  ],
};

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
        if (item.value === null) return <g key={item.series}><line className={seriesClass} x1={center - 38} x2={center + 38} y1={margin.top + innerHeight - 2} y2={margin.top + innerHeight - 2} strokeDasharray="5 5" strokeWidth="3" /><text className={styles.emptyLabel} x={center} y={margin.top + innerHeight - 12} textAnchor="middle">{item.label}</text><text className={styles.crossXLabel} x={center} y={height - 21} textAnchor="middle">{item.series}</text></g>;
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
        <div><p className={styles.kicker}>Cross-scale integration evaluation</p><h2>LUCAN 2.93B vs 10B</h2><p>Matched checkpoint comparisons are distinguished from separately evaluated capabilities.</p></div>
        <div className={styles.seriesControls} aria-label="Toggle model checkpoints">
          {(["2.93B", "10B"] as Series[]).map((series) => <button key={series} type="button" aria-pressed={activeSeries.has(series)} onClick={() => toggle(series)}><i className={series === "10B" ? styles.control10 : styles.control293} />{series}</button>)}
        </div>
      </header>
      <div className={styles.crossTestGrid}>
        {tests.map((test, testIndex) => <section className={styles.crossTest} key={test.number}><header><p>{test.number}</p><h3>{test.title}</h3><span>{test.note}</span></header><div className={styles.crossTestCopy}>{test.explanation}</div><div className={styles.crossSubplotGrid}>{test.charts.map((metric, chartIndex) => <article className={test.charts.length === 1 ? styles.crossWidePlot : undefined} key={metric.title}><h4>{metric.title}</h4><MetricChart metric={metric} active={activeSeries} id={`cross-${testIndex}-${chartIndex}`} /></article>)}</div></section>)}
      </div>
      <section className={styles.fullChainSection} aria-labelledby="full-chain-title">
        <div className={styles.fullChainCopy}>
          <p className={styles.kicker}>Additional 10B evaluation</p>
          <h3 id="full-chain-title">Full molecule → reactor → cell chain</h3>
          <p>The 10B checkpoint connects molecular representation, thermochemical state, reactor response, fluid exposure and downstream cell mechanics in one end-to-end pathway. The full chain achieved a <strong>91.3% pass rate</strong>. The <strong>2.93B model does not support execution of the complete molecule → reactor → cell chain</strong>, so its graph entry is shown as not supported rather than zero.</p>
        </div>
        <article><h4>{fullChainMetric.title}</h4><MetricChart metric={fullChainMetric} active={activeSeries} id="full-chain" /></article>
      </section>
    </section>
  );
}
