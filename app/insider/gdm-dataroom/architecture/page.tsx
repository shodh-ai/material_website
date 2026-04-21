"use client";
import GdmDocShell from "@/components/GdmDocShell";

function JaxFlow() {
  return (
    <div className="my-8 p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
      <p className="text-white/25 text-xs uppercase tracking-widest mb-6 text-center">
        JAX-Native Physics Simulation Architecture
      </p>
      <div className="flex flex-col items-center">
        <div className="w-72 px-5 py-3 rounded-xl border-2 border-blue-500/60 bg-blue-900/15 text-center">
          <p className="text-blue-300 text-sm font-semibold">Voxel Geometry</p>
          <p className="text-white/35 text-[11px] mt-0.5 font-mono">
            generate_geometry.py · sphere-pack · z, D
          </p>
        </div>
        <div className="relative w-full h-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-white/20" />
          <div className="absolute top-4 left-[16.5%] right-[16.5%] h-px bg-white/20" />
          <div className="absolute top-4 left-[16.5%] w-px h-6 bg-white/20" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-6 bg-white/20" />
          <div className="absolute top-4 right-[16.5%] w-px h-6 bg-white/20" />
        </div>
        <div className="grid grid-cols-3 gap-3 w-full">
          <div className="px-3 py-3 rounded-xl border-2 border-blue-500/50 bg-blue-900/10 text-center">
            <p className="text-blue-300 text-xs font-semibold mb-1">Navier-Stokes</p>
            <p className="text-white/30 text-[10px] font-mono leading-relaxed">
              LBM D3Q19 · bounce-back BCs · flow field
            </p>
          </div>
          <div className="px-3 py-3 rounded-xl border-2 border-purple-600/50 bg-purple-900/10 text-center">
            <p className="text-purple-300 text-xs font-semibold mb-1">Fick&apos;s Law</p>
            <p className="text-white/30 text-[10px] font-mono leading-relaxed">
              iterative JAX scan · 3D diffusion field
            </p>
          </div>
          <div className="px-3 py-3 rounded-xl border-2 border-indigo-600/50 bg-indigo-900/10 text-center">
            <p className="text-indigo-300 text-xs font-semibold mb-1">
              Cahn-Hilliard / Shan-Chen
            </p>
            <p className="text-white/30 text-[10px] font-mono leading-relaxed">
              multiphase LBM · electrolyte wetting
            </p>
          </div>
        </div>
        <div className="relative w-full h-10">
          <div className="absolute top-0 left-[16.5%] w-px h-4 bg-white/20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-white/20" />
          <div className="absolute top-0 right-[16.5%] w-px h-4 bg-white/20" />
          <div className="absolute top-4 left-[16.5%] right-[16.5%] h-px bg-white/20" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-6 bg-white/20" />
        </div>
        <div className="w-80 px-5 py-3 rounded-xl border-2 border-green-600/60 bg-green-900/15 text-center">
          <p className="text-green-300 text-sm font-semibold">Physics Fields</p>
          <p className="text-white/35 text-[11px] mt-0.5 font-mono">
            τ_eff · D_eff · wetting fraction → microstructure features
          </p>
        </div>
        <div className="flex flex-col items-center py-1">
          <div className="w-px h-4 bg-white/20" />
          <svg width="10" height="6" viewBox="0 0 10 6">
            <path d="M0 0L5 6L10 0" fill="rgba(255,255,255,0.25)" />
          </svg>
        </div>
        <div className="px-7 py-3 rounded-xl border-2 border-amber-600/60 bg-amber-900/15 text-center">
          <p className="text-amber-300 text-sm font-semibold font-mono">
            JAX · jit · vmap · GPU
          </p>
        </div>
      </div>
    </div>
  );
}

const jaxLabImages = [
  { file: "1a_ch_slice.png", label: "CH Phase Field", sub: "Mid-plane slice" },
  { file: "1b_ch_isosurface.png", label: "CH Interface φ=0", sub: "(3D)" },
  { file: "2a_ficks_slice.png", label: "Fick's Concentration", sub: "Slice" },
  { file: "2b_ficks_isosurface.png", label: "Fick's 25%/75% Shells", sub: "(3D)" },
  { file: "3a_multiphase_phase_slice.png", label: "Multiphase Phase Field", sub: "Slice" },
  { file: "3b_multiphase_vel_slice.png", label: "Multiphase Velocity", sub: "Magnitude slice" },
  { file: "3c_multiphase_interface.png", label: "Multiphase Interface", sub: "Isosurface (3D)" },
  { file: "4a_ns_velocity_slice.png", label: "NS Velocity Magnitude", sub: "Slice" },
  { file: "4b_ns_streamlines.png", label: "NS Streamlines", sub: "(3D)" },
];

export default function ArchitecturePage() {
  return (
    <GdmDocShell
      eyebrow="File 03 · Shodh AI — Technical Architecture Whitepaper"
      title="JAX-Native Physics Engine & Neural Surrogate Architecture"
      classification="Confidential"
    >
      <article className="prose prose-invert max-w-none font-light text-white/70 leading-relaxed">
        <h2 className="text-2xl font-light text-white mt-0 mb-4">
          1. The Differentiability Bottleneck in Manufacturing
        </h2>
        <p>
          Legacy process-engineering solvers (e.g., standard CFD, PyBaMM,
          ANSYS) suffer from two fatal flaws when applied to industrial
          scale-up: they are computationally prohibitive at 3D mesoscale
          resolutions, and they are mathematically &ldquo;black boxes&rdquo;
          that cannot backpropagate gradients. To enable true Inverse Design
          (working backward from a target performance to a manufacturing
          geometry), the underlying physics must be fully differentiable.
        </p>
        <p>
          To solve this, Shodh AI built a proprietary 3D multi-physics engine
          entirely in <strong className="text-white">native JAX</strong>,
          allowing us to compile the governing equations of fluid and
          thermodynamics directly onto GPU clusters via{" "}
          <code className="text-rose-300">jax.jit</code> and{" "}
          <code className="text-rose-300">jax.vmap</code>.
        </p>

        <h2 className="text-2xl font-light text-white mt-10 mb-4">
          2. The Ground-Truth Physics Pipeline
        </h2>
        <p>
          Our JAX engine generates the high-fidelity 3D time-series data
          required to train our neural surrogates. The engine natively couples
          three core continuous equations:
        </p>
        <ul className="space-y-3 my-4">
          <li>
            <strong className="text-white">Navier-Stokes (Fluid Flow):</strong>{" "}
            We simulate incompressible fluid flow through complex, procedurally
            generated 3D geometries (e.g., porous networks, reactor impellers)
            using a{" "}
            <strong className="text-white">
              Lattice Boltzmann Method (LBM) D3Q19 lattice
            </strong>{" "}
            with bounce-back boundary conditions.
          </li>
          <li>
            <strong className="text-white">Fick&apos;s Law (Mass Transport):</strong>{" "}
            Steady-state species diffusion is solved via an iterative{" "}
            <code className="text-rose-300">jax.lax.scan</code> over the 3D
            concentration field, allowing us to track active material transport
            natively.
          </li>
          <li>
            <strong className="text-white">
              Cahn-Hilliard / Shan-Chen (Multiphase Flow):
            </strong>{" "}
            To model complex liquid-gas phase separation, electrolyte wetting,
            and continuous chemical reprocessing, we utilize a multiphase LBM
            tracking the interfacial thermodynamics.
          </li>
        </ul>

        <JaxFlow />

        <p className="text-white/30 text-xs uppercase tracking-widest mb-5 mt-10">
          Validation Results — JAX-LaB Physics Engine
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 not-prose">
          {jaxLabImages.map((img) => (
            <div
              key={img.file}
              className="rounded-xl overflow-hidden border border-white/8 bg-[#060606]"
            >
              <div className="aspect-square overflow-hidden flex items-center justify-center bg-black/40">
                <img
                  src={`/jax-lab_results/${img.file}`}
                  alt={img.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-3 py-2">
                <p className="text-white/60 text-xs font-medium">{img.label}</p>
                <p className="text-white/30 text-[10px]">{img.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-light text-white mt-12 mb-4">
          3. The Neural Surrogate: Diffusion-FNO
        </h2>
        <p>
          While the JAX solvers provide the ground truth, they are
          computationally heavy. To achieve millisecond inference for Inverse
          Design, we train a 300M+ parameter{" "}
          <strong className="text-white">
            Diffusion Fourier Neural Operator (Diffusion-FNO)
          </strong>{" "}
          surrogate model on the generated tensors.
        </p>
        <p>
          We deliberately abandoned standard 3D U-Nets, which fail to capture
          high-frequency spectral modes in chaotic fluids. Our architecture
          utilizes:
        </p>
        <ul className="space-y-3 my-4">
          <li>
            <strong className="text-white">Fourier Neural Operator (FNO) Backbone:</strong>{" "}
            By parameterizing convolutions in the frequency domain, the FNO
            explicitly captures multi-scale turbulent mixing and the spectral
            energy cascade, maintaining mesh-invariance.
          </li>
          <li>
            <strong className="text-white">Rectified Flow (Flow Matching):</strong>{" "}
            We utilize an Euler-integrated Rectified Flow objective
            (v = ε − x₀). This continuous-time formulation learns a
            straight-line trajectory between noise and data, which aligns
            mathematically with the advective nature of fluid dynamics
            equations, drastically improving stability over standard DDPMs.
          </li>
          <li>
            <strong className="text-white">Physics-Informed Conditioning:</strong>{" "}
            The neural operator is conditioned not only on the current spatial
            state (x<sub>t</sub>) and time embedding, but via a scalar MLP on
            the{" "}
            <strong className="text-white">
              dimensionless physical parameters
            </strong>{" "}
            (e.g., Atwood Number, Reynolds Number). This guarantees the model
            learns the underlying physics, not just the geometry.
          </li>
        </ul>

        <div className="my-8 grid grid-cols-1 gap-4 not-prose">
          <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400/70" />
              <span className="text-white/50 text-xs uppercase tracking-widest">
                Diffusion-FNO Rollout Fields
              </span>
            </div>
            <img
              src="/deepmind/rollout_fields.png"
              alt="Diffusion-FNO rollout fields"
              className="w-full h-auto"
            />
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400/70" />
              <span className="text-white/50 text-xs uppercase tracking-widest">
                Sample Trajectory · t=050 (Rayleigh-Taylor)
              </span>
            </div>
            <img
              src="/deepmind/vis_sample_traj000_t050.png"
              alt="Diffusion-FNO sample trajectory"
              className="w-full h-auto"
            />
          </div>
        </div>

        <h2 className="text-2xl font-light text-white mt-10 mb-4">
          4. Enforcing Physics: The Divergence Penalty
        </h2>
        <p>
          To prevent the diffusion model from &ldquo;hallucinating&rdquo;
          unphysical fluid states, we augment the standard Flow Matching MSE
          loss with a hard physical constraint:{" "}
          <strong className="text-white">The Continuity Equation</strong>.
        </p>
        <p>
          During the denoising process, we reconstruct the clean velocity field
          (x̂₀ = x<sub>t</sub> − t · v<sub>θ</sub>) and calculate the spatial
          divergence (∇·u) using 3D central finite differences. We penalize the
          loss function strictly for any divergence from zero, forcing the
          neural network to output perfectly incompressible fluid fields.
        </p>

        <h2 className="text-2xl font-light text-white mt-10 mb-4">
          5. Benchmark Validation: Rayleigh-Taylor Instability
        </h2>
        <p>
          To validate the architecture&apos;s ability to handle highly chaotic,
          nonlinear fluid dynamics (analogous to extreme chemical reactor
          mixing), we benchmarked the Diffusion-FNO on the{" "}
          <strong className="text-white">Rayleigh-Taylor (RT) Instability</strong>{" "}
          dataset across an 8x H100 GPU DDP cluster.
        </p>
        <p>
          The RT instability tracks the chaotic interpenetration of heavy and
          light fluids. The model was tasked with predicting the 3D density
          and velocity fields (D, V<sub>x</sub>, V<sub>y</sub>, V<sub>z</sub>)
          at t+1 on a dense 128³ voxel grid.
        </p>
        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          {[
            {
              label: "VRMSE (held-out)",
              value: "0.0197 ± 0.0254",
              note:
                "~2% error vs fluid std-dev — near-perfect parity with the numerical solver.",
              color: "border-emerald-500/25 bg-emerald-950/10 text-emerald-300",
            },
            {
              label: "Divergence Residual |∇·u|",
              value: "0.00070 ± 0.00090",
              note:
                "Proof that the network learned and adhered to incompressibility.",
              color: "border-blue-500/25 bg-blue-950/10 text-blue-300",
            },
            {
              label: "Spectral Log-MSE",
              value: "0.0575",
              note:
                "FNO backbone captured fine-scale eddies and Kolmogorov energy cascade.",
              color: "border-violet-500/25 bg-violet-950/10 text-violet-300",
            },
          ].map((m) => (
            <div key={m.label} className={`p-5 rounded-xl border ${m.color}`}>
              <p className="text-xs uppercase tracking-wider opacity-80 mb-2">
                {m.label}
              </p>
              <p className="text-xl font-light text-white mb-2 font-mono">
                {m.value}
              </p>
              <p className="text-white/55 text-xs font-light leading-relaxed">
                {m.note}
              </p>
            </div>
          ))}
        </div>
        <p className="text-white/50 text-sm italic">
          Validation Results on Held-out Test Split — 1,180 trajectories.
        </p>

        <h2 className="text-2xl font-light text-white mt-10 mb-4">
          6. Application to Manufacturing Scale-Up
        </h2>
        <p>
          By proving that our Diffusion-FNO architecture can predict chaotic,
          multiphase fluid dynamics with near-numerical precision, we have
          unlocked the core capability required for industrial scale-up. We
          apply this exact architecture to the mesoscale physics of our
          commercial partners (e.g., simulating the high-shear mixing zones of
          10,000-liter bioreactors or thermal gradients in specialty chemical
          flow loops).
        </p>
        <p>
          This allows process engineers to input a desired manufacturing
          outcome and instantly generate the required 3D physical parameters,
          effectively transforming physical trial-and-error into a software
          compilation problem.
        </p>
      </article>
    </GdmDocShell>
  );
}
