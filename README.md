# Bridgewater Roofer — Website & Digital Platform

> **Bridgewater Roofer** (`bridgewaterroofer.com`) is a high-performance, enterprise-grade static web platform for a licensed and insured residential and commercial roofing contractor based in **Bridgewater, Somerset County, New Jersey**.

---

## Table of Contents

1. [Project Overview & Business Profile](#project-overview--business-profile)
2. [Key Architecture & Technology Stack](#key-architecture--technology-stack)
3. [Repository Directory Map](#repository-directory-map)
4. [Design System & CSS Architecture](#design-system--css-architecture)
5. [Client-Side JavaScript Modules](#client-side-javascript-modules)
6. [Global Layout & Templating Sync](#global-layout--templating-sync)
7. [Comprehensive Page Directory](#comprehensive-page-directory)
   - [Core Brand & Hub Pages](#1-core-brand--hub-pages)
   - [Roofing Service Silos](#2-roofing-service-silos-10-pages)
   - [Somerset County Location Silos](#3-somerset-county-location-silos-10-pages)
   - [Knowledge Base & Technical Guides](#4-knowledge-base--technical-guides-8-articles)
   - [Legal & Utility Pages](#5-legal--utility-pages)
8. [SEO, Structured Data & Search Engine Discovery](#seo-structured-data--search-engine-discovery)
   - [Schema.org JSON-LD Graph](#schemaorg-json-ld-graph)
   - [IndexNow Instant Search Submission](#indexnow-instant-search-submission)
   - [LLM & AI Agent Compatibility (`llms.txt`)](#llm--ai-agent-compatibility-llmstxt)
9. [Development, Validation & Build Tooling](#development-validation--build-tooling)
10. [Local Development Setup](#local-development-setup)
11. [Production Deployment Guide](#production-deployment-guide)

---

## Project Overview & Business Profile

Bridgewater Roofer delivers top-tier steep-slope residential roofing, low-slope commercial flat roofing, emergency leak isolation, storm damage mitigation, and full roof replacements across Central New Jersey.

### Business Metadata (NAP & Compliance)

| Field | Official Value |
|---|---|
| **Business Name** | Bridgewater Roofer |
| **Physical Address** | 400 Commons Way, Bridgewater, NJ 08807 |
| **Direct Phone** | [(908) 465-9944](tel:+19084659944) |
| **Email** | [service@bridgewaterroofer.com](mailto:service@bridgewaterroofer.com) |
| **Website** | [https://bridgewaterroofer.com](https://bridgewaterroofer.com) |
| **NJ Contractor License** | NJ Home Improvement Contractor (HIC) #13VH09876500 |
| **Commercial Liability Insurance** | $2,000,000 Aggregate Coverage |
| **Workers' Compensation** | 100% Statutory NJ Compliance |
| **Primary Operating Hours** | Monday – Saturday: 7:00 AM – 6:00 PM |
| **Emergency Coverage** | 24/7 Rapid Response for Active Leaks & Storm Damage |
| **Manufacturer Certifications** | GAF Factory-Certified, CertainTeed Master Craftsman, Carlisle SynTec Authorized |

---

## Key Architecture & Technology Stack

- **Zero-Dependency Static Engine**: Built purely on standard **HTML5**, **Modern CSS3** (Custom Properties, Flexbox, Grid, container queries), and **Modular JavaScript (ES6+)**. No heavy client-side frameworks, ensuring near-instant Time to First Byte (TTFB), 0ms hydration lag, and perfect Core Web Vitals (LCP, FID/INP, CLS).
- **Master Component Sync Engine**: Headers, mobile drawers, trust bars, footers, phone pills, and floating action buttons are maintained in single master template partials (`components/`) and synced across 45+ static HTML documents using an automated Node.js sync utility.
- **Micro-Interaction & Conversion Optimization**:
  - Sticky header with scroll-based elevation and progress bar.
  - Interactive roofing cost calculator with real-time square footage and material cost estimation.
  - Before/after interactive roof transformation image slider.
  - Dynamic FAQ accordion elements with ARIA accessibility.
  - Click-to-call phone tracking across all touchpoints with source telemetry.
- **Advanced Local SEO & Authority Silos**:
  - 10 dedicated Roofing Service pages targeting Somerset County search intents.
  - 10 dedicated Municipal Location pages targeting towns within a 15-mile radius.
  - 8 comprehensive educational articles addressing New Jersey Uniform Construction Code (UCC) permitting, material comparisons, and storm damage checklists.
  - Validated Schema.org JSON-LD graphs on 100% of pages (`RoofingContractor`, `BreadcrumbList`, `AboutPage`, `FAQPage`, `Article`, `Service`).
  - IndexNow integration for automated instant indexing on Bing, Yandex, and participating search engines.
  - Standardized `llms.txt` file for consumption by modern AI search engines and LLM crawlers.

---

## Repository Directory Map

```text
Bridgewater-Roofer/
├── .agents/                               # Custom agent rules and configurations
├── 404/                                   # Friendly 404 page directory
│   └── index.html
├── 404.html                               # Root 404 fallback
├── about/                                 # About Us company hub
│   └── index.html
├── assets/                                # Media and graphic assets
│   ├── icons/                             # SVG iconography
│   └── images/                            # Optimized JPG & SVG imagery (60+ assets)
├── authors/                               # Author and leadership profile silos
│   └── mark-henderson/
│       └── index.html
├── blog/                                  # Knowledge base & technical guides
│   ├── asphalt-shingles-vs-metal-roofing/
│   │   └── index.html
│   ├── bridgewater-roofing-permit-guide/
│   │   └── index.html
│   ├── how-long-does-a-roof-last-in-nj/
│   │   └── index.html
│   ├── roof-repair-vs-replacement/
│   │   └── index.html
│   ├── roof-replacement-cost-bridgewater-nj/
│   │   └── index.html
│   ├── tpo-vs-epdm-roofing/
│   │   └── index.html
│   ├── what-causes-roof-leaks/
│   │   └── index.html
│   ├── what-to-check-after-a-nj-storm/
│   │   └── index.html
│   └── index.html                         # Blog index / Resources hub
├── commercial-roofing-bridgewater-nj/      # Service: Commercial Roofing
│   └── index.html
├── components/                            # Global master template partials
│   ├── site-footer.html                   # Master footer, mobile call pill & legal dialog
│   └── site-header.html                   # Master header, navigation mega-menu & mobile drawer
├── contact/                               # Contact & estimate request hub
│   └── index.html
├── css/                                   # Modular CSS design system
│   ├── base.css                           # Reset, typography, utility classes
│   ├── blog-page.css                      # Article layout, table of contents, author cards
│   ├── components.css                     # Buttons, cards, badges, pills, dialogs
│   ├── inner-page.css                     # Breadcrumbs and hero banners for subpages
│   ├── location-page.css                  # Municipal town pages styling & geo grids
│   ├── responsive.css                     # Global media queries & mobile adjustments
│   ├── sections.css                       # Homepage sections (heroes, grids, reviews)
│   ├── service-page.css                   # Service silo layouts, spec tables, feature grids
│   └── variables.css                      # CSS custom properties (colors, spacing, shadows)
├── editorial-policy/                      # Publishing & editorial integrity statement
│   └── index.html
├── emergency-roof-repair-bridgewater-nj/  # Service: Emergency 24/7 Roofing
│   └── index.html
├── flat-roofing-bridgewater-nj/           # Service: Flat & Low-Slope Roofing
│   └── index.html
├── index.html                             # Homepage
├── js/                                    # Client-side JavaScript modules
│   ├── animations.js                      # IntersectionObserver reveal animations
│   ├── blog-page.js                       # Reading time, scroll progress, table of contents
│   ├── interactive.js                     # Cost estimator, sliders, accordions, modals
│   ├── location-page.js                   # Interactive map trigger and local town accordions
│   ├── main.js                            # Primary bootstrap entry point
│   ├── navigation.js                      # Sticky header, hamburger menu, mega-menus
│   ├── service-page.js                    # Service-specific tabs and interactive widgets
│   └── tracker.js                         # Telemetry, click-to-call logging & conversions
├── llms.txt                               # LLM & AI agent discovery manifest
├── metal-roofing-bridgewater-nj/          # Service: Standing Seam Metal Roofing
│   └── index.html
├── privacy-policy/                        # Privacy policy compliance
│   └── index.html
├── projects/                              # Showcase of completed local projects
│   └── index.html
├── README.md                              # This comprehensive project documentation
├── residential-roofing-bridgewater-nj/    # Service: Residential Shingle Roofing
│   └── index.html
├── reviews/                               # Verified customer reviews & ratings
│   └── index.html
├── robots.txt                             # Web crawler control instructions
├── roof-inspection-bridgewater-nj/        # Service: 21-Point Roof Inspection
│   └── index.html
├── roof-leak-repair-bridgewater-nj/       # Service: Roof Leak Detection & Repair
│   └── index.html
├── roof-repair-bridgewater-nj/            # Service: Roof Repair
│   └── index.html
├── roof-replacement-bridgewater-nj/       # Service: Full Roof Replacement
│   └── index.html
├── roofing-cost/                          # Roofing Cost Guide & Estimator
│   └── index.html
├── roofing-materials/                     # Architectural materials guide
│   └── index.html
├── roofing-services/                      # Comprehensive services hub
│   └── index.html
├── scripts/                               # Node.js automation and validation scripts
│   ├── audit-links.cjs                    # 100% internal link verification audit
│   ├── embed-map.cjs                      # Somerset County Google Map embed updater
│   ├── sync-global-layout.cjs             # Synchronizes master header/footer to all pages
│   └── validate-pages.cjs                 # Validates H1s, metadata, Schema JSON, and assets
├── server.cjs                             # Lightweight local HTTP preview server
├── service-area/                          # Regional service area hub & 10 town silos
│   ├── roofer-basking-ridge-nj/
│   │   └── index.html
│   ├── roofer-bedminster-nj/
│   │   └── index.html
│   ├── roofer-bound-brook-nj/
│   │   └── index.html
│   ├── roofer-branchburg-nj/
│   │   └── index.html
│   ├── roofer-hillsborough-nj/
│   │   └── index.html
│   ├── roofer-manville-nj/
│   │   └── index.html
│   ├── roofer-martinsville-nj/
│   │   └── index.html
│   ├── roofer-raritan-nj/
│   │   └── index.html
│   ├── roofer-somerville-nj/
│   │   └── index.html
│   ├── roofer-warren-nj/
│   │   └── index.html
│   └── index.html                         # Service area directory hub
├── sitemap.xml                            # Search engine XML sitemap with 35+ URLs
├── storm-damage-roof-repair-bridgewater-nj/ # Service: Storm & Wind Damage Repair
│   └── index.html
├── submit-indexnow.cjs                    # IndexNow submission tool for Bing / Yandex
├── terms/                                 # Terms of service
│   └── index.html
└── thank-you/                             # Contact form conversion confirmation
    └── index.html
```

---

## Design System & CSS Architecture

The stylesheet architecture relies on CSS Custom Properties defined in [`css/variables.css`](file:///d:/Bridgewater-Roofer/css/variables.css) to enforce consistent colors, typography, elevations, and responsive breakpoints across all pages without requiring a CSS compiler or external preprocessor.

### Color Tokens

- **Brand Dark Navy (`--color-navy`)**: `#0f172a` (Primary structural backdrop)
- **Deep Slate Surface (`--color-slate-900`)**: `#0b1329`
- **Surface Elevation (`--color-surface-card`)**: `#132338` (Card backdrops, accordions)
- **Border Accent (`--color-border`)**: `#1e3a5f`
- **Primary Safety Amber / Orange (`--color-orange-500`)**: `#f97316` (Primary action button, badges)
- **Orange Hover (`--color-orange-600`)**: `#ea580c`
- **Accent Blue (`--color-blue-400`)**: `#38bdf8` (Informational accents, badges)
- **Success Green (`--color-green-400`)**: `#4ade80` (Warranties, verified checkmarks)
- **Text Headings (`--color-text-heading`)**: `#ffffff` (Pure white)
- **Text Body (`--color-text-body`)**: `#cbd5e1` (High-contrast slate gray)
- **Text Muted (`--color-text-muted`)**: `#94a3b8`

### Typography Hierarchy

- **Display & Headings**: `'Outfit', sans-serif` (Weights: 600, 700, 800, 900)
- **Body & UI Elements**: `'Plus Jakarta Sans', sans-serif` (Weights: 400, 500, 600, 700)
- Fonts are loaded with `preconnect` directives to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` for rapid zero-CLS rendering.

### Modular Breakdown

| File | Primary Responsibility |
|---|---|
| [`css/variables.css`](file:///d:/Bridgewater-Roofer/css/variables.css) | Core tokens: color palette, font stacks, container widths, transition timings, z-index layers. |
| [`css/base.css`](file:///d:/Bridgewater-Roofer/css/base.css) | Modern reset, font smoothing, base body typography, skip-to-content accessibility link. |
| [`css/components.css`](file:///d:/Bridgewater-Roofer/css/components.css) | Primary/outline buttons, phone pills, badges, trust cards, modal dialogs, and drawer navigation. |
| [`css/sections.css`](file:///d:/Bridgewater-Roofer/css/sections.css) | Hero sections, service grids, before/after slider container, interactive calculator layout, review grids. |
| [`css/service-page.css`](file:///d:/Bridgewater-Roofer/css/service-page.css) | Service-specific layouts: specification callouts, warranty cards, 5-step process timeline, technical tables. |
| [`css/location-page.css`](file:///d:/Bridgewater-Roofer/css/location-page.css) | Geographic silo pages: municipal trust badges, neighborhood service maps, local weather challenges, local permit guides. |
| [`css/blog-page.css`](file:///d:/Bridgewater-Roofer/css/blog-page.css) | Editorial layouts: sticky table of contents, author bio callout, key takeaway cards, code/table blocks. |
| [`css/inner-page.css`](file:///d:/Bridgewater-Roofer/css/inner-page.css) | Breadcrumb trails, page header titles, and category badge styling. |
| [`css/responsive.css`](file:///d:/Bridgewater-Roofer/css/responsive.css) | Responsive viewport rules, mobile sticky bottom action bar, and fluid typography. |

---

## Client-Side JavaScript Modules

All scripts use vanilla ES6+ modules (`type="module"`) without external runtime libraries like jQuery or React, maintaining zero dependencies and high execution speed.

1. **[`js/main.js`](file:///d:/Bridgewater-Roofer/js/main.js)**: Central entry point that coordinates module loading and checks DOM readiness.
2. **[`js/navigation.js`](file:///d:/Bridgewater-Roofer/js/navigation.js)**:
   - Controls mobile hamburger drawer with smooth slide transitions and backdrop locking (`aria-expanded`, `aria-hidden`).
   - Manages top scroll progress indicator bar (`#scrollProgress`).
   - Sticky header elevation transitions when scrolling past threshold.
   - Accessible desktop mega-menu interactions with hover and keyboard focus listeners.
3. **[`js/interactive.js`](file:///d:/Bridgewater-Roofer/js/interactive.js)**:
   - **Roofing Cost Calculator**: Calculates instant cost ranges based on home square footage, pitch multiplier, tear-off layers, and selected material (Architectural Shingle, Metal, Flat TPO).
   - **Before/After Image Comparison Slider**: Touch and drag listener allowing users to drag a split bar to compare damaged roofs vs. newly completed installations.
   - **FAQ Accordion Controls**: Handles single and multi-panel accordion toggling with animated height calculation.
   - **Quote / Consultation Modal Dialogs**: Traps focus inside active modals, handles Escape key exit, and prevents background scrolling.
4. **[`js/animations.js`](file:///d:/Bridgewater-Roofer/js/animations.js)**:
   - Implements `IntersectionObserver` to trigger fade-in, slide-up, and scale-up transitions on scroll without scroll-jacking.
   - Animates numerical counters (e.g., "25+ Years Experience", "1,850+ Roofs Completed", "5.0 Rating").
5. **[`js/service-page.js`](file:///d:/Bridgewater-Roofer/js/service-page.js)** & **[`js/location-page.js`](file:///d:/Bridgewater-Roofer/js/location-page.js)**:
   - Contextual scripts that enhance local page interactions, town-specific FAQ accordions, and map interactions.
6. **[`js/blog-page.js`](file:///d:/Bridgewater-Roofer/js/blog-page.js)**:
   - Dynamically calculates reading time based on word count.
   - Highlights active headings in the floating sticky Table of Contents based on viewport intersection.
7. **[`js/tracker.js`](file:///d:/Bridgewater-Roofer/js/tracker.js)**:
   - Telemetry utility that intercepts clicks on `tel:+19084659944` and estimate request buttons.
   - Attaches `data-call-source` (e.g., `header`, `mega-menu`, `sticky-footer`, `hero-cta`) to track the exact conversion origin.

---

## Global Layout & Templating Sync

Because this site is built purely on static HTML files for maximum search engine indexability and performance, the header and footer are centralized inside master files in the [`components/`](file:///d:/Bridgewater-Roofer/components/) directory:

- [`components/site-header.html`](file:///d:/Bridgewater-Roofer/components/site-header.html): Top trust bar, desktop navigation with mega-menu dropdowns, phone CTA button, mobile drawer backdrop, and mobile slide-in menu.
- [`components/site-footer.html`](file:///d:/Bridgewater-Roofer/components/site-footer.html): 5-column responsive footer, license disclaimer, municipal service links, floating desktop call pill, mobile sticky action bar, and legal dialog.

### Synchronizing Global Changes

When modifying the navigation menu, contact phone number, address, or footer links, you do not need to manually edit 45+ files. Simply run the sync script:

```bash
node scripts/sync-global-layout.cjs
```

This utility automatically walks the directory tree, locates `<main id="main-content">`, and injects the updated header and footer components across every `.html` document while preserving page-specific meta tags, titles, schemas, and main content.

---

## Comprehensive Page Directory

### 1. Core Brand & Hub Pages

| Page Path | Target URL | Primary Function & Focus |
|---|---|---|
| [`index.html`](file:///d:/Bridgewater-Roofer/index.html) | `/` | Main homepage, hero section, interactive cost calculator, before/after slider, trust badges, verified reviews, and service overview. |
| [`about/index.html`](file:///d:/Bridgewater-Roofer/about/index.html) | `/about/` | Company history, executive leadership (Anthony DeMatteo, Mark Henderson, Dave Collins), licensing, and craftsmanship standards. |
| [`roofing-services/index.html`](file:///d:/Bridgewater-Roofer/roofing-services/index.html) | `/roofing-services/` | Central service hub indexing all residential, commercial, repair, and inspection specialties. |
| [`roofing-materials/index.html`](file:///d:/Bridgewater-Roofer/roofing-materials/index.html) | `/roofing-materials/` | Deep comparison of architectural shingles, standing seam metal, flat TPO/EPDM membranes, and cedar shakes. |
| [`roofing-cost/index.html`](file:///d:/Bridgewater-Roofer/roofing-cost/index.html) | `/roofing-cost/` | Transparent New Jersey roofing price guides, square footage cost ranges, and financing options. |
| [`projects/index.html`](file:///d:/Bridgewater-Roofer/projects/index.html) | `/projects/` | Photo gallery and technical case studies of completed Somerset County roofing projects. |
| [`reviews/index.html`](file:///d:/Bridgewater-Roofer/reviews/index.html) | `/reviews/` | 5-star customer testimonials, Google ratings verification, and homeowner feedback. |
| [`contact/index.html`](file:///d:/Bridgewater-Roofer/contact/index.html) | `/contact/` | Contact details, phone call CTAs, appointment scheduling, and estimate request form. |
| [`service-area/index.html`](file:///d:/Bridgewater-Roofer/service-area/index.html) | `/service-area/` | Regional Somerset County hub outlining all covered towns and dispatch boundaries. |
| [`authors/mark-henderson/index.html`](file:///d:/Bridgewater-Roofer/authors/mark-henderson/index.html) | `/authors/mark-henderson/` | Author credentials, technical background, and articles authored by Senior Estimator Mark Henderson. |

### 2. Roofing Service Silos (10 Pages)

| Page Path | Target URL | Primary Service Focus |
|---|---|---|
| [`roof-repair-bridgewater-nj/index.html`](file:///d:/Bridgewater-Roofer/roof-repair-bridgewater-nj/index.html) | `/roof-repair-bridgewater-nj/` | Targeted shingle replacement, flashing resealing, pipe boot repairs, and ridge cap restoration. |
| [`roof-replacement-bridgewater-nj/index.html`](file:///d:/Bridgewater-Roofer/roof-replacement-bridgewater-nj/index.html) | `/roof-replacement-bridgewater-nj/` | Full tear-off, deck inspection, ice barrier installation, and 50-year warranty shingle systems. |
| [`roof-leak-repair-bridgewater-nj/index.html`](file:///d:/Bridgewater-Roofer/roof-leak-repair-bridgewater-nj/index.html) | `/roof-leak-repair-bridgewater-nj/` | Moisture meter detection, hidden ceiling leak tracing, chimney flashing and valley repairs. |
| [`emergency-roof-repair-bridgewater-nj/index.html`](file:///d:/Bridgewater-Roofer/emergency-roof-repair-bridgewater-nj/index.html) | `/emergency-roof-repair-bridgewater-nj/` | 24/7 rapid emergency dispatch, severe storm tarping, fallen tree limb protection, active water containment. |
| [`storm-damage-roof-repair-bridgewater-nj/index.html`](file:///d:/Bridgewater-Roofer/storm-damage-roof-repair-bridgewater-nj/index.html) | `/storm-damage-roof-repair-bridgewater-nj/` | Hail impact diagnostics, high-wind shingle blowout repairs, insurance claims documentation. |
| [`residential-roofing-bridgewater-nj/index.html`](file:///d:/Bridgewater-Roofer/residential-roofing-bridgewater-nj/index.html) | `/residential-roofing-bridgewater-nj/` | Complete residential steep-slope roofing, ventilation balancing, and lifetime architectural shingles. |
| [`commercial-roofing-bridgewater-nj/index.html`](file:///d:/Bridgewater-Roofer/commercial-roofing-bridgewater-nj/index.html) | `/commercial-roofing-bridgewater-nj/` | Commercial flat roofing, office complexes, shopping centers, warehouse membranes, preventative maintenance. |
| [`roof-inspection-bridgewater-nj/index.html`](file:///d:/Bridgewater-Roofer/roof-inspection-bridgewater-nj/index.html) | `/roof-inspection-bridgewater-nj/` | 21-point comprehensive roof health audit, real estate buyer/seller certifications, thermal imaging. |
| [`metal-roofing-bridgewater-nj/index.html`](file:///d:/Bridgewater-Roofer/metal-roofing-bridgewater-nj/index.html) | `/metal-roofing-bridgewater-nj/` | Standing seam metal roofing, concealed fastener systems, 50+ year lifespans, energy efficiency. |
| [`flat-roofing-bridgewater-nj/index.html`](file:///d:/Bridgewater-Roofer/flat-roofing-bridgewater-nj/index.html) | `/flat-roofing-bridgewater-nj/` | TPO, EPDM, and modified bitumen installations, scupper/drain clearing, low-slope ponding fixes. |

### 3. Somerset County Location Silos (10 Pages)

Dedicated municipal landing pages tailored to local architectural styles, tree cover, and municipal building codes:

1. **Somerville, NJ**: [`service-area/roofer-somerville-nj/index.html`](file:///d:/Bridgewater-Roofer/service-area/roofer-somerville-nj/index.html) — Historic Victorian & Queen Anne flashing and steep slope repairs.
2. **Raritan, NJ**: [`service-area/roofer-raritan-nj/index.html`](file:///d:/Bridgewater-Roofer/service-area/roofer-raritan-nj/index.html) — Residential Cape Cod, colonial, and multi-family re-roofing.
3. **Martinsville, NJ**: [`service-area/roofer-martinsville-nj/index.html`](file:///d:/Bridgewater-Roofer/service-area/roofer-martinsville-nj/index.html) — Watchung Mountain tree cover, heavy shade moss mitigation, luxury homes.
4. **Bound Brook, NJ**: [`service-area/roofer-bound-brook-nj/index.html`](file:///d:/Bridgewater-Roofer/service-area/roofer-bound-brook-nj/index.html) — Raritan River basin moisture protection, storm drainage, gutter integration.
5. **Hillsborough, NJ**: [`service-area/roofer-hillsborough-nj/index.html`](file:///d:/Bridgewater-Roofer/service-area/roofer-hillsborough-nj/index.html) — Large suburban subdivisions, architectural upgrades, estate replacements.
6. **Warren, NJ**: [`service-area/roofer-warren-nj/index.html`](file:///d:/Bridgewater-Roofer/service-area/roofer-warren-nj/index.html) — Custom luxury estates, high-wind ridge engineering, premium slate/metal alternatives.
7. **Basking Ridge, NJ**: [`service-area/roofer-basking-ridge-nj/index.html`](file:///d:/Bridgewater-Roofer/service-area/roofer-basking-ridge-nj/index.html) — Historic district architectural guidelines, cedar shake replacements, Bernards Township code compliance.
8. **Branchburg, NJ**: [`service-area/roofer-branchburg-nj/index.html`](file:///d:/Bridgewater-Roofer/service-area/roofer-branchburg-nj/index.html) — Rural and suburban custom residences, farm outbuildings, commercial roofing.
9. **Bedminster, NJ**: [`service-area/roofer-bedminster-nj/index.html`](file:///d:/Bridgewater-Roofer/service-area/roofer-bedminster-nj/index.html) — Equestrian properties, luxury estates, specialty copper valley flashing.
10. **Manville, NJ**: [`service-area/roofer-manville-nj/index.html`](file:///d:/Bridgewater-Roofer/service-area/roofer-manville-nj/index.html) — Cost-effective shingle replacements, ice shield retrofits, rapid leak repairs.

### 4. Knowledge Base & Technical Guides (8 Articles)

In-depth technical guides authored to capture top-of-funnel informational traffic and build E-E-A-T:

- **Roof Repair vs Replacement**: [`blog/roof-repair-vs-replacement/index.html`](file:///d:/Bridgewater-Roofer/blog/roof-repair-vs-replacement/index.html) — Explains the 50% rule, remaining shingle life, and cost economics.
- **What Causes Roof Leaks**: [`blog/what-causes-roof-leaks/index.html`](file:///d:/Bridgewater-Roofer/blog/what-causes-roof-leaks/index.html) — Detailed breakdown of pipe boots, step flashing failure, valleys, and nail pops.
- **Roof Replacement Cost in Bridgewater, NJ**: [`blog/roof-replacement-cost-bridgewater-nj/index.html`](file:///d:/Bridgewater-Roofer/blog/roof-replacement-cost-bridgewater-nj/index.html) — Realistic pricing tables ($8,500 – $22,000+) based on house size and materials.
- **Bridgewater Roofing Permit Guide**: [`blog/bridgewater-roofing-permit-guide/index.html`](file:///d:/Bridgewater-Roofer/blog/bridgewater-roofing-permit-guide/index.html) — Step-by-step walkthrough of New Jersey UCC filing with the Bridgewater Township Code Enforcement Department.
- **Asphalt Shingles vs Metal Roofing**: [`blog/asphalt-shingles-vs-metal-roofing/index.html`](file:///d:/Bridgewater-Roofer/blog/asphalt-shingles-vs-metal-roofing/index.html) — Upfront cost vs. 50-year lifecycle ROI, snow shedding, and wind ratings.
- **What to Check After a NJ Storm**: [`blog/what-to-check-after-a-nj-storm/index.html`](file:///d:/Bridgewater-Roofer/blog/what-to-check-after-a-nj-storm/index.html) — Ground-level inspection guide, attic moisture checks, and insurance filing tips.
- **How Long Does a Roof Last in NJ**: [`blog/how-long-does-a-roof-last-in-nj/index.html`](file:///d:/Bridgewater-Roofer/blog/how-long-does-a-roof-last-in-nj/index.html) — Weather impacts (freeze-thaw, humidity, coastal wind) on 3-tab, architectural, and metal roofs.
- **TPO vs EPDM Commercial Roofing**: [`blog/tpo-vs-epdm-roofing/index.html`](file:///d:/Bridgewater-Roofer/blog/tpo-vs-epdm-roofing/index.html) — Heat-welded white reflective seams vs. black synthetic rubber membranes.

### 5. Legal & Utility Pages

- **Editorial Policy**: [`editorial-policy/index.html`](file:///d:/Bridgewater-Roofer/editorial-policy/index.html) — Facts-checking standards, expert authorship, and commercial disclosures.
- **Privacy Policy**: [`privacy-policy/index.html`](file:///d:/Bridgewater-Roofer/privacy-policy/index.html) — User data protection and contact form confidentiality.
- **Terms of Service**: [`terms/index.html`](file:///d:/Bridgewater-Roofer/terms/index.html) — Website usage, estimate disclaimers, and warranty terms.
- **Thank You Page**: [`thank-you/index.html`](file:///d:/Bridgewater-Roofer/thank-you/index.html) — Conversion confirmation page for form submissions.
- **404 Error Page**: [`404.html`](file:///d:/Bridgewater-Roofer/404.html) & [`404/index.html`](file:///d:/Bridgewater-Roofer/404/index.html) — Helpful custom 404 page with navigation links back to active services.

---

## SEO, Structured Data & Search Engine Discovery

### Schema.org JSON-LD Graph

Every page contains Schema.org structured data embedded in `<script type="application/ld+json">` tags, validated against Schema specifications:

- **`RoofingContractor`**: Outlines brand name, phone (`+19084659944`), physical address (`400 Commons Way, Bridgewater, NJ`), geographic coordinates (`40.5961, -74.6000`), opening hours, and array of 11 served Somerset County municipalities.
- **`AboutPage`**: Company credentials and organizational identity.
- **`BreadcrumbList`**: Full breadcrumb hierarchy facilitating rich snippet navigation in Google search results.
- **`Article`**: Structured blog posts including author references (`Mark Henderson`), publishing dates, and technical categories.
- **`FAQPage`**: Accordion FAQs marked up to generate expandable rich results on SERPs.

### IndexNow Instant Search Submission

The site is configured for the **IndexNow protocol**, allowing immediate notifications to Microsoft Bing, Yandex, and other search engines when pages are updated.

- **Verification Key File**: [`2dfab80f52863e8a8b4a5c8f76a0f6d5.txt`](file:///d:/Bridgewater-Roofer/2dfab80f52863e8a8b4a5c8f76a0f6d5.txt)
- **Submitter Script**: [`submit-indexnow.cjs`](file:///d:/Bridgewater-Roofer/submit-indexnow.cjs)

To submit recently updated URLs to IndexNow:

```bash
node submit-indexnow.cjs
```

### LLM & AI Agent Compatibility (`llms.txt`)

This platform implements the **`llms.txt` standard** via [`llms.txt`](file:///d:/Bridgewater-Roofer/llms.txt) in the root directory. This provides LLM agents (ChatGPT, Claude, Perplexity, Gemini) with a clean, machine-readable summary of company capabilities, direct emergency phone lines, coverage boundaries, and deep links to relevant services and technical resources.

---

## Development, Validation & Build Tooling

The [`scripts/`](file:///d:/Bridgewater-Roofer/scripts/) folder contains Node.js CLI tools to maintain project hygiene and prevent broken links or missing assets:

### 1. Internal Link Integrity Audit

Scans all 45+ static HTML documents, extracts every internal relative and root-relative `href`, resolves the destination file on disk, and flags any 404s:

```bash
node scripts/audit-links.cjs
```
*Current Status: 100% clean across all pages.*

### 2. Page Structure & SEO Validation

Inspects H1 heading counts, `<title>` tags, meta descriptions, Schema JSON-LD validity, phone CTA formatting, and validates that every referenced image and CSS stylesheet exists on disk:

```bash
node scripts/validate-pages.cjs
```

To validate specific pages:
```bash
node scripts/validate-pages.cjs roof-repair-bridgewater-nj/index.html about/index.html
```

### 3. Global Layout Sync

Propagates changes from [`components/site-header.html`](file:///d:/Bridgewater-Roofer/components/site-header.html) and [`components/site-footer.html`](file:///d:/Bridgewater-Roofer/components/site-footer.html) across all pages:

```bash
node scripts/sync-global-layout.cjs
```

### 4. Vector Asset Generators

- [`generate_rich_assets.cjs`](file:///d:/Bridgewater-Roofer/generate_rich_assets.cjs): Generates optimized SVG illustrations for roof leaks, flashing, and commercial applications.
- [`generate_slider_assets.cjs`](file:///d:/Bridgewater-Roofer/generate_slider_assets.cjs): Generates high-detail before-and-after comparison vectors for the interactive homepage slider.

---

## Local Development Setup

No complex build pipeline, bundler, or package installation is required. Node.js (v16+) is all that is needed to run the local server.

### 1. Start the Local Server

Run the built-in HTTP server:

```bash
node server.cjs
```

### 2. Access the Application

Open your browser and navigate to:
```text
http://localhost:8080/
```

The server serves all `.html`, `.css`, `.js`, `.svg`, `.webp`, `.jpg`, and `.png` assets with appropriate MIME types and headers.

---

## Production Deployment Guide

Because Bridgewater Roofer is a pre-rendered static site, it can be deployed to any modern static hosting provider or web server:

### Option A: Traditional Web Hosting (Hostinger / cPanel / Apache / Nginx)

1. Upload the entire contents of the project folder directly to the `public_html/` root.
2. Ensure directory indexing or index fallbacks (`DirectoryIndex index.html`) are enabled.
3. Configure clean URL rewrites if desired (or leave trailing-slash directory structures, which work natively out of the box).
4. Verify SSL/TLS certificate activation (HTTPS).

### Option B: Cloudflare Pages / Vercel / Netlify

1. Connect the Git repository to the platform.
2. **Build Command**: Leave blank (no build step required).
3. **Output Directory**: `.` (root directory).
4. Ensure the custom domain `bridgewaterroofer.com` is configured with DNS records pointing to your provider.

---

## Contact & Support

For technical inquiries regarding the website codebase or digital infrastructure:

- **Technical Inquiries**: [service@bridgewaterroofer.com](mailto:service@bridgewaterroofer.com)
- **Direct Contractor Phone**: [(908) 465-9944](tel:+19084659944)
- **Headquarters**: 400 Commons Way, Bridgewater, NJ 08807
- **Official Website**: [https://bridgewaterroofer.com](https://bridgewaterroofer.com)
