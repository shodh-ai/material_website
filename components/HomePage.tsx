  "use client";

  import Link from "next/link";
  import Image from "next/image";
  import Navbar from "@/components/Navbar";
  import Footer from "@/components/Footer";
  import CanvasLayer from "@/components/three/CanvasLayer";
  // Merged imports: Added Battery, Atom, Rocket, Cpu
  import { ArrowUpRight, FileText, Battery, Atom, Rocket, Cpu } from "lucide-react";

  // --- DATA: Skanda Protocol ---
  const steps = [
    {
      number: "01",
      image: "/scale.svg",
      title: "The Scale",
      description:
        "Atomic models are too small to be useful. We model the Mesoscale—where pores, grains, and defects actually determine if a material works in a factory.",
    },
    {
      number: "02",
      image: "/Design.svg",
      title: "The Design",
      description:
        "We don't do trial and error. You define the target—like heat resistance or energy density—and SkandaX generates the exact microstructure to achieve it.",
    },
    {
      number: "03",
      image: "/Lab.svg",
      title: "The Lab",
      description:
        "Discovery stops at the lab door. We are building Autonomous Robotics to synthesize and test these materials in days, closing the loop between software and hardware.",
    },
  ];

  // --- DATA: National Mandate (Impact Cards) ---
  const impactCards = [
    {
      image: "/pexels-thisisengineering-3861442%201.svg",
      title: "Better Batteries",
      description: "Silicon Anodes for EVs with 20% more range.",
      overlayStyle: {
        backgroundImage:
          "linear-gradient(212.82853677342678deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%), linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%)",
      },
    },
    {
      image: "/image%201.svg",
      title: "Safer Grids",
      description: "Sodium-Ion storage that handles Indian heat.",
      overlayClassName: "bg-[rgba(0,0,0,0.3)]",
    },
    {
      image: "/batteries%201.svg",
      title: "Cheaper Hydrogen",
      description: "New catalysts to replace expensive Platinum.",
      overlayClassName:
        "bg-gradient-to-b from-[rgba(0,0,0,0)] from-1/2 to-[rgba(0,0,0,0.7)]",
    },
  ];

  // --- DATA: National Mandate (Stages) ---
  const stages = [
    {
      label: "TODAY",
      title: "WE BUILD.",
      mission: "The Mission: Energy Storage",
      desc: "Removing defects and scaling safe, high-density EV batteries for the global market.",
      icon: Battery,
      color: "text-[#48cae4]",
      bg: "bg-[#48cae4]/10",
      border: "border-[#48cae4]/20",
    },
    {
      label: "TOMORROW",
      title: "WE DISCOVER.",
      mission: "The Mission: Post-Lithium",
      desc: "Pioneering Sodium-Ion chemistries and non-lithium alternatives to secure material independence.",
      icon: Atom,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      label: "THE FUTURE",
      title: "WE DESIGN.",
      mission: "The Mission: Type 1 Civilization",
      desc: "Inventing the materials required for Fusion, Space Exploration, and Quantum Computing.",
      icon: Rocket,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
  ];

  export default function HomePage() {
    return (
      <div className="relative min-h-screen w-full text-[#f0f0ff] selection:bg-[#48cae4] selection:text-[#081421] overflow-x-hidden">
        <CanvasLayer />

        <main id="html-scroll-container" className="relative z-[2] w-full pointer-events-none">
          <Navbar />

          {/* HERO SECTION */}
          <section className="min-h-screen flex items-center px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto pt-28 md:pt-36 pb-12">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 pointer-events-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#24292F]/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-[#48cae4] rounded-sm shadow-[0_0_8px_#48cae4]" />
                    <span className="text-[#ffffff] text-xs font-bold tracking-[0.2em] uppercase">Shodh AI</span>
                  </div>
                </div>

                {/* Text scales smoothly */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-12xl font-medium tracking-tight leading-[1.05] break-words">
                  BUILDING
                  <br />
                  THE TYPE 1
                  <br />
                  CIVILIZATION.
                </h1>

                <p className="mt-6 text-base md:text-xl text-white/90 font-light max-w-2xl drop-shadow-md">
                  Mastery over the planet requires AI for material science.
                </p>

                <div className="mt-10 flex flex-wrap gap-[20px]">
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] rounded-br-[28px] bg-white text-[#081421] px-6 py-3 text-[16px] font-regular hover:bg-gray-200 transition"
                  > WATCH IT IN ACTION
                  </Link>
                  <Link
                    href="/genesis"
                    className="inline-flex items-center gap-2 rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] rounded-br-[28px] blur-800 text-[#ffffff] px-6 py-3 text-[16px] font-regular border border-[#ffffff] "
                  > 
                    READ THE MANIFESTO
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 pointer-events-auto mt-8 lg:mt-0">
                <div className="rounded-2xl border border-white/20 bg-black/40 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/70 tracking-[0.2em] uppercase font-semibold">IndiaAI Mission</span>
                    <Image src="/shodhai_logo.svg" alt="Shodh AI" width={110} height={26} className="opacity-90" />
                  </div>
                  <p className="mt-6 text-base md:text-lg text-white/90 leading-relaxed font-light">
                    Generative AI for Mesoscale manufacturing. From design intent to factory success.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SCROLL SECTION 1: CHEMISTRY */}
          <section className="min-h-[50vh] md:h-[60vh] py-12 md:py-0 flex items-center px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto">
            <div className="pointer-events-auto max-w-2xl w-full">
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium drop-shadow-lg 2xl:whitespace-nowrap leading-tight">CHEMISTRY IS TOO SLOW.</h2>
              <p className="mt-6 text-white/90 text-lg sm:text-xl md:text-3xl lg:text-4xl font-light leading-relaxed">
                10,000 failures. 10 years. 1 material.
                <br />
                Discovery is the human <br className="hidden md:block" />bottleneck. We are removing it.
              </p>
            </div>
            <div className="hidden md:block md:w-1/2" />
          </section>

          {/* SCROLL SECTION 2: PHYSICS */}
          <section className="min-h-[50vh] md:h-[60vh] py-12 md:py-0 flex items-center justify-center px-6 md:px-10 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 pointer-events-auto text-left">
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium drop-shadow-lg 2xl:whitespace-nowrap leading-tight">PHYSICS, GENERATED.</h2>
              <p className="mt-6 text-white/90 text-lg sm:text-xl md:text-3xl lg:text-4xl font-light leading-relaxed">
                Introducing SkandaX.
                <br />
                We don&#39;t guess the chemistry;<br />
                we choose the result.
              </p>
            </div>
            <div className="hidden md:block md:w-1/2" />
          </section>

          {/* SCROLL SECTION 3: BEYOND */}
          <section className="min-h-[50vh] md:h-[60vh] py-12 md:py-0 flex items-center px-6 md:px-10 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 hidden md:block" />
            <div className="w-full md:w-1/2 pointer-events-auto">
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium drop-shadow-lg 2xl:whitespace-nowrap leading-tight">BEYOND SCIENCE FICTION.</h2>
              <p className="mt-6 text-white/90 text-lg sm:text-xl md:text-3xl lg:text-4xl font-light leading-relaxed">
                Generative design. Autonomous robotic labs.
                <br />
                Materials that endure heat, pressure, and time.
                <br />
                The future is physical.
              </p>
            </div>
          </section>

          {/* GENESIS PROTOCOL */}
          <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32 mt-10 md:mt-20">
            <div className="pointer-events-auto rounded-3xl border border-white/10 bg-[#081421]/80 backdrop-blur-md shadow-2xl p-6 sm:p-10 lg:p-16 2xl:py-[120px] 2xl:px-[80px]">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 items-center">

                <div className="w-full xl:col-span-7">
                  <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-lg bg-gray-800/60 backdrop-blur-md border border-white/10">
                    <div className="w-4 h-4 bg-[#48cae4] rounded-lg" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">The System</span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 pt-[2px] leading-tight">
                    THE GENESIS PROTOCOL.
                  </h2>

                  <p className="text-base md:text-lg text-white/70 mb-12 leading-relaxed max-w-xl">
                    Shodh AI deletes the iteration loop. We are compressing 5 years of lab failure into 6 months of factory success.
                  </p>

                  <Link
                    href="/genesis"
                    className="inline-flex items-center gap-2 rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] rounded-br-[32px] bg-white text-[#081421] px-6 py-3 text-[16px] font-regular hover:bg-gray-200 transition"
                  >
                    READ THE MANIFESTO <span>→</span>
                  </Link>
                </div>

                <div className="w-full xl:col-span-5 bg-white/5 border border-white/10 rounded-xl p-6 md:p-10 text-sm md:text-lg 2xl:text-2xl font-mono leading-loose text-center">
                  <div className="mb-6 md:mb-8 opacity-60">
                    <span className="block text-xs md:text-sm 2xl:text-base uppercase tracking-wider text-white/50 mb-2">Traditional (5 Years)</span>
                    <span className="text-white block">
                      Design → Lab → <span className="text-red-400">Fail</span> → Repeat
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs md:text-sm 2xl:text-base uppercase tracking-wider text-[#48cae4] mb-2">Shodh AI (6 Months)</span>
                    <span className="text-white block">
                      Design → <span className="text-[#48cae4]">Matter Compiler</span> → Success
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SKANDA PROTOCOL */}
          <section className="relative pointer-events-auto w-full bg-[#f0f0ff] py-32 px-6 md:px-10 flex flex-col items-center overflow-hidden">
            
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

            <div className="relative z-10 w-full max-w-[1440px] flex flex-col items-center">

              {/* Header Section */}
              <div className="relative w-full flex flex-col items-center text-center">

                {/* Badge */}
                <div className="flex items-center gap-2 bg-[#48cae4]/10 border border-[#48cae4]/20 rounded px-3 py-2.5 w-fit mb-8 backdrop-blur-md">
                  <div className="w-2.5 h-2.5 bg-[#48cae4] rounded-sm shadow-[0_0_8px_#48cae4]" />
                  <span className="text-black text-xs tracking-wider uppercase font-medium">
                    HOW IT WORKS
                  </span>
                </div>

                {/* Main Title */}
                <h2 className="text-black text-4xl md:text-7xl font-medium uppercase tracking-tighter mb-6">
                  The Skanda Protocol
                </h2>

                {/* Secondary Title */}
                <p className="text-black/60 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
                  Skanda: a <span className="text-black">Foundation Model for Matter</span> — a generative LMM trained on physics-first simulations and deployed as an industrial OS.
                </p>

                {/* Button */}
                <div className="relative flex flex-col items-center mb-20">
                  {/* Connecting Line (Top) */}
                  <div className="w-px h-10 bg-gradient-to-b from-[#48cae4] to-transparent mb-4 opacity-50" />

                  <Link
                    href="/protocol"
                    className="group relative flex items-center gap-3 px-8 py-4 bg-black/[0.03] hover:bg-black/[0.08] text-black rounded-full border border-black/10 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#48cae4]/20 via-transparent to-transparent transition-opacity duration-500" />

                    <FileText className="w-4 h-4 text-[#48cae4]" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase relative z-10">
                      Read Whitepaper
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-black/50 group-hover:text-[#48cae4]" />
                  </Link>

                  {/* Connecting Line (Bottom) */}
                  <div className="w-px h-16 bg-gradient-to-t from-[#48cae4] to-transparent mt-4 opacity-30" />
                </div>
              </div>

              {/* Grid Container */}
              <div className="w-full border border-black/10 rounded-3xl bg-black/[0.01] backdrop-blur-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="group relative flex flex-col items-center text-center px-10 py-20 hover:bg-black/[0.02] transition-colors duration-500"
                    >
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 text-black/5 text-5xl font-black group-hover:text-[#48cae4]/10 transition-colors">
                        {step.number}
                      </span>

                      <div className="relative mb-12">
                        <div className="absolute inset-0 bg-[#48cae4] blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full" />
                        <div className="relative w-28 h-28 bg-black/[0.03] border border-black/10 rounded-2xl flex items-center justify-center group-hover:border-[#48cae4]/40 group-hover:rotate-[360deg] transition-all duration-1000">
                          <Image
                            src={step.image}
                            alt={step.title}
                            width={80}
                            height={80}
                            className="w-14 h-14 opacity-70 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      </div>

                      <h3 className="text-black text-2xl font-medium mb-6 group-hover:text-[#173a68] transition-colors tracking-wide">
                        {step.title}
                      </h3>

                      <p className="text-black/50 text-sm leading-relaxed max-w-[280px] mx-auto">
                        {step.description.split("Mesoscale").map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && (
                              <span className="text-black font-semibold underline decoration-[#48cae4]/30 decoration-2 underline-offset-4">Mesoscale</span>
                            )}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- NATIONAL MANDATE (REPLACED SECTION) --- */}
          <section className="relative w-full pointer-events-auto bg-[#081421] py-32 px-6 md:px-10 border-t border-white/5">
            
            {/* Background Decor */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
            
            />

            <div className="max-w-[1440px] mx-auto relative z-10">
              
              {/* --- 1. HEADER --- */}
              <div className="text-center mb-24">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blur-400 rounded-full backdrop-blur-md border border-white/10">
                    <div className="w-2 h-2 bg-[#48cae4] rounded-full" />
                    <Cpu className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-bold tracking-[0.15em] uppercase">
                      The National Mandate
                    </span>
                  </div>
                </div>
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-white mb-6 leading-[1.1]">
                  Selected to lead the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#48cae4] to-white">
                    'AI for Science' Revolution.
                  </span>
                </h2>
                
                <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                  Shodh AI is the flagship partner of the <strong className="text-white">IndiaAI Mission</strong>. We are making the national foundation for scientific intelligence.
                </p>
              </div>

            
              {/* --- 3. TIMELINE CARDS --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {stages.map((stage, i) => (
                  <div 
                    key={i} 
                    className={`relative group p-8 rounded-2xl border ${stage.border} bg-[#0a1628] hover:bg-white/[0.02] transition-all duration-500 h-[500px]`}
                  >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-8 ${stage.bg} ${stage.color}`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
                      {stage.label}
                    </div>

                    <div className="mb-6">
                      <h3 className="text-3xl font-medium text-white mb-2">{stage.title}</h3>
                      <p className={`text-sm font-mono uppercase tracking-wider ${stage.color}`}>
                        {stage.mission}
                      </p>
                    </div>

                    <p className="text-white/60 leading-relaxed text-xl mb-8 min-h-[60px]">
                      {stage.desc}
                    </p>

                    <div className={`absolute bottom-8 right-8 p-3 rounded-xl ${stage.bg} ${stage.color} opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`}>
                      <stage.icon className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>


              {/* --- 2. IMPACT IMAGES --- */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
                {impactCards.map((card) => (
                  <div key={card.title} className="relative group">
                    <div className="relative h-[500px] overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlays */}
                      {card.overlayStyle ? (
                        <div className="absolute inset-0" style={card.overlayStyle} />
                      ) : (
                        <div className={`absolute inset-0 ${card.overlayClassName ?? ""}`} />
                      )}

                      {/* Text Content */}
                      <div className="absolute bottom-8 left-8 right-8 text-[#f0f0ff]">
                        <h3 className="mb-3 text-[32px] font-medium capitalize">
                          {card.title}
                        </h3>
                        <p className="text-xl text-white/70 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


              {/* --- 4. LOGOS --- */}
              <div className="border-t border-white/10 pt-16">
                <p className="text-center text-xs font-bold tracking-[0.2em] text-white/30 uppercase mb-12">
                  Backed By National & Global Leaders
                </p>
                
                <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-white tracking-tighter">
                      India<span className="text-[#ff9933]">AI</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white tracking-tight">NVIDIA</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-white tracking-tight">Google</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <Footer />
        </main>
      </div>
    );
  }