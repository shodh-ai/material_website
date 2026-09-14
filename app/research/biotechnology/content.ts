export type Source = { id: string; title: string; href: string };
export type Scale = { name: string; scale: string; variable: string; effect: string; feedback: string };
export type Section = { title: string; paragraphs: string[]; sources?: string[] };
export type Piece = {
  slug: string; number: string; title: string; shortTitle: string; category: string;
  documentType: "Platform Perspective" | "Technical Whitepaper" | "Application Perspective";
  vision: string; articleOrder: number[]; pathways?: { name: string; stages: string[] }[];
  dek: string; problem: string; visualTitle: string; visualCaption: string;
  scales: Scale[]; outcome: string; sections: Section[];
  equation: { title: string; expression: string; explanation: string; assumption: string };
  consequence: { title: string; paragraphs: string[]; measures: string[] };
  evidence: string; sources: Source[];
};

export const thesis = "Most AI in biotechnology helps discover what to make. Shodh is building AI that can reason about how that biology behaves, scales and ultimately gets manufactured.";
export const campaign = "The next generation of biotechnology will not just design better molecules. It will design molecules, processes and manufacturing systems together.";

export const pieces: Piece[] = [
  {
    "slug": "molecule-to-manufacturing",
    "number": "01",
    "documentType": "Platform Perspective",
    "category": "The flagship thesis",
    "title": "From Molecule to Manufacturing: A Physical Foundation Model for Biotechnology",
    "shortTitle": "From molecule to manufacturing",
    "dek": "Biotechnology has taught AI to search for promising biology. The next challenge is connecting that biology to the conditions under which it can be made. LUCAN is being built to bring molecules, living systems, processes and equipment into one cross-scale design problem.",
    "problem": "A molecule can succeed in discovery while the product fails to become a repeatable, scalable manufacturing process.",
    "visualTitle": "One product. Interacting physical scales.",
    "visualCaption": "Conceptual map of an antibody process. Read forward to follow consequences; read backward to see how manufacturing requirements constrain earlier design choices. Other modalities require different biological models and process routes.",
    "outcome": "A repeatable product that meets quality, dose and manufacturing requirements",
    "scales": [
      {
        "name": "Molecule",
        "scale": "Molecular scale",
        "variable": "Sequence, structure and interactions",
        "effect": "A molecular change can alter binding, self-association and stability. Those properties shape the conditions under which the product can be made and handled.",
        "feedback": "The target concentration and purification conditions create constraints for candidate selection."
      },
      {
        "name": "Living system",
        "scale": "Cellular scale",
        "variable": "Expression, metabolism and cell state",
        "effect": "Cells produce the protein while responding to nutrients, oxygen and waste. The process changes both productivity and the material entering purification.",
        "feedback": "The desired product quality and harvest profile constrain culture conditions and cell-line choices."
      },
      {
        "name": "Process",
        "scale": "Local transport",
        "variable": "Flow, mass transfer and exposure",
        "effect": "Mixing distributes nutrients and gas. Local physical conditions become the environment experienced by cells and product.",
        "feedback": "The biological operating range defines which transport conditions are acceptable."
      },
      {
        "name": "Equipment",
        "scale": "Manufacturing scale",
        "variable": "Geometry, controls and residence time",
        "effect": "A different vessel, filter or flow path changes the distribution of physical conditions, even when the nominal recipe is unchanged.",
        "feedback": "Facility limits constrain achievable operating conditions and may require changes earlier in the process."
      },
      {
        "name": "Final product",
        "scale": "Dose and delivery",
        "variable": "Recovery, formulation and quality",
        "effect": "Purification and formulation determine how much usable product remains and how it behaves during storage and delivery.",
        "feedback": "The finished-product specification becomes the objective for the entire design problem."
      }
    ],
    "sections": [
      {
        "title": "Discovery is only the beginning of the design problem",
        "paragraphs": [
          "A biotechnology product is designed more than once: first as a biological candidate, then as something a process can produce, and finally as something equipment can manufacture repeatedly. When those decisions are made in isolation, later constraints can force earlier work to be reconsidered. The larger opportunity is to bring the manufacturing system into the original act of design.",
          "For an antibody, strong binding does not settle questions of self-association, expression or stability. For a cell therapy, a growing population does not establish the functional properties of the final dose. The relevant question is whether the biology and the process can meet the product specification together."
        ]
      },
      {
        "title": "Forward through biology. Backward through engineering.",
        "paragraphs": [
          "Consider a culture with rising cell density. Oxygen consumption changes the demand placed on gas transfer. A mixing change alters oxygen distribution and mechanical exposure. The resulting cell state and harvest composition become inputs to downstream operations. A process decision therefore travels through biology before it reappears as a manufacturing outcome.",
          "The reverse direction matters just as much. A required dose concentration places constraints on formulation and recovery. Recovery requirements influence acceptable upstream impurities. Equipment limits narrow the set of viable process conditions. Manufacturing belongs inside the design brief, not only at its end."
        ]
      },
      {
        "title": "The missing connection between powerful tools",
        "paragraphs": [
          "Structural prediction, molecular simulation, bioprocess models and computational fluid dynamics already solve important parts of this problem. Modern AI also addresses developability and process data. The unresolved challenge is not the absence of useful tools; it is maintaining consistent relationships, uncertainties and objectives when their outputs cross scientific boundaries.",
          "An excellent prediction in one domain can be a poor intervention for the complete process. A binding score is not a yield forecast. A reactor average is not every cell’s exposure history. Combining those quantities requires models of the connections, not merely a dashboard that displays them side by side."
        ]
      },
      {
        "title": "LUCAN’s architecture brings the manufacturing objective into design",
        "paragraphs": [
          "Shodh is building LUCAN as a cross-scale physical foundation model. Its design connects molecular representations, physical fields and biological mechanics within a shared computational system. The ambition is to reason backward from a manufacturing objective to controllable molecular and process variables.",
          "That does not make biology reducible to fluid mechanics. Cellular state, expression and function need measured biological relationships. LUCAN’s approach is to connect those relationships with physical transport and equipment constraints, then test whether proposed changes survive independent verification. Where a connection is uncalibrated, its uncertainty must remain visible."
        ],
        "sources": [
          "lucan"
        ]
      },
      {
        "title": "An engineering example: start with the final dose",
        "paragraphs": [
          "Consider a hypothetical antibody program choosing between two candidates with similar measured activity. One is easier to concentrate; the other expresses at a higher titer. A discovery-only ranking cannot settle that tradeoff. The decision changes with the intended dose volume, the recovery sequence and the filling equipment.",
          "The cross-scale question is whether the higher expression advantage survives purification losses and the viscosity constraint at the required concentration. A route with excellent reactor output may consume more downstream capacity or require an unsuitable delivery format. These are design dependencies, not reasons to prefer one candidate before measurement.",
          "LUCAN’s intended role is to carry a proposed change through those dependencies and expose the variables that control the outcome. The experimental decision then becomes sharper: measure the interaction or process response that could reverse the candidate ranking, rather than collect another isolated score. This example describes a proposed workflow, not a reported candidate-selection result."
        ]
      },
      {
        "title": "The interface between scales is part of the model",
        "paragraphs": [
          "Every handoff should identify the physical quantity, units, spatial or temporal resolution, operating range and uncertainty. A molecular descriptor is not automatically a transport coefficient. Turning one into the other requires a measured or mechanistic relationship whose validity can be tested.",
          "For a practical inverse-design study, fix the product specification, list the variables engineers can change, and compare candidate interventions against the current process. Hold out an equipment configuration or operating perturbation for prospective verification. A model that explains the training runs but fails that intervention has not solved the manufacturing decision."
        ]
      },
      {
        "title": "A foundation model earns scope through evidence",
        "paragraphs": [
          "The LUCAN whitepaper reports controlled cross-scale tests, independent numerical checks of inverse-design proposals, and selected physical executions. Those evidence levels answer different questions: can the model connect scales, does its proposed direction survive another solver, and does an intervention work in a physical process?",
          "The five pieces in this collection separate the platform thesis from application-specific claims. Reactor scale-up is an important demonstration, but it does not establish a universal model of CAR-T potency, antibody stability or delivery performance. Each extension needs its own inputs, calibration and prospective evaluation."
        ],
        "sources": [
          "lucan"
        ]
      }
    ],
    "equation": {
      "title": "Design from a manufacturing objective",
      "expression": "x* = arg min J(Fθ(x))   subject to g(Fθ(x), x) ≤ 0",
      "explanation": "x contains permitted design and operating choices; Fθ predicts their coupled consequences; J is a manufacturing objective; g expresses quality and equipment constraints. A solution is useful only if it remains acceptable under verification.",
      "assumption": "Conceptual constrained optimization. A differentiable model supplies candidate directions, not automatic guarantees of biological validity or global optimality."
    },
    "consequence": {
      "title": "Design the product and its manufacturing system together",
      "paragraphs": [
        "Manufacturing becomes more powerful when it enters the design brief early enough to change the molecule, the process or the equipment. Discovery teams can select against an intended route. Process teams can identify when a facility constraint should trigger an earlier design change. Each decision is judged by its effect on the product that must ultimately be made.",
        "This is the future Shodh is building toward: biotechnology engineered across its physical scales, with manufacturing requirements reasoning backward into design. The opportunity is fewer expensive dead ends, more reproducible quality and a development process organized around the finished product."
      ],
      "measures": [
        "Prospective prediction accuracy",
        "Development iterations per viable process",
        "Repeatability of final product quality"
      ]
    },
    "evidence": "Platform thesis grounded in the LUCAN whitepaper. The breadth described here is a development direction; validation remains specific to the reported tasks and processes.",
    "sources": [
      {
        "id": "lucan",
        "title": "Shodh AI · LUCAN technical whitepaper v3, Sections 3–5",
        "href": "/research/LUCAN_Physical_Intelligence_Whitepaper_v3.pdf"
      }
    ],
    "vision": "Biology moves forward across scales. Engineering has to reason backward across them.",
    "articleOrder": [
      0,
      2,
      1,
      3,
      4,
      5,
      6
    ]
  },
  {
    "slug": "cell-gene-therapy",
    "number": "02",
    "documentType": "Application Perspective",
    "category": "Cell and gene therapy application",
    "title": "Designing Cell and Gene Therapies for Manufacture: The CAR-T Journey",
    "shortTitle": "The CAR-T journey",
    "dek": "CAR-T makes the challenge tangible: receptor design changes cell behavior, culture conditions shape expansion, and manufacturing must preserve the attributes of the intended dose. Connecting those decisions is the opportunity for physical intelligence.",
    "problem": "Increasing cell numbers is not enough: a manufacturing process must deliver the intended identity, viability and function despite variable starting material.",
    "visualTitle": "From a receptor decision to a living-cell dose",
    "visualCaption": "Conceptual autologous CAR-T journey. Patient-derived starting material enters at the cell stage; allogeneic platforms add different source, editing and scale requirements. This is an application map, not a validated LUCAN CAR-T simulation.",
    "outcome": "A characterized cell product with a reproducible manufacturing history",
    "scales": [
      {
        "name": "CAR design",
        "scale": "Molecular scale",
        "variable": "Binding, receptor geometry and signaling domains",
        "effect": "Receptor architecture influences recognition and signaling. Interactions between receptors can matter even without the intended antigen.",
        "feedback": "Measured cell behavior can reveal which receptor-design assumptions need revision."
      },
      {
        "name": "Engineered cell",
        "scale": "Cellular scale",
        "variable": "Starting material, expression and phenotype",
        "effect": "Activation and engineering act on a variable biological population. Cell-state measurements are needed to connect receptor design to behavior.",
        "feedback": "A desired product phenotype constrains activation and engineering conditions."
      },
      {
        "name": "Expansion",
        "scale": "Population scale",
        "variable": "Growth, metabolism and state transitions",
        "effect": "Culture increases cell numbers while the distribution of cell states can change. More expansion does not necessarily preserve the desired function.",
        "feedback": "The required cell population constrains culture duration and the feeding strategy."
      },
      {
        "name": "Culture device",
        "scale": "Equipment scale",
        "variable": "Gas exchange, mixing and local exposure",
        "effect": "Device geometry and controls set transport conditions. Different devices cannot be treated as interchangeable volumes.",
        "feedback": "The acceptable biological environment constrains device selection and operating settings."
      },
      {
        "name": "Final dose",
        "scale": "Manufacturing and logistics",
        "variable": "Harvest, preservation and product testing",
        "effect": "Recovery and preservation add losses and stresses after expansion. Product identity, function and release measurements remain essential.",
        "feedback": "The usable-dose requirement reaches backward into recovery, expansion and source-material planning."
      }
    ],
    "sections": [
      {
        "title": "The living product is still changing during manufacture",
        "paragraphs": [
          "CAR-T cells are T cells engineered to recognize a target through a chimeric antigen receptor. The manufacturing process typically includes collection or sourcing, activation, engineering, expansion, harvest and preparation for administration. The product is a living population, so changes in the process can change the product itself.",
          "For autologous therapies, starting material comes from the individual patient. For allogeneic approaches, source strategy and additional engineering create a different problem. A cross-scale model must represent the relevant route rather than assume every CAR-T process is a larger version of the same culture."
        ],
        "sources": [
          "car"
        ]
      },
      {
        "title": "A molecular choice can become a manufacturing constraint",
        "paragraphs": [
          "Long and colleagues demonstrated in particular CAR constructs that antigen-independent receptor clustering could drive persistent signaling and early T-cell exhaustion. Their results also showed that the costimulatory domain changed this response. This is a concrete connection between molecular design and cell behavior, not a universal ranking of receptor designs.",
          "Now consider expansion. The population consumes nutrients and oxygen and produces metabolites while its cellular states evolve. Transport conditions affect the culture environment; that environment interacts with activation history and receptor-driven behavior. The meaningful engineering target is the required cell product, not the largest possible cell count."
        ],
        "sources": [
          "signaling"
        ]
      },
      {
        "title": "Neither a structure model nor a reactor model closes the loop",
        "paragraphs": [
          "A molecular model can investigate receptor interactions but cannot establish a final cell product’s potency on its own. A population model can estimate expansion without resolving every cell’s physical environment. A fluid model can describe transport but does not infer T-cell phenotype from velocity fields.",
          "The missing step is the experimentally calibrated link between those descriptions. That link must respect donor variability, engineered-cell measurements and the actual manufacturing platform. Substituting a CHO-cell mechanical threshold for a T-cell threshold would hide a biological assumption rather than solve it."
        ]
      },
      {
        "title": "How LUCAN would frame the CAR-T design problem",
        "paragraphs": [
          "The application direction is to connect receptor descriptors and measured cell-state models with expansion dynamics and device-specific transport. The desired product profile would define the objective. Candidate interventions could include a permitted receptor-design choice, culture duration, feeding regime or device operating condition.",
          "This is a staged program of evidence. First establish that a proposed molecular change predicts the measured cellular response. Then test whether the culture model predicts population trajectories under controlled perturbations. Only after those links are credible should the system propose coupled interventions for prospective manufacturing evaluation."
        ]
      },
      {
        "title": "Cell and gene therapy is a family of manufacturing routes",
        "paragraphs": [
          "CAR-T is an ex vivo gene-modified cell therapy: cells are engineered outside the body and become the administered product. Other gene therapies deliver genetic material in vivo. The final product may instead be a vector or a nonviral delivery formulation, with a different production and purification route.",
          "That distinction changes the modeling objective. In a CAR-T process, expansion and preservation of the desired cell attributes are central. In a vector process, production, recovery and product-specific functional characterization become central. Neither a particle count nor a viable-cell count is a universal measure of biological performance. FDA’s gene-therapy CMC guidance makes product characterization and manufacturing controls explicit.",
          "One cross-scale architecture can organize these different problems without assigning them the same biology. LUCAN would need route-specific state variables, measured responses and verification tasks. The CAR-T journey here is the worked application; it is not evidence that a CAR-T model also predicts viral-vector quality."
        ],
        "sources": [
          "gene"
        ]
      },
      {
        "title": "An engineering example: more expansion is not the objective",
        "paragraphs": [
          "Imagine comparing a longer culture with an alternative feeding or gas-transfer regime. The first option increases time in culture; the second changes the physical environment. The comparison should track both viable population and the measured attributes of the intended cell product, using the same starting-material characterization.",
          "The model’s task is to forecast the consequences of each intervention and state where starting-material variability could change the ranking. Evaluation then tests the complete proposal in a held-out run. Faster growth alone is insufficient: a useful process must deliver the specified living product within an achievable manufacturing schedule."
        ]
      },
      {
        "title": "Demonstrated architecture and proposed CAR-T coupling",
        "paragraphs": [
          "LUCAN’s whitepaper reports a reactor-to-membrane coupling test using a CHO-cell surrogate. That result motivates asking how physical environments can connect to cell-scale models. It is not validation of CAR-T signaling, potency or patient-specific manufacturing outcomes.",
          "For CAR-T, acceptance must include product-specific analytical characterization and functional testing. FDA’s guidance addresses manufacturing controls and comparability for these products. A simulation may inform experiments and operating choices; it cannot substitute a predicted cell count for an appropriate potency assessment."
        ],
        "sources": [
          "lucan",
          "car"
        ]
      }
    ],
    "equation": {
      "title": "Keep cell quantity separate from cell quality",
      "expression": "dN/dt = [μ(z, c) − kd(z, c)]N",
      "explanation": "N is the viable-cell population. The effective growth rate μ and death rate kd depend on cellular state z and local culture conditions c. Those conditions evolve with transport and consumption.",
      "assumption": "A simplified population balance, not a CAR-T potency model. It requires measured rates and separate state dynamics; adequate N does not establish identity, function or clinical efficacy."
    },
    "consequence": {
      "title": "Make the living product the design objective",
      "paragraphs": [
        "A manufacturing system that reasons across receptor design, cell state and culture conditions could expose incompatible choices before scarce starting material and facility time are committed. The value is a clearer path from a biological idea to a characterized living-cell product.",
        "The meaningful engineering target is the required cell product, not the largest possible cell count. Designing toward that target connects manufacturing success, usable capacity and predictable scheduling. Those are the outcomes a prospective CAR-T program must earn through product-specific tests."
      ],
      "measures": [
        "Product-specific quality and function",
        "Manufacturing success across starting materials",
        "Usable capacity and schedule predictability"
      ]
    },
    "evidence": "LUCAN’s reported CHO-surrogate coupling work motivates this application direction; the proposed receptor-to-cell-to-manufacturing connections still require product-specific validation. No LUCAN CAR-T, viral-vector manufacturing or clinical validation is claimed in this piece.",
    "sources": [
      {
        "id": "car",
        "title": "FDA · Considerations for the Development of CAR T Cell Products (2024)",
        "href": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/considerations-development-chimeric-antigen-receptor-car-t-cell-products"
      },
      {
        "id": "signaling",
        "title": "Long et al. · CAR clustering, tonic signaling and T-cell exhaustion (2015)",
        "href": "https://www.nature.com/articles/nm.3838"
      },
      {
        "id": "gene",
        "title": "FDA · CMC information for human gene therapy INDs (2020)",
        "href": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/chemistry-manufacturing-and-control-cmc-information-human-gene-therapy-investigational-new-drug"
      },
      {
        "id": "lucan",
        "title": "Shodh AI · LUCAN technical whitepaper v3, Sections 3–5",
        "href": "/research/LUCAN_Physical_Intelligence_Whitepaper_v3.pdf"
      }
    ],
    "vision": "The future of cell therapy depends on manufacturing the right living product, repeatedly.",
    "articleOrder": [
      0,
      2,
      1,
      3,
      4,
      5,
      6
    ]
  },
  {
    "slug": "scale-up",
    "number": "03",
    "documentType": "Technical Whitepaper",
    "category": "Scale-up and process transfer",
    "title": "Solving the Scale-Up Valley of Death",
    "shortTitle": "Solving scale-up",
    "dek": "Scale-up transfers a required biological environment into different equipment. LUCAN approaches that transfer through physical prediction and inverse design, starting with the process requirements and calculating candidate conditions for the receiving vessel.",
    "problem": "A successful small-scale culture does not specify the settings that preserve its required environment in a different manufacturing vessel.",
    "visualTitle": "The path from cell demand to facility settings",
    "visualCaption": "Conceptual scale-up loop. Local cell exposure connects biological demand to equipment-scale flow. The return path represents constraints for inverse design, not a guarantee of a transferable operating envelope.",
    "outcome": "Equipment-specific settings verified against the process specification",
    "scales": [
      {
        "name": "Cell demand",
        "scale": "Cellular scale",
        "variable": "Oxygen consumption and metabolism",
        "effect": "The culture’s needs change over time. Biological demand defines the transport duty the equipment must satisfy.",
        "feedback": "Measured culture performance calibrates the demand model and its acceptable range."
      },
      {
        "name": "Local environment",
        "scale": "Cell exposure",
        "variable": "Oxygen, nutrients and mechanical loading",
        "effect": "Cells encounter changing local conditions rather than a single vessel-average number.",
        "feedback": "The biological response defines constraints on exposure, not just averages."
      },
      {
        "name": "Flow and transfer",
        "scale": "Reactor physics",
        "variable": "Circulation, gas transfer and residence time",
        "effect": "Mixing and aeration alter several mechanisms together. More agitation can increase transfer and mechanical burden at the same time.",
        "feedback": "Competing constraints determine which operating changes are useful."
      },
      {
        "name": "Receiving vessel",
        "scale": "Facility scale",
        "variable": "Geometry, impellers and gas delivery",
        "effect": "A new equipment configuration changes the flow and transport response to the same nominal controls.",
        "feedback": "Equipment limits constrain the set of available control trajectories."
      },
      {
        "name": "Verified process",
        "scale": "Manufacturing outcome",
        "variable": "Culture performance and transfer evidence",
        "effect": "Physical evaluation determines whether the proposed settings reproduce the required performance.",
        "feedback": "Measured discrepancies update model assumptions before subsequent transfer decisions."
      }
    ],
    "sections": [
      {
        "title": "Scale-up preserves requirements, not recipes",
        "paragraphs": [
          "Keeping the same impeller speed across vessel sizes does not preserve circulation, oxygen transfer or mechanical exposure. Neither does a single scale-up rule preserve all of them simultaneously. The engineer must decide which process requirements govern the transfer and whether the receiving equipment can satisfy them together.",
          "The central conflict is familiar: stronger agitation may improve transport while increasing local hydrodynamic burden. The relevant operating region depends on the cells, medium, gas delivery and geometry. There is no universal speed that resolves this conflict for every process."
        ]
      },
      {
        "title": "A bulk measurement does not describe every cell",
        "paragraphs": [
          "The volumetric transfer coefficient kLa describes gas-to-liquid transfer capacity. Dissolved oxygen also depends on consumption and spatial transport. Two operating conditions with similar average readings can therefore expose cells to different local environments.",
          "Mechanical exposure requires similar care. A predicted stress field is a physical input to a biological model, not a direct measurement of viability. Exposure history and calibrated cell response matter. Scale-up is strongest when the transport and biological requirements are evaluated together."
        ]
      },
      {
        "title": "Established CFD is the baseline to improve upon",
        "paragraphs": [
          "Industry already uses computational fluid dynamics, empirical correlations, scale-down models and physical trials. A published large-scale cell-culture study validated CFD against kLa measurements and combined it with oxygen-demand and carbon-dioxide-stripping models to determine operating conditions. The field is not starting from guesswork.",
          "LUCAN’s proposed advance is a connected inverse-design workflow: use the target biological and manufacturing conditions to search the coupled operating space, then verify the proposed solution. Faster computation has value when it reduces the work needed to reach a physically acceptable process."
        ],
        "sources": [
          "cfd"
        ]
      },
      {
        "title": "Change the facility model and recalculate",
        "paragraphs": [
          "Process transfer carries material properties, culture requirements and quality constraints into a new equipment context. Geometry is one input. Sparging, sensors, utilities, control limits and operating procedures also matter. A new CAD file begins the computational adaptation; it does not complete technology transfer.",
          "The inverse-design problem is to find equipment-specific controls that meet the stated requirements. Independent simulations and measurements test those controls. Qualification, analytical transfer and the receiving site’s manufacturing evidence remain part of the physical transfer program."
        ],
        "sources": [
          "who"
        ]
      },
      {
        "title": "An engineering example: transfer between two vessel designs",
        "paragraphs": [
          "Assume a development process is moving to a larger vessel with different impellers and gas delivery. Begin with measured oxygen demand, acceptable culture conditions and equipment limits. Reusing the original rpm is merely one candidate setting; it is not the transfer specification.",
          "Next compare admissible agitation, gas-flow and feed trajectories in the receiving geometry. Reject proposals that satisfy average oxygen conditions while violating another measured requirement. Local exposure predictions should be evaluated with a calibrated biological response, not converted directly into a claim of cell rupture.",
          "The output is a proposed operating region and a verification plan: which quantities to measure, under which operating perturbations, and what discrepancy would invalidate the proposal. Facility transfer becomes an engineering hypothesis with explicit acceptance criteria. This walkthrough is illustrative and does not claim a new at-scale experiment."
        ]
      },
      {
        "title": "Inverse design must include the cost of a wrong answer",
        "paragraphs": [
          "An optimizer should not select a nominal optimum so close to a process limit that modest uncertainty makes it unusable. Input variability, model discrepancy and sensor uncertainty should inform the margin between the proposed trajectory and an acceptance boundary.",
          "The comparison is therefore between verified alternatives, including the established process baseline. Report prediction error, the number of physical iterations and the effort through demonstrated transfer. Solver convergence and rapid scenario generation are computational achievements; product and process measurements determine manufacturing success."
        ]
      },
      {
        "title": "What the biomanufacturing evidence says",
        "paragraphs": [
          "The existing two-page UNIPHY whitepaper develops this scale-up and process-portability argument. It belongs here as the focused technical note, rather than as the definition of Shodh’s entire biotechnology capability.",
          "Separately, LUCAN whitepaper v3 reports a 5 L-to-500 L monoclonal-antibody pilot with 6.63 g/L harvest titer, 78.2% viability and 94.5% TFF recovery. These are Shodh-reported results for that process; underlying partner records are not supplied in this collection. They should not be generalized to other cell systems, facilities or therapeutic modalities."
        ],
        "sources": [
          "scale-note",
          "lucan"
        ]
      }
    ],
    "equation": {
      "title": "Transfer capacity must meet biological demand",
      "expression": "dCL/dt = kLa(C* − CL) − qO₂X",
      "explanation": "CL is dissolved oxygen, C* is the saturation concentration, qO₂ is specific oxygen uptake and X is viable-cell concentration. The supply and demand terms share concentration-per-time units.",
      "assumption": "Illustrative well-mixed balance at constant volume, omitting feed dilution and spatial gradients. A spatial model and measured biological inputs are needed for local exposure predictions."
    },
    "consequence": {
      "title": "Turn facility transfer into a design problem",
      "paragraphs": [
        "The opportunity is to make receiving-equipment decisions before learning their consequences through expensive production-scale iterations. Engineers can compare proposed operating regions, identify the measurements that matter and carry explicit process requirements into the next facility.",
        "That is a different scale-up workflow: design for the required biological environment, verify the proposed conditions, and use the discrepancies to improve the next decision. The commercial payoff is measured through successful transfer, development effort and reproducible product quality—not the speed of a simulation alone."
      ],
      "measures": [
        "Operating conditions verified in the receiving vessel",
        "At-scale development batches",
        "Time and cost through demonstrated transfer"
      ]
    },
    "evidence": "The LUCAN v3 results discussed here are attributed to Shodh’s reported work. The educational explorer is not a live simulation. This public-facing scale-up paper supersedes the earlier overview; that document remains background technical material. No universal viability or transfer-time guarantee is made.",
    "sources": [
      {
        "id": "cfd",
        "title": "Validation of a CFD model for cell culture bioreactors at large scale (2024)",
        "href": "https://doi.org/10.1016/j.jbiotec.2024.02.006"
      },
      {
        "id": "who",
        "title": "WHO · Guidelines on technology transfer in pharmaceutical manufacturing (2022)",
        "href": "https://www.who.int/publications/m/item/trs1044-annex4"
      },
      {
        "id": "lucan",
        "title": "Shodh AI · LUCAN technical whitepaper v3, Sections 3–5",
        "href": "/research/LUCAN_Physical_Intelligence_Whitepaper_v3.pdf"
      },
      {
        "id": "scale-note",
        "title": "Background archive · Earlier UNIPHY biomanufacturing overview",
        "href": "/research/UNIPHY_Biomanufacturing_Whitepaper.pdf"
      }
    ],
    "vision": "A promising process should be designed for the factory it needs to become.",
    "articleOrder": [
      0,
      2,
      1,
      3,
      4,
      5,
      6
    ]
  },
  {
    "slug": "biologics-manufacturing",
    "number": "04",
    "documentType": "Application Perspective",
    "category": "Antibody and protein application",
    "title": "Beyond Discovery: Designing Biologics for Manufacturability",
    "shortTitle": "Biologics built for manufacture",
    "dek": "Binding, expression, recovery and formulation are connected requirements. Designing them together changes which candidate is worth advancing, how capacity is used and how much usable product reaches the end of the line.",
    "problem": "Selecting a candidate on biological activity alone can defer costly expression, recovery and formulation constraints until late development.",
    "visualTitle": "The molecule is carried through every operation",
    "visualCaption": "Conceptual monoclonal-antibody route. Molecular properties travel through the process while the process changes the material’s environment. The diagram does not imply that every protein uses the same host or purification platform.",
    "outcome": "Recovered product that meets quality and intended-use requirements",
    "scales": [
      {
        "name": "Candidate",
        "scale": "Molecular scale",
        "variable": "Binding, charge and self-association",
        "effect": "Sequence and structure affect more than target recognition. Molecular interactions influence handling and formulation behavior.",
        "feedback": "The intended route and dose concentration narrow the acceptable candidate properties."
      },
      {
        "name": "Expression",
        "scale": "Cellular scale",
        "variable": "Host, cell line and production burden",
        "effect": "The host and culture determine expression and the characteristics of the harvested material.",
        "feedback": "Product quality and reliable expression constrain the host and cell-line strategy."
      },
      {
        "name": "Culture",
        "scale": "Bioprocess scale",
        "variable": "Feed, metabolism and transport",
        "effect": "Upstream controls shape cell performance and the impurity burden that downstream equipment receives.",
        "feedback": "Recovery requirements constrain acceptable harvest composition and upstream conditions."
      },
      {
        "name": "Recovery",
        "scale": "Separation scale",
        "variable": "Capture, clearance and concentration",
        "effect": "Each operation can lose product or expose it to new chemical and physical conditions.",
        "feedback": "Separation capacity and losses change the value of additional upstream titer."
      },
      {
        "name": "Formulation",
        "scale": "Final-product scale",
        "variable": "Concentration, stability and delivery",
        "effect": "The final formulation sets a demanding environment for protein interactions, handling and storage.",
        "feedback": "Product-format constraints feed back to molecular selection and process development."
      }
    ],
    "sections": [
      {
        "title": "A candidate is a commitment to a manufacturing route",
        "paragraphs": [
          "Antibody development has long recognized developability as a separate requirement from biological activity. Jain and colleagues tested 137 clinical-stage antibodies using a panel of biophysical assays, illustrating the range of properties involved. No single score fully expresses the behavior needed across development and manufacture.",
          "Manufacturability extends that idea into a particular route. The decision is not simply whether a molecule looks favorable in an isolated assay. It is whether the candidate, host, process and final product format can meet their requirements together."
        ],
        "sources": [
          "antibody"
        ]
      },
      {
        "title": "Upstream success can create downstream work",
        "paragraphs": [
          "A higher harvest titer is valuable only in the context of recoverable product and required quality. Additional upstream material may require more capture capacity or alter the impurity load. Product loss during subsequent operations can erase part of the apparent upstream gain.",
          "Likewise, a change intended to improve molecular behavior must be evaluated for its effects on expression, activity and recovery. These relationships are not always monotonic. The efficient design choice is the one that improves the final objective under the actual process constraints."
        ]
      },
      {
        "title": "Discovery models do not know the receiving process by default",
        "paragraphs": [
          "Structure prediction and molecular simulation can inform binding and conformational hypotheses. Developability assays and predictive models add essential evidence. Process simulators bring material balances, transport and unit-operation constraints. These are complementary tools with different domains of validity.",
          "The gap appears when a candidate ranking must become a plant decision. The ranking needs a defined expression system, process environment and product specification to mean anything about manufacturing. Static molecular descriptors alone cannot establish process yield, and a favorable process mass balance cannot establish shelf stability."
        ]
      },
      {
        "title": "LUCAN’s design space includes the manufacturing route",
        "paragraphs": [
          "The LUCAN approach is to connect candidate descriptors with calibrated models of expression, culture, transport and downstream behavior. An objective such as recovered product quality can then inform which molecular or operating variables deserve further investigation.",
          "That does not require every choice to be differentiable. Sequence edits, host changes and alternative process routes can be treated as discrete candidates; continuous controls can be optimized within each feasible route. The model must not recommend mathematically convenient changes that a production team cannot actually implement."
        ]
      },
      {
        "title": "Higher titer. Less recovered product.",
        "paragraphs": [
          "Consider a hypothetical process producing 100 units of target-protein mass at harvest. Three sequential operations each recover 90%, leaving 72.9 units. A change that raises harvest mass to 110 units but lowers the first recovery to 80% leaves 71.28 units after the same two remaining recoveries. The higher upstream output delivers less recovered material.",
          "This is an illustrative mass balance, not a Shodh performance result. It does not account for changes in purity or potency. Its purpose is to show why the candidate and upstream process should be evaluated against the complete route rather than an isolated titer target.",
          "LUCAN’s proposed decision loop would connect the upstream change to the mechanism behind the altered recovery, then ask whether molecular selection, culture conditions or separation settings can improve the final outcome. The model must identify that mechanism from evidence; the arithmetic alone cannot explain it."
        ]
      },
      {
        "title": "Build a candidate-to-process evidence package",
        "paragraphs": [
          "For each candidate, record the intended host, route and product format alongside molecular and functional measurements. Track product mass and the relevant quality attributes through the operations where losses or changes occur. This makes a candidate ranking conditional on a reproducible manufacturing context.",
          "A prospective comparison should challenge both sides of the connection: an altered candidate and an altered process condition. The useful result is a correctly predicted intervention, not merely a correlation between favorable molecular descriptors and historical batches. This turns manufacturability into a testable design criterion early enough to affect selection."
        ]
      },
      {
        "title": "Measure the links, not just the final prediction",
        "paragraphs": [
          "A useful validation program separates candidate-level measurements from process-level tests. Binding, self-association and stability need appropriate assays. Expression and culture models need measured trajectories. Recovery models need mass balances and quality measurements across the actual separation sequence.",
          "LUCAN v3 describes a coupled monoclonal-antibody scale-up application. It does not establish general sequence-to-finished-product prediction for arbitrary antibodies. Extending that capability requires prospective candidate comparisons and process perturbations that test the links the model is using."
        ],
        "sources": [
          "lucan"
        ]
      }
    ],
    "equation": {
      "title": "Titer becomes product through cumulative recovery",
      "expression": "Mrecovered = Vharvest × tharvest × ∏ᵢ Yi",
      "explanation": "Harvest volume times harvest titer gives the initial product mass. Each Yi is the fraction of that product recovered through a subsequent operation. A better upstream result can be offset by lower downstream recovery.",
      "assumption": "Bookkeeping for the same product mass through sequential operations, with 0 ≤ Yi ≤ 1. This equation does not establish purity, potency, stability or release compliance."
    },
    "consequence": {
      "title": "Make usable product the unit of progress",
      "paragraphs": [
        "The best molecule is not necessarily the molecule with the best molecular score. The best process is not necessarily the process with the highest titer. The objective is the best final product.",
        "That changes capital allocation as well as process design. Candidate selection can account for recovery burden and final format; capacity planning can account for usable output instead of harvest volume alone. Earlier visibility into those dependencies creates an opportunity to avoid late reformulation, redesign and equipment commitments that do not improve the finished product."
      ],
      "measures": [
        "Recoverable product meeting specification",
        "Late candidate or process redesign",
        "Capacity required per usable product mass"
      ]
    },
    "evidence": "Application framework. Sequence-wide manufacturability prediction is a development objective, not a demonstrated general result of the cited monoclonal-antibody pilot.",
    "sources": [
      {
        "id": "antibody",
        "title": "Jain et al. · Biophysical properties of the clinical-stage antibody landscape (2017)",
        "href": "https://doi.org/10.1073/pnas.1616408114"
      },
      {
        "id": "lucan",
        "title": "Shodh AI · LUCAN technical whitepaper v3, Sections 3–5",
        "href": "/research/LUCAN_Physical_Intelligence_Whitepaper_v3.pdf"
      }
    ],
    "vision": "The objective is the best final product—not the best isolated score.",
    "articleOrder": [
      0,
      2,
      1,
      3,
      4,
      5,
      6
    ]
  },
  {
    "slug": "formulation-delivery",
    "number": "05",
    "documentType": "Application Perspective",
    "category": "Downstream and delivery application",
    "title": "From Harvest to Medicine: The Physics of Purification, Formulation and Delivery",
    "shortTitle": "From harvest to medicine",
    "dek": "Purification, formulation and delivery turn biological materials into usable products. The design problem connects material interactions, transport and equipment—across distinct protein and delivery-system routes.",
    "problem": "An upstream process can meet its production target while downstream losses or final-product behavior prevent that output from becoming usable medicine.",
    "visualTitle": "Two routes. A shared cross-scale design question.",
    "visualCaption": "Conceptual downstream map. Protein purification and lipid-nanoparticle assembly are different process routes, not consecutive mandatory steps. Both connect material interactions, transport and final-product requirements.",
    "outcome": "A recovered, formulated product with verified quality and delivery behavior",
    "scales": [
      {
        "name": "Feed material",
        "scale": "Molecular and colloidal scale",
        "variable": "Protein interactions or lipid–cargo chemistry",
        "effect": "Material properties set the behavior of a protein solution or a delivery formulation. Different modalities require different models.",
        "feedback": "The required final product constrains which feed composition and material properties are acceptable."
      },
      {
        "name": "Separation",
        "scale": "Pores and surfaces",
        "variable": "Adsorption, retention and fouling",
        "effect": "Proteins interact with separation media while fluid transports them. Pressure and loading influence throughput and recovery.",
        "feedback": "Recovery and clearance requirements constrain upstream feed and separation conditions."
      },
      {
        "name": "Formulation",
        "scale": "Solution or particle scale",
        "variable": "Concentration, buffer or particle assembly",
        "effect": "Protein concentration alters interactions; in an LNP route, mixing history affects particle formation. These are distinct physical problems.",
        "feedback": "Measured product attributes determine which composition and process changes are acceptable."
      },
      {
        "name": "Flow path",
        "scale": "Equipment and device scale",
        "variable": "Membranes, mixers, pumps and needles",
        "effect": "Geometry and operating conditions determine residence time, pressure and mechanical exposure.",
        "feedback": "Equipment limits constrain concentration, flow rate and the usable formulation window."
      },
      {
        "name": "Finished product",
        "scale": "Manufacture and delivery",
        "variable": "Quality, handling and functional performance",
        "effect": "Filling, storage and delivery add further conditions. Physical consistency and biological function must both be tested.",
        "feedback": "Final-product requirements return upstream as constraints on purification and formulation."
      }
    ],
    "sections": [
      {
        "title": "The route is part of the product",
        "paragraphs": [
          "For a protein therapeutic, harvest begins a sequence of recovery, purification and formulation decisions. For a delivery system assembled from lipids and nucleic-acid cargo, the starting point and assembly physics are different. The common challenge is designing the route that preserves the required product attributes through manufacturing and use.",
          "Neither route is complete when its first production step succeeds. Each still has to control losses, material interactions, concentration and handling. A platform that reasons across scales must represent those dependencies while keeping the distinct biology and physical mechanisms explicit."
        ]
      },
      {
        "title": "Separation is transport coupled to material interactions",
        "paragraphs": [
          "Protein A chromatography captures suitable antibody products and releases them under different conditions. Ultrafiltration retains the target macromolecule while solvent and smaller species pass; diafiltration changes the surrounding solution. The design variables are different, and so are the mechanisms that limit performance.",
          "Membrane resistance evolves with use and feed conditions. A published single-pass TFF digital-twin study estimated changing membrane resistance to inform concentration control. This illustrates why constant equipment geometry does not imply constant process behavior."
        ],
        "sources": [
          "tff"
        ]
      },
      {
        "title": "Formulation connects microscopic interactions to flow",
        "paragraphs": [
          "At a given dose volume, concentration becomes an engineering constraint. Protein interactions influence solution behavior; viscosity influences pressure requirements during filling and injection. A formulation can have acceptable flow while still requiring separate evidence for aggregation and storage stability.",
          "Lipid nanoparticles add a second example of scale interaction. A study comparing eleven mixing techniques while holding other formulation variables fixed found differences in particle properties and biological performance. The chemistry alone did not specify the product. Neither particle size nor a well-mixed bulk endpoint is a universal proxy for successful delivery."
        ],
        "sources": [
          "lnp"
        ]
      },
      {
        "title": "Existing tools resolve operations; the objective crosses them",
        "paragraphs": [
          "Chromatography models, membrane models, rheology and formulation screens already address these mechanisms. The challenge is evaluating a change against the final product across operation boundaries. More filter pressure may not produce a proportional throughput gain; more concentration may create a harder filling or delivery problem.",
          "A complete engineering assessment also includes the conditions after formulation. Equipment hold-up, interfaces, residence time and preservation can matter. Fill-finish includes aseptic controls and container-related requirements that cannot be established by a fluid simulation alone."
        ]
      },
      {
        "title": "An engineering example: concentration meets a delivery constraint",
        "paragraphs": [
          "Consider a formulation being concentrated to deliver the required protein mass in a smaller volume. If the measured viscosity doubles while the same idealized tube geometry and flow rate are maintained, the pressure predicted by the relation above doubles. Halving the radius instead raises the predicted pressure sixteenfold.",
          "Those sensitivities reveal a coupled formulation-and-device problem. Lowering flow rate, changing a permitted flow-path dimension or revisiting the concentration may reduce pressure, but each intervention has consequences for administration time, product format or manufacturing equipment. None establishes protein stability by itself.",
          "A useful optimization therefore carries measured rheology and quality attributes into the equipment calculation, then evaluates candidates against actual device and filling measurements. The numerical example is an idealized sensitivity calculation, not a prediction for a specific medicine or syringe."
        ]
      },
      {
        "title": "LNP assembly needs its own physical and biological endpoints",
        "paragraphs": [
          "For a lipid-nanoparticle route, the relevant connection is between composition, local mixing history and assembly, followed by downstream handling and measured function. A shared foundation model needs a distinct calibrated representation of those mechanisms. Protein-solution viscosity cannot stand in for a model of particle formation.",
          "The downstream validation plan should separate reproducibility of the manufactured material from biological performance. Changes that preserve one measured particle attribute may still need functional testing. The engineering goal is a process that repeatedly produces the required delivery system, with uncertainty attached to every unverified connection."
        ]
      },
      {
        "title": "How LUCAN approaches the downstream chain",
        "paragraphs": [
          "The proposed cross-scale workflow connects material descriptors with transport, separation and formulation models. It asks which composition and operating changes can improve recovery or handling while preserving the measured quality attributes required by the final product.",
          "LUCAN v3 reports downstream TFF outcomes in its monoclonal-antibody pilot. Its accelerated formulation-screening section explicitly leaves the full-duration stability outcome pending. The same evidence does not establish validated LNP delivery prediction or sterile fill-finish control. Those extensions need their own measurements, process models and prospective tests."
        ],
        "sources": [
          "lucan"
        ]
      }
    ],
    "equation": {
      "title": "A small flow path can dominate pressure",
      "expression": "ΔP = 8ηLQ / (πr⁴)",
      "explanation": "For ideal laminar flow through a circular tube, pressure drop depends on viscosity η, tube length L, flow rate Q and radius r. The fourth-power radius dependence shows why device geometry and formulation must be evaluated together.",
      "assumption": "Hagen–Poiseuille relation for an incompressible Newtonian fluid in a rigid, straight circular tube with fully developed flow. It is not a complete syringe, membrane or non-Newtonian formulation model."
    },
    "consequence": {
      "title": "Design the route all the way to the medicine",
      "paragraphs": [
        "The commercial objective is usable product with the required attributes, produced repeatedly within an achievable manufacturing and delivery system. Better recovery, easier handling and more consistent formulation matter because they improve that complete outcome.",
        "A delivery constraint can reshape formulation. A formulation requirement can change separation. A difficult molecular interaction can return to candidate design. LUCAN’s cross-scale direction puts those decisions in conversation—without assuming that every medicine follows the same route or begins in a bioreactor."
      ],
      "measures": [
        "Recovery at required quality",
        "Formulation and delivery performance",
        "Robust operation through filling and storage"
      ]
    },
    "evidence": "Distinguishes reported TFF results, stability testing still pending in the cited whitepaper, and prospective LNP/delivery applications. No sterile-processing or therapeutic-efficacy guarantee is implied.",
    "sources": [
      {
        "id": "tff",
        "title": "Live digital twin monitoring of membrane degradation in single-pass tangential flow filtration",
        "href": "https://doi.org/10.1002/btpr.70058"
      },
      {
        "id": "lnp",
        "title": "Effects of different mixing techniques on mRNA lipid nanoparticle physicochemistry and biological performance (2026)",
        "href": "https://www.nature.com/articles/s41467-026-72499-1"
      },
      {
        "id": "lucan",
        "title": "Shodh AI · LUCAN technical whitepaper v3, Sections 3–5",
        "href": "/research/LUCAN_Physical_Intelligence_Whitepaper_v3.pdf"
      }
    ],
    "vision": "A medicine is defined by what reaches the patient, not where its production begins.",
    "articleOrder": [
      0,
      3,
      1,
      2,
      6,
      4,
      5
    ],
    "pathways": [
      {
        "name": "Protein therapeutics",
        "stages": [
          "Harvested protein",
          "Capture and purification",
          "Formulation and filling"
        ]
      },
      {
        "name": "LNP delivery systems",
        "stages": [
          "Lipids and nucleic-acid cargo",
          "Particle assembly",
          "Purification, formulation and filling"
        ]
      }
    ]
  }
];

export function pieceHref(piece: Piece) { return `/biotechnology/${piece.slug}`; }
export function whitepaperHref(piece: Piece) { return `/biotechnology/whitepapers/${piece.slug}.pdf`; }
