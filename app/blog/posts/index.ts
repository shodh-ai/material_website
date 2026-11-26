import type { ComponentType } from "react";
import Tf32Rheology, { tf32Sections } from "./tf32-rheology";
import TritonReactor, { tritonSections } from "./triton-reactor";
import WrongTest, { wrongTestSections } from "./wrong-test";
import CrystalToken, { crystalSections } from "./crystal-token";

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
    title: "Accelerating reactor data on NVIDIA H100 with bit-exact Triton kernels",
    description:
      "Fusing transport and reaction kernels sped up our eight-H100 reactor pipeline by 2.49×, with matching trajectory, flux, and metadata digests on all 256 samples.",
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
    title: "One Crystal, One Token: Building a Crystal Representation That Is Consistent and Precise",
    description:
      "Standardizing unit-cell descriptions made stored environment channels bit-identical in 96–100% of tested equivalent cases and preserved sub-milliångström position accuracy.",
    subtitle:
      "How Shodh’s per-atom crystal token encodes every equivalent description of a crystal identically, and recovers atomic positions to about 0.0002 Å.",
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
