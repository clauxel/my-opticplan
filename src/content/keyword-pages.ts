export type KeywordSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type KeywordFaq = {
  question: string
  answer: string
}

export type KeywordPage = {
  path: string
  eyebrow: string
  title: string
  description: string
  h1: string
  lede: string
  intent: string
  ctaLabel: string
  sections: KeywordSection[]
  faqs: KeywordFaq[]
}

export const keywordPages: KeywordPage[] = [
  {
    path: '/optical-interconnect-companies',
    eyebrow: 'Supplier landscape',
    title: 'Optical Interconnect Companies Buyer Map',
    description:
      'A practical buyer map for optical interconnect companies, supplier comparison, BOM assumptions, qualification risk, and AI data center procurement planning.',
    h1: 'Compare optical interconnect companies by fit, not by brochure language',
    lede:
      'Optical interconnect companies are not interchangeable once an AI cluster design reaches procurement. Buyers need to compare module families, reach, power, support posture, interoperability, lead time, and roadmap credibility.',
    intent: 'For infrastructure, procurement, and finance teams building a short list of optical interconnect companies for AI data center programs.',
    ctaLabel: 'Model supplier shortlist',
    sections: [
      {
        heading: 'What to compare first',
        paragraphs: [
          'Start with the workload and topology before ranking suppliers. A vendor that is strong for mature pluggables may not be the same vendor you want for a future optical compute interconnect path.',
          'OpticPlan treats supplier comparison as a planning input: every vendor row should carry cost range, power assumptions, interoperability notes, qualification status, and support risk.',
        ],
        bullets: [
          'Module and cable families that match the planned reach.',
          'Power per link and rack-level thermal impact.',
          'Interoperability with switches, NICs, and management tooling.',
          'Lead time, warranty, support, and replacement posture.',
          'Standards, MSA, and consortium participation when relevant.',
        ],
      },
      {
        heading: 'How the comparison becomes a decision',
        paragraphs: [
          'A useful supplier table should not simply crown a winner. It should explain which assumptions make a vendor stronger or weaker for a specific migration phase.',
          'This is where a BOM estimate, power/thermal memo, and migration roadmap belong together. Procurement can challenge cost, facilities can challenge watts, and architects can challenge topology.',
        ],
      },
      {
        heading: 'Why the middle plan usually fits',
        paragraphs: [
          'Supplier comparison becomes valuable when the team is beyond a simple spreadsheet but not yet ready for a custom integration program.',
          'Professional annual keeps the comparison, PDF/CSV exports, and executive report in one workspace while the shortlist changes.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Should I rank optical interconnect companies only by price?',
        answer:
          'No. Price is only useful with reach, power, thermal, interoperability, support, and lead-time assumptions attached.',
      },
      {
        question: 'Does OpticPlan recommend a specific supplier?',
        answer:
          "OpticPlan helps structure the comparison and document assumptions. Final supplier choice remains the buyer team's responsibility.",
      },
      {
        question: 'Can the supplier table be exported?',
        answer:
          'The first version is designed around PDF and CSV export so procurement and investment committee reviewers can inspect the assumptions.',
      },
    ],
  },
  {
    path: '/optical-compute-interconnect-oci',
    eyebrow: 'OCI planning',
    title: 'Optical Compute Interconnect OCI Planning',
    description:
      'Plan optical compute interconnect OCI scenarios for AI scale-up fabrics with BOM ranges, power impact, supplier readiness, and migration gates.',
    h1: 'Optical compute interconnect OCI belongs in the roadmap before it belongs in the budget',
    lede:
      'Optical compute interconnect OCI can matter when AI scale-up fabrics strain electrical reach, power, or density. The planning challenge is deciding which assumptions are mature enough for procurement and which belong in a staged roadmap.',
    intent: 'For AI infrastructure teams evaluating OCI as a near-term pilot, roadmap scenario, or supplier-readiness question.',
    ctaLabel: 'Build OCI scenario',
    sections: [
      {
        heading: 'Separate readiness from ambition',
        paragraphs: [
          'OCI discussions often mix technical ambition with budget urgency. A better planning model separates what can be quoted now, what can be piloted, and what depends on ecosystem maturity.',
          'OpticPlan frames OCI as a scenario with BOM placeholders, power deltas, supplier notes, qualification gates, and board-level caveats.',
        ],
        bullets: [
          'Map current electrical or active optical bottlenecks.',
          'Document the scale-up bandwidth and latency target.',
          'Score supplier readiness and interoperability risk.',
          'Keep uncertain pricing as a range, not a false exact number.',
        ],
      },
      {
        heading: 'Power and thermal argument',
        paragraphs: [
          'OCI planning earns attention when it converts architecture language into facility and finance language. The buyer needs to know whether power saved at the link changes rack density, cooling margin, or deployment timing.',
          'The first OpticPlan model is rules and formula driven so teams can challenge assumptions before asking suppliers for quote collaboration.',
        ],
      },
      {
        heading: 'Roadmap gates',
        paragraphs: [
          'A strong OCI roadmap names what must be proven before each funding step: lab validation, switch/NIC compatibility, serviceability, supplier availability, and operational support.',
          'That gate structure makes the opportunity credible without overselling a technology still moving through the ecosystem.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is OCI ready for every AI data center?',
        answer:
          'No. OCI readiness depends on cluster scale, topology, supplier ecosystem, operating model, and risk tolerance.',
      },
      {
        question: 'How should finance review OCI?',
        answer:
          'Finance should see base, upside, and downside scenarios with named assumptions rather than a single confident number.',
      },
      {
        question: 'Can OpticPlan handle future topology visualization?',
        answer:
          'The first version focuses on formula models, supplier specs, and exports. Topology visualization is planned for a later release.',
      },
    ],
  },
  {
    path: '/ai-interconnect',
    eyebrow: 'AI InterConnect',
    title: 'AI InterConnect Planning Desk',
    description:
      'A practical AI InterConnect planning desk for AI cluster optical links, supplier assumptions, cost ranges, power, thermal, and migration reports.',
    h1: 'AI InterConnect decisions need a planning desk, not another static slide',
    lede:
      'AI InterConnect decisions sit between GPUs, network fabric, optics, facilities, procurement, and finance. The right tool turns those moving parts into assumptions that can be reviewed before checkout, quote requests, or board approval.',
    intent: 'For teams searching AI InterConnect and trying to turn a broad architecture topic into a concrete planning workflow.',
    ctaLabel: 'Open AI InterConnect planner',
    sections: [
      {
        heading: 'What the planning desk should expose',
        paragraphs: [
          'The buyer needs to see the tradeoff between cost, reach, power, supplier maturity, and migration timing. Hiding those details behind a generic calculator lowers trust.',
          'OpticPlan puts the estimator in the first screen so the visitor can immediately map cluster scale, interconnect path, adoption pressure, supplier posture, and deliverable type.',
        ],
        bullets: [
          'BOM ranges for optics, cables, switches, NICs, and spares.',
          'Power and thermal impact tied to rack-level assumptions.',
          'Supplier comparison that records caveats and qualification status.',
          'Migration roadmap with gates that finance can understand.',
        ],
      },
      {
        heading: 'Why reports matter',
        paragraphs: [
          'AI infrastructure programs fail to convert when the technical team cannot explain the decision in finance language.',
          'A useful report should carry numbers, assumptions, risks, and alternatives so the investment committee can ask better questions instead of restarting the whole analysis.',
        ],
      },
      {
        heading: 'Where OpticPlan fits',
        paragraphs: [
          'The first release is intentionally practical: rules and formulas, manufacturer spec library, and PDF/CSV export.',
          'Quote collaboration and topology visualization come later, after the core planning workflow is credible enough to sell.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is AI InterConnect the same as a network diagram?',
        answer:
          'No. A diagram is only one artifact. A planning desk also needs BOM, power, supplier, roadmap, and executive reporting context.',
      },
      {
        question: 'Who should use this workflow?',
        answer:
          'Network architects, AI infrastructure leads, procurement teams, integrators, and finance reviewers can all use different parts of the same plan.',
      },
      {
        question: 'Why is Professional selected by default?',
        answer:
          'Most serious AI interconnect decisions need more than a single BOM export; they need power, supplier, and report context together.',
      },
    ],
  },
  {
    path: '/optical-interconnects',
    eyebrow: 'Technology choice',
    title: 'Optical Interconnects for AI Clusters',
    description:
      'Plan optical interconnects for AI clusters with cost, reach, power, thermal, supplier, and migration assumptions in one decision workflow.',
    h1: 'Optical interconnects become a buying decision when distance, density, and power collide',
    lede:
      'Optical interconnects are attractive for AI clusters when copper reach, cable bulk, power density, or serviceability becomes painful. The planning question is not whether optics are exciting; it is where they improve the actual deployment.',
    intent: 'For buyers evaluating optical interconnects against copper-heavy or active electrical alternatives.',
    ctaLabel: 'Estimate optical path',
    sections: [
      {
        heading: 'Start with the pain point',
        paragraphs: [
          'A high-converting buying conversation starts with the constraint: reach, density, cooling, topology, lead time, or operational support.',
          'OpticPlan asks for the adoption pressure up front because the same optical component can look very different in a refresh cycle versus a power-limited AI pod.',
        ],
        bullets: [
          'Reach and cable management.',
          'Power per link and rack thermal headroom.',
          'Bandwidth and latency for scale-up or scale-out fabrics.',
          'Supplier availability and replacement strategy.',
        ],
      },
      {
        heading: 'Do not skip the boring assumptions',
        paragraphs: [
          'The expensive mistakes hide in ordinary assumptions: cable count, spares, support contracts, port utilization, switch generation, firmware, management tooling, and installation labor.',
          'A credible optical interconnect plan keeps those assumptions attached to the number so reviewers can challenge the model instead of distrusting it.',
        ],
      },
      {
        heading: 'Exportable planning artifacts',
        paragraphs: [
          'The first OpticPlan release is built around PDF and CSV export because optical decisions cross teams.',
          'Procurement needs line items, facilities needs power and cooling notes, and executives need the migration risk summarized clearly.',
        ],
      },
    ],
    faqs: [
      {
        question: 'When should an AI cluster move to optical interconnects?',
        answer:
          'Consider optics when reach, density, power, thermal pressure, or future scale-up requirements make the existing path hard to defend.',
      },
      {
        question: 'Does optics always reduce power?',
        answer:
          'Not automatically. Power impact depends on module type, topology, reach, switch generation, and what alternative is being replaced.',
      },
      {
        question: 'Can OpticPlan compare copper and optical paths?',
        answer:
          'Yes. The planner is designed to compare interconnect scenarios rather than force one technology answer.',
      },
    ],
  },
  {
    path: '/optical-compute-interconnect-msa',
    eyebrow: 'MSA readiness',
    title: 'Optical Compute Interconnect MSA Guide',
    description:
      'Use Optical Compute Interconnect MSA signals to evaluate ecosystem readiness, supplier risk, interoperability, and AI cluster migration scenarios.',
    h1: 'Optical Compute Interconnect MSA signals help buyers separate roadmap from lock-in',
    lede:
      'An Optical Compute Interconnect MSA can reduce uncertainty when multiple suppliers align around interface, interoperability, and ecosystem expectations. Buyers still need to translate that signal into cost, power, qualification, and migration assumptions.',
    intent: 'For teams using Optical Compute Interconnect MSA activity as part of supplier and roadmap due diligence.',
    ctaLabel: 'Score MSA readiness',
    sections: [
      {
        heading: 'What MSA status can and cannot prove',
        paragraphs: [
          'MSA participation can improve confidence that the ecosystem is not purely proprietary. It does not by itself prove availability, cost, support, or operational readiness for your site.',
          'OpticPlan treats MSA status as one supplier-readiness factor alongside product maturity, interoperability testing, support commitments, and migration timing.',
        ],
        bullets: [
          'Which vendors participate or align with the interface direction.',
          "Whether interoperability claims are proven in the buyer's topology.",
          'How MSA status affects lock-in and substitution options.',
          'Which assumptions remain speculative.',
        ],
      },
      {
        heading: 'Tie standards language to the BOM',
        paragraphs: [
          'Standards language is persuasive only when it changes a practical decision. That may mean wider supplier choice, lower qualification risk, clearer roadmap timing, or better finance confidence.',
          'A useful planning report should explain exactly where MSA status changes the recommendation and where it does not.',
        ],
      },
      {
        heading: 'Integrator team use case',
        paragraphs: [
          'Integrators often need the same MSA evaluation repeated across clients and sites. A shared workspace, reusable assumptions, and team seats make the comparison much faster.',
          'That is why the Integrator plan exists alongside the default Professional plan.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does MSA participation eliminate supplier risk?',
        answer:
          'No. It can reduce some ecosystem risk, but buyers still need qualification, support, availability, and cost assumptions.',
      },
      {
        question: 'Should MSA status be in an investment committee report?',
        answer:
          'Yes, when it materially affects lock-in, supplier optionality, or roadmap confidence.',
      },
      {
        question: 'How does OpticPlan use MSA signals?',
        answer:
          'The planner records MSA and consortium signals as part of the supplier and roadmap comparison instead of treating them as standalone proof.',
      },
    ],
  },
  {
    path: '/ai-interconnect-podcast',
    eyebrow: 'Executive briefing',
    title: 'AI InterConnect Podcast Briefing Notes',
    description:
      'Turn AI InterConnect podcast and analyst discussion themes into structured optical interconnect planning questions for AI infrastructure buyers.',
    h1: 'Use AI InterConnect Podcast themes as briefing input, not as a procurement plan',
    lede:
      'A podcast can surface useful market themes: optical scale-up, supplier ecosystems, power constraints, and data center migration pressure. The buyer still needs to turn those themes into testable assumptions.',
    intent: 'For visitors who hear AI InterConnect Podcast discussions and want a practical way to evaluate the implications.',
    ctaLabel: 'Turn briefing into plan',
    sections: [
      {
        heading: 'How to use audio insight responsibly',
        paragraphs: [
          'Podcast discussions are useful for discovering language and framing. They are not a substitute for a BOM, supplier quote, power model, or qualification plan.',
          'OpticPlan converts discussion themes into a structured planning checklist so the team can decide which claims deserve budget attention.',
        ],
        bullets: [
          'Extract the claimed bottleneck: power, reach, density, latency, or supplier readiness.',
          'Map the claim to a cluster scale and migration phase.',
          'Ask which vendor or standards signals support the claim.',
          'Turn the theme into a measurable roadmap gate.',
        ],
      },
      {
        heading: 'What belongs in the executive memo',
        paragraphs: [
          'Executives do not need a transcript. They need the implication: what changes in cost, power, risk, supplier leverage, or deployment timing.',
          'A concise investment committee report can cite market themes while keeping the financial model anchored to buyer-owned assumptions.',
        ],
      },
      {
        heading: 'From narrative to checkout',
        paragraphs: [
          'The buyer is most ready to pay when the narrative becomes a concrete workflow: estimator, supplier table, roadmap, and exportable report.',
          'That is why the site brings podcast-intent visitors back to the Professional planning path.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does OpticPlan host a podcast?',
        answer:
          'No. This page helps buyers turn AI InterConnect podcast themes and analyst discussions into structured planning questions.',
      },
      {
        question: 'Can a podcast topic become a report section?',
        answer:
          'Yes, if the topic is translated into assumptions, scenarios, and evidence that reviewers can challenge.',
      },
      {
        question: 'Why include this page at all?',
        answer:
          'Many buyers first encounter optical interconnect concepts through briefings and podcasts. A useful page helps them move from interest to evaluation.',
      },
    ],
  },
  {
    path: '/optical-scale-up-consortium',
    eyebrow: 'Consortium signals',
    title: 'Optical Scale-Up Consortium Planning',
    description:
      'Evaluate optical scale-up consortium signals for AI cluster roadmap planning, standards risk, supplier comparison, and investment committee decisions.',
    h1: 'Optical scale-up consortium activity matters when it changes your roadmap risk',
    lede:
      'Optical scale-up consortium activity can tell buyers where the ecosystem is trying to go. The planning task is to decide whether that signal changes near-term procurement, pilot timing, or long-term architecture options.',
    intent: 'For teams using optical scale-up consortium momentum as part of standards, supplier, and roadmap due diligence.',
    ctaLabel: 'Evaluate consortium signal',
    sections: [
      {
        heading: 'From ecosystem signal to planning input',
        paragraphs: [
          'Consortium momentum can reduce fear of being early or isolated. It can also create pressure to overstate readiness before products, support, and interoperability are proven.',
          'OpticPlan turns consortium activity into a roadmap variable: what it supports now, what it suggests later, and what remains unproven.',
        ],
        bullets: [
          'Which technology path the consortium signal supports.',
          'How it changes supplier optionality.',
          'Whether it affects serviceability and operational risk.',
          'Which gates must be met before procurement should rely on it.',
        ],
      },
      {
        heading: 'Supplier and finance translation',
        paragraphs: [
          'A consortium signal is strongest when it changes a finance or supplier decision: lower lock-in risk, stronger dual-source story, better roadmap confidence, or reduced requalification cost.',
          'If it does not change those decisions, it belongs in the context section rather than the recommendation.',
        ],
      },
      {
        heading: 'Why integrators care',
        paragraphs: [
          "Integrators need repeatable language for clients who ask whether a consortium announcement should change today's architecture.",
          'A team workspace keeps those assumptions consistent across client reports while still letting each site carry its own BOM and thermal model.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Should a consortium announcement trigger immediate procurement?',
        answer:
          'Usually no. It should trigger a planning review, supplier questions, and roadmap updates before purchase decisions change.',
      },
      {
        question: 'How does this affect scale-up networks?',
        answer:
          'It can affect confidence around future bandwidth, latency, supplier ecosystem, and interoperability assumptions, but the impact must be tied to a specific topology.',
      },
      {
        question: 'Can OpticPlan include consortium notes in exports?',
        answer:
          'Yes. Consortium and MSA notes belong in supplier comparison and roadmap sections when they affect the decision.',
      },
    ],
  },
  {
    path: '/ai-data-center-interconnect',
    eyebrow: 'Data center planning',
    title: 'AI Data Center Interconnect Planning',
    description:
      'Plan AI data center interconnect choices across BOM, power, thermal impact, supplier comparison, migration roadmap, and investment committee reporting.',
    h1: 'AI data center interconnect planning is where network design meets the power budget',
    lede:
      'AI data center interconnect decisions are no longer only a network architecture question. They affect rack density, cooling, supplier leverage, deployment timing, and the investment committee case.',
    intent: 'For teams planning AI data center interconnect upgrades, new pods, or migration from electrical-heavy designs toward optical paths.',
    ctaLabel: 'Plan data center interconnect',
    sections: [
      {
        heading: 'The five-part planning model',
        paragraphs: [
          'A credible AI data center interconnect plan should cover BOM, power, thermal impact, supplier comparison, and migration roadmap in one decision surface.',
          'When those pieces are separated, teams often optimize one metric and create a hidden problem for another team.',
        ],
        bullets: [
          'BOM: line items, unit ranges, spares, and support.',
          'Power: watts per link, rack impact, and facility headroom.',
          'Thermal: airflow, density, cooling limits, and operational caveats.',
          'Suppliers: qualification, lead time, support, and ecosystem fit.',
          'Roadmap: phases, gates, owner, and investment committee summary.',
        ],
      },
      {
        heading: 'Why optics enter the conversation',
        paragraphs: [
          'Optics usually enter when reach, density, cable bulk, power pressure, or scale-up bandwidth requirements make the current path difficult to defend.',
          'The decision should be documented as a scenario comparison rather than a technology slogan.',
        ],
      },
      {
        heading: 'What OpticPlan produces',
        paragraphs: [
          'The first version produces a rules/formula estimate, manufacturer-spec-backed assumptions, and PDF/CSV exports for stakeholder review.',
          'The commercial path supports monthly SaaS, annual discounted SaaS, single-project reports, and integrator team seats.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What makes AI data center interconnect different from ordinary DCI?',
        answer:
          'AI cluster interconnect decisions are often driven by GPU scale, training fabric requirements, rack power, and low-latency scale-up or scale-out needs.',
      },
      {
        question: 'Can the planner support both scale-up and scale-out assumptions?',
        answer:
          'Yes. The first version focuses on structured assumptions and exports; future releases add richer topology visualization.',
      },
      {
        question: 'Why does the page lead to pricing?',
        answer:
          'A serious interconnect plan requires repeated modeling, supplier comparison, and executive reporting, which fits the Professional workflow.',
      },
    ],
  },
]

export function findKeywordPageByPath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  return keywordPages.find((page) => page.path === normalized) ?? null
}
