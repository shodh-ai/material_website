import Image from "next/image";

export const industrialWorldModelsSlug = "industrial-world-models";
export const industrialWorldModelsAssets = `/blog/${industrialWorldModelsSlug}`;

export const industrialWorldModelsSections = [
  { id: "technological-inflection", title: "The technological inflection" },
  { id: "third-generation", title: "Industrial World Models" },
  { id: "developing-lucan", title: "Technical methodology" },
  { id: "living-machines", title: "Pre-trained process models and Living Machines" },
  { id: "biopharmaceutical-manufacturing", title: "Biopharmaceutical manufacturing" },
  { id: "intelligent-manufacturing", title: "Intelligent manufacturing" },
  { id: "references", title: "References" },
];

export default function IndustrialWorldModels() {
  return (
    <>
      <h2 id="technological-inflection">The technological inflection</h2>

      <p>AlphaFold and computational models from Google DeepMind, Isomorphic Labs, Chai and Boltz have demonstrated increasingly powerful methods for structure prediction, molecular interactions and therapeutic design.<sup><a href="#note-1">[1–3]</a></sup></p>

      <p>Moving a molecular design into production requires process development, equipment design, technology transfer and scale-up. These steps still depend on extensive experimentation. In biopharma, conventional antibody chemistry, manufacturing and controls programmes can take 12–18 months from DNA to an investigational new drug application.<sup><a href="#note-4">[4–5]</a></sup></p>

      <p>Advances in accelerated computing, numerical physics and scientific foundation models present an opportunity to change how industrial processes are developed, designed and operated. Shodh is building pre-trained process models to connect molecular behaviour to manufacturing outcomes. Our initial focus is biopharma, with broader applications in chemicals, materials and fuels.</p>

      <figure>
        <Image src={`${industrialWorldModelsAssets}/industrial-model-generations.png`}
          alt="The brief maps molecular discovery to process development and manufacturing, then compares three generations of models that generate, simulate, and design."
          width={1506} height={615} sizes="(max-width: 760px) 88vw, 54vw" />
        <figcaption>Computational process development connects molecular discovery to manufacturing outcomes including quality, yield, stability and production economics.</figcaption>
      </figure>

      <h2 id="third-generation">Industrial World Models</h2>

      <p>We distinguish three generations of foundation models by their computational objectives.<sup><a href="#note-6">[6]</a></sup></p>

      <ol>
        <li><strong>Generate.</strong> Learn the distribution of digital information, <i>p</i>(data).</li>
        <li><strong>Simulate.</strong> Predict forward physical evolution from state <i>t</i> to state <i>t</i> + 1.</li>
        <li><strong>Design.</strong> Start from a target outcome and identify the process that can achieve it.</li>
      </ol>

      <p>We call the third generation Industrial World Models. These models are designed to connect physical phenomena across spatial and temporal scales and enable:</p>

      <ul>
        <li><strong>Coupled physical simulation.</strong> Understand how interactions across physical domains and scales affect industrial outcomes.</li>
        <li><strong>Inverse diagnosis.</strong> Infer underlying physical conditions from observed outcomes.</li>
        <li><strong>Counterfactual reasoning.</strong> Evaluate alternative process conditions, materials and equipment computationally.</li>
        <li><strong>Inverse design.</strong> Work backwards from desired product properties to feasible manufacturing conditions.</li>
        <li><strong>Knowledge transfer.</strong> Reuse physical knowledge across molecules, equipment, processes and facilities.</li>
      </ul>

      <p>Constrained process design selects operating conditions <i>u</i> within equipment limits to minimise expected cost and time under material and process uncertainty. The probability of meeting product quality specifications must be at least 1 − α. The broader opportunity is to use computational design to develop new processes, equipment and, ultimately, self-correcting factories.</p>

      <h2 id="developing-lucan">Technical methodology</h2>

      <p>Physical systems evolve across multiple spatial and temporal scales. Resolving each phenomenon at its native resolution is computationally prohibitive. Learning across these systems requires efficient representations of potentially petabyte-scale data that preserve relevant physical information.</p>

      <h3>Spatial and temporal coupling</h3>
      <div role="region" aria-label="Spatial and temporal scales" tabIndex={0}>
        <table>
          <thead><tr><th scope="col">Scale</th><th scope="col">Phenomena</th><th scope="col">Characteristic time</th></tr></thead>
          <tbody>
            <tr><th scope="row">Molecular</th><td>Interactions and conformational dynamics</td><td>10⁻¹⁰–10⁻⁶ s</td></tr>
            <tr><th scope="row">Mesoscale</th><td>Adsorption, aggregation and diffusion</td><td>10⁻⁶–10¹ s</td></tr>
            <tr><th scope="row">Process</th><td>Chromatography, mixing and membrane transport</td><td>10⁰–10⁴ s</td></tr>
            <tr><th scope="row">Manufacturing</th><td>Batch evolution and equipment performance</td><td>10⁴–10⁶ s</td></tr>
          </tbody>
        </table>
      </div>

      <p>Forward reasoning connects molecular interactions to manufacturing outcomes. Inverse reasoning uses observations to infer plausible underlying conditions.</p>

      <h3>Making physical systems computationally compatible</h3>
      <p>GPU-native multiphysics solvers and experiments together generate data across domains, resolutions and timescales. LURTEE compresses the spatial and temporal data while preserving relevant physical information. ABI defines computational data contracts and exchange. TCPI defines physical semantics, units, frames and compatibility. LUCAN uses hybrid Mamba–attention, a sparse mixture of experts and scientific pretraining. The architecture is designed to support prediction and design with conservation constraints, solver verification and uncertainty.<sup><a href="#note-7">[7]</a></sup></p>

      <figure>
        <Image src={`${industrialWorldModelsAssets}/lucan-data-flow.png`}
          alt="Numerical solvers and experiments feed LURTEE tokenisation, then ABI and TCPI interfaces, the LUCAN foundation model, and physical predictions and computational design."
          width={1506} height={783} sizes="(max-width: 760px) 88vw, 54vw" />
        <figcaption>The proposed LUCAN data flow connects solver output and measured data through common computational and physical interfaces.</figcaption>
      </figure>

      <h2 id="living-machines">Pre-trained process models and Living Machines</h2>

      <p>We combine pre-trained physical models with persistent process-specific knowledge. LUCAN carries learned physical dynamics, interactions and representations. ProcessGraph records molecules, equipment, experiments and engineering decisions. The Living Machine Platform combines them into a calibrated, persistent computational representation of an industrial process, updated through a cycle of prediction, experiment, validation and revision.</p>

      <ul>
        <li><strong>Same molecule, different equipment.</strong> Carry applicable molecular knowledge from bench to pilot and commercial scale, and adapt equipment-dependent physics.</li>
        <li><strong>Same equipment, different molecules.</strong> Reuse equipment knowledge across monoclonal antibodies, bispecifics and antibody-drug conjugates, and adapt molecule-dependent physics.</li>
      </ul>

      <p>Separating molecular and equipment-dependent physics while preserving their interactions provides a basis for knowledge reuse.</p>

      <h2 id="biopharmaceutical-manufacturing">Biopharmaceutical manufacturing</h2>

      <p>Biopharmaceutical manufacturing comprises coupled physical operations governing yield, purity, impurity clearance, product structure and stability. Our initial focus is early-stage process development, downstream processing and formulation across platform and non-platform therapeutics.</p>

      <ul>
        <li><strong>Complex biologics.</strong> For monoclonal antibodies, bispecifics and antibody-drug conjugates, the scope covers protein interactions and aggregation, viral inactivation and chromatography (Protein A, CEX, AEX and HIC), membrane filtration and concentration (UF/DF and TFF), and formulation, viscosity and stability at high concentration, during freeze-thaw and in lyophilisation.</li>
        <li><strong>Lipid nanoparticles and RNA.</strong> The scope covers lipid chemistry and membrane physics, microfluidic mixing and encapsulation, ethanol removal and membrane filtration, and particle structure, formulation and stability.</li>
      </ul>

      <div role="region" aria-label="Computational capabilities and engineering applications" tabIndex={0}>
        <table>
          <thead><tr><th scope="col">Capability</th><th scope="col">Engineering application</th></tr></thead>
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

      <p>Conventional process development proceeds through experimental screening, model development, iterative optimisation and scale-up. Shodh’s proposed workflow starts with pre-trained process models, then uses experimental calibration, computational design and physical verification. The objective is to bring manufacturability into molecular development earlier, reduce experimental search and support physically justified design spaces in the Quality by Design framework.<sup><a href="#note-8">[8–10]</a></sup></p>

      <h2 id="intelligent-manufacturing">Intelligent manufacturing</h2>

      <p>Computer-controlled flight made new aircraft designs possible. Industrial World Models could enable a similar transition in manufacturing, with equipment designed around real-time physical understanding and computational control.</p>

      <ol>
        <li><strong>Engineer and scale biologics.</strong> Deploy pre-trained process models in existing biopharmaceutical infrastructure and accumulate validated physical knowledge in ProcessGraph.</li>
        <li><strong>Expand across industries and redesign equipment.</strong> Transfer coupled physical knowledge into chemicals, materials and fuels, and co-design more compact, continuous and efficient manufacturing systems.</li>
        <li><strong>Operate self-correcting factories.</strong> Connect the models to equipment sensors and controls for real-time state estimation and adaptive control within validated quality and regulatory bounds.<sup><a href="#note-11">[11–12]</a></sup></li>
      </ol>

      <p>Our objective is to build the physical intelligence that designs and operates future factories.</p>

      <h2 id="references">References</h2>
      <ol>
        <li id="note-1">Abramson et al. (2024). <a href="https://doi.org/10.1038/s41586-024-07487-w">Accurate structure prediction of biomolecular interactions with AlphaFold 3</a>. Nature 630, 493–500.</li>
        <li>Chai Discovery (2025). <a href="https://chaiassets.com/chai-2/paper/technical_report.pdf">Chai-2 technical report on zero-shot antibody design</a>.</li>
        <li>Boltz-2 (2025). <a href="https://doi.org/10.1101/2025.06.14.659707">Biomolecular interaction prediction and binding affinity</a>. Preprint.</li>
        <li id="note-4"><a href="https://doi.org/10.1080/19420862.2022.2060724">Upstream cell culture process characterization and in-process control strategy development at pandemic speed</a>. mAbs (2022).</li>
        <li>Catalent. <a href="https://www.catalent.com/pharma/technologies/rapid-antibody-to-ds">Rapid Antibody platform development timelines</a>.</li>
        <li id="note-6">Shodh AI. <a href="https://shodh.ai/research/three-generations-of-foundation-models">Three Generations of Foundation Models</a>.</li>
        <li id="note-7">Shodh AI (2026). <a href="https://shodh.ai/research/LUCAN_Physical_Intelligence_Whitepaper_v3.pdf">LUCAN: A Foundation World Model for Physical Intelligence</a>.</li>
        <li id="note-8"><a href="https://www.ich.org/page/quality-guidelines">ICH Q8(R2). Pharmaceutical Development</a>.</li>
        <li><a href="https://www.ich.org/page/quality-guidelines">ICH Q9(R1). Quality Risk Management</a>.</li>
        <li><a href="https://www.ich.org/page/quality-guidelines">ICH Q11. Development and Manufacture of Drug Substances</a>.</li>
        <li id="note-11"><a href="https://www.ich.org/page/quality-guidelines">ICH Q13. Continuous Manufacturing of Drug Substances and Drug Products</a>.</li>
        <li>FDA (2004). PAT — A Framework for Innovative Pharmaceutical Development, Manufacturing, and Quality Assurance.</li>
      </ol>
    </>
  );
}
