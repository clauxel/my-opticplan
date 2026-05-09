import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Cpu,
  Download,
  ExternalLink,
  FileSpreadsheet,
  GitBranch,
  Landmark,
  Layers3,
  LineChart,
  Network,
  Play,
  Radio,
  Rocket,
  ShieldCheck,
  ThermometerSun,
  X,
  Zap,
} from 'lucide-react'

import { findKeywordPageByPath, keywordPages, type KeywordPage } from './content/keyword-pages'
import { legalPrivacySections, legalTermsSections, type LegalSection } from './content/legal'
import { trackEvent, trackPageView } from './lib/analytics'
import {
  adoptionOptions,
  analyzeOpticPlanSelection,
  clusterOptions,
  defaultOpticPlanSelection,
  interconnectOptions,
  reportOptions,
  supplierOptions,
  type Option,
  type OpticPlanSelection,
  type PlanId,
} from './lib/mission'
import { buildSeoDocument, syncSeoDocument } from './lib/seo'
import { deriveRouteView, normalizePathname, scrollToHashTarget, type RouteView } from './lib/routing'

const defaultPublicAppOrigin = 'https://opticplan.space'
const pagesApiBaseUrl = 'https://my-opticplan.yangdengkui01.workers.dev'

type Billing = 'monthly' | 'annual'

type CheckoutModalState = {
  planId: PlanId
  billing: Billing
  loadingKey: string
  status: 'loading' | 'popup' | 'retry'
  checkoutUrl?: string
}

const plans: Array<{
  id: PlanId
  name: string
  shortName: string
  tagline: string
  monthlyUsd: number
  bullets: string[]
  popular?: boolean
}> = [
  {
    id: 'starter',
    name: 'Modeler',
    shortName: 'Modeler',
    tagline: 'For one AI cluster refresh, early BOM ranges, and a first migration memo.',
    monthlyUsd: 99,
    bullets: ['One active planning workspace', 'Rule and formula estimator', 'CSV export', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Professional',
    shortName: 'Pro',
    tagline: 'The default plan for optical BOM, power, thermal, supplier, and roadmap decisions.',
    monthlyUsd: 199,
    popular: true,
    bullets: ['BOM and power/thermal impact model', 'Supplier comparison library', 'PDF and CSV exports', 'Executive report builder'],
  },
  {
    id: 'desk',
    name: 'Integrator',
    shortName: 'Integrator',
    tagline: 'For integrator teams standardizing multi-site AI data center interconnect programs.',
    monthlyUsd: 299,
    bullets: ['Team seats and client workspaces', 'Reusable migration playbooks', 'Vendor review templates', 'Priority rollout support'],
  },
]

const proofItems = [
  { label: 'Default plan', value: 'Pro', detail: 'Middle tier selected before checkout' },
  { label: 'Annual savings', value: '50%', detail: 'Annual billing is active by default' },
  { label: 'Report range', value: '$499+', detail: 'Single-project reports fit paid advisory work' },
  { label: 'Decision areas', value: '5', detail: 'BOM, power, thermal, suppliers, roadmap' },
]

const workflowCards = [
  {
    title: 'BOM estimates that procurement can challenge',
    body: 'Model optics, cables, switches, NICs, DSP assumptions, spares, support, and exportable line items.',
    icon: <Boxes size={21} />,
  },
  {
    title: 'Power and thermal impact before facilities surprises',
    body: 'Compare copper-heavy, active electrical, and optical options against rack density and cooling headroom.',
    icon: <ThermometerSun size={21} />,
  },
  {
    title: 'Migration roadmap instead of one-off slides',
    body: 'Turn current fabric, target scale-up needs, and procurement constraints into phased readiness gates.',
    icon: <GitBranch size={21} />,
  },
  {
    title: 'Supplier comparison without spreadsheet drift',
    body: 'Keep vendor families, spec assumptions, qualification status, and decision notes in one planning surface.',
    icon: <Building2 size={21} />,
  },
]

const trustLinks = [
  { label: 'OCI guide', href: '/optical-compute-interconnect-oci', icon: <Cpu size={17} /> },
  { label: 'MSA guide', href: '/optical-compute-interconnect-msa', icon: <ShieldCheck size={17} /> },
  { label: 'Data center interconnect', href: '/ai-data-center-interconnect', icon: <Network size={17} /> },
]

function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)
}

function resolveApiBaseUrl() {
  const configured = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/+$/, '')
  if (configured) return configured
  if (window.location.hostname.endsWith('.pages.dev')) return pagesApiBaseUrl
  return ''
}

function resolveApiUrl(path: string) {
  const apiBaseUrl = resolveApiBaseUrl()
  return apiBaseUrl ? `${apiBaseUrl}${path}` : path
}

async function readJsonResponse<T>(response: Response): Promise<T | null> {
  const rawText = await response.text()
  if (!rawText.trim()) return null
  try {
    return JSON.parse(rawText) as T
  } catch {
    return null
  }
}

async function createCheckoutSession(planId: PlanId, billing: Billing) {
  const response = await fetch(resolveApiUrl('/api/checkout'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planId, billing }),
  })

  const payload = await readJsonResponse<{ ok?: boolean; checkoutUrl?: string; error?: string }>(response)
  if (!response.ok || !payload?.ok || !payload.checkoutUrl) {
    throw new Error(payload?.error || 'Checkout could not be started.')
  }

  return payload.checkoutUrl
}

function openCenteredCheckoutWindow() {
  const width = 560
  const height = 760
  const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2))
  const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2))
  const popup = window.open(
    'about:blank',
    'opticplan-checkout',
    `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
  )

  if (popup) {
    try {
      popup.document.title = 'Opening secure checkout'
      popup.document.body.innerHTML =
        '<main style="min-height:100vh;display:grid;place-items:center;background:#0b1220;color:#f8fafc;font-family:ui-sans-serif,system-ui,sans-serif;text-align:center;padding:32px"><div><h1 style="font-size:22px;margin:0 0 8px">Opening secure checkout...</h1><p style="margin:0;color:#cbd5e1">Your OpticPlan payment window is being prepared.</p></div></main>'
    } catch {
      /* Existing named checkout windows can be cross-origin. */
    }
  }

  return popup
}

function sendPopupToCheckout(popup: Window | null, url: string) {
  if (!popup || popup.closed) return false

  try {
    popup.location.replace(url)
    popup.focus()
    return true
  } catch {
    return false
  }
}

function useRouteSignal() {
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const [search, setSearch] = useState(() => window.location.search)

  function navigate(to: string) {
    const url = new URL(to, window.location.origin)
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
    setPathname(url.pathname)
    setSearch(url.search)

    if (url.hash) {
      requestAnimationFrame(() => scrollToHashTarget(url.hash))
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const onPop = () => {
      setPathname(window.location.pathname)
      setSearch(window.location.search)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return { pathname, search, navigate }
}

function CheckoutDoneBridge({ publicAppOrigin }: { publicAppOrigin: string }) {
  useEffect(() => {
    const origin = window.location.origin || new URL(publicAppOrigin).origin

    if (window.parent !== window) {
      window.parent.postMessage({ type: 'opticplan-checkout-complete' }, origin)
      return
    }

    if (window.opener) {
      try {
        window.opener.postMessage({ type: 'opticplan-checkout-complete' }, origin)
      } catch {
        /* The opener may be closed or cross-origin. */
      }
      window.close()
      return
    }

    window.location.replace(`${origin}/?payment=success`)
  }, [publicAppOrigin])

  return (
    <main className="op-main">
      <section className="op-center-panel">
        <p className="op-eyebrow">Checkout</p>
        <h1>Finishing checkout...</h1>
        <p className="op-muted">You will return to the OpticPlan homepage when the hosted payment session closes.</p>
      </section>
    </main>
  )
}

export default function App() {
  const { pathname, search, navigate } = useRouteSignal()
  const routeView: RouteView = useMemo(() => deriveRouteView(pathname), [pathname])
  const normalizedPath = normalizePathname(pathname)
  const keywordPage = useMemo(() => findKeywordPageByPath(pathname), [pathname])

  const [publicAppOrigin, setPublicAppOrigin] = useState(defaultPublicAppOrigin)
  const [headerCompact, setHeaderCompact] = useState(() => window.scrollY > 18)
  const [billing, setBilling] = useState<Billing>('annual')
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>('pro')
  const [selection, setSelection] = useState<OpticPlanSelection>(defaultOpticPlanSelection)
  const [copied, setCopied] = useState(false)
  const [checkoutModal, setCheckoutModal] = useState<CheckoutModalState | null>(null)
  const [checkoutLoadingKey, setCheckoutLoadingKey] = useState<string | null>(null)

  const plan = useMemo(() => analyzeOpticPlanSelection(selection), [selection])

  useEffect(() => {
    const onScroll = () => setHeaderCompact(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const seo = buildSeoDocument({ pathname, routeView, publicAppOrigin, keywordPage })
    syncSeoDocument(seo)
    trackPageView(`${pathname}${search}`)
  }, [keywordPage, pathname, publicAppOrigin, routeView, search])

  useEffect(() => {
    let active = true
    fetch(resolveApiUrl('/api/runtime'))
      .then((response) => readJsonResponse<{ publicAppOrigin?: string }>(response))
      .then((payload) => {
        if (active && payload?.publicAppOrigin) setPublicAppOrigin(payload.publicAppOrigin)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type !== 'opticplan-checkout-complete') return
      setCheckoutModal(null)
      setCheckoutLoadingKey(null)
      trackEvent('checkout_success_return', { provider: 'creem' })
      navigate('/?payment=success')
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [navigate])

  function openPage(path: string) {
    trackEvent('internal_navigation', { target: path })
    navigate(path)
  }

  function updateSelection<K extends keyof OpticPlanSelection>(key: K, value: OpticPlanSelection[K]) {
    setSelection((current) => ({ ...current, [key]: value }))
    trackEvent('planner_change', { field: key, value })
  }

  function renderOptionButtons<K extends keyof OpticPlanSelection>(key: K, options: Option<OpticPlanSelection[K]>[]) {
    return (
      <div className="op-option-grid">
        {options.map((option) => (
          <button
            type="button"
            className="op-option"
            data-active={selection[key] === option.id ? 'true' : 'false'}
            onClick={() => updateSelection(key, option.id)}
            key={option.id}
          >
            <strong>{option.label}</strong>
            <span>{option.summary}</span>
          </button>
        ))}
      </div>
    )
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(plan.briefLines.join('\n'))
      setCopied(true)
      trackEvent('planner_copy', { cluster: selection.cluster, interconnect: selection.interconnect })
      window.setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  async function startHostedCheckout(planId: PlanId, billingCycle: Billing, loadingKey: string) {
    const popup = openCenteredCheckoutWindow()
    setSelectedPlanId(planId)
    setBilling(billingCycle)
    setCheckoutLoadingKey(loadingKey)
    setCheckoutModal({ planId, billing: billingCycle, loadingKey, status: 'loading' })
    trackEvent('checkout_open_start', { planId, billing: billingCycle, popup: Boolean(popup) })

    try {
      const checkoutUrl = await createCheckoutSession(planId, billingCycle)
      const popupReady = sendPopupToCheckout(popup, checkoutUrl)
      trackEvent('checkout_session_created', { planId, billing: billingCycle, popupReady })
      setCheckoutModal({ planId, billing: billingCycle, loadingKey, status: popupReady ? 'popup' : 'retry', checkoutUrl })
    } catch (error) {
      try {
        popup?.close()
      } catch {}
      trackEvent('checkout_session_failed', { planId, billing: billingCycle, message: error instanceof Error ? error.message : 'unknown' })
      setCheckoutModal({ planId, billing: billingCycle, loadingKey, status: 'retry' })
    } finally {
      setCheckoutLoadingKey(null)
    }
  }

  function chooseProAnnual(source: string) {
    setBilling('annual')
    setSelectedPlanId('pro')
    trackEvent('primary_cta_click', { source, planId: 'pro', billing: 'annual' })
    navigate('/pricing#pricing')
  }

  const renderHeader = () => (
    <header className={`op-header${headerCompact ? ' compact' : ''}`}>
      <div className="op-header-inner">
        <a
          className="op-brand"
          href="/"
          onClick={(event) => {
            event.preventDefault()
            openPage('/')
          }}
        >
          <span className="op-brand-mark">
            <Network size={22} />
          </span>
          <span className="op-brand-copy">
            <strong>OpticPlan</strong>
            <span>AI optical interconnect planner</span>
          </span>
        </a>
        <nav className="op-nav" aria-label="Primary navigation">
          <a href="/optical-interconnect-companies" onClick={(event) => { event.preventDefault(); openPage('/optical-interconnect-companies') }}>Companies</a>
          <a href="/optical-compute-interconnect-oci" onClick={(event) => { event.preventDefault(); openPage('/optical-compute-interconnect-oci') }}>OCI</a>
          <a href="/ai-data-center-interconnect" onClick={(event) => { event.preventDefault(); openPage('/ai-data-center-interconnect') }}>Data centers</a>
          <a href="/pricing" onClick={(event) => { event.preventDefault(); openPage('/pricing') }}>Pricing</a>
        </nav>
        <button type="button" className="op-btn op-btn-primary op-header-cta" onClick={() => chooseProAnnual('header')}>
          <Rocket size={18} />
          Choose Pro annual
        </button>
      </div>
    </header>
  )

  const renderPlannerPanel = () => (
    <aside className="op-workspace-panel" id="planner" aria-label="OpticPlan estimator">
      <div className="op-panel-top">
        <div>
          <p className="op-eyebrow">Live planning model</p>
          <h2>{plan.headline}</h2>
        </div>
        <div className="op-score">
          <strong>{plan.fitScore}</strong>
          <span>{plan.fitLabel}</span>
        </div>
      </div>

      <div className="op-choice-stack">
        <section>
          <div className="op-choice-label">AI cluster</div>
          {renderOptionButtons('cluster', clusterOptions)}
        </section>
        <section>
          <div className="op-choice-label">Interconnect path</div>
          {renderOptionButtons('interconnect', interconnectOptions)}
        </section>
        <section className="op-split-options">
          <div>
            <div className="op-choice-label">Adoption pressure</div>
            {renderOptionButtons('adoption', adoptionOptions)}
          </div>
          <div>
            <div className="op-choice-label">Supplier posture</div>
            {renderOptionButtons('supplier', supplierOptions)}
          </div>
        </section>
        <section>
          <div className="op-choice-label">Board deliverable</div>
          {renderOptionButtons('report', reportOptions)}
        </section>
      </div>

      <div className="op-result-grid">
        {plan.modules.map((module) => (
          <article key={module.label}>
            <span>{module.label}</span>
            <strong>{module.detail}</strong>
          </article>
        ))}
      </div>

      <div className="op-config-box">
        <div className="op-config-head">
          <div>
            <p className="op-eyebrow">Generated executive brief</p>
            <h3>{plan.briefTitle}</h3>
          </div>
          <button type="button" className="op-icon-btn" onClick={() => void copyBrief()} aria-label="Copy executive brief">
            <Clipboard size={17} />
          </button>
        </div>
        <pre>{plan.briefLines.join('\n')}</pre>
        {copied ? <span className="op-copy-note">Copied</span> : null}
      </div>

      <div className="op-next-box">
        <div>
          <p className="op-eyebrow">Recommended next move</p>
          <h3>{plan.operatorMessage}</h3>
          <p>{plan.guardrails[0]}</p>
        </div>
        <button type="button" className="op-btn op-btn-primary" onClick={() => chooseProAnnual('planner')}>
          <Play size={18} />
          Review Pro annual
        </button>
      </div>
    </aside>
  )

  const renderPricingSection = (standalone = false) => (
    <section className={`op-section op-pricing-section${standalone ? ' standalone' : ''}`} id="pricing">
      <div className="op-section-head op-pricing-head">
        <div>
          <p className="op-eyebrow">Pricing</p>
          <h2>Professional is selected because most optical interconnect decisions need BOM, thermal, supplier, and board-ready reporting.</h2>
          <p>Annual billing is active by default and is 50% cheaper than paying month to month.</p>
        </div>
        <div className="op-cycle" role="group" aria-label="Billing cycle">
          <button
            type="button"
            data-active={billing === 'monthly' ? 'true' : 'false'}
            onClick={() => {
              setBilling('monthly')
              trackEvent('billing_cycle_change', { billing: 'monthly' })
            }}
          >
            Monthly
          </button>
          <button
            type="button"
            data-active={billing === 'annual' ? 'true' : 'false'}
            onClick={() => {
              setBilling('annual')
              trackEvent('billing_cycle_change', { billing: 'annual' })
            }}
          >
            Annual - 50% off
          </button>
        </div>
      </div>

      <div className="op-plan-grid">
        {plans.map((planItem) => {
          const monthly = billing === 'annual' ? planItem.monthlyUsd * 0.5 : planItem.monthlyUsd
          const strike = billing === 'annual' ? planItem.monthlyUsd : null
          const loadingKey = `plan-${planItem.id}-${billing}`
          const active = selectedPlanId === planItem.id

          return (
            <article className="op-plan-card" data-popular={planItem.popular ? 'true' : 'false'} data-active={active ? 'true' : 'false'} key={planItem.id}>
              {planItem.popular ? <span className="op-plan-badge">Default choice</span> : null}
              <h3>{planItem.name}</h3>
              <p>{planItem.tagline}</p>
              <div className="op-price-line">
                {formatMoney(monthly)}
                <small>/mo</small>
                {strike ? <span>{formatMoney(strike)}</span> : null}
              </div>
              <strong className="op-billing-note">
                {billing === 'annual' ? `${formatMoney(monthly * 12)} billed annually` : 'Billed monthly'}
              </strong>
              <ul>
                {planItem.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Check size={15} />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="op-plan-actions">
                <button
                  type="button"
                  className={planItem.popular ? 'op-btn op-btn-primary' : 'op-btn op-btn-ghost'}
                  onClick={() => void startHostedCheckout(planItem.id, billing, loadingKey)}
                  onMouseEnter={() => setSelectedPlanId(planItem.id)}
                  disabled={checkoutLoadingKey !== null}
                >
                  {checkoutLoadingKey === loadingKey ? 'Opening secure checkout...' : planItem.id === 'pro' ? `Checkout Pro ${billing}` : `Checkout ${planItem.shortName} ${billing}`}
                </button>
                {active ? <span className="op-plan-selected">Selected</span> : null}
              </div>
            </article>
          )
        })}
      </div>

      {standalone ? (
        <div className="op-faq-grid">
          <article>
            <h3>Where do single-project reports fit?</h3>
            <p>Use a one-time report when the team wants a board or investment committee package without a subscription. Typical project reports range from $499 to $1,999 depending on scope.</p>
          </article>
          <article>
            <h3>Why is annual selected?</h3>
            <p>Optical migration decisions usually run across procurement, facilities, network architecture, and finance. Annual pricing lowers the run-rate while the program matures.</p>
          </article>
          <article>
            <h3>Does checkout replace this page?</h3>
            <p>No. Creem opens in a centered popup and the OpticPlan page stays visible behind a blurred overlay.</p>
          </article>
        </div>
      ) : null}
    </section>
  )

  const renderHome = () => {
    const paymentSuccess = new URLSearchParams(search).get('payment') === 'success'

    return (
      <main className="op-main">
        {paymentSuccess ? (
          <section className="op-success-banner">
            <CheckCircle2 size={18} />
            Payment received. OpticPlan onboarding will continue from the email used at checkout.
          </section>
        ) : null}

        <section className="op-hero">
          <div className="op-hero-copy">
            <p className="op-eyebrow">AI optical interconnect planning</p>
            <h1>Estimate the optical interconnect move before the AI cluster budget hardens.</h1>
            <p className="op-lede">
              OpticPlan helps infrastructure, finance, and integration teams model BOM cost, power draw, thermal headroom, supplier options, and a migration roadmap for AI data center optical interconnect programs.
            </p>

            <div className="op-hero-actions">
              <button type="button" className="op-btn op-btn-primary" onClick={() => chooseProAnnual('hero')}>
                <Rocket size={18} />
                Review Pro annual
              </button>
              <button
                type="button"
                className="op-btn op-btn-ghost"
                onClick={() => {
                  trackEvent('planner_review', { source: 'hero-secondary' })
                  navigate('/#planner')
                }}
              >
                <BarChart3 size={18} />
                Tune estimator
              </button>
              <button type="button" className="op-btn op-btn-subtle" onClick={() => openPage('/ai-data-center-interconnect')}>
                <Network size={18} />
                Read buyer guide
              </button>
            </div>
            <p className="op-payment-note">
              <CheckCircle2 size={16} />
              <span>Professional annual selected. Annual saves 50%.</span>
            </p>

            <div className="op-trust-row">
              {trustLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.href}
                  onClick={(event) => {
                    event.preventDefault()
                    openPage(link.href)
                  }}
                >
                  {link.icon}
                  {link.label}
                  <ChevronRight size={13} />
                </a>
              ))}
            </div>

            <div className="op-hero-proof">
              <div>
                <span>First decision</span>
                <strong>Should the next AI fabric stay copper-heavy, move to active optical, or evaluate co-packaged/OCI-style paths?</strong>
              </div>
              <div>
                <span>Buyer outcome</span>
                <strong>Export a planning brief that procurement, facilities, network architecture, and the investment committee can debate.</strong>
              </div>
            </div>
          </div>

          {renderPlannerPanel()}
        </section>

        <section className="op-proof-strip" aria-label="OpticPlan proof points">
          {proofItems.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="op-section op-media-section">
          <div className="op-section-head">
            <p className="op-eyebrow">Planning cockpit</p>
            <h2>Optics decisions convert when the buyer can see cost, facilities, and vendor tradeoffs at once.</h2>
            <p>The first version combines a rules and formula model, a manufacturer specification library, and PDF/CSV export. Later releases add quote collaboration and topology visualization.</p>
          </div>
          <div className="op-media-grid">
            <figure className="op-dashboard-shot">
              <img src="/opticplan-dashboard.png" alt="OpticPlan dashboard showing optical interconnect BOM, power, thermal, supplier, and roadmap planning" />
              <figcaption>OpticPlan planning dashboard mockup for AI optical interconnect programs.</figcaption>
            </figure>
            <div className="op-signal-list">
              <article>
                <FileSpreadsheet size={20} />
                <h3>BOM model</h3>
                <p>Estimate modules, cables, switches, NICs, spares, qualification effort, and exportable line items.</p>
              </article>
              <article>
                <ThermometerSun size={20} />
                <h3>Power and thermal</h3>
                <p>Compare interconnect choices against rack density, cooling margin, and facility readiness.</p>
              </article>
              <article>
                <Landmark size={20} />
                <h3>Investor-ready report</h3>
                <p>Package cost ranges, assumptions, risks, and migration gates for investment committee review.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="op-section">
          <div className="op-section-head">
            <p className="op-eyebrow">Operating model</p>
            <h2>The product is built for the awkward middle between engineering truth and budget approval.</h2>
            <p>OpticPlan does not pretend supplier selection is one number. It makes assumptions visible so expert buyers can challenge them faster.</p>
          </div>

          <div className="op-card-grid">
            {workflowCards.map((card) => (
              <article className="op-card" key={card.title}>
                <div className="op-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        {renderPricingSection(false)}

        <section className="op-section">
          <div className="op-section-head">
            <p className="op-eyebrow">Decision pages</p>
            <h2>Useful references for buyers comparing optical interconnect paths.</h2>
            <p>Each page answers a real procurement, architecture, or executive-readiness question and returns the visitor to a focused checkout path.</p>
          </div>
          <div className="op-guide-grid">
            {[
              ...keywordPages,
              {
                path: '/pricing',
                eyebrow: 'Pricing',
                h1: 'OpticPlan pricing',
                intent: 'Choose Modeler, Professional, or Integrator with Professional annual already selected.',
              },
            ].map((page) => (
              <a
                className="op-guide-card"
                href={page.path}
                key={page.path}
                onClick={(event) => {
                  event.preventDefault()
                  openPage(page.path)
                }}
              >
                <span>{page.eyebrow}</span>
                <strong>{page.h1}</strong>
                <p>{page.intent}</p>
                <ChevronRight size={18} />
              </a>
            ))}
          </div>
        </section>
      </main>
    )
  }

  const renderKeywordPage = (page: KeywordPage) => (
    <main className="op-main">
      <article className="op-article">
        <a
          className="op-back-link"
          href="/"
          onClick={(event) => {
            event.preventDefault()
            navigate('/')
          }}
        >
          <ArrowRight size={16} />
          Back to OpticPlan
        </a>
        <p className="op-eyebrow">{page.eyebrow}</p>
        <h1>{page.h1}</h1>
        <p className="op-lede">{page.lede}</p>
        <div className="op-article-intent">
          <strong>Best for</strong>
          <span>{page.intent}</span>
        </div>

        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section>
          <h2>Common questions</h2>
          <div className="op-faq-list">
            {page.faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="op-article-cta">
          <div>
            <p className="op-eyebrow">Recommended next step</p>
            <h2>Run the planner, then keep Professional annual selected if the assumptions hold.</h2>
            <p>Checkout stays in a centered Creem popup, with annual billing selected by default.</p>
          </div>
          <div className="op-article-cta-actions">
            <button type="button" className="op-btn op-btn-primary" onClick={() => chooseProAnnual(`article-${page.path}`)}>
              <Play size={18} />
              {page.ctaLabel}
            </button>
            <button type="button" className="op-btn op-btn-ghost" onClick={() => navigate('/#planner')}>
              <Zap size={18} />
              Open planner
            </button>
          </div>
        </aside>
      </article>
    </main>
  )

  const renderPricingPage = () => (
    <main className="op-main">
      <section className="op-pricing-page-hero">
        <p className="op-eyebrow">Pricing</p>
        <h1>OpticPlan pricing starts with Professional selected and annual billing already on.</h1>
        <p className="op-lede">
          Modeler is for a bounded first estimate. Professional is the default for serious AI optical interconnect planning. Integrator is for teams standardizing multiple client or site programs.
        </p>
      </section>
      {renderPricingSection(true)}
    </main>
  )

  const renderLegalPage = (title: string, intro: string, sections: LegalSection[]) => (
    <main className="op-main">
      <article className="op-article">
        <p className="op-eyebrow">Legal</p>
        <h1>{title}</h1>
        <p className="op-lede">{intro}</p>
        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
    </main>
  )

  const renderCheckoutModal = () => {
    if (!checkoutModal) return null

    const selectedPlan = plans.find((item) => item.id === checkoutModal.planId) ?? plans[1]
    const monthly = checkoutModal.billing === 'annual' ? selectedPlan.monthlyUsd * 0.5 : selectedPlan.monthlyUsd

    return (
      <div className="op-checkout-backdrop" role="dialog" aria-modal="true" aria-label="Secure checkout status">
        <section className="op-checkout-modal">
          <button
            type="button"
            className="op-checkout-close"
            aria-label="Close checkout status"
            onClick={() => {
              setCheckoutModal(null)
              setCheckoutLoadingKey(null)
              trackEvent('checkout_overlay_closed', { planId: checkoutModal.planId, billing: checkoutModal.billing })
            }}
          >
            <X size={18} />
          </button>
          {checkoutModal.status === 'loading' ? (
            <div className="op-checkout-loading">
              <span aria-hidden />
              <div>
                <h2>Preparing Creem checkout...</h2>
                <p>Professional annual stays selected while the secure payment window opens.</p>
              </div>
            </div>
          ) : (
            <div className="op-checkout-copy">
              <p className="op-eyebrow">Secure checkout</p>
              <h2>{checkoutModal.status === 'popup' ? 'Your Creem payment window is open.' : 'Popup blocked or checkout needs a retry.'}</h2>
              <p>
                {selectedPlan.name} {checkoutModal.billing} is set to {formatMoney(monthly)}/mo
                {checkoutModal.billing === 'annual' ? ' with 50% annual savings.' : '.'}
              </p>
              <div className="op-checkout-actions">
                {checkoutModal.checkoutUrl ? (
                  <button
                    type="button"
                    className="op-btn op-btn-primary"
                    onClick={() => {
                      trackEvent('checkout_focus_click', { planId: checkoutModal.planId, billing: checkoutModal.billing })
                      sendPopupToCheckout(openCenteredCheckoutWindow(), checkoutModal.checkoutUrl || '')
                    }}
                  >
                    <ExternalLink size={18} />
                    Focus checkout
                  </button>
                ) : (
                  <button
                    type="button"
                    className="op-btn op-btn-primary"
                    onClick={() => void startHostedCheckout(checkoutModal.planId, checkoutModal.billing, checkoutModal.loadingKey)}
                  >
                    <ExternalLink size={18} />
                    Retry checkout
                  </button>
                )}
                <button type="button" className="op-btn op-btn-ghost" onClick={() => setCheckoutModal(null)}>
                  Keep reviewing
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    )
  }

  const renderNotFound = () => (
    <main className="op-main">
      <section className="op-center-panel">
        <p className="op-eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="op-muted">That route is not available.</p>
        <button type="button" className="op-btn op-btn-primary" onClick={() => navigate('/')}>
          Return home
        </button>
      </section>
    </main>
  )

  let body: React.ReactNode
  if (routeView === 'home' && normalizedPath === '/') {
    body = renderHome()
  } else if (routeView === 'keyword' && keywordPage) {
    body = renderKeywordPage(keywordPage)
  } else if (routeView === 'pricing') {
    body = renderPricingPage()
  } else if (routeView === 'privacy') {
    body = renderLegalPage('Privacy Policy', 'This policy covers how OpticPlan handles analytics, checkout, and related public-site interactions.', legalPrivacySections)
  } else if (routeView === 'terms') {
    body = renderLegalPage('Terms of Service', 'These terms describe the limits and responsibilities of the OpticPlan site, planner, reports, and hosted payment flow.', legalTermsSections)
  } else if (routeView === 'checkout-done') {
    body = <CheckoutDoneBridge publicAppOrigin={publicAppOrigin} />
  } else {
    body = renderNotFound()
  }

  return (
    <div className="op-shell">
      <div className="op-page-texture" aria-hidden />
      {renderHeader()}
      {body}
      {renderCheckoutModal()}
      <footer className="op-footer">
        <div className="op-footer-inner">
          <span>OpticPlan</span>
          <a
            href="/privacy"
            onClick={(event) => {
              event.preventDefault()
              navigate('/privacy')
            }}
          >
            Privacy
          </a>
          <a
            href="/terms"
            onClick={(event) => {
              event.preventDefault()
              navigate('/terms')
            }}
          >
            Terms
          </a>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="mailto:support@aigeamy.com">support@aigeamy.com</a>
        </div>
      </footer>
    </div>
  )
}
