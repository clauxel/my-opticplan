export type LegalSection = {
  title: string
  paragraphs: string[]
}

export const legalPrivacySections: LegalSection[] = [
  {
    title: 'What we collect',
    paragraphs: [
      'OpticPlan collects only information reasonably needed to operate this website, process checkout, measure page and funnel performance, prevent abuse, and respond to support requests.',
      'This may include page views, referral and UTM data, browser and device information, approximate location derived from network data, checkout metadata, support emails, and information you intentionally submit.',
      'The public planner does not require you to upload passwords, API keys, confidential supplier quotes, regulated personal data, private network diagrams, production credentials, or highly sensitive infrastructure records.',
    ],
  },
  {
    title: 'How we use information',
    paragraphs: [
      'We use analytics to understand which pages, plan choices, and checkout actions help visitors make a confident purchase decision.',
      'We use checkout metadata to create payment sessions, confirm purchases, return users to the homepage, provide onboarding, prevent fraud, handle disputes, and support accounting or legal obligations.',
      'We do not sell personal information. We do not use private data center designs, confidential quotes, credentials, or customer records for model training through this public website because the public website does not collect those materials.',
    ],
  },
  {
    title: 'Service providers',
    paragraphs: [
      'Cloudflare supports hosting, routing, security, analytics infrastructure, and edge execution. Creem supports hosted checkout and payment processing.',
      'Payment details are handled by the payment provider. We do not ask users to send card numbers, passwords, supplier secrets, customer network diagrams, or API keys by email or through this public planner.',
      'Third-party services process information under their own terms and privacy practices. Do not proceed with checkout or external links if you do not accept those practices.',
    ],
  },
  {
    title: 'Security, retention, and deletion',
    paragraphs: [
      'We use reasonable administrative, technical, and organizational safeguards appropriate for a lightweight SaaS marketing, analytics, and checkout site.',
      'No internet service can be guaranteed perfectly secure. Users are responsible for avoiding the submission of secrets, credentials, regulated data, confidential supplier material, or sensitive infrastructure records unless a separate signed agreement says otherwise.',
      'We retain information only as long as reasonably needed for the purposes described here, including support, tax, accounting, fraud prevention, security, dispute handling, and legal compliance.',
    ],
  },
  {
    title: 'Your choices and rights',
    paragraphs: [
      'Depending on your location, you may have rights to request access, correction, deletion, portability, restriction, or objection regarding personal information we control.',
      'California and other privacy laws may provide additional rights when their thresholds and conditions apply. We will not discriminate against users for exercising applicable privacy rights.',
      'To make a privacy or support request, email support@aigeamy.com. We may need to verify the request before acting on it.',
    ],
  },
  {
    title: 'Children, changes, and contact',
    paragraphs: [
      'OpticPlan is intended for business, infrastructure, procurement, engineering, and finance audiences and is not directed to children under 13.',
      'We may update this policy when the product, providers, laws, or operations change. The version posted on this page controls from the time it is published.',
      'Questions about privacy, support, or data handling should be sent to support@aigeamy.com.',
    ],
  },
]

export const legalTermsSections: LegalSection[] = [
  {
    title: 'Acceptance and service scope',
    paragraphs: [
      'By accessing OpticPlan, using the planner, opening checkout, purchasing a plan, requesting a report, or continuing to use the service, you agree to these Terms.',
      'OpticPlan provides a website, optical interconnect planning estimator, pricing flow, hosted checkout, analytics, and related onboarding for AI data center planning workflows.',
      'The service is not a guarantee that any optical interconnect design, supplier, quote, standard, roadmap, migration, data center build, cost estimate, power estimate, thermal estimate, or investment decision will be accurate, available, profitable, compliant, or successful.',
    ],
  },
  {
    title: 'No professional advice',
    paragraphs: [
      'OpticPlan does not provide legal, tax, accounting, engineering, safety, procurement, investment, securities, fiduciary, architectural, facilities, or other professional advice.',
      'All estimates, comparisons, supplier references, roadmap notes, report language, and generated materials are informational planning aids only and must be independently verified by qualified professionals before reliance.',
      'You are solely responsible for your technical review, commercial decisions, supplier negotiations, compliance obligations, safety review, budget approval, implementation, and operating outcomes.',
    ],
  },
  {
    title: 'User responsibilities',
    paragraphs: [
      'You are responsible for the assumptions, inputs, prompts, requirements, topology choices, supplier details, procurement data, credentials, and business decisions you provide, authorize, or rely on.',
      'Do not upload or disclose passwords, private keys, API keys, regulated data, confidential third-party information, export-controlled material, customer network diagrams, sensitive facility records, or data you are not allowed to process.',
      'Any workflow that can affect procurement, facility design, network architecture, budgets, supplier commitments, safety, security, or production infrastructure must be operated with explicit review, qualified human oversight, and independent validation.',
    ],
  },
  {
    title: 'Estimates, AI output, and infrastructure risk',
    paragraphs: [
      'AI-assisted output, rules-based estimates, supplier comparisons, power notes, thermal notes, migration plans, reports, and generated materials may be incomplete, inaccurate, delayed, biased, outdated, insecure, unsuitable, or wrong.',
      'Manufacturer specifications, standards activity, consortium signals, supplier availability, pricing, lead times, data center conditions, and technology roadmaps can change without notice.',
      'You are solely responsible for deciding whether any estimate, checkout, report, supplier comparison, deployment, migration, or operational change is safe, lawful, accurate, and appropriate for your use case.',
    ],
  },
  {
    title: 'Payments, reports, renewals, and refunds',
    paragraphs: [
      'Payments are processed by Creem in a hosted popup window. Successful checkouts return the user to the homepage.',
      'Displayed annual pricing reflects a 50% discount versus the monthly run-rate for the same plan. Prices, plan names, features, report scopes, and availability may change before purchase.',
      'Single-project report pricing may vary by scope and does not create a duty to deliver engineering certification, procurement advice, legal advice, or guaranteed business results unless a separate signed agreement says so.',
      'Unless a separate written agreement says otherwise, purchases are final to the maximum extent permitted by law. If the payment provider, consumer law, or a written policy requires a refund, that required rule controls.',
      'Chargebacks, payment abuse, or attempted circumvention of checkout may result in suspension, cancellation, refusal of service, or preservation of evidence.',
    ],
  },
  {
    title: 'Prohibited use',
    paragraphs: [
      'You may not use OpticPlan to violate law, infringe rights, breach confidentiality duties, evade sanctions, bypass access controls, distribute malware, spam, impersonate others, misrepresent safety or compliance status, or process data without authority.',
      'You may not reverse engineer, overload, interfere with, resell, frame, copy, scrape where prohibited, or exploit the service except as expressly permitted in writing.',
      'We may suspend or terminate access, refuse checkout, preserve evidence, or cooperate with lawful requests when we believe use is unsafe, abusive, fraudulent, infringing, unlawful, or inconsistent with these Terms.',
    ],
  },
  {
    title: 'Third-party services',
    paragraphs: [
      'Cloudflare, Creem, GitHub, AI model providers, suppliers, standards bodies, consortium resources, data providers, infrastructure providers, and other third-party services may be involved in hosting, checkout, references, integrations, or customer workflows.',
      'We are not responsible for third-party services, third-party outages, payment provider decisions, supplier statements, external repositories, standards changes, consortium changes, account bans, rate limits, taxes, procurement costs, or third-party terms.',
      'Your use of third-party services is governed by the applicable third-party terms, privacy policies, account rules, market rules, and fees.',
    ],
  },
  {
    title: 'No warranties',
    paragraphs: [
      'OpticPlan is provided as is and as available. To the maximum extent permitted by law, we disclaim all warranties, whether express, implied, statutory, or otherwise.',
      'We do not warrant uninterrupted service, error-free operation, complete security, merchantability, fitness for a particular purpose, non-infringement, estimate accuracy, supplier availability, standards accuracy, interoperability, cost savings, energy savings, thermal performance, conversion results, or business outcomes.',
      'You use the service at your own risk and remain responsible for backups, testing, review, security, legal compliance, provider bills, procurement decisions, facility decisions, and production outcomes.',
    ],
  },
  {
    title: 'Limitation of liability',
    paragraphs: [
      'To the maximum extent permitted by law, OpticPlan and its operators, affiliates, suppliers, and service providers will not be liable for procurement losses, facility losses, engineering failures, lost profits, lost opportunities, lost data, indirect, incidental, special, consequential, exemplary, or punitive damages.',
      'To the maximum extent permitted by law, total liability for any claim relating to the service is limited to the greater of 100 USD or the amount you paid for OpticPlan in the three months before the event giving rise to the claim.',
      'These limits apply whether the claim is based on contract, tort, negligence, strict liability, statute, warranty, or any other theory, even if a remedy fails of its essential purpose.',
    ],
  },
  {
    title: 'Indemnity',
    paragraphs: [
      'You agree to defend, indemnify, and hold harmless OpticPlan and its operators, affiliates, suppliers, and service providers from claims, damages, liabilities, losses, costs, and fees arising from your use of the service.',
      'This includes claims arising from your data, assumptions, prompts, designs, supplier information, procurement decisions, infrastructure decisions, violation of law, infringement, breach of these Terms, or unauthorized use of credentials or systems.',
    ],
  },
  {
    title: 'Disputes',
    paragraphs: [
      'Before filing a claim, you agree to email support@aigeamy.com and give us 30 days to try to resolve the dispute informally.',
      'To the maximum extent permitted by law, disputes must be resolved individually and not as a class, collective, consolidated, private attorney general, or representative action.',
      'To the maximum extent permitted by law, disputes will be resolved by binding arbitration or the courts with proper jurisdiction for the operator, and you waive jury trial where that waiver is enforceable.',
      'If any part of these dispute terms is unenforceable, the remaining provisions continue to apply to the maximum extent permitted by law.',
    ],
  },
  {
    title: 'Changes, termination, and contact',
    paragraphs: [
      'We may update these Terms, change or discontinue features, refuse transactions, suspend access, or terminate service when reasonably necessary for security, legal, operational, abuse-prevention, regulatory, or business reasons.',
      'If a provision is unenforceable, the rest of these Terms remains effective. A failure to enforce a provision is not a waiver.',
      'Questions, notices, support requests, and dispute notices should be sent to support@aigeamy.com.',
    ],
  },
]
