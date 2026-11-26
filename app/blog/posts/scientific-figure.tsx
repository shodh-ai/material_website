"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import styles from "./scientific-figure.module.css";

type Bar = { label: string; value: number; display: string; tone?: number };
type Line = { label: string; values: number[]; tone?: number };
export type Panel =
  | { kind: "bar"; title: string; rows: Bar[]; min?: number; max?: number; log?: boolean; note?: string; alignValues?: boolean }
  | { kind: "line"; title: string; domain: number[]; series: Line[]; unit: string; digits?: number };
export type FigureSpec = { title: string; subtitle?: string; panels: Panel[] }
  | { title: string; subtitle?: string; diagram: "stencil" | "cell" };

const colors = ["#2366a0", "#22786c", "#a84330", "#505b75"];

function Bars({ panel }: { panel: Extract<Panel, { kind: "bar" }> }) {
  const min = panel.min ?? Math.min(0, ...panel.rows.map((row) => row.value));
  const max = panel.max ?? Math.max(1, ...panel.rows.map((row) => row.value));
  const scale = (value: number) => panel.log
    ? Math.log(value / min) / Math.log(max / min)
    : (value - min) / (max - min);
  const zero = panel.log ? 0 : scale(Math.max(min, 0));

  return (
    <section className={styles.panel}>
      <h3>{panel.title}</h3>
      <dl className={styles.bars} data-align-values={panel.alignValues}>
        {panel.rows.map(({ label, value, display, tone = 0 }, index) => {
          const position = scale(value);
          return (
            <div className={styles.barRow} key={label}>
              <dt>{label}</dt>
              <dd>
                <strong>{display}</strong>
                <span className={styles.track} aria-hidden="true">
                  <span
                    className={styles.bar}
                    style={{
                      background: colors[tone],
                      insetInlineStart: `${100 * Math.min(zero, position)}%`,
                      width: `${100 * Math.abs(position - zero)}%`,
                      transformOrigin: position < zero ? "right" : "left",
                      animationDelay: `${index * 65}ms`,
                    }}
                  />
                </span>
              </dd>
            </div>
          );
        })}
      </dl>
      {panel.note && <p className={styles.note}>{panel.note}</p>}
    </section>
  );
}

function Lines({ panel }: { panel: Extract<Panel, { kind: "line" }> }) {
  const [selected, setSelected] = useState(panel.domain.length - 1);
  const svg = useRef<SVGSVGElement>(null);
  const left = 58;
  const right = 550;
  const top = 14;
  const bottom = 172;
  const first = panel.domain[0];
  const last = panel.domain[panel.domain.length - 1];
  const { x, y, paths, ticks } = useMemo(() => {
    const values = panel.series.flatMap((series) => series.values);
    const lower = Math.min(0, ...values);
    const upper = Math.max(...values, lower + 1e-9);
    const ideal = (upper - lower) / 4;
    const magnitude = 10 ** Math.floor(Math.log10(ideal));
    const interval = magnitude * ([1, 2, 2.5, 5, 10].find((n) => n * magnitude >= ideal) ?? 10);
    const lowTick = Math.floor(lower / interval);
    const highTick = Math.ceil(upper / interval);
    const min = lowTick * interval;
    const max = highTick * interval;
    const ticks = Array.from({length: highTick - lowTick + 1}, (_, i) => (lowTick + i) * interval);
    const x = (step: number) => left + (right - left) * (step - first) / (last - first);
    const y = (value: number) => bottom - (bottom - top) * (value - min) / (max - min);
    const paths = panel.series.map(({ values: points }) =>
      points.map((value, index) => `${x(panel.domain[index]).toFixed(2)},${y(value).toFixed(2)}`).join(" "));
    return { x, y, paths, ticks };
  }, [panel, first, last]);
  const digits = panel.digits ?? 3;
  const format = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: digits });
  const xticks = [first, last / 4, last / 2, 3 * last / 4, last];

  return (
    <section className={styles.panel}>
      <h3>{panel.title}</h3>
      <div className={styles.chartFrame}>
        <svg
          ref={svg}
          viewBox="0 0 562 205"
          aria-hidden="true"
          onPointerMove={(event) => {
            if (event.pointerType === "touch" || !svg.current) return;
            const bounds = svg.current.getBoundingClientRect();
            const fraction = ((event.clientX - bounds.left) * 562 / bounds.width - left) / (right - left);
            setSelected(Math.max(0, Math.min(panel.domain.length - 1, Math.round(fraction * (panel.domain.length - 1)))));
          }}
        >
          {ticks.map((tick) => (
            <g key={tick}>
              <path className={styles.gridline} d={`M ${left} ${y(tick)} H ${right}`} />
              <text x={left - 9} y={y(tick) + 4} textAnchor="end">
                {tick.toLocaleString("en-US", { maximumSignificantDigits: 3 })}
              </text>
            </g>
          ))}
          {xticks.map((tick) => <text key={tick} x={x(tick)} y={196} textAnchor="middle">{tick.toLocaleString("en-US")}</text>)}
          {panel.series.map(({ label, tone = 0 }, index) => (
            <polyline
              key={label}
              className={styles.trace}
              pathLength={1}
              points={paths[index]}
              stroke={colors[tone]}
            />
          ))}
          <path className={styles.guide} d={`M ${x(panel.domain[selected])} ${top} V ${bottom}`} />
          {panel.series.map(({ label, values: points, tone = 0 }) => (
            <circle key={label} cx={x(panel.domain[selected])} cy={y(points[selected])} r={4} fill={colors[tone]} />
          ))}
        </svg>
      </div>
      <label className={styles.slider}>
        <span>Lattice step <strong>{panel.domain[selected].toLocaleString("en-US")}</strong></span>
        <input type="range" min={0} max={panel.domain.length - 1} value={selected}
          aria-label={`Lattice step for ${panel.title}`}
          aria-valuetext={`Step ${panel.domain[selected]}`}
          onChange={(event) => setSelected(Number(event.target.value))}
        />
      </label>
      <dl className={styles.readout}>
        {panel.series.map(({ label, values: points, tone = 0 }) => (
          <div key={label}>
            <dt><span style={{ background: colors[tone] }} />{label}</dt>
            <dd>{format(points[selected])} {panel.unit}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const stencilNeighbours = [
  { x: 67, y: 105, label: "x − 1 (−1)", tone: 0 },
  { x: 335, y: 105, label: "x + 1 (+1)", tone: 0 },
  { x: 100, y: 164, label: "y − 1 (−X)", tone: 1 },
  { x: 299, y: 47, label: "y + 1 (+X)", tone: 1 },
  { x: 201, y: 32, label: "z + 1 (+YX)", tone: 2 },
  { x: 201, y: 181, label: "z − 1 (−YX)", tone: 2 },
];

function Stencil() {
  return (
    <svg className={styles.diagram} viewBox="0 0 402 216" role="img"
      aria-label="A stencil reads the centre and the six axial neighbours at offsets plus or minus 1, X and YX.">
      {stencilNeighbours.map(({ x, y, label, tone }, index) => (
        <g key={label} className={styles.node} style={{ animationDelay: `${index * 80}ms` }}>
          <line x1={x} y1={y} x2={201} y2={105} stroke={colors[tone]} strokeWidth={1.5} />
          <circle cx={x} cy={y} r={6} fill="#ffffff" stroke={colors[tone]} strokeWidth={2} />
          <text x={x} y={y + (y < 60 ? -12 : 20)} textAnchor="middle">{label}</text>
        </g>
      ))}
      <circle cx={201} cy={105} r={12} fill="#112f49" />
      <text x={201} y={109} textAnchor="middle" className={styles.centre}>C</text>
    </svg>
  );
}

function Cells() {
  const [equivalent, setEquivalent] = useState(false);
  return (
    <>
      <div className={styles.options} aria-label="Unit cell basis">
        <button type="button" aria-pressed={!equivalent} onClick={() => setEquivalent(false)}>Original unit cell</button>
        <button type="button" aria-pressed={equivalent} onClick={() => setEquivalent(true)}>Equivalent unit cell</button>
      </div>
      <svg className={styles.diagram} viewBox="0 0 320 214" role="img"
        aria-label={`The same atomic lattice with ${equivalent ? "an equivalent a plus b basis" : "the original a, b basis"}.`}>
        <rect x={90} y={119} width={54} height={54} fill="#e6f0fa" stroke="#2366a0" strokeWidth={2}
          className={styles.cell} style={{ transform: equivalent ? "skewY(-45deg)" : "skewY(0deg)" }} />
        {Array.from({ length: 20 }, (_, index) => (
          <g key={index}>
            <circle cx={49 + index % 5 * 54} cy={35 + Math.floor(index / 5) * 54} r={4} fill={colors[0]} />
            <circle cx={68 + index % 5 * 54} cy={46 + Math.floor(index / 5) * 54} r={4} fill="#a66a20" />
          </g>
        ))}
        <text x={78} y={137}>b</text>
        <text x={124} y={equivalent ? 153 : 191}>{equivalent ? "a + b" : "a"}</text>
      </svg>
      <p className={styles.note}>The periodic atomic pattern is unchanged.</p>
    </>
  );
}

type FigureFrameProps = {
  title?: string;
  subtitle?: string;
  caption?: string;
  label?: string;
  children: ReactNode;
};

export function FigureFrame({ title, subtitle, caption, label, children }: FigureFrameProps) {
  const figure = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!figure.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.16 });
    observer.observe(figure.current);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={figure} className={styles.figure} aria-label={label} data-entered={entered}>
      <div className={styles.card}>
        {title && <p className={styles.title}>{title}</p>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function ScientificFigure({ spec, caption }: { spec: FigureSpec; caption: string }) {
  return (
    <FigureFrame title={spec.title} subtitle={spec.subtitle} caption={caption}>
      {"diagram" in spec
        ? (spec.diagram === "stencil" ? <Stencil /> : <Cells />)
        : spec.panels.map((panel) => panel.kind === "bar"
          ? <Bars key={panel.title} panel={panel} />
          : <Lines key={panel.title} panel={panel} />)}
      {"diagram" in spec && spec.diagram === "stencil" && <p className={styles.note}>
        Offsets in parentheses count elements relative to the centre address in the contiguous field buffer.
        The stencil uses the centre value for any out-of-bounds or inactive neighbour.
      </p>}
    </FigureFrame>
  );
}
