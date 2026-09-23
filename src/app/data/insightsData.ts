export interface InsightSection {
  heading: string;
  body: string[];
  callout?: string;
}

export interface InsightArticle {
  id: string;
  slug: string;
  topicSlug: string;
  category: string;
  subcategory: string;
  readingTime: string;
  publishedDate: string;
  title: string;
  intro: string;
  description: string;
  heroImage: string;
  imageCaption?: string;
  content: {
    summary: string;
    sections: InsightSection[];
    keyPoints: string[];
    takeaway: string;
  };
  relatedArticleSlugs: string[];
}

export interface InsightTopic {
  id: string;
  name: string;
  slug: string;
  sub: string;
  heroTitle: string;
  heroDescription: string;
  subtopics: string[];
  featuredArticleSlug: string;
}

// ── 6 Master Insight Topics (Exact Slugs & Subsections) ───────────────────────
export const INSIGHT_TOPICS: InsightTopic[] = [
  {
    id: "ai",
    name: "AI & Intelligent Automation",
    slug: "ai-intelligent-automation",
    sub: "AI &",
    heroTitle: "AI That Turns Complexity Into Business Value.",
    heroDescription:
      "Explore pragmatic methodologies for implementing production AI agents, cognitive document processing, and adaptive automation pipelines that directly compress operational cycle times.",
    subtopics: [
      "Document Intelligence",
      "Intelligent Workflow Automation",
      "AI Agents",
      "AI-Powered Decision Making",
      "Process Automation",
    ],
    featuredArticleSlug: "document-intelligence",
  },
  {
    id: "engineering",
    name: "Product Engineering",
    slug: "product-engineering",
    sub: "PRODUCT",
    heroTitle: "Engineering Systems Engineered to Endure.",
    heroDescription:
      "Deep dives into high-throughput backend design, resilient microservices, domain-driven architectures, and scalable frontend design systems built for enterprise longevity.",
    subtopics: [
      "Product Strategy",
      "Software Architecture",
      "Application Development",
      "Scalable Platforms",
      "Product Modernization",
    ],
    featuredArticleSlug: "scalable-software",
  },
  {
    id: "enterprise",
    name: "Enterprise Software",
    slug: "enterprise-software",
    sub: "ENTERPRISE",
    heroTitle: "Mission-Critical Software for the Modern Enterprise.",
    heroDescription:
      "How forward-thinking organizations decouple legacy monoliths, orchestrate real-time ERP/CRM integrations, and build secure, compliant transactional systems.",
    subtopics: [
      "Enterprise Applications",
      "Legacy Modernization",
      "Cloud Transformation",
      "ERP & CRM",
      "Enterprise Automation",
    ],
    featuredArticleSlug: "legacy-modernization",
  },
  {
    id: "digital",
    name: "Digital Transformation",
    slug: "digital-transformation",
    sub: "DIGITAL",
    heroTitle: "Navigating Technology Evolution with Certainty.",
    heroDescription:
      "Strategic perspectives on cloud adoption, operational modernization, legacy system replacement, and building adaptable organizational capabilities.",
    subtopics: [
      "Digital Strategy",
      "Cloud Transformation",
      "Process Transformation",
      "Platform Modernization",
      "Operational Excellence",
    ],
    featuredArticleSlug: "digital-strategy",
  },
  {
    id: "data",
    name: "Data & Analytics",
    slug: "data-analytics",
    sub: "DATA",
    heroTitle: "Turning Dispersed Data Into High-Conviction Decisions.",
    heroDescription:
      "Architectural blueprints for streaming telemetry, modern analytical warehouses, governance frameworks, and predictive intelligence layers.",
    subtopics: [
      "Data Engineering",
      "Business Intelligence",
      "Data Platforms",
      "Analytics",
      "Decision Intelligence",
    ],
    featuredArticleSlug: "better-decisions",
  },
  {
    id: "leadership",
    name: "Technology Leadership",
    slug: "technology-leadership",
    sub: "LEADERSHIP",
    heroTitle: "Guiding Technology Strategy from Concept to Scale.",
    heroDescription:
      "Perspectives for CTOs, VPs of Engineering, and product leaders on aligning engineering throughput with board-level commercial outcomes.",
    subtopics: [
      "Technology Strategy",
      "Engineering Leadership",
      "AI Strategy",
      "Innovation",
      "Technology Trends",
    ],
    featuredArticleSlug: "engineering-leadership",
  },
];

// ── Complete Catalog of Editorial Articles ───────────────────────────────────
export const INSIGHT_ARTICLES: InsightArticle[] = [
  // ── AI & Intelligent Automation ──
  {
    id: "art-01",
    slug: "document-intelligence",
    topicSlug: "ai-intelligent-automation",
    category: "AI & Intelligent Automation",
    subcategory: "Document Intelligence",
    readingTime: "6 MIN READ",
    publishedDate: "October 14, 2026",
    title: "The Future of Document Intelligence: From Extraction to Decisions",
    intro:
      "Traditional optical character recognition extracts raw pixels into text, but leaves critical semantic reasoning to humans. Modern multi-modal document intelligence changes the equation entirely.",
    description:
      "Discover how intelligent document pipelines extract tables, understand cross-page context, and execute automated downstream business transactions in seconds.",
    heroImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "Intelligent extraction pipelines combine visual spatial comprehension with semantic reasoning to resolve document bottlenecks.",
    content: {
      summary:
        "Despite decades of digital transformation, unstructured documents—complex financial contracts, regulatory filings, logistics waybills, and invoices—still account for over 70% of enterprise back-office delays. By shifting from brittle template extractors to foundation multi-modal models, organizations can turn static paperwork into verified transaction payloads.",
      sections: [
        {
          heading: "The Fragility of Legacy OCR Systems",
          body: [
            "For twenty years, enterprise document processing relied on zonal OCR and regex scripts. These tools functioned acceptably as long as the document format never varied by a single millimeter.",
            "However, when a vendor updated their invoice header or a scanned PDF arrived with a minor rotation skew, the legacy pipeline failed, dropping the file into an expensive manual exception queue.",
            "This fragility created an invisible operational tax: companies hired large data-entry teams whose primary responsibility was re-typing information that had already been digitized.",
          ],
        },
        {
          heading: "Multi-Modal Reasoning and Spatial Anchoring",
          body: [
            "Modern document intelligence does not view a page as flat text. It evaluates the spatial geometry: the bounding boxes of line items, signatures, stamp authorizations, and footnotes.",
            "By synthesizing visual layout analysis with large language model semantic interpretation, the engine understands that a number appearing in the bottom-right corner beneath 'Net Payable' represents total balance due, even if the label is written in an unfamiliar regional format.",
          ],
          callout:
            "A document is not merely text; it is an organized spatial relationship of trust, authority, and financial obligation.",
        },
        {
          heading: "Moving Beyond Extraction to Direct Execution",
          body: [
            "The real breakthrough occurs when extraction directly bridges into automated workflow execution. Once verified against backend ERP ledgers, the system can automatically authorize payment, flag discrepancies for human review, and update accounting balances without human delay.",
            "At AskJuno, we have implemented pipelines that process multi-page complex logistics dossiers in under 4 seconds with 99.6% zero-shot accuracy.",
          ],
        },
      ],
      keyPoints: [
        "Eliminates rigid coordinate-based templates in favor of semantic field mapping.",
        "Combines spatial vision models with LLM reasoning for nested tables and footnotes.",
        "Implements automated multi-tier validation gates prior to ERP write-back.",
        "Delivers up to 88% reduction in manual document review labor costs.",
      ],
      takeaway:
        "Treating documents as structured data streams rather than passive scanned images unlocks unprecedented straight-through processing rates across enterprise operations.",
    },
    relatedArticleSlugs: [
      "workflow-automation",
      "ai-agents-production",
      "scalable-software",
    ],
  },
  {
    id: "art-02",
    slug: "workflow-automation",
    topicSlug: "ai-intelligent-automation",
    category: "AI & Intelligent Automation",
    subcategory: "Intelligent Workflow Automation",
    readingTime: "5 MIN READ",
    publishedDate: "September 28, 2026",
    title: "Intelligent Workflow Automation: Orchestrating Human-AI Hand-Offs",
    intro:
      "True automation isn't about eliminating human workers—it's about designing deterministic hand-offs between autonomous systems and domain specialists.",
    description:
      "Best practices for building state machines that delegate routine operations to AI while guaranteeing instant escalation for edge cases.",
    heroImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "State-machine architectures enable seamless escalation protocols when confidence intervals dip below strict enterprise thresholds.",
    content: {
      summary:
        "Many AI projects fail when forced into binary extremes: either 100% manual review or 100% autonomous execution. High-reliability operations rely on dynamic confidence gating.",
      sections: [
        {
          heading: "The Fallacy of Binary Automation",
          body: [
            "Pushing an algorithm to handle 99.9% of anomalies incurs exponential cost and risk. In contrast, automating 85% of standard paths and routing the remaining 15% through a high-velocity human-in-the-loop portal delivers optimal ROI within days.",
          ],
        },
        {
          heading: "Telemetry, Auditing, and Rollback",
          body: [
            "Every autonomous step must emit immutable audit events. When unexpected input causes a worker agent to hallucinate, the orchestrator detects deviation and pauses execution before side effects touch production databases.",
          ],
        },
      ],
      keyPoints: [
        "Configurable confidence thresholds for automatic approval vs. human review.",
        "Deterministic audit trails with instant replay and rollback capability.",
        "Reduced cycle time from 48 hours to under 3 minutes for Tier-1 approvals.",
      ],
      takeaway:
        "Orchestration platforms that treat humans as high-value escalation partners achieve significantly higher adoption than brittle 'lights-out' automation attempts.",
    },
    relatedArticleSlugs: [
      "document-intelligence",
      "ai-agents-production",
      "legacy-modernization",
    ],
  },
  {
    id: "art-03",
    slug: "ai-agents-production",
    topicSlug: "ai-intelligent-automation",
    category: "AI & Intelligent Automation",
    subcategory: "AI Agents",
    readingTime: "7 MIN READ",
    publishedDate: "September 12, 2026",
    title: "Deploying Autonomous AI Agents in Mission-Critical Systems",
    intro:
      "Moving generative agents from playground demos into enterprise production requires sandboxed runtimes, strict schema validation, and guardrails.",
    description:
      "How to build reliable autonomous agents with tool-calling limits, self-correcting loops, and cryptographic authentication tokens.",
    heroImage:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "Production agents require deterministic contracts and sandboxed execution boundaries before executing external API mutations.",
    content: {
      summary:
        "Autonomous agents offer immense promise for multi-step reasoning, but enterprise IT leaders rightfully demand guarantees against hallucinated database mutations and cascading failures.",
      sections: [
        {
          heading: "The Four Pillars of Production Agent Safety",
          body: [
            "1. Strongly typed JSON schema constraints on all tool invocations.",
            "2. Read-only permissions during exploratory reasoning phases.",
            "3. Least-privilege ephemeral tokens for mutating calls.",
            "4. Synthetic integration tests evaluating thousands of edge-case conversation forks.",
          ],
        },
      ],
      keyPoints: [
        "Strict JSON schema outputs prevent unbounded generation risks.",
        "Multi-agent supervisor pattern keeps worker tasks compartmentalized.",
        "Comprehensive observability across token consumption and tool latency.",
      ],
      takeaway:
        "Restricting agency through rigorous runtime sandboxes turns volatile LLM reasoning into a reliable, enterprise-grade workhorse.",
    },
    relatedArticleSlugs: [
      "document-intelligence",
      "scalable-software",
      "better-decisions",
    ],
  },

  // ── Product Engineering ──
  {
    id: "art-04",
    slug: "scalable-software",
    topicSlug: "product-engineering",
    category: "Product Engineering",
    subcategory: "Software Architecture",
    readingTime: "8 MIN READ",
    publishedDate: "October 02, 2026",
    title: "Building Scalable Software Beyond Version 1",
    intro:
      "The architectural choices that get an MVP off the ground are almost never the ones that sustain 100x user scale. Here is how modern engineering organizations plan for graceful evolution.",
    description:
      "Architectural patterns for evolving software from rapid prototyping to enterprise-scale resilience, distributed caching, and zero-downtime database migrations.",
    heroImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "Scaling software demands a shift from quick feature delivery to systematic resilience and observable boundary contracts.",
    content: {
      summary:
        "Premature optimization kills agility, but architectural negligence creates technical debt that paralyzes future delivery. The sweet spot lies in modular monoliths with strict domain boundaries that can decompose when traffic inflection points arrive.",
      sections: [
        {
          heading: "Modular Monoliths Before Distributed Microservices",
          body: [
            "Distributed systems introduce network latencies, distributed transaction complexities, and difficult tracing. Starting with clean modular boundaries within a single deployable artifact lets teams iterate fast while isolating future service splits.",
          ],
        },
        {
          heading: "Zero-Downtime Data Migrations",
          body: [
            "As database tables grow beyond tens of millions of rows, naive schema modifications lock tables and cause user outages. Utilizing expand-contract patterns guarantees uninterrupted transactional uptime.",
          ],
        },
      ],
      keyPoints: [
        "Maintain clear domain boundaries within a modular codebase prior to microservice extraction.",
        "Implement expand-and-contract migration patterns for zero-downtime database evolution.",
        "Decouple heavy read-side querying from transactional writes using event sourcing and read models.",
      ],
      takeaway:
        "True engineering scalability is measured not by peak theoretical throughput, but by your team's ability to evolve the codebase without interrupting customer operations.",
    },
    relatedArticleSlugs: [
      "legacy-modernization",
      "document-intelligence",
      "digital-strategy",
    ],
  },
  {
    id: "art-05",
    slug: "application-development-standards",
    topicSlug: "product-engineering",
    category: "Product Engineering",
    subcategory: "Application Development",
    readingTime: "5 MIN READ",
    publishedDate: "September 18, 2026",
    title: "Modern Application Development: Speed Without Compromise",
    intro:
      "How elite engineering teams balance velocity with long-term codebase health using automated pipelines, preview environments, and type safety.",
    description:
      "A deep dive into continuous delivery practices that maintain product craft and sub-second feedback loops across high-growth engineering organizations.",
    heroImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "Automated ephemeral environments allow engineers to validate production realism on every pull request.",
    content: {
      summary:
        "Modern development velocity is not about typing faster—it is about shortening the time between an engineer having an idea and having empirical proof that it works safely in production.",
      sections: [
        {
          heading: "The Power of Ephemeral Preview Environments",
          body: [
            "Spinning up isolated full-stack preview environments on each Git commit gives product managers and QA immediate fidelity, eliminating 'works on my machine' regressions.",
          ],
        },
      ],
      keyPoints: [
        "100% typed contracts across frontend, API, and database boundaries.",
        "Automated performance budgets preventing bundle bloat.",
        "Feature flagging for progressive rollout to test cohort segments.",
      ],
      takeaway:
        "Invest in developer infrastructure: shaving five minutes off a deployment pipeline compounds into thousands of hours saved each quarter.",
    },
    relatedArticleSlugs: [
      "scalable-software",
      "engineering-leadership",
      "better-decisions",
    ],
  },

  // ── Enterprise Software ──
  {
    id: "art-06",
    slug: "legacy-modernization",
    topicSlug: "enterprise-software",
    category: "Enterprise Software",
    subcategory: "Legacy Modernization",
    readingTime: "7 MIN READ",
    publishedDate: "September 24, 2026",
    title: "Modernizing Legacy Systems for Growth",
    intro:
      "The 'rip and replace' fallacy has doomed countless multi-million dollar transformation programs. The Strangulation Fig pattern offers a dependable alternative.",
    description:
      "How leading enterprises incrementally extract domain services from core mainframes and legacy databases without risking daily transactional integrity.",
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "Incremental strangulation patterns divert user traffic to modern cloud microservices without halting the core legacy engine.",
    content: {
      summary:
        "Legacy enterprise systems remain in production because they process billions of dollars of revenue and encode decades of operational edge cases. The solution is not a risky big-bang replacement, but methodical strangulation of discrete capabilities.",
      sections: [
        {
          heading: "The Danger of the Big-Bang Migration",
          body: [
            "Big-bang software rewrites suffer from the 'moving target' syndrome: while the new system is being built over three years, business requirements change, leading to scope creep and eventual cancellation.",
          ],
        },
        {
          heading: "The Strangler Fig Pattern in Action",
          body: [
            "Place an API gateway in front of the legacy system. Intercept specific domain requests (e.g. User Profile or Order Status) and route them to modern microservices while letting old routines handle the remainder.",
          ],
        },
      ],
      keyPoints: [
        "Zero-downtime routing through intelligent reverse proxies.",
        "Bi-directional data sync ensuring database consistency during transition.",
        "Immediate value delivery every 4 to 6 weeks instead of multi-year wait periods.",
      ],
      takeaway:
        "Transforming legacy enterprise technology is an evolutionary discipline, not an event.",
    },
    relatedArticleSlugs: [
      "scalable-software",
      "digital-strategy",
      "better-decisions",
    ],
  },
  {
    id: "art-07",
    slug: "enterprise-applications-integration",
    topicSlug: "enterprise-software",
    category: "Enterprise Software",
    subcategory: "Enterprise Applications",
    readingTime: "6 MIN READ",
    publishedDate: "October 08, 2026",
    title: "Modernizing Enterprise Applications: Unifying ERP and CRM",
    intro:
      "Data silos between SAP, Salesforce, and custom warehouse management systems destroy customer experience. Here is how modern event streams bridge the divide.",
    description:
      "Architectural blueprints for event-driven integration layers that harmonize mission-critical enterprise systems in real time.",
    heroImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "Event-driven middleware standardizes transaction schemas across heterogeneous enterprise software vendors.",
    content: {
      summary:
        "Point-to-point integrations create a brittle 'spaghetti architecture' where changing a single field in one system breaks three others. Event brokers restore sanity.",
      sections: [
        {
          heading: "From Polling APIs to Real-Time Event Streams",
          body: [
            "Batch nightly exports are unacceptable for modern omnichannel commerce. Utilizing event streams allows order status, billing, and inventory changes to propagate across systems in milliseconds.",
          ],
        },
      ],
      keyPoints: [
        "Canonical data models decoupling disparate SaaS applications.",
        "Dead-letter queues and automated reconciliation for failed transactions.",
        "Complete enterprise auditability compliant with SOC2 and ISO27001.",
      ],
      takeaway:
        "A cohesive integration layer transforms fragmented SaaS subscriptions into a unified, responsive enterprise nervous system.",
    },
    relatedArticleSlugs: [
      "legacy-modernization",
      "better-decisions",
      "workflow-automation",
    ],
  },

  // ── Digital Transformation ──
  {
    id: "art-08",
    slug: "digital-strategy",
    topicSlug: "digital-transformation",
    category: "Digital Transformation",
    subcategory: "Digital Strategy",
    readingTime: "7 MIN READ",
    publishedDate: "October 05, 2026",
    title: "Beyond the AI Hype: Finding Real Business Value in Digital Strategy",
    intro:
      "Enterprises that deploy AI without fixing their underlying data architecture and customer touchpoints end up with expensive proofs of concept. Here is how to build digital strategy for lasting impact.",
    description:
      "A pragmatic framework for prioritizing high-impact digital initiatives that lower operating costs while elevating customer lifetime value.",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "High-performing digital programs focus on customer outcome metrics rather than technology novelty.",
    content: {
      summary:
        "Digital transformation is not about adopting every emerging technology buzzword. It is about restructuring how an organization discovers value, ships capabilities, and learns from user feedback.",
      sections: [
        {
          heading: "The Proof-of-Concept Graveyard",
          body: [
            "Over 80% of enterprise AI experiments never graduate to production because they were initiated without a clear business sponsor or an operational integration path.",
          ],
        },
        {
          heading: "Mapping Technology Investments to Unit Economics",
          body: [
            "Every digital initiative must demonstrate a direct link to margin expansion, churn reduction, or operational labor compression before entering full engineering cycles.",
          ],
        },
      ],
      keyPoints: [
        "Tie digital initiatives directly to verifiable unit economic milestones.",
        "Establish cross-functional product squads instead of siloed IT departments.",
        "Prioritize API readiness and data cleanliness before launching generative AI pilots.",
      ],
      takeaway:
        "Lasting digital transformation is 20% technology choice and 80% organizational alignment around customer-centric value streams.",
    },
    relatedArticleSlugs: [
      "legacy-modernization",
      "better-decisions",
      "engineering-leadership",
    ],
  },

  // ── Data & Analytics ──
  {
    id: "art-09",
    slug: "better-decisions",
    topicSlug: "data-analytics",
    category: "Data & Analytics",
    subcategory: "Decision Intelligence",
    readingTime: "6 MIN READ",
    publishedDate: "September 30, 2026",
    title: "Turning Data into Better Decisions",
    intro:
      "Collecting petabytes of customer analytics is useless if line-of-business leaders cannot interpret insights in time to influence customer outcomes.",
    description:
      "Architectural blueprints for modern analytics, transitioning from static historical dashboards to predictive decision intelligence engines.",
    heroImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "Decision intelligence moves beyond static reports by offering contextual, automated operational guidance.",
    content: {
      summary:
        "The era of passive monthly PDF business reports is over. Modern enterprises need live analytical pipelines that evaluate incoming event streams and recommend next-best actions in real time.",
      sections: [
        {
          heading: "The Shift from Descriptive to Prescriptive Intelligence",
          body: [
            "Descriptive analytics tells you that churn increased last month. Prescriptive decision intelligence flags an at-risk customer during a live session and equips account managers with a personalized retention offer.",
          ],
        },
        {
          heading: "Modern Data Stack and Semantic Layers",
          body: [
            "By implementing unified semantic layers across modern cloud warehouses, business units query consistent definitions of core metrics without contradicting interpretations.",
          ],
        },
      ],
      keyPoints: [
        "Unify business metrics in a version-controlled semantic layer.",
        "Deliver sub-second query performance over billions of rows.",
        "Embed predictive insights directly into CRM and operations consoles.",
      ],
      takeaway:
        "Data maturity is not measured by the size of your data lake, but by the speed with which an insight turns into a profitable business action.",
    },
    relatedArticleSlugs: [
      "document-intelligence",
      "digital-strategy",
      "scalable-software",
    ],
  },

  // ── Technology Leadership ──
  {
    id: "art-10",
    slug: "engineering-leadership",
    topicSlug: "technology-leadership",
    category: "Technology Leadership",
    subcategory: "Engineering Leadership",
    readingTime: "7 MIN READ",
    publishedDate: "October 11, 2026",
    title: "The Engineering Leader's Playbook for High-Velocity Teams",
    intro:
      "Scaling an engineering team from 20 to 200 developers often leads to communication gridlock. Here is how modern technology executives preserve startup velocity.",
    description:
      "Actionable strategies for engineering leaders: reducing cognitive load, decoupling team dependencies, and aligning technical milestones with board-level goals.",
    heroImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "High-performance engineering organizations organize around autonomous stream-aligned teams with minimal handoff friction.",
    content: {
      summary:
        "When engineering teams grow, productivity frequently slows due to increased communication overhead and shared code ownership. Structuring teams around Team Topologies restores focus and speed.",
      sections: [
        {
          heading: "Stream-Aligned Teams vs. Siloed Functional Layers",
          body: [
            "Siloed frontend, backend, and QA teams create endless ticketing queues. Cross-functional stream-aligned squads that own a single domain end-to-end deliver features in days rather than months.",
          ],
        },
        {
          heading: "Measuring What Actually Matters: DORA Metrics",
          body: [
            "Avoid vanity metrics like lines of code or commit counts. Focus on Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Mean Time to Recovery.",
          ],
        },
      ],
      keyPoints: [
        "Organize around autonomous stream-aligned teams to minimize cross-team dependencies.",
        "Implement internal developer platforms (IDP) to reduce cognitive load on feature engineers.",
        "Use DORA metrics to measure engineering health and pipeline maturity.",
      ],
      takeaway:
        "The highest-leverage work of an engineering leader is not reviewing code, but designing the organizational and architectural boundaries that make shipping easy.",
    },
    relatedArticleSlugs: [
      "scalable-software",
      "digital-strategy",
      "better-decisions",
    ],
  },
];

// ── Query & Navigation Helpers ────────────────────────────────────────────────
export function getAllTopics(): InsightTopic[] {
  return INSIGHT_TOPICS;
}

export function getTopicBySlug(slug: string): InsightTopic | undefined {
  return INSIGHT_TOPICS.find((t) => t.slug === slug);
}

export function getAllArticles(): InsightArticle[] {
  return INSIGHT_ARTICLES;
}

export function getArticlesByTopic(topicSlug: string): InsightArticle[] {
  return INSIGHT_ARTICLES.filter((a) => a.topicSlug === topicSlug);
}

export function getArticlesBySubcategory(
  topicSlug: string,
  subcategory: string
): InsightArticle[] {
  return INSIGHT_ARTICLES.filter(
    (a) => a.topicSlug === topicSlug && a.subcategory === subcategory
  );
}

export function getArticleBySlug(
  topicSlug: string,
  articleSlug: string
): InsightArticle | undefined {
  return INSIGHT_ARTICLES.find(
    (a) => a.topicSlug === topicSlug && a.slug === articleSlug
  );
}

export function getRelatedArticles(article: InsightArticle): InsightArticle[] {
  const matches = INSIGHT_ARTICLES.filter((a) =>
    article.relatedArticleSlugs.includes(a.slug)
  );
  if (matches.length < 3) {
    const additional = INSIGHT_ARTICLES.filter(
      (a) => a.id !== article.id && !matches.some((m) => m.id === a.id)
    );
    return [...matches, ...additional].slice(0, 3);
  }
  return matches.slice(0, 3);
}

export function getFeaturedArticleForTopic(
  topic: InsightTopic
): InsightArticle | undefined {
  return (
    INSIGHT_ARTICLES.find(
      (a) => a.topicSlug === topic.slug && a.slug === topic.featuredArticleSlug
    ) || INSIGHT_ARTICLES.find((a) => a.topicSlug === topic.slug)
  );
}
