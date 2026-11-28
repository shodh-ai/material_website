import {
  BiopharmaOperations,
  ComputationalPipeline,
  ConstrainedProcessDesign,
  KnowledgeTransfer,
  LivingMachinePlatform,
  ManufacturingBridge,
  ModelGenerations,
  ProcessDevelopmentWorkflows,
  SpatialTemporalCoupling,
} from "./industrial-world-models-diagrams";

export const industrialWorldModelsSlug = "industrial-world-models";
export const industrialWorldModelsAssets = `/blog/${industrialWorldModelsSlug}`;

export const industrialWorldModelsSections = [
  { id: "technological-inflection", title: "01. The technological inflection" },
  { id: "third-generation", title: "02. Industrial World Models — The third generation" },
  { id: "developing-lucan", title: "03. Technical methodology — Developing LUCAN" },
  { id: "living-machines", title: "04. Pre-trained process models and Living Machines" },
  { id: "biopharmaceutical-manufacturing", title: "05. Biopharmaceutical manufacturing — Our initial focus" },
  { id: "intelligent-manufacturing", title: "06. Beyond process development — Intelligent manufacturing" },
  { id: "references", title: "References" },
];

export default function IndustrialWorldModels() {
  return (
    <>
      <p>AI can help scientists design molecules for new medicines, but a promising molecule only reaches patients if it can be made reliably at scale. Even as discovery gets faster, figuring out how to manufacture a new drug still relies heavily on physical experiments. We’re building computer models that learn from simulations and experiments to help teams design and test manufacturing processes, starting with medicines made using living cells.</p>

      <h2 id="technological-inflection">01. The technological inflection</h2>

      <p>AlphaFold and computational models from Google DeepMind, Isomorphic Labs, Chai and Boltz have demonstrated increasingly powerful methods for structure prediction, molecular interactions and therapeutic design.<sup><a href="#note-1">[1–3]</a></sup></p>

      <p>However, the ability to design a physical product does not establish how it can be manufactured. Process development, equipment design, technology transfer and scale-up remain dependent on extensive experimentation. In biopharma, conventional antibody CMC programmes can take 12–18 months from DNA to IND.<sup><a href="#note-4">[4,5]</a></sup></p>

      <p>Advances in accelerated computing, numerical physics and scientific foundation models present an opportunity to change how industrial processes are developed, designed and operated.</p>

      <p>Shodh is building pre-trained process models that connect molecular behaviour to manufacturing outcomes. Our initial focus is biopharma, with broader applications across the process industries, including chemicals, materials and fuels.</p>

      <ManufacturingBridge />

      <h2 id="third-generation">02. Industrial World Models — The third generation</h2>

      <p>We distinguish three generations of foundation models by their computational objectives.<sup><a href="#note-6">[6]</a></sup></p>

      <ModelGenerations />

      <p>We call the third generation <strong>Industrial World Models</strong>. By connecting physical phenomena across spatial and temporal scales, these models are designed to enable:</p>

      <ul>
        <li><strong>Coupled physical simulation:</strong> Understand how interactions across different physical domains and scales affect industrial outcomes.</li>
        <li><strong>Inverse diagnosis:</strong> Infer underlying physical conditions from observed outcomes.</li>
        <li><strong>Counterfactual reasoning:</strong> Evaluate alternative process conditions, materials and equipment computationally.</li>
        <li><strong>Inverse design:</strong> Work backwards from desired product properties to feasible manufacturing conditions.</li>
        <li><strong>Knowledge transfer:</strong> Reuse physical knowledge across molecules, equipment, processes and manufacturing facilities.</li>
      </ul>

      <p>The broader opportunity is to move manufacturing from experiment-led development towards computational design, enabling new processes, new equipment architectures and ultimately self-correcting factories.</p>

      <ConstrainedProcessDesign />

      <h2 id="developing-lucan">03. Technical methodology — Developing LUCAN</h2>

      <ul>
        <li>Physical systems evolve across multiple spatial and temporal scales.</li>
        <li>Resolving each phenomenon at its native resolution is computationally prohibitive.</li>
        <li>Learning across these systems requires efficient, physically meaningful representations of potentially petabyte-scale scientific data.</li>
      </ul>

      <h3>3.1. Spatial and temporal coupling</h3>
      <SpatialTemporalCoupling />

      <h3>3.2. Making physical systems computationally compatible</h3>
      <ComputationalPipeline />

      <p>The architecture is designed to enable shared learning without discarding domain-specific physical information.<sup><a href="#note-7">[7]</a></sup></p>

      <h2 id="living-machines">04. Pre-trained process models and Living Machines</h2>

      <p>Rather than constructing physical models from scratch for each industrial process, we combine pre-trained physical models with persistent process-specific knowledge.</p>

      <LivingMachinePlatform />

      <h3>Two directions of knowledge transfer</h3>
      <KnowledgeTransfer />

      <p>Factorising molecular and equipment-dependent physics while preserving their interactions provides a basis for knowledge reuse.</p>

      <h2 id="biopharmaceutical-manufacturing">05. Biopharmaceutical manufacturing — Our initial focus</h2>

      <p>Biopharmaceutical manufacturing comprises coupled physical operations governing yield, purity, impurity clearance, product structure and stability.</p>

      <p>Our initial focus is early-stage process development, downstream processing and formulation across both platform and non-platform therapeutics.</p>

      <BiopharmaOperations />

      <h3 id="computational-capabilities">Computational capabilities and engineering applications</h3>
      <div role="region" aria-labelledby="computational-capabilities" tabIndex={0}>
        <table>
          <thead><tr><th scope="col">Computational capability</th><th scope="col">Engineering application</th></tr></thead>
          <tbody>
            <tr><th scope="row">Reconstruction</th><td>Reconstruct physical states and investigate batch failures.</td></tr>
            <tr><th scope="row">Inverse diagnosis</th><td>Infer unmeasured physical parameters from experimental observations.</td></tr>
            <tr><th scope="row">Prediction</th><td>Forecast process behaviour and critical quality attributes.</td></tr>
            <tr><th scope="row">Counterfactuals</th><td>Evaluate alternative operating conditions, formulations and equipment.</td></tr>
            <tr><th scope="row">Inverse design</th><td>Identify feasible operating conditions and process design spaces.</td></tr>
            <tr><th scope="row">Experiment design</th><td>Select experiments that reduce uncertainty.</td></tr>
          </tbody>
        </table>
      </div>

      <h3>The workflow transformation</h3>
      <ProcessDevelopmentWorkflows />

      <p>The objective is to introduce manufacturability considerations earlier in molecular development, reduce experimental search and support the construction of physically justified design spaces within the Quality by Design framework.<sup><a href="#note-8">[8–10]</a></sup></p>

      <h2 id="intelligent-manufacturing">06. Beyond process development — Intelligent manufacturing</h2>

      <p>Early aircraft were designed to remain stable without much intervention from the pilot. Computer-controlled flight made new aircraft designs possible. We believe a similar transition is possible in manufacturing. Industrial World Models could enable equipment designed around real-time physical understanding and computational control, rather than conservative operating margins.</p>

      <p>Our development follows three stages:</p>
      <ul>
        <li><strong>Engineer and scale biologics.</strong> Deploy pre-trained process models across existing biopharmaceutical infrastructure, accumulating validated physical knowledge within ProcessGraph.</li>
        <li><strong>Expand across industries and redesign equipment.</strong> Transfer coupled physical knowledge into chemicals, materials and fuels. Co-design compact, continuous and more efficient manufacturing systems.</li>
        <li><strong>Operate self-correcting factories.</strong> Connect Industrial World Models to sensors, pumps and valves, enabling real-time physical state estimation and adaptive control within validated quality and regulatory bounds.<sup><a href="#note-11">[11–12]</a></sup></li>
      </ul>

      <p>Our objective is to build the physical intelligence that designs and operates the factories of the future.</p>

      <h2 id="references">References</h2>
      <ol>
        <li id="note-1">Abramson, J. et al. (2024). <a href="https://doi.org/10.1038/s41586-024-07487-w">Accurate structure prediction of biomolecular interactions with AlphaFold 3</a>. Nature 630, 493–500.</li>
        <li>Chai Discovery. <a href="https://chaiassets.com/chai-2/paper/technical_report.pdf">Chai-2 technical report: zero-shot antibody design</a> (2025).</li>
        <li>Boltz-2 (2025). <a href="https://doi.org/10.1101/2025.06.14.659707">Biomolecular interaction prediction and binding affinity</a>. Preprint.</li>
        <li id="note-4"><a href="https://doi.org/10.1080/19420862.2022.2060724">Upstream cell culture process characterization and in-process control strategy development at pandemic speed</a>. mAbs (2022).</li>
        <li>Catalent. <a href="https://www.catalent.com/pharma/technologies/rapid-antibody-to-ds">Rapid Antibody platform: traditional and accelerated monoclonal antibody development timelines</a>.</li>
        <li id="note-6">Shodh AI. <a href="https://shodh.ai/research/three-generations-of-foundation-models">Three Generations of Foundation Models</a>. Research essay.</li>
        <li id="note-7">Shodh AI (2026). <a href="https://shodh.ai/research/LUCAN_Physical_Intelligence_Whitepaper_v3.pdf">LUCAN: A Foundation World Model for Physical Intelligence</a>. Technical whitepaper.</li>
        <li id="note-8"><a href="https://www.ich.org/page/quality-guidelines">ICH Q8(R2). Pharmaceutical Development</a>.</li>
        <li><a href="https://www.ich.org/page/quality-guidelines">ICH Q9(R1). Quality Risk Management</a>.</li>
        <li><a href="https://www.ich.org/page/quality-guidelines">ICH Q11. Development and Manufacture of Drug Substances</a>.</li>
        <li id="note-11"><a href="https://www.ich.org/page/quality-guidelines">ICH Q13. Continuous Manufacturing of Drug Substances and Drug Products</a>.</li>
        <li>FDA. PAT — A Framework for Innovative Pharmaceutical Development, Manufacturing, and Quality Assurance (2004).</li>
      </ol>
    </>
  );
}
