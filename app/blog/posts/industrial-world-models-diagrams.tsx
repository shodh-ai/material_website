import type { ReactNode } from "react";
import { FigureFrame } from "./scientific-figure";
import figure from "./scientific-figure.module.css";
import styles from "./industrial-world-models.module.css";

function Box({ heading, children, label, accent = false }: {
  heading: ReactNode;
  children?: ReactNode;
  label?: string;
  accent?: boolean;
}) {
  return (
    <div className={`${styles.box} ${figure.node}${accent ? ` ${styles.accent}` : ""}`}>
      {label && <span className={styles.label}>{label}</span>}
      <strong>{heading}</strong>
      {children && <div className={styles.detail}>{children}</div>}
    </div>
  );
}

function Arrow({ twoWay = false }: { twoWay?: boolean }) {
  return <span className={styles.arrow} aria-hidden="true">{twoWay ? "↕" : "↓"}</span>;
}

export function ManufacturingBridge() {
  return (
    <FigureFrame label="Computational molecular discovery to physical manufacturing">
      <div className={styles.sequence}>
        <Box heading="Computational molecular discovery">
          AlphaFold · DeepMind · Isomorphic Labs · Chai · Boltz<br />
          Structure prediction, molecular interactions and design
        </Box>
        <Box heading="Shodh" accent>
          Computational process development<br />
          Process design · Technology transfer · Scale-up
        </Box>
        <Box heading="Physical manufacturing">
          Quality, yield, stability and production economics
        </Box>
      </div>
    </FigureFrame>
  );
}

export function ModelGenerations() {
  return (
    <FigureFrame label="Three generations of foundation models">
      <div className={styles.sequence}>
        <Box label="GENERATION I" heading="Generate">
          <var>p</var>(data)<br />Digital information
        </Box>
        <Box label="GENERATION II" heading="Simulate">
          State<sub>t</sub> → State<sub>t+1</sub><br />Forward physical evolution
        </Box>
        <Box label="GENERATION III" heading="Design" accent>
          Target outcome → Optimal process<br />Industrial World Models
        </Box>
      </div>
    </FigureFrame>
  );
}

export function ConstrainedProcessDesign() {
  return (
    <FigureFrame
      title="Constrained process design under uncertainty"
      caption="Identify optimal process conditions within equipment operating limits, subject to product quality constraints under material and process uncertainty."
    >
      <p className={styles.equation}>
        <span><var>u</var><sup>*</sup> =</span>
        <span>arg min<sub><var>u</var> ∈ <var>U</var><sub>skid</sub></sub><span className={styles.mathNote}>Equipment limits</span></span>
        <span><var>E</var><sub>ξ</sub>[<var>J</var>(<var>u</var>, ξ)]<span className={styles.mathNote}>Process cost and time</span></span>
      </p>
      <p className={styles.equation}>
        <span>subject to</span>
        <span>Pr<sub>ξ</sub>(Quality specifications met) ≥ 1 − α<span className={styles.mathNote}>Product quality under uncertainty</span></span>
      </p>
    </FigureFrame>
  );
}

const scaleRows = [
  ["Molecular scale", "Interactions, conformational dynamics", "10⁻¹⁰ – 10⁻⁶ s", "Sub-nanoseconds to microseconds"],
  ["Mesoscale", "Adsorption, aggregation, diffusion", "10⁻⁶ – 10¹ s", "Microseconds to seconds"],
  ["Process scale", "Chromatography, mixing, membrane transport", "10⁰ – 10⁴ s", "Seconds to hours"],
  ["Manufacturing scale", "Batch evolution, equipment performance", "10⁴ – 10⁶ s", "Hours to days"],
];

export function SpatialTemporalCoupling() {
  return (
    <FigureFrame label="Spatial and temporal coupling">
      <div className={styles.scales}>
        {scaleRows.map(([name, phenomena, time, range], index) => (
          <div key={name}>
            {index > 0 && <Arrow twoWay />}
            <div className={`${styles.scale} ${figure.node}`}>
              <div><strong>{name}</strong><div className={styles.detail}>{phenomena}</div></div>
              <div className={styles.scaleTime}><strong>{time}</strong><div className={styles.detail}>{range}</div></div>
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.columns} ${figure.panel}`}>
        <Box heading="→ Forward reasoning">From molecular interactions to manufacturing outcomes.</Box>
        <Box heading="← Inverse reasoning">From observations to plausible underlying physical conditions.</Box>
      </div>
    </FigureFrame>
  );
}

export function ComputationalPipeline() {
  return (
    <FigureFrame label="Making physical systems computationally compatible">
      <div className={styles.parallel}>
        <Box heading="Numerical physics" accent>GPU-native multiphysics solvers</Box>
        <Box heading="Physical experiments" accent>Measured scientific data</Box>
      </div>
      <Arrow />
      <Box heading="Petabyte-scale scientific data requirements">Multiple domains, resolutions and timescales</Box>
      <Arrow />
      <Box heading="Scientific tokenisation — LURTEE">Spatial and temporal compression while preserving relevant physical information</Box>
      <Arrow />
      <div className={styles.parallel}>
        <Box heading="ABI">Computational data contracts and exchange</Box>
        <Box heading="TCPI">Physical semantics, units, frames and compatibility</Box>
      </div>
      <Arrow />
      <Box heading="LUCAN Foundation Model" accent>Hybrid Mamba–attention · Sparse MoE · Scientific pretraining</Box>
      <Arrow />
      <Box heading="Physical predictions and computational design">Conservation constraints · Solver verification · Uncertainty</Box>
    </FigureFrame>
  );
}

export function LivingMachinePlatform() {
  return (
    <FigureFrame label="Living Machine Platform">
      <div className={styles.parallel}>
        <Box heading="LUCAN" accent>
          Pre-trained physical knowledge<br />
          Physical dynamics, interactions and learned representations
        </Box>
        <Box heading="ProcessGraph" accent>
          Persistent process-specific knowledge<br />
          Molecules, equipment, experiments and engineering decisions
        </Box>
      </div>
      <div className={styles.arrows} aria-hidden="true"><span>↓</span><span>↓</span></div>
      <Box heading="Living Machine Platform">Calibrated, persistent computational representation of an industrial process</Box>
      <p className={styles.cycle}>Predict → Experiment → Validate → Update</p>
    </FigureFrame>
  );
}

export function KnowledgeTransfer() {
  return (
    <FigureFrame label="Two directions of knowledge transfer">
      <section className={figure.panel}>
        <h3>A. Same molecule, different equipment</h3>
        <div className={styles.sequence}>
          <Box heading="Bench scale" />
          <Box heading="Pilot scale" />
          <Box heading="Commercial scale" />
        </div>
        <p className={styles.helper}>Retain applicable molecular knowledge. Adapt equipment-dependent physics.</p>
      </section>
      <section className={figure.panel}>
        <h3>B. Same equipment, different molecules</h3>
        <div className={styles.arrows}>
          <Box heading="mAb" />
          <Box heading="Bispecific" />
          <Box heading="ADC" />
        </div>
        <div className={styles.arrows} aria-hidden="true"><span>↓</span><span>↓</span><span>↓</span></div>
        <Box heading="Persistent equipment model" accent />
        <p className={styles.helper}>Reuse applicable equipment knowledge. Adapt molecule-dependent physics.</p>
      </section>
    </FigureFrame>
  );
}

export function BiopharmaOperations() {
  return (
    <FigureFrame label="Biopharmaceutical manufacturing operations">
      <div className={styles.columns}>
        <section className={styles.stack}>
          <h3>A. Complex biologics</h3>
          <p className={styles.detail}>Monoclonal antibodies · Bispecifics · ADCs</p>
          <Box heading="Protein interactions & aggregation" accent />
          <Arrow twoWay />
          <Box heading="Viral inactivation & chromatography" accent>Protein A · CEX · AEX · HIC</Box>
          <Arrow twoWay />
          <Box heading="Membrane filtration & concentration" accent>UF/DF · TFF</Box>
          <Arrow twoWay />
          <Box heading="Formulation, viscosity & stability" accent>High concentration · Freeze-thaw · Lyophilisation</Box>
        </section>
        <section className={styles.stack}>
          <h3>B. Lipid nanoparticles &amp; RNA</h3>
          <p className={styles.detail}>LNPs and RNA therapeutics</p>
          <Box heading="Lipid chemistry & membrane physics" accent>Ionisable lipids · pK<sub>a</sub> · Interactions</Box>
          <Arrow twoWay />
          <Box heading="Microfluidic mixing & encapsulation" accent />
          <Arrow twoWay />
          <Box heading="Ethanol removal & membrane filtration" accent />
          <Arrow twoWay />
          <Box heading="Particle structure, formulation & stability" accent />
        </section>
      </div>
    </FigureFrame>
  );
}

export function ProcessDevelopmentWorkflows() {
  return (
    <FigureFrame label="The workflow transformation">
      <section className={figure.panel}>
        <h3>Conventional process development</h3>
        <div className={styles.sequence}>
          <Box heading="Experimental screening" />
          <Box heading="Model development" />
          <Box heading="Iterative optimisation" />
          <Box heading="Scale-up" />
        </div>
      </section>
      <section className={figure.panel}>
        <h3>Shodh&apos;s proposed workflow</h3>
        <div className={styles.sequence}>
          <Box heading="Pre-trained process models" accent />
          <Box heading="Experimental calibration" />
          <Box heading="Computational design" />
          <Box heading="Physical verification" />
        </div>
      </section>
    </FigureFrame>
  );
}
