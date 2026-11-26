import type { ComponentType } from "react";
import Tf32Rheology, { tf32Sections } from "./tf32-rheology";
import TritonReactor, { tritonSections } from "./triton-reactor";
import WrongTest, { wrongTestSections } from "./wrong-test";
import CrystalToken, { crystalSections } from "./crystal-token";
import AntibodyTokenizer, { antibodyAssets, antibodySections, antibodySlug } from "./antibody-tokenizer";

const tf32Slug = "how-tf32-changed-the-flow";
const tf32Assets = `/blog/${tf32Slug}`;
const tritonSlug = "bit-exact-triton-reactor-kernels";
const tritonAssets = `/blog/${tritonSlug}`;
const wrongTestSlug = "when-scientific-ai-passes-the-wrong-test";
const wrongTestAssets = `/blog/${wrongTestSlug}`;
const crystalSlug = "one-crystal-one-token";
const crystalAssets = `/blog/${crystalSlug}`;

export const blogAuthor = "Shodh AI Research";

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  subtitle?: string;
  topic: string;
  date: string;
  cover: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  sections: readonly { id: string; title: string }[];
  Content: ComponentType;
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: antibodySlug,
    title: "Making an Antibody Structure Tokenizer Rotation-Invariant Without Retraining",
    description:
      "A preprocessing fix made stored tokens bit-identical across 9,760 tested rotations and raised CDR-H3 loop retrieval from 0.165 to 0.531 mAP.",
    topic: "Scientific validation",
    date: "2026-11-26",
    cover: {
      src: `${antibodyAssets}/rotation-stability.png`,
      alt: "Median learned-token cosine under rotation increased from 0.177 with deployed preprocessing to 1.000 with either canonical frame.",
      width: 1467,
      height: 735,
    },
    sections: antibodySections,
    Content: AntibodyTokenizer,
  },
  {
    slug: tf32Slug,
    title: "TF32 Saved 7% Runtime and Tripled Our Flow Velocity",
    description:
      "We traced a persistent momentum bias to TF32 rounding in a lattice Boltzmann solver, checked it against FP64, and recovered GPU throughput with a fused Pallas kernel.",
    topic: "Scientific computing",
    date: "2026-11-25",
    cover: {
      src: `${tf32Assets}/tf32-rheology-velocity.png`,
      alt: "Mean axial velocity over 1,600 steps for TF32, FP32 and FP64. The TF32 trajectory stays above the FP64 reference.",
      width: 1620,
      height: 918,
    },
    sections: tf32Sections,
    Content: Tf32Rheology,
  },
  {
    slug: tritonSlug,
    title: "Bit-Exact Triton Kernels Make Our Reactor Solver 12× Faster on H100",
    description:
      "The Triton solver ran 12× faster on one H100, and its transport stencil ran 36.1× faster in isolation. Three eight-GPU replays preserved every output digest in bit-exact mode, with variable end-to-end throughput.",
    topic: "Scientific computing",
    date: "2026-11-25",
    cover: {
      src: `${tritonAssets}/solver-breakdown.png`,
      alt: "Original and optimized reactor step breakdowns. Transport fell from 48.11 ms to 1.40 ms per step.",
      width: 1938,
      height: 997,
    },
    sections: tritonSections,
    Content: TritonReactor,
  },
  {
    slug: wrongTestSlug,
    title: "When Scientific AI Passes the Wrong Test",
    description:
      "Five cases where a passing score concealed a physical or numerical failure, and the controls that exposed each one.",
    subtitle:
      "Why standard checks (collision tests, reconstruction error, invariance scores, byte-level deduplication and software test suites) can pass broken physics, and the controls that exposed each failure in our own research.",
    topic: "Scientific validation",
    date: "2026-11-25",
    cover: {
      src: `${wrongTestAssets}/component-presence.png`,
      alt: "Collision-test results at two checkpoints, with a separate check for component presence.",
      width: 1497,
      height: 574,
    },
    sections: wrongTestSections,
    Content: WrongTest,
  },
  {
    slug: crystalSlug,
    title: "One Crystal, One Token? Testing Equivalent Unit Cells",
    description:
      "Standardizing unit-cell descriptions made stored environment channels bit-identical in 96–100% of tested equivalent cases and preserved sub-milliångström position accuracy.",
    subtitle:
      "Standardizing equivalent unit cells gave bit-identical stored environment channels in 96–100% of tested cases. Atomic positions had a 95th-percentile round-trip error of 0.00016 Å on 1,000 MP20 test crystals.",
    topic: "Materials representation",
    date: "2026-11-25",
    cover: {
      src: `${crystalAssets}/equivalent-unit-cells.png`,
      alt: "Two valid unit cells for one periodic crystal pattern.",
      width: 1400,
      height: 650,
    },
    sections: crystalSections,
    Content: CrystalToken,
  },
];

export const postDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});
