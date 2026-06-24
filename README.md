# OpticPlan

Conversion-focused SaaS site for `opticplan.space`, built with Vite, React, Cloudflare Workers, Cloudflare Pages, first-party analytics, and Polar hosted checkout.

## What is included

- Interactive first-screen planner for AI optical interconnect BOM, power/thermal impact, supplier posture, and migration roadmap.
- Useful inner pages for optical interconnect companies, OCI, AI InterConnect, optical interconnects, Optical Compute Interconnect MSA, AI InterConnect Podcast, optical scale-up consortium, and AI data center interconnect intent.
- Pricing with Professional annual selected by default and annual billing 50% cheaper than monthly.
- Centered Polar popup checkout that leaves the original page visible behind a blurred overlay.
- Cloudflare Worker API for runtime, analytics, sitemap, robots, IndexNow, and checkout.
- Cloudflare Pages compatible static build and GitHub Actions workflows for automatic Workers and Pages deploys.

## Commands

```bash
npm install
npm run build
npm run cloudflare:deploy
npm run pages:deploy
```

## Payment

The production payment secret is expected as `API_PROD_KEY` in Cloudflare. Do not commit payment keys or account credentials.
