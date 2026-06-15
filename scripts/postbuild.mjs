import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import ts from 'typescript'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const sourceIndexPath = path.join(distDir, 'index.html')
const keywordSourcePath = path.join(rootDir, 'src', 'content', 'keyword-pages.ts')
const legalSourcePath = path.join(rootDir, 'src', 'content', 'legal.ts')
const origin = 'https://opticplan.space'
const siteName = 'OpticPlan'
const indexNowKey = 'f4d8a6e5c0b4491f8a54a6f6a9d2b3c7'
const defaultTitle = 'OpticPlan | AI Optical Interconnect Planning for Data Center Buyers'
const defaultDescription =
  'OpticPlan helps AI infrastructure teams estimate optical interconnect BOM, power, thermal impact, supplier fit, and migration roadmaps before committing budget.'

const indexablePaths = [
  '/',
  '/optical-interconnect-companies',
  '/optical-compute-interconnect-oci',
  '/ai-interconnect',
  '/optical-interconnects',
  '/optical-compute-interconnect-msa',
  '/ai-interconnect-podcast',
  '/optical-scale-up-consortium',
  '/ai-data-center-interconnect',
  '/pricing',
  '/privacy',
  '/terms',
]

const sourceIndex = await fs.readFile(sourceIndexPath, 'utf8')
const keywordPages = await loadTsExport(keywordSourcePath, 'keywordPages')
const legalPrivacySections = await loadTsExport(legalSourcePath, 'legalPrivacySections')
const legalTermsSections = await loadTsExport(legalSourcePath, 'legalTermsSections')

await writeStaticPage('/', {
  title: defaultTitle,
  description: defaultDescription,
  robots: 'index,follow',
  canonicalPath: '/',
  rootHtml: buildHomePrerender(),
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: siteName,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '49.50',
        highPrice: '149.50',
        availability: 'https://schema.org/InStock',
      },
      description: defaultDescription,
      url: `${origin}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: `${origin}/`,
    },
  ],
})

for (const page of keywordPages) {
  const title = `${page.title} | ${siteName}`
  await writeStaticPage(page.path, {
    title,
    description: page.description,
    robots: 'index,follow',
    canonicalPath: page.path,
    rootHtml: buildKeywordPrerender(page),
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: page.description,
        url: buildCanonicalUrl(page.path),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: page.h1, item: buildCanonicalUrl(page.path) },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  })
}

await writeStaticPage('/pricing', {
  title: 'OpticPlan Pricing | Professional Annual Optical Interconnect Planner',
  description: 'Compare OpticPlan Modeler, Professional, and Integrator plans. Professional annual is selected by default and annual billing is 50% cheaper.',
  robots: 'index,follow',
  canonicalPath: '/pricing',
  rootHtml: buildPricingPrerender(),
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: 'OpticPlan pricing',
      url: buildCanonicalUrl('/pricing'),
    },
  ],
})

await writeStaticPage('/privacy', {
  title: `Privacy | ${siteName}`,
  description: 'How OpticPlan handles analytics, checkout metadata, and public site interactions.',
  robots: 'index,follow',
  canonicalPath: '/privacy',
  rootHtml: buildLegalPrerender('Privacy Policy', 'This policy covers analytics, checkout, and user interactions on the OpticPlan site.', legalPrivacySections),
  structuredData: [],
})

await writeStaticPage('/terms', {
  title: `Terms | ${siteName}`,
  description: 'Terms for using the OpticPlan site, hosted payment flow, planner, and reports.',
  robots: 'index,follow',
  canonicalPath: '/terms',
  rootHtml: buildLegalPrerender('Terms of Service', 'These terms describe the limits and responsibilities of the OpticPlan site.', legalTermsSections),
  structuredData: [],
})

await writeStaticPage('/checkout/done', {
  title: `Checkout | ${siteName}`,
  description: 'Completing your OpticPlan checkout.',
  robots: 'noindex,nofollow',
  canonicalPath: '/checkout/done',
  rootHtml: buildLegalPrerender('Finishing checkout...', 'You will return to the OpticPlan homepage when the hosted payment session closes.'),
  structuredData: [],
})

await fs.writeFile(path.join(distDir, 'sitemap.xml'), buildSitemapXml())
await fs.writeFile(path.join(distDir, 'robots.txt'), buildRobotsTxt())
await fs.writeFile(path.join(distDir, `${indexNowKey}.txt`), indexNowKey)

async function loadTsExport(sourcePath, exportName) {
  const source = await fs.readFile(sourcePath, 'utf8')
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: false,
    },
  })
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled.outputText).toString('base64')}`
  const mod = await import(moduleUrl)
  return mod[exportName]
}

async function writeStaticPage(routePath, page) {
  const html = renderHtml(page)

  if (routePath === '/') {
    await fs.writeFile(sourceIndexPath, html)
    return
  }

  const outputDir = path.join(distDir, routePath.replace(/^\/+/, ''))
  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(path.join(outputDir, 'index.html'), html)
}

function renderHtml({ title, description, robots, canonicalPath, rootHtml, structuredData }) {
  const canonicalUrl = buildCanonicalUrl(canonicalPath)
  let html = sourceIndex
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
  html = upsertMeta(html, 'name', 'description', description)
  html = upsertMeta(html, 'name', 'robots', robots)
  html = upsertMeta(html, 'property', 'og:title', title)
  html = upsertMeta(html, 'property', 'og:description', description)
  html = upsertMeta(html, 'property', 'og:url', canonicalUrl)
  html = upsertMeta(html, 'name', 'twitter:title', title)
  html = upsertMeta(html, 'name', 'twitter:description', description)
  html = upsertCanonical(html, canonicalUrl)
  html = html.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`)

  const graph =
    structuredData.length > 1
      ? { '@context': 'https://schema.org', '@graph': structuredData.map(stripContext) }
      : structuredData[0]

  if (graph) {
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json" id="opticplan-prerender-schema">${JSON.stringify(graph)}</script>\n  </head>`,
    )
  }

  return html
}

function upsertMeta(html, attrName, attrValue, content) {
  const pattern = new RegExp(`<meta(?=[^>]*\\s${attrName}="${escapeRegExp(attrValue)}")[^>]*>`, 's')
  const replacement = `<meta ${attrName}="${escapeAttr(attrValue)}" content="${escapeAttr(content)}" />`
  if (pattern.test(html)) return html.replace(pattern, replacement)
  return html.replace('</head>', `    ${replacement}\n  </head>`)
}

function upsertCanonical(html, href) {
  const replacement = `<link rel="canonical" href="${escapeAttr(href)}" />`
  const pattern = /<link(?=[^>]*\srel="canonical")[^>]*>/s
  if (pattern.test(html)) return html.replace(pattern, replacement)
  return html.replace('</head>', `    ${replacement}\n  </head>`)
}

function stripContext(item) {
  const { '@context': _context, ...rest } = item
  return rest
}

function buildHomePrerender() {
  return `
    <main class="op-main">
      <section class="op-hero" id="planner">
        <div>
          <p class="op-eyebrow">AI optical interconnect planning</p>
          <h1>Estimate the optical interconnect move before the AI cluster budget hardens.</h1>
          <p class="op-lede">OpticPlan models AI optical interconnect BOM, power, thermal impact, supplier comparison, migration roadmap, and investment committee reporting.</p>
          <p><a class="op-btn op-btn-primary" href="/pricing">Choose Professional annual</a></p>
        </div>
      </section>
    </main>
    <footer class="op-footer">
      <div class="op-footer-inner">
        <span>OpticPlan</span>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="mailto:support@aigeamy.com">support@aigeamy.com</a>
      </div>
    </footer>`
}

function buildPricingPrerender() {
  return `
    <main class="op-main">
      <section class="op-pricing-page-hero">
        <p class="op-eyebrow">Pricing</p>
        <h1>OpticPlan pricing starts with Professional selected and annual billing already on.</h1>
        <p class="op-lede">Professional annual is the default path and annual billing is 50% cheaper than the monthly run-rate.</p>
      </section>
    </main>`
}

function buildKeywordPrerender(page) {
  const sections = page.sections
    .map(
      (section) => `
        <section>
          <h2>${escapeHtml(section.heading)}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n')}
          ${section.bullets?.length ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}
        </section>`,
    )
    .join('\n')
  const faqs = page.faqs
    .map((faq) => `<article><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></article>`)
    .join('\n')

  return `
    <main class="op-main">
      <article class="op-article">
        <a href="/">OpticPlan</a>
        <p class="op-eyebrow">${escapeHtml(page.eyebrow)}</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p class="op-lede">${escapeHtml(page.lede)}</p>
        <p>${escapeHtml(page.intent)}</p>
        ${sections}
        <section>
          <h2>Common questions</h2>
          ${faqs}
        </section>
        <p><a class="op-btn op-btn-primary" href="/pricing">${escapeHtml(page.ctaLabel)}</a></p>
      </article>
    </main>`
}

function buildLegalPrerender(title, description, sections = []) {
  const sectionHtml = sections
    .map(
      (section) => `
        <section>
          <h2>${escapeHtml(section.title)}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n')}
        </section>`,
    )
    .join('\n')

  return `
    <main class="op-main">
      <article class="op-article">
        <a href="/">OpticPlan</a>
        <h1>${escapeHtml(title)}</h1>
        <p class="op-lede">${escapeHtml(description)}</p>
        ${sectionHtml}
      </article>
    </main>`
}

function buildSitemapXml() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = indexablePaths
    .map((routePath) => {
      const priority = routePath === '/' ? '1.0' : routePath === '/privacy' || routePath === '/terms' ? '0.4' : routePath === '/pricing' ? '0.9' : '0.78'
      const changefreq = routePath === '/' || routePath === '/pricing' ? 'weekly' : 'monthly'
      return `  <url>
    <loc>${buildCanonicalUrl(routePath)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

function buildRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /checkout/done
Sitemap: ${origin}/sitemap.xml
`
}

function buildCanonicalUrl(routePath) {
  return `${origin}${routePath === '/' ? '/' : `${routePath}/`}`
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#96;')
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
