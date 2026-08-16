import styles from "./benchmark.module.css";

const checkpoints = ["1.5B", "2.93B", "10B"];

function SectionHeading({ eyebrow, title, copy, reference }: { eyebrow: string; title: string; copy?: string; reference?: string }) {
  return (
    <header className={styles.evidenceHeading}>
      <p className={styles.kicker}>{eyebrow}</p>
      <h2>{title}</h2>
      {reference ? (
        <div className={styles.evidenceMeta}>
          {copy ? <p>{copy}</p> : null}
          <p className={styles.evidenceReference}><strong>Reference</strong>{reference}</p>
        </div>
      ) : copy ? <p>{copy}</p> : null}
    </header>
  );
}

function TrendChart({
  title,
  values,
  display,
  log = false,
}: {
  title: string;
  values: number[];
  display: string[];
  log?: boolean;
}) {
  const width = 390;
  const height = 250;
  const left = 48;
  const right = 20;
  const top = 38;
  const bottom = 48;
  const innerWidth = width - left - right;
  const innerHeight = height - top - bottom;
  const transformed = values.map((value) => (log ? Math.log10(value) : value));
  const low = log ? Math.min(...transformed) - 0.35 : 0;
  const high = Math.max(...transformed) * (log ? 1 : 1.12);
  const x = (index: number) => left + (innerWidth * index) / (values.length - 1);
  const y = (value: number) => top + innerHeight - (((log ? Math.log10(value) : value) - low) / (high - low)) * innerHeight;
  const points = values.map((value, index) => `${x(index)},${y(value)}`).join(" ");

  return (
    <article className={styles.trendCard}>
      <div className={styles.trendTitle}><h3>{title}</h3><span>↓</span></div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${title}: ${checkpoints.map((checkpoint, index) => `${checkpoint}, ${display[index]}`).join("; ")}`}>
        {[0, 0.5, 1].map((fraction) => {
          const lineY = top + innerHeight * fraction;
          return <line key={fraction} className={styles.gridLine} x1={left} x2={width - right} y1={lineY} y2={lineY} />;
        })}
        <polyline className={styles.trendLine} points={points} />
        {values.map((value, index) => (
          <g key={checkpoints[index]}>
            <circle className={styles.trendDot} cx={x(index)} cy={y(value)} r="6" />
            <text className={styles.trendValue} x={x(index)} y={Math.max(20, y(value) - 13)} textAnchor="middle">{display[index]}</text>
            <text className={styles.trendCheckpoint} x={x(index)} y={height - 13} textAnchor="middle">{checkpoints[index]}</text>
          </g>
        ))}
        {log ? <text className={styles.scaleNote} x={width - right} y="20" textAnchor="end">log scale</text> : null}
      </svg>
    </article>
  );
}

function GateBar({ label, value, limit }: { label: string; value: number; limit: number }) {
  return (
    <div className={styles.gateRow}>
      <div><strong>{label}</strong><span>{value.toFixed(5)} / {limit.toFixed(2)} limit</span></div>
      <div className={styles.gateTrack}><i style={{ width: `${Math.min(100, (value / limit) * 100)}%` }} /></div>
    </div>
  );
}

function QuantumChart() {
  const inputs = ["−50.00", "−145.75", "−300.00"];
  const values = [575.43, 577.89, 582.06];
  const width = 640;
  const height = 330;
  const left = 74;
  const right = 28;
  const top = 42;
  const bottom = 70;
  const innerWidth = width - left - right;
  const innerHeight = height - top - bottom;
  const min = 574;
  const max = 583;
  const x = (index: number) => left + 28 + ((innerWidth - 56) * index) / 2;
  const y = (value: number) => top + innerHeight - ((value - min) / (max - min)) * innerHeight;
  return (
    <svg className={styles.causalChart} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Reaction enthalpy input versus predicted reactor maximum temperature">
      {[574, 577, 580, 583].map((tick) => {
        const tickY = y(tick);
        return <g key={tick}><line className={styles.gridLine} x1={left} x2={width - right} y1={tickY} y2={tickY} /><text className={styles.tickLabel} x={left - 12} y={tickY + 4} textAnchor="end">{tick} K</text></g>;
      })}
      <polyline className={styles.causalLine} points={values.map((value, index) => `${x(index)},${y(value)}`).join(" ")} />
      {values.map((value, index) => <g key={inputs[index]}><circle className={styles.causalDot} cx={x(index)} cy={y(value)} r="7" /><text className={styles.causalValue} x={x(index)} y={y(value) - 16} textAnchor="middle">{value.toFixed(2)} K</text><text className={styles.causalInput} x={x(index)} y={height - 28} textAnchor="middle">{inputs[index]} kJ/mol</text></g>)}
      <text className={styles.xAxisTitle} x={left + innerWidth / 2} y={height - 5} textAnchor="middle">Reaction enthalpy input</text>
    </svg>
  );
}

const residuals = [
  { label: "Incompressibility residual", raw: "4.1×10⁻⁴", corrected: "5.55×10⁻¹⁶", drop: "11.9 orders" },
  { label: "Energy-balance residual", raw: "1.5×10⁻³", corrected: "8.2×10⁻⁷", drop: "3.3 orders" },
  { label: "Hotspot nRMSE", raw: "0.089", corrected: "0.083", drop: "6.7% lower" },
];

const latency = [
  { label: "Native LUCAN", value: 38, preliminary: false },
  { label: "In-memory modular pipeline", value: 145, preliminary: true },
  { label: "File-coupled modular pipeline", value: 415, preliminary: true },
];

function Bullet({ label, baseline, threshold, achieved, max, higher = true }: { label: string; baseline?: number; threshold: number; achieved: number; max: number; higher?: boolean }) {
  return (
    <div className={styles.bulletRow}>
      <div className={styles.bulletLabels}><strong>{label} {higher ? "↑" : "↓"}</strong><span>Achieved <b>{achieved}%</b></span></div>
      <div className={styles.bulletTrack}>
        {baseline !== undefined ? <i className={styles.baselineMark} style={{ left: `${(baseline / max) * 100}%` }} title={`Historical baseline ${baseline}%`} /> : null}
        <i className={styles.thresholdMark} style={{ left: `${(threshold / max) * 100}%` }} title={`Acceptance threshold ${threshold}%`} />
        <span style={{ width: `${(achieved / max) * 100}%` }} />
      </div>
      <div className={styles.bulletLegend}><span>{baseline !== undefined ? `Baseline ${baseline}%` : ""}</span><span>Threshold {higher ? "" : "<"}{threshold}%</span></div>
    </div>
  );
}

export default function AdditionalEvidence() {
  return (
    <>
      <section className={styles.evidenceSection}>
        <SectionHeading eyebrow="01 · Capacity" title="Model capacity scaling" copy="Three checkpoints show a consistent empirical improvement as model capacity increases." reference="LUCAN Benchmark and Architecture Report, Act V, §5.1.1 “Preliminary Empirical Scaling Behaviour,” p. 46." />
        <div className={styles.disclosure}>Preliminary empirical capacity trend <span>Three checkpoints do not establish a general scaling law.</span></div>
        <div className={styles.trendGrid}>
          <TrendChart title="Activation-barrier MAE" values={[0.115, 0.072, 0.043]} display={["0.115 eV", "0.072 eV", "0.043 eV"]} />
          <TrendChart title="RTD integral error" values={[0.142, 0.088, 0.037]} display={["0.142", "0.088", "0.037"]} />
          <TrendChart title="Raw incompressibility residual" values={[3.5e-2, 8.1e-3, 4.1e-4]} display={["3.5×10⁻²", "8.1×10⁻³", "4.1×10⁻⁴"]} log />
        </div>
      </section>

      <section className={styles.evidenceSection}>
        <SectionHeading eyebrow="02 · Cross-scale intervention" title="Quantum-to-reactor causal response" copy="At the frozen 2.93B checkpoint, a controlled molecular intervention propagates into a predicted reactor-level response." reference="LUCAN Benchmark and Architecture Report, Act II, §2.2 “Blind Quantum-Enthalpy-to-Reactor Intervention,” pp. 20–21." />
        <div className={styles.causalLayout}>
          <div className={styles.whiteSurface}><QuantumChart /></div>
          <aside className={styles.gatePanel}>
            <p className={styles.miniKicker}>Qualification gates</p>
            <GateBar label="Temperature nRMSE" value={0.0072} limit={0.05} />
            <GateBar label="Teacher-relative energy error" value={0.02322} limit={0.05} />
            <div className={styles.monotonicCallout}><strong>8 / 8</strong><span>Monotonic triplets across two held-out geometries</span></div>
          </aside>
        </div>
      </section>

      <section className={styles.evidenceSection}>
        <SectionHeading eyebrow="03 · Constraint enforcement" title="Learned prediction plus deterministic enforcement" copy="The learned forecast is followed by explicit deterministic correction; conservation after correction is not presented as learned conservation." reference="LUCAN Benchmark and Architecture Report, Act IV, §4.5.2 “Pre- and Post-Correction Conservation Audit,” pp. 38–39." />
        <div className={styles.correctionLayout}>
          <div className={styles.residualPanel}>
            <div className={styles.residualHeader}><span>Raw neural output</span><span>After deterministic correction</span></div>
            {residuals.map((item) => <div className={styles.residualRow} key={item.label}><h3>{item.label} ↓</h3><div><strong>{item.raw}</strong><i /><strong>{item.corrected}</strong></div><p>{item.drop}</p></div>)}
          </div>
          <aside className={styles.costPanel}>
            <p className={styles.miniKicker}>Correction cost</p>
            <dl><div><dt>Raw forecast</dt><dd>35.0 ms</dd></div><div><dt>Divergence enforcement</dt><dd>2.3 ms</dd></div><div><dt>Energy ledger</dt><dd>0.7 ms</dd></div><div className={styles.costTotal}><dt>Corrected step</dt><dd>38.0 ms</dd></div></dl>
            <div className={styles.shareCallout}><strong>7.9%</strong><span>Deterministic-correction share</span></div>
          </aside>
        </div>
      </section>

      <section className={styles.evidenceSection}>
        <SectionHeading eyebrow="04 · Efficiency" title="Workflow speed and solver efficiency" copy="End-to-end execution is evaluated alongside solver-verified optimisation." reference="LUCAN Benchmark and Architecture Report, Act IV, §§4.6.1–4.6.2 “Workflow Execution and Proposal Latency” and “Solver-Verified Inverse Design,” pp. 41–42." />
        <div className={styles.efficiencyGrid}>
          <article className={styles.latencyPanel}>
            <h3>Proposal latency <span>p50 · lower is better</span></h3>
            {latency.map((item) => <div className={styles.latencyRow} key={item.label}><div><strong>{item.label}</strong>{item.preliminary ? <em>Preliminary</em> : null}<span>{item.value} ms</span></div><i><b style={{ width: `${(item.value / 415) * 100}%` }} /></i></div>)}
          </article>
          <article className={styles.optimisationPanel}>
            <div className={styles.optimisationHeader}><h3>Solver-verified optimisation</h3><span>LUCAN</span><span>Comparator</span></div>
            <div><strong>Feasible-target success</strong><span>91.7% <small>(55/60)</small></span><span>Detached LUCAN: 70.0% <small>(42/60)</small><em>Preliminary</em></span></div>
            <div><strong>Classical/verifier calls</strong><span>Median 1</span><span>SLSQP: median 124</span></div>
            <div><strong>Total optimisation time</strong><span>≈5.6 hours</span><span>SLSQP: &gt;500 hours</span></div>
          </article>
        </div>
      </section>

      <section className={`${styles.evidenceSection} ${styles.validationSection}`}>
        <SectionHeading eyebrow="05 · Prospective physical validation" title="Industrial physical-validation outcomes" copy="Case-specific physical outcomes are shown separately from comparative model benchmarks." />
        <div className={styles.validationGrid}>
          <article className={styles.validationCard}>
            <p className={styles.miniKicker}>Global specialty chemicals manufacturing partner</p><h3>Specialty chemicals</h3>
            <Bullet label="Isolated yield" baseline={82.4} threshold={96.5} achieved={96.7} max={100} />
            <Bullet label="Impurity" baseline={12.3} threshold={4} achieved={3.1} max={15} higher={false} />
          </article>
          <article className={styles.validationCard}>
            <p className={styles.miniKicker}>Global biomanufacturing partner</p><h3>Biomanufacturing</h3>
            <Bullet label="Product titer" threshold={6.5} achieved={6.63} max={7.2} />
            <Bullet label="Harvest viability" threshold={75} achieved={78.2} max={90} />
            <Bullet label="HMW aggregates" threshold={2} achieved={1.2} max={3} higher={false} />
            <div className={styles.validationCallouts}><span><strong>94.5%</strong>Product recovery</span><span><strong>14.5×</strong>Concentration factor</span></div>
          </article>
        </div>
      </section>

    </>
  );
}
