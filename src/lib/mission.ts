export type PlanId = 'starter' | 'pro' | 'desk'

export type Option<T extends string = string> = {
  id: T
  label: string
  summary: string
}

export type OpticPlanSelection = {
  cluster: 'pilot' | 'pod' | 'campus' | 'hyperscale'
  interconnect: 'copper' | 'active-optical' | 'oci' | 'co-packaged'
  adoption: 'refresh' | 'power-limited' | 'scale-up' | 'board'
  supplier: 'incumbent' | 'dual-source' | 'open-msa'
  report: 'bom' | 'thermal' | 'roadmap' | 'committee'
}

export type OpticPlanResult = {
  fitScore: number
  fitLabel: string
  recommendedPlanId: PlanId
  headline: string
  briefTitle: string
  modules: Array<{ label: string; detail: string }>
  checklist: string[]
  guardrails: string[]
  briefLines: string[]
  operatorMessage: string
}

export const clusterOptions: Option<OpticPlanSelection['cluster']>[] = [
  { id: 'pilot', label: '64-256 GPUs', summary: 'Pilot pod, quick BOM range, early supplier feasibility.' },
  { id: 'pod', label: '512-2k GPUs', summary: 'Production pod with switch, optics, and cooling tradeoffs.' },
  { id: 'campus', label: '2k-10k GPUs', summary: 'Campus fabric, phased migration, multi-supplier qualification.' },
  { id: 'hyperscale', label: '10k+ GPUs', summary: 'Large program with roadmap, spares, and investment committee detail.' },
]

export const interconnectOptions: Option<OpticPlanSelection['interconnect']>[] = [
  { id: 'copper', label: 'Copper heavy', summary: 'Keep cost low but watch distance, density, and cooling limits.' },
  { id: 'active-optical', label: 'Active optical', summary: 'AOCs and pluggables for reach, density, and operational maturity.' },
  { id: 'oci', label: 'OCI path', summary: 'Optical compute interconnect planning for tighter scale-up fabrics.' },
  { id: 'co-packaged', label: 'Co-packaged', summary: 'Longer roadmap with power efficiency and supplier readiness risk.' },
]

export const adoptionOptions: Option<OpticPlanSelection['adoption']>[] = [
  { id: 'refresh', label: 'Refresh cycle', summary: 'Procurement-led update with known rack power and space.' },
  { id: 'power-limited', label: 'Power limited', summary: 'Facilities pressure makes watts per link a board issue.' },
  { id: 'scale-up', label: 'Scale-up push', summary: 'Training cluster bandwidth and latency drive the decision.' },
  { id: 'board', label: 'Board review', summary: 'Finance needs assumptions, scenarios, and downside notes.' },
]

export const supplierOptions: Option<OpticPlanSelection['supplier']>[] = [
  { id: 'incumbent', label: 'Incumbent first', summary: 'Start with existing suppliers and document substitution risk.' },
  { id: 'dual-source', label: 'Dual-source', summary: 'Compare lead time, interoperability, margin, and support posture.' },
  { id: 'open-msa', label: 'Open MSA', summary: 'Use MSA and consortium signals to reduce lock-in assumptions.' },
]

export const reportOptions: Option<OpticPlanSelection['report']>[] = [
  { id: 'bom', label: 'BOM export', summary: 'Line items, unit assumptions, and CSV/PDF summary.' },
  { id: 'thermal', label: 'Power/thermal', summary: 'Watts, rack impact, cooling notes, and facility caveats.' },
  { id: 'roadmap', label: 'Migration map', summary: 'Phases, dependencies, risks, and qualification gates.' },
  { id: 'committee', label: 'Investment memo', summary: 'Executive one-pager with spend range and risk posture.' },
]

export const defaultOpticPlanSelection: OpticPlanSelection = {
  cluster: 'pod',
  interconnect: 'active-optical',
  adoption: 'power-limited',
  supplier: 'dual-source',
  report: 'committee',
}

const clusterLabels: Record<OpticPlanSelection['cluster'], string> = {
  pilot: '64-256 GPU pilot pod',
  pod: '512-2k GPU production pod',
  campus: '2k-10k GPU campus fabric',
  hyperscale: '10k+ GPU hyperscale program',
}

const interconnectLabels: Record<OpticPlanSelection['interconnect'], string> = {
  copper: 'copper-heavy fabric',
  'active-optical': 'active optical cable and pluggable path',
  oci: 'optical compute interconnect path',
  'co-packaged': 'co-packaged optics roadmap',
}

const adoptionLabels: Record<OpticPlanSelection['adoption'], string> = {
  refresh: 'refresh-cycle procurement',
  'power-limited': 'power and cooling constrained adoption',
  'scale-up': 'scale-up bandwidth push',
  board: 'board-level investment review',
}

export function analyzeOpticPlanSelection(selection: OpticPlanSelection): OpticPlanResult {
  let score = 62
  const checklist: string[] = []
  const guardrails: string[] = []

  if (selection.cluster === 'hyperscale') {
    score += 12
    checklist.push('Model spares, lead time, and vendor qualification as first-class costs.')
  } else if (selection.cluster === 'campus') {
    score += 10
    checklist.push('Break the migration into campus phases so finance can approve gates instead of a single cliff.')
  } else if (selection.cluster === 'pod') {
    score += 8
    checklist.push('Compare switch, optics, cable, and rack-level power assumptions before locking supplier strategy.')
  } else {
    score += 4
    checklist.push('Use the pilot to validate assumptions before turning early quotes into a budget line.')
  }

  if (selection.interconnect === 'active-optical') {
    score += 12
    checklist.push('AOC and pluggable assumptions are mature enough for a near-term BOM and power comparison.')
  } else if (selection.interconnect === 'oci') {
    score += 9
    checklist.push('OCI planning should separate near-term evaluation from standards and ecosystem readiness.')
    guardrails.push('Treat OCI assumptions as scenario ranges until supplier qualification is firm.')
  } else if (selection.interconnect === 'co-packaged') {
    score += 6
    checklist.push('Co-packaged optics belongs in a roadmap with adoption gates, not a simple purchase line.')
    guardrails.push('Document serviceability, supplier maturity, and replacement risk before board approval.')
  } else {
    score += 3
    checklist.push('Copper-heavy designs need explicit distance, weight, and heat caveats.')
    guardrails.push('Do not hide thermal pressure just because the initial unit cost looks attractive.')
  }

  if (selection.adoption === 'power-limited') {
    score += 10
    checklist.push('Convert watts per link into rack and facility language so the cooling impact is visible.')
  } else if (selection.adoption === 'scale-up') {
    score += 9
    checklist.push('Tie bandwidth and latency targets to model training needs and topology assumptions.')
  } else if (selection.adoption === 'board') {
    score += 8
    checklist.push('Show base, upside, and downside spend ranges with named assumptions.')
  } else {
    score += 5
    checklist.push('Keep refresh-cycle optics decisions anchored to supportability and lifecycle timing.')
  }

  if (selection.supplier === 'dual-source') {
    score += 8
    checklist.push('Dual-source evaluation should compare interoperability, lead time, support, and commercial leverage.')
  } else if (selection.supplier === 'open-msa') {
    score += 7
    checklist.push('Use MSA and consortium status to frame lock-in, roadmap, and ecosystem confidence.')
  } else {
    score += 4
    checklist.push('An incumbent-first plan still needs substitution risk and pricing pressure notes.')
  }

  if (selection.report === 'committee') {
    score += 8
    guardrails.push('Translate technical uncertainty into finance language before the investment committee sees it.')
  } else if (selection.report === 'roadmap') {
    score += 7
    guardrails.push('Make every roadmap phase depend on a measurable qualification gate.')
  } else if (selection.report === 'thermal') {
    score += 6
    guardrails.push('Power and thermal estimates must name the rack-density assumptions behind them.')
  } else {
    score += 5
    guardrails.push('BOM exports are only useful when assumptions and exclusions travel with the CSV.')
  }

  score = Math.max(48, Math.min(96, score))

  const recommendedPlanId: PlanId = selection.cluster === 'pilot' && selection.report === 'bom' ? 'starter' : selection.cluster === 'hyperscale' || selection.supplier === 'open-msa' ? 'desk' : 'pro'
  const fitLabel = score >= 88 ? 'Board ready' : score >= 74 ? 'Strong planning fit' : 'Needs assumptions'

  const modules = [
    { label: 'BOM range', detail: selection.cluster === 'pilot' ? '$120k-$650k early estimate' : selection.cluster === 'pod' ? '$1.8M-$8.4M pod range' : selection.cluster === 'campus' ? '$9M-$42M campus range' : '$45M+ staged program' },
    { label: 'Power lens', detail: selection.adoption === 'power-limited' ? 'Facilities impact should lead the narrative.' : 'Power remains a scenario variable, not a footnote.' },
    { label: 'Supplier lens', detail: selection.supplier === 'dual-source' ? 'Dual-source comparison recommended.' : selection.supplier === 'open-msa' ? 'Open MSA and consortium signals matter.' : 'Incumbent benchmark with substitution notes.' },
    { label: 'Roadmap', detail: `${interconnectLabels[selection.interconnect]} for ${clusterLabels[selection.cluster]}.` },
  ]

  const briefLines = [
    `Program: ${clusterLabels[selection.cluster]}`,
    `Interconnect path: ${interconnectLabels[selection.interconnect]}`,
    `Pressure: ${adoptionLabels[selection.adoption]}`,
    `Supplier posture: ${selection.supplier === 'dual-source' ? 'dual-source commercial and technical comparison' : selection.supplier === 'open-msa' ? 'MSA/consortium-guided ecosystem review' : 'incumbent benchmark with fallback plan'}`,
    `Deliverable: ${selection.report === 'committee' ? 'investment committee report' : selection.report === 'roadmap' ? 'migration roadmap' : selection.report === 'thermal' ? 'power and thermal impact memo' : 'BOM CSV/PDF export'}`,
  ]

  return {
    fitScore: score,
    fitLabel,
    recommendedPlanId,
    headline: score >= 74 ? 'This optical interconnect plan is ready for a paid professional workflow.' : 'This setup needs tighter assumptions before budget approval.',
    briefTitle: `${clusterLabels[selection.cluster]} / ${selection.report}`,
    modules,
    checklist,
    guardrails,
    briefLines,
    operatorMessage:
      recommendedPlanId === 'desk'
        ? 'Integrator annual fits teams running multi-site or standards-sensitive optical programs.'
        : recommendedPlanId === 'starter'
          ? 'Modeler works for a bounded first BOM; Professional is safer once power and suppliers enter the decision.'
          : 'Professional annual is the default path for a serious AI optical interconnect decision.',
  }
}
