"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Share2, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";

const pdfMap: Record<string, string> = {
  "genesis-protocol": "/pdf/The Genesis Protocol 2 (1).pdf",
  "18-month-sprint": "/pdf/THE 18-MONTH SPRINT- THE PATH TO $500M.pdf",
  "skanda-architecture": "/pdf/Architecture- The 10M Synthetic _Physics Brain.pdf",
};

const documentContent: Record<string, any> = {
  "genesis-protocol": {
    title: "The Genesis Protocol 2.0",
    subtitle: "Global Value Capture Strategy",
    category: "Business Model",
    readTime: "12 min read",
    color: "#48cae4",
    content: `# **THE GENESIS PROTOCOL 2.0: GLOBAL VALUE CAPTURE**

*Strategic Go-To-Market*

To reach a $500M valuation in 18 months, we don't just sell software; we embed our intelligence into the global supply chain. We capture value in three compounding layers.

### **LAYER 1: STRATEGIC DESIGN PARTNERSHIPS (THE "FDE" MODEL)**

*Revenue Stream: High-Margin NRE & Forward Deployment Fees.*

We don't just solve "problems"; we design the future cell. By deploying **Forward Deployed Engineers (FDEs)** directly into the R&D centers of Tier-1 OEMs in Japan and Europe, we bridge the "Cultural and Technical Gap."

**The Model:** Partners (e.g., Tata, BMW, Panasonic) pay **3M–7M** for an 18-month "Design Sprint."

* **The Role:** Our engineers use SkandaX to design their next-gen Silicon or Sodium-Ion recipe on-site.
* **The Goal:** It funds our global operations (non-dilutive) and ensures our software is the only one they trust to manufacture that design.

### **LAYER 2: THE "YIELD" OPERATING SYSTEM (SaaS)**

*Revenue Stream: Annual Recurring Revenue (ARR) per Production Line.*

Once the design is finalized, the customer moves to the factory. This is where **SkandaX DEPLOY** becomes mission-critical.

**The Model:** A subscription fee (e.g., **250k–500k/year**) for every production line running our "Factory Guard" Edge Node.

* **The Value:** We aren't just software; we are **Yield Insurance.** If our AI prevents even one "Bad Batch" or reduces "Ramp-up Time" by 3 months, the software pays for itself 10x over.
* **The Moat:** Once SkandaX is integrated into the factory's sensors (PLC/MES), we are the "Operating System" of that facility. Switching costs become astronomical.

### **LAYER 3: THE "SOVEREIGN" ROYALTY (IP TAX)**

*Revenue Stream: Production Royalties (The "Intel Inside" Model).*

This is where the **$500M+ valuation** lives. Because we used **SkandaX GENESIS** to create the proprietary microstructure and the "Machine Recipe," we own the Intellectual Property of the material itself.

* **The Model:** We take a small "Technology Tax" (e.g., **$0.50 – $1.50 per kWh**) on every battery produced using a Shodh-proprietary design.
* **The Logic:** This is **Exponential Upside.** As our partners scale from 1 GWh to 100 GWh, our revenue explodes with **Zero Marginal Cost.**
* **Investor Note:** This layer turns Shodh AI into an **IP Powerhouse**, similar to ARM in semiconductors or Qualcomm in mobile.

---

### **THE GO-TO-MARKET (GTM) STRATEGY: 18-MONTH BLITZ**

* **Months 0–6 (India):** Leverage the **IndiaAI Mission** to perfect the "Sovereign Prototype." Use domestic partners (Tata/Exide) as the initial proof-of-concept.
* **Months 6–12 (Global Deployment):** Open the **Munich and Tokyo "Frontier Offices."** Deploy FDE teams to secure 3 pilot partnerships with global OEMs.
* **Months 12–18 (Scaling):** Transition pilots into **Layer 2 (SaaS)** deployments and lock in **Layer 3 (Royalty)** contracts for next-gen models.`
  },
  "18-month-sprint": {
    title: "The 18-Month Sprint",
    subtitle: "The Path to $500M Valuation",
    category: "Roadmap",
    readTime: "15 min read",
    color: "#a855f7",
    content: `# **THE 18-MONTH SPRINT: THE PATH TO $500M.**

**Objective:** Operationalize the "Matter Compiler" and achieve Sim-to-Real autonomy.

### **THE STRATEGIC LEVERAGE**

Our execution is capital-efficient. By partnering with the **IndiaAI Mission**, our core **Capex is covered**:

* **Compute:** Priority access to H100 GPU clusters is secured.
* **Infrastructure:** The Autonomous Materials Lab is government-backed.
* **The Mandate:** $20M is deployed exclusively for high-density talent (Physics/AI) and **Global Forward Deployment** in key manufacturing hubs (Japan/Europe).

---

### **PHASE 1: THE PHYSICS VALIDATOR (0 – 6 MONTHS)**

**Mission: Master the "Hardest" Physics (Silicon Anodes).**

We don't start with easy wins. We solve the industry's primary bottleneck: Silicon-Graphite expansion.

**The Execution:**

1. Training SkandaX on a 10M-point **Physics Hypercube** (Synthetic Data).
2. Running the **Parent-Child Protocol** in the autonomous lab to generate 1,000 "Ground Truth" data points.

* **Value Inflection:** We prove that SkandaX can predict the "Physics of Failure" (cracking/expansion) with >95% accuracy.
* **Status: Scientific De-risking.**

---

### **PHASE 2: PLATFORM SCALABILITY (6 – 12 MONTHS)**

**Mission: Demonstrate the "Transfer Learning" Advantage.**

We prove that Shodh AI is a universal platform, not a single-chemistry company.

**The Execution:**

1. Expand SkandaX to **Cathodes (NMC/LFP).**
2. **The Data Flex:** Because the "Physics Backbone" is already trained on Silicon, Phase 2 requires **70% less data** than Phase 1.

* **Global Expansion:** Deployment of **Forward-Deployed Engineers (FDE)** to Japan (Cell Manufacturers) and Europe (Automotive OEMs) to begin data-integration audits.
* **Value Inflection:** We prove that the marginal cost of discovering a new material system drops by >50% per iteration.
* **Status: Economic De-risking.**

---

### **PHASE 3: THE FULL-SYSTEM DIGITAL TWIN PILOT (12 – 18 MONTHS)**

**Mission: Full-Cell Integration & Factory Deployment.** We move from the Lab to the Production Line. We deploy SkandaX DEPLOY into a partner's pilot line to create a live "Digital Twin" of their production process.

**The Execution:**

1. **SkandaX SIMULATE:** Launch the full-cell digital twin, predicting interactions between Anode, Cathode, and Electrolyte.
2. **SkandaX DEPLOY:** Pilot deployment of the **Factory Guard (Edge Node)** into a partner Gigafactory.
3. **The Shadow Loop:** The AI reads real-time sensor data from the factory coater and flags invisible micro-defects before they reach the cell.

* **Operational Footprint:** On-site engineering teams in Tokyo and Munich to oversee the transition from software design to factory-floor reality.
* **Value Inflection:** We are an **Industrial AI System.**
* **Status: Commercial De-risking.**

---

### **THE VALUATION INFLECTION: $500M+**

By the end of Month 18, Shodh AI will have achieved the **Autonomous Closed-Loop.**

* **Technical:** We have "Pre-Solved" the physics of the world's most difficult materials (Silicon/NMC).
* **Operational:** We own the world's largest proprietary dataset of Mesoscale failures.
* **Commercial:** We are embedded in the production lines of the world's most strategic manufacturers.

**Historically, deeptech platforms that successfully cross the "Sim-to-Real" chasm—moving from laboratory discovery to industrial deployment—command strategic valuations of $500M+.**

---

### **CAPITAL ALLOCATION: THE $20M USE OF FUNDS**

* **45% – Elite Engineering Talent:** Securing the top 0.01% of Mesoscale Physicists and AI Architects globally.
* **25% – Global Forward Deployment:** Establishing technical on-sites in Japan and Europe to secure Tier-1 industrial partnerships.
* **20% – Model Training & Refinement:** High-intensity Opex for massive-scale pre-training of the "Large Physics Model."
* **10% – Intellectual Property:** Global patent filing of our "Process Recipes" and "Matter Compiler" architecture.`
  },
  "skanda-architecture": {
    title: "The Skanda Protocol",
    subtitle: "Universal Matter Compiler Architecture",
    category: "Technology",
    readTime: "25 min read",
    color: "#22c55e",
    content: `# **The Skanda Protocol: Universal "Matter Compiler" for Material Discovery and Manufacturing**

## **THE SKANDA STACK: ONE FOUNDATION MODEL, THREE INTERFACES**

We do not build separate AI models for every problem. We have built a single **"Physics Foundation Model"** (The SkandaX Foundation Model) that powers three distinct application layers:

### **The Core (The Brain):** 
The Pre-Trained Physics Hypercube (10M Scenarios).

### **The Kernel (The Engines):** 
The Forward/Inverse Models that handle logic.

### **The Interface (The Products):**

* **VALIDATE:** For Suppliers (The "Virtual Cycler" App).
* **DEPLOY:** For Factories (The "Factory Guard" App).
* **OPTIMIZE:** For OEMs (The "Inventor" App).

> **Analogy:** SkandaX is the 'GPT-4' of Matter. Validate, Deploy, and Optimize are the 'ChatGPT' or 'API' wrappers built on top of it.

---

## **DOCUMENT OVERVIEW**

* **Architecture:** The 10M Synthetic "Physics Brain."
* **Calibration:** The "Parent-Child" Lab Loop.
* **Validator:** Why we are mastering Silicon first.
* **Product:** The "Matter Compiler" and Factory Revenue.

---

## **SECTION 01: THE ARCHITECTURE**

### **THE MESO-FOUNDATION MODEL**

#### **The Intelligence Layer for Matter**

Current AI models are built for words and images. Shodh AI is building the first **Foundation Model for Physics.** We have moved beyond "Black Box" predictions to create a system that understands the fundamental laws of thermodynamics, kinetics, and mechanics.

We call this the **Meso-Foundation Model**—the world's first large-scale transformer trained to bridge the gap between atomic chemistry and industrial manufacturing.

---

### **01 / The Physics Model (The Data Moat)**

To give our AI "Physics Intuition," we don't wait for slow, expensive lab data. We manufactured our own.

We wrapped the governing equations of physics—including **Fick's Law of Diffusion** and **Butler-Volmer Kinetics**—into a massive Monte Carlo engine. We executed **10 Million+ synthetic simulations**, sweeping parameters across five orders of magnitude.

* **The Result:** A "Physics Model" that maps every theoretically possible material behavior. Our AI has "failed" 10 million times in the computer so it never has to fail in your factory.

---

### **02 / The Foundation Model (Universal Latent Space)**

Traditional Material Science machine learning is "one-off"—you build a model for Lithium, then you start over for Sodium.

The Skanda architecture utilizes a **Multimodal Transformer** that learns the "Universal Language of Transport." Whether a voxel represents a Lithium-ion in a battery or a Hydrogen molecule in a membrane, the underlying physics of tortuosity and flux are mathematically identical.

* **The Frozen Core:** We have developed a "Physics Embedding Space." This acts as the initialization weight for every industrial problem we solve, ensuring the AI never proposes a design that violates thermodynamics.

---

### **03 / Why the Mesoscale?**

The industry is currently trapped in the "Atomic Trap." Atomic Models (DFT) are too small to predict factory yield, and System Models (FEA) are too big to understand material failure.

Shodh AI digitizes the **Mesoscale (10nm – 100μm)**. This is the regime where pores, grains, and defects live. By mastering the Mesoscale, we master the exact level where 90% of industrial materials fail during production.

---

### **04 / The Validator: Fourier Neural Operators (FNO)**

To solve the inverse design problem, the AI must be able to "check its own work" instantly. Traditional physics solvers (FEA/FV) take hours to simulate a single 3D microstructure, creating a massive bottleneck.

We utilize **Fourier Neural Operators (FNO)** to map differential equations directly into the neural architecture. This allows SkandaX to simulate complex physics in the Fourier domain, bypassing the need for iterative solvers.

**BENCHMARK: 100,000x ACCELERATION**

* **Traditional Solvers (GeoDict/COMSOL):** 4–6 Hours per 128³ voxel simulation.
* **SkandaX (Shodh AI): 50 Milliseconds.**

**The Impact:** We have achieved a **100,000x speedup**. This allows our Inverse Model to "hallucinate" and validate millions of candidate microstructures in minutes to find the one that survives the factory.

---

### **[Insight Box]**

**The Competitive Advantage:**

While competitors like Google GNoME focus on discovering new *crystals*, Shodh AI focuses on the **architecture of the material**. By combining the **Physics Hypercube** for intuition and **FNOs** for validation, we have built a "Physics-Engine-on-a-Chip" that allows factories to design and manufacture proprietary materials at 1/100th the current cost.

---

## **SECTION 02: THE CALIBRATION**

### **THE DATA FACTORY & SIM-TO-REAL LOOP**

**Simulations are perfect. Reality is messy.**

The biggest failure in Deeptech is "Domain Drift"—where an AI trained in a perfect simulation fails when it hits a real-world factory.

Shodh AI has solved this by building a **Closed-Loop Data Factory**. We don't just use AI to predict the lab; we use the lab to "calibrate" the AI. We have operationalized the transition from **Synthetic Physics** to **Physical Ground Truth.**

---

### **01 / The "Parent-Child" Strategy**

To train a foundational model, you need clean, standardized data. Traditional academic labs are too inconsistent for AI. We have industrialized the lab process using our **Parent-Child Protocol**:

* **Standardization (The Parent):** We create one high-precision "Parent" recipe (e.g., a specific Silicon-Graphite ratio, binder chemistry, and particle size).
* **Fabrication (The Children):** We fabricate 20 identical "Child" cells using automated electric crimpers and inert atmosphere gloveboxes. This eliminates "Human Error" as a variable.
* **Parallel Stress Testing:** The "Children" are split into streams. Some run to total failure (800+ cycles), while others are stopped early (at cycle 10, 50, or 100) for "Autopsy."

**The Result:** We compress 2 years of serial testing into 4 months of parallel intelligence gathering.

---

**BENCHMARK: THE ECONOMICS OF DATA**

* **Democratizing Discovery:** Traditional R&D: ~$500 per high-fidelity data point (Labor + Material + Time).
* **Shodh Data Factory:** ~$15 per data point.

**The Hook:** We have commoditized discovery. By automating the feedback loop between the lab and the AI, we can saturate an entire chemical design space for the cost of a laptop. This efficiency is why $20M in India achieves more than $100M in Silicon Valley.

---

### **02 / The Autopsy (Multimodal Characterization)**

When a battery fails, the "Voltage Curve" only tells half the story. To know why it failed, the AI needs to see inside.

We disassemble the "Child" cells in a vacuum to prevent oxidation and scan them using SEM (Microstructure) and XRD (Crystallography).

* **The "Eyes" (SEM):** The AI sees binder detachment and particle cracking.
* **The "Phase Detector" (XRD):** The AI detects invisible atomic phase changes that trigger mechanical stress.

**The Output:** A comprehensive, linked dataset that connects Recipe (Ingredients) + Microstructure (Shape) + Performance (Life). No such database exists anywhere else in the world.

---

### **03 / Domain Adaptation (Unifying Simulation & Reality)**

We use a technique called **Domain Adaptation** to map our 10 Million Synthetic Simulations (Stream A) and our Real Lab Data (Stream B) into a **Shared Latent Space**.

* **The Physics Manifold:** The AI learns the "Perfect" version of the physics from our simulations.
* **The Reality Shift:** The AI learns how far the "Real World" (humidity, impurities, gravity) drifts from that manifold.

**The Result:** Our Forward Model becomes Reality-Calibrated. It gains the ability to see a raw SEM image from a factory and predict its remaining life with the precision of a laboratory scientist.

**[The Unit Economics of Discovery]**

**The 20M Multiplier:** By owning this automated infrastructure, our cost per high-fidelity data point drops from the industry average of $500 to just $25.

We can map an entire material design space (1,000 points) for <$50k OPEX. This efficiency allows us to "Saturate" the physics of any material system while competitors are still waiting for their first batch of lab results.

---

## **SECTION 03: THE VALIDATOR**

### **THE VALIDATOR: WHY SILICON? (STRESS-TESTING THE MODEL)**

**The Silicon Stress Test**

To prove a foundational engine is universal, you don't test it on an easy problem. You test it on the "Holy Grail" of battery science: **The Silicon-Graphite Anode.**

Silicon can store 10x more lithium than graphite, but it is a "Physics Nightmare." It expands by 300% during charging, causing particles to crack, the structure to crumble, and the battery to die in weeks.

**Shodh AI chose Silicon Anode as our first "Validator" chemistry.** If we can master the physics of Silicon, we have mastered the hardest transport and mechanical problems in material science.

---

### **01 / Solving the High-Variance Problem**

Silicon failure is "High Variance." Two batteries made with the same recipe can have 2x difference in life because of tiny, invisible defects in the Mesoscale structure.

* **Traditional R&D:** Uses "Trial and Error" to find a stable recipe. It takes years and usually fails to scale.
* **The Shodh Way:** We use SkandaX to digitize the failure. We don't just ask "What is the recipe?" We ask "What is the specific 3D architecture that can survive 300% expansion without cracking?"

---

### **02 / De-Risking the Platform**

By using the Parent-Child Protocol on Silicon-Graphite chemistries, we are proving that our "Physics Brain" can handle:

* **Extreme Mechanical Stress:** Predicting cracks before they happen.
* **Volatile Chemistry:** Managing the instability of the SEI layer.
* **Complex Transport:** Ensuring lithium ions can navigate a rapidly changing pore network.

**The Logic:** Once SkandaX achieves a 95% accuracy rate on Silicon—the industry's most difficult "Exam"—it is effectively "Pre-Validated" for easier chemistries like Sodium-ion, LFP, and Solid-State.

---

### **03 / From Discovery to "Zero-Shot" Manufacturing**

Our work on Silicon Anodes is the final step before full-scale factory integration. We are proving that our Inverse Model can generate a "Recipe + Microstructure" that works the first time it is built in the lab.

* **Virtual Success:** We fail 10 million times in the Physics Hypercube.
* **Physical Success:** We build the "Optimal" structure in our lab.
* **The Result:** We prove that we have deleted the 5-year iteration loop. This "Zero-Shot" capability is the core value proposition we sell to the Gigafactory.

**[The Platform Flex]**

*"We aren't a Silicon company. We are the company that made Silicon work."*

By solving for Silicon, we have built a Proprietary Library of high-expansion physics. This library is a massive asset. Any company in the world looking to move to high-capacity anodes must now go through the Shodh AI engine to ensure their factory yield doesn't collapse.

---

## **SECTION 04: THE PRODUCT**

### **THE MATTER COMPILER & THE GENESIS PROTOCOL**

**Mastering the Factory Line**

Discovery is only half the battle. The "Valley of Death" exists because a material that works in a beaker often fails on the production line.

Shodh AI has built the **Matter Compiler**—the first software suite that translates abstract performance targets into machine-executable factory instructions. We don't just find the needle in the haystack; we provide the blueprint to build the magnet.

---

### **01 / The SkandaX Product Suite**

We engage the industrial value chain through three specific API-driven products:

* **SKANDAX VALIDATE (The Virtual Cycler):** For material suppliers. Upload a new recipe and early-cycle data; we predict long-term cycle life in 2 weeks, not 6 months.
* **SKANDAX OPTIMIZE (The Designer Studio):** For R&D teams. Input targets (e.g., "A battery that works at -40°C"); the AI generates non-intuitive microstructures and the recipes to achieve them.
* **SKANDAX DEPLOY (The Factory Guard):** For Gigafactories. We connect directly to factory logs to flag invisible micro-defects and "bad batches" in real-time, preventing million-dollar yield losses.

---

### **02 / Zero-Shot Manufacturing**

Just as a software compiler turns high-level code into machine-readable binary, the Skanda Compiler turns "Intent" into "Process."

* **Input (The Intent):** "I need a High-Energy Anode for a 10-minute fast charge."
* **The Intelligence:** SkandaX generates the 3D microstructure and simulates the manufacturing violence (mixing, shearing, drying).
* **Output (The Instruction):** The model outputs specific Machine Code—the exact Mixing Speed, Drying Temperature, and Calendering Pressure required for the factory line.

**This is "Zero-Shot Manufacturing." The recipe works the first time it hits the production line.**

**BENCHMARK: ZERO-SHOT PRECISION**

* **De-Risking the Factory Floor:** Legacy Factory Ramp-up: 50+ trial batches to reach 90% yield for a new chemistry.
* **Shodh Zero-Shot:** 2 trial batches to reach 90% yield.

**The Hook:** We delete the "Trial and Error" phase of manufacturing. Our Matter Compiler ensures the recipe is factory-ready before the first machine is even turned on, saving OEMs millions in wasted material and months of lost time.

---

### **03 / The Federated Moat (Edge Intelligence)**

Industrial data is a matter of national and corporate security. Tier-1 factories will never upload their raw logs to the cloud.

* **The Solution:** We deploy Skanda-Edge Nodes (powered by NVIDIA Orin/IGX) directly on the production line.
* **Federated Learning:** The AI learns from local factory defects and sends only the mathematical "Gradients" back to our central brain.
* **The Result:** Proprietary data never leaves the factory floor, but the Shodh Global Brain gets smarter with every battery produced worldwide.

---

### **04 / The Revenue Engine: The Genesis Protocol**

We capture value across three scalable layers:

* **THE BRIDGE (NRE Fees):** Large partners pay 2M–5M upfront to solve "Impossible Problems" using our Generative Engine. This provides Non-Dilutive Capital to fund our growth.
* **THE RENT (SaaS):** We charge an annual recurring fee per production line for the "Compiler" software. We become the Operating System of the factory.
* **THE EMPIRE (Royalties):** We take a small "Intel Inside" tax (e.g., $1/kWh) for every unit produced using a Shodh-proprietary recipe. This provides Exponential Upside with zero marginal cost.

---

**[The Exit Vision]**

*"We aren't just building a company; we are building a new asset class."*

By owning the IP of the "Process Recipe" and the "Machine Instructions," Shodh AI becomes the indispensable layer of the physical world. Whether the world moves to Sodium, Solid-State, or Fusion—they will need the Skanda Compiler to build it.

---

## **BUILT FOR THE ENERGY VALUE CHAIN.**

**Current Beachhead: Energy Storage.**

We are deploying our engine to solve the $300B bottleneck in EV batteries (Silicon, Sodium, Solid-State) before scaling to Hydrogen and Alloys.

---

### **THE 3-COLUMN GRID: THE "WHO & HOW"**

**Column 1: THE CHEMIST**
* **Who:** Material Suppliers
* **Pain:** "Is this new molecule scalable?"
* **Product:** SKANDAX VALIDATE
* **Value:** Validate recipes in weeks, not years.

**Column 2: THE FACTORY**
* **Who:** Gigafactories
* **Pain:** "Yield is too low. Scrap is too high."
* **Product:** SKANDAX DEPLOY
* **Value:** Zero-Shot Manufacturing & Yield Guard.

**Column 3: THE STRATEGIST**
* **Who:** Automotive OEMs (Tesla, Tata, BMW)
* **Pain:** "We are trapped by supplier roadmaps. We need to own our tech."
* **Product:** SKANDAX GENESIS (The Inventor)
* **Value:** Generate Proprietary IP. Break dependence on external suppliers. Create unique, owned chemistries in-house.`
  }
};

function renderSlideContent(markdown: string): string {
  return markdown
    // Blockquotes
    .replace(/^>\s+(.+)/gm, '<div class="border-l-4 border-gray-300 pl-5 py-2 my-4 bg-gray-50 rounded-r-lg"><p class="text-gray-600 italic text-base leading-relaxed">$1</p></div>')
    // Headings
    .replace(/####\s+(.+)/g, '<h4 class="text-sm font-bold text-gray-500 mt-6 mb-2 tracking-widest uppercase">$1</h4>')
    .replace(/###\s+(.+)/g, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
    .replace(/##\s+(.+)/g, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
    .replace(/#\s+(.+)/g, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em class="text-gray-600 italic">$1</em>')
    // Numbered lists
    .replace(/^(\d+)\. (.+)/gm, '<div class="flex gap-3 mb-2 ml-2"><span class="text-gray-400 font-mono text-sm mt-0.5 shrink-0">$1.</span><span class="text-gray-700 leading-relaxed">$2</span></div>')
    // Bullet lists
    .replace(/^\* (.+)/gm, '<div class="flex gap-3 mb-2 ml-2"><span class="text-gray-400 mt-2 shrink-0">•</span><span class="text-gray-700 leading-relaxed">$1</span></div>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">')
    .replace(/^(?!<[h|d|p|b|s])/gm, '<p class="text-gray-700 leading-relaxed mb-4">');
}

export default function DocumentPage() {
  const params = useParams();
  const documentId = params?.documentId as string;
  const doc = documentContent[documentId];

  if (!doc) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Document Not Found</h1>
          <Link href="/data-room" className="text-[#48cae4] hover:underline">
            Return to Data Room
          </Link>
        </div>
      </div>
    );
  }

  // Split content into slides on ---
  const slides = doc.content
    .split(/\n---\n/)
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/data-room" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Data Room</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <a
              href={pdfMap[documentId] || "#"}
              download
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors inline-flex"
            >
              <Download className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Title Slide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto px-6 pt-12 pb-8"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-10 md:p-16 text-center">
          <div 
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8"
            style={{ 
              backgroundColor: `${doc.color}15`,
              color: doc.color,
              border: `1px solid ${doc.color}30`
            }}
          >
            {doc.category}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{doc.title}</h1>
          <p className="text-xl text-gray-500 mb-8">{doc.subtitle}</p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {doc.readTime}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Confidential
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 tracking-widest uppercase">Shodh AI — Investor Data Room</p>
          </div>
        </div>
      </motion.div>

      {/* Content Slides */}
      <div className="max-w-5xl mx-auto px-6 pb-16 space-y-8">
        {slides.map((slide: string, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div 
                dangerouslySetInnerHTML={{ __html: renderSlideContent(slide) }}
              />
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-300 tracking-wider uppercase">Shodh AI</p>
                <p className="text-xs text-gray-300">{index + 1} / {slides.length}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
