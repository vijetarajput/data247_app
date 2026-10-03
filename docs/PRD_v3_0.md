# Product Requirements Document (PRD) — v3.0 Native Engine
**Product Name:** DATA247 (data247.co.in)  
**Author & Product Lead:** Vijeta Singh Rajput (Founder & Product Lead | Ex-Product Lead at NEBE)  
**Status:** Approved & Ready for Implementation  
**Sprint Window:** October 03 – October 17, 2026 (Rapid 2-Week Launch Sprint)  
**Visa Evidence Track:** UK Global Talent Visa — Exceptional Promise (Digital Technology / Product & Tech Leadership)  
**Cost Model:** Absolute $0.00 / month Infrastructure Footprint (100% Client-Side Wasm + Edge Vercel Free Tier)

---

## 1. Document Control & Revision History

| Version | Release Date | Author | Milestone / Strategic Pivot Summary |
| :--- | :--- | :--- | :--- |
| **v1.0** | May 15, 2026 | Vijeta Singh Rajput | Initial validation: mobile PWA launch on Google Play (TWA), 720+ MCQs, bilingual (English + Hinglish) study PDFs, MobSF SAST audit. |
| **v1.5** | July 02, 2026 | Vijeta Singh Rajput | Web platform launch at data247.co.in, ATS Resume Reviewer (AI), and verified on-demand Tutor Marketplace with INR micro-sessions. |
| **v2.0** | August 20, 2026 | Vijeta Singh Rajput | Scalability review: identified cloud database compute cost bottlenecks; scoped client-side DuckDB-Wasm OLAP sandbox migration. |
| **v2.5** | September 14, 2026 | Vijeta Singh Rajput | Alpha sandbox prototyping: Web Worker thread isolation benchmarks, programmatic route architecture, and JSON-LD schema draft. |
| **v3.0** | October 03, 2026 | Vijeta Singh Rajput | Production native Next.js 15 App Router build: decoupled DuckDB-Wasm engine, zero-cloud execution, pSEO engine, full learning ecosystem. |

---

## 2. Executive Summary & Product Vision

### 2.1 Vision Statement
**data247.co.in** is an ultra-fast, zero-latency in-browser SQL and data analytics workbench designed for aspiring data professionals across India and global emerging markets. The platform eliminates the divide between static syntax documentation and expensive cloud sandboxes by executing industrial-strength analytical queries (DuckDB-Wasm) directly in the user’s browser memory at **$0.00 server cost**.

### 2.2 Core Product Pillars
1. **Zero Infrastructure Cost ($0.00/mo):** Shifts 100% of compute overhead from cloud virtual machines to client-side WebAssembly (Wasm).
2. **Sub-100ms In-Browser Querying:** Direct analytical execution against local memory, Parquet, and CSV files without network roundtrips.
3. **Bilingual Accessibility (English + Hinglish):** Purpose-built curriculum localization ensuring Tier-2, Tier-3, and rural Indian learners master technical concepts without linguistic friction.
4. **Programmatic SEO (pSEO) Capture:** Pre-rendered, indexable dynamic route network (`/sql/[topic]`) with rich Schema.org metadata to capture organic technical search queries.
5. **Integrated Career Progression:** Unifies learning notes, recorded lectures, interactive MCQs, interview guides, and a verified micro-session Tutor Marketplace.

---

## 3. Target Personas & Problem Definition

### 3.1 User Personas

| Persona | Background & Context | Core Pain Point | Desired Product Outcome |
| :--- | :--- | :--- | :--- |
| **Aspirant Data Analyst** *(Tier 2/3 & Rural India)* | College student / non-CS career switcher with low-spec hardware. | Cannot afford paid cloud SQL platforms or high-end laptops; local MySQL/Postgres installs frequently fail. | Instant zero-setup browser sandbox to run real SQL queries and read notes in natural English/Hinglish. |
| **Self-Taught Data Engineer** | 0–2 years experience preparing for tech interviews. | Generic tutorials offer toy datasets with no advanced analytical functions (Window functions, QUALIFY, CTEs). | High-performance sandbox with instant query plans, large sample datasets, and production-grade dialect practice. |
| **Organic Search Visitor** | Searching specific syntax (e.g., *"How to calculate rolling 7-day average in SQL"*). | Static technical blogs provide copy-paste code with no instant environment to test or verify. | Lands on an SEO-indexed page where the exact query and schema are pre-loaded, editable, and runnable in 1 click. |

### 3.2 Critical Market Problems Solved
* **The Compute Cost Trap:** Multi-tenant remote compute sandboxes (Docker on AWS ECS) cost $0.05–$0.20 per compute hour, making free education models commercially unsustainable.
* **The 68% Setup Drop-Off:** Beginners drop off during local environment setup (command-line paths, local servers, permissions).
* **The Language Fluency Barrier:** Traditional data science platforms assume full English fluency, ignoring the reality that millions of Indian learners think and process technical concepts in bilingual Hinglish.

---

## 4. System Architecture & Technical Specifications

### 4.1 Production Technology Stack
* **Framework:** Next.js 15 (App Router, Turbopack, React 19).
* **Styling & Design System:** Tailwind CSS v3.4+, Lucide React, Shadcn/Radix UI tokens.
* **Wasm Analytical Engine:** `@duckdb/duckdb-wasm` managed inside isolated Web Workers.
* **Table Virtualization & Code Editor:** TanStack Table v8 (high-speed data grid) + Monaco Editor / CodeJar.
* **Hosting & Delivery:** Vercel Edge CDN (Hobby Tier, $0.00 operational bill).
* **Local State Persistence:** Browser IndexedDB via Dexie.js (stores user queries, bookmarks, and quiz progress locally).

---

## 5. Functional Scope & Feature Specifications

### 5.1 Bilingual Learning Hub (`/learn/[module]/[topic]`)
* **Dual-Language Tab Architecture:** Seamless toggle between English notes, localized phonetic Hinglish notes, and embedded Hindi video lectures.
* **Modular Curriculum:** Covers foundational to advanced analytical topics across SQL (Fundamentals, Types, Joins, Window Functions) and Python (Basics, Collections, Pandas, NumPy).
* **Inline Live Sandbox:** Side-by-side execution drawer allowing learners to run queries directly against the dataset referenced in the reading material.

### 5.2 Full-Screen SQL & OLAP Playground (`/playground`)
* **Monaco/CodeJar Editor:** Syntax highlighting, auto-complete, query formatting, and error linting.
* **Instant Dataset Hydration:** Pre-configured datasets (E-commerce Transactions, SaaS Subscriptions, RFM Marketing Cohorts) loaded via static Parquet/CSV files.
* **Virtualized Tabular Grid:** High-performance display handling 10,000+ rows in browser memory without UI stutter.
* **Execution Telemetry:** Displays millisecond execution time, rows returned, and memory footprint.

### 5.3 Interactive Practice & MCQ Engine (`/practice/mcq`)
* **720+ Question Repository:** Segmented by track (Data Analyst vs. Data Scientist), topic, and difficulty (Easy, Medium, Hard).
* **Diagnostic Job-Ready Quiz:** 10-question evaluation identifying specific skill gaps with actionable review suggestions.
* **Persistence:** Streaks, bookmarks, and scorecards stored in local IndexedDB.

### 5.4 Career & Interview Preparation Suite (`/prepare`)
* **Structured Interview Guides:** Comprehensive question banks covering HR, Technical, Behavioral, and Managerial rounds.
* **Client-Side ATS Resume Reviewer:** Form-based CV analysis evaluating keyword density, formatting, and role alignment.

### 5.5 Expert Tutor Marketplace (`/tutors` & `/tutors/[slug]`)
* **On-Demand Micro-Sessions:** 30-minute high-leverage booking model starting at accessible pricing (₹150–₹300).
* **LinkedIn Verification:** Standardized profile verification via LinkedIn PDF parsing.
* **Booking-Verified Reviews:** Anti-fraud protection restricting reviews exclusively to learners who completed a paid session.

---

## 6. Programmatic SEO (pSEO) & Schema.org Specification

### 6.1 Route Permutations
* **Pattern:** `/sql/[topic]` (e.g., `/sql/window-functions`, `/sql/group-by`, `/sql/inner-join-vs-left-join`).
* **Static Generation:** Pre-rendered at build time via `generateStaticParams()` to ensure instant search engine indexing.

### 6.2 Structured Metadata (JSON-LD)
Every programmatic page automatically injects Schema.org `TechArticle` and `Course` JSON-LD headers:
```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Mastering SQL Window Functions with DuckDB-Wasm",
  "description": "Learn and execute SQL window functions interactively in your browser with zero setup.",
  "author": {
    "@type": "Person",
    "name": "Vijeta Singh Rajput"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DATA247",
    "url": "https://data247.co.in"
  }
}

## 7. Security, Compliance & DPDP Act 2023 Architecture

* **Zero-Server SQL Processing:** Because query execution occurs inside the client's Web Worker sandbox, database injection attacks (SQLi) against backend infrastructure are physically impossible.
* **Privacy-by-Design:** Image generators (Career Story Maker) and resume parsers execute **100% in-browser via canvas and memory buffers**; user files are never stored remotely.
* **DPDP Act 2023 Compliance:** Transparent data handling, explicit age/consent check-points during account creation, and instant user data purge endpoints.
* **Header Hardening:** Cross-Origin Opener Policy (`COOP: same-origin`) and Cross-Origin Embedder Policy (`COEP: require-corp`) enabled in `next.config.mjs` for safe `SharedArrayBuffer` Wasm execution.

## 8. Two-Week Rapid Implementation Sprint (October 2026)

[Oct 03 - Oct 05] Phase 1: Foundation, Design Tokens, Root Layout & Navigation
[Oct 06 - Oct 08] Phase 2: DuckDB-Wasm Engine & Web Worker Pipeline Integration
[Oct 09 - Oct 11] Phase 3: In-Browser Playground & TanStack Virtualized Table Grid
[Oct 12 - Oct 14] Phase 4: Dynamic Programmatic Routing (/sql/[topic]) & Schema Injection
[Oct 15 - Oct 16] Phase 5: Bilingual Content Hub Integration & Cross-Browser QA
[Oct 17, 2026]    Phase 6: Production Cutover, Vercel Edge Deployment, and Public Tagging

## 9. Non-Functional Requirements & Performance Budgets

* **First Contentful Paint (FCP):** < 0.9 seconds on 4G networks.
* **Lighthouse Performance Score:** > 95 across Performance, Accessibility, Best Practices, and SEO.
* **Wasm Memory Boundary:** Web Worker memory pool capped at 150MB per active tab.
* **Browser Compatibility:** Full support for Chrome 92+, Firefox 90+, Safari 16.4+, and Edge.
* **Codebase Quality:** 100% strict TypeScript types, zero build warnings, and Conventional Commits (`feat:`, `fix:`, `docs:`, `perf:`).

---

## 10. Intellectual Property & Copyright Notice

* **Author & Proprietor:** Vijeta Singh Rajput (Founder, DATA247)
* **Copyright:** © 2026 DATA247. All rights reserved.
* **Proprietary Notice:** All original concepts, architectural frameworks, curriculum designs, bilingual lesson methodologies (English/Hinglish), and database schema designs documented herein are the exclusive intellectual property of Vijeta Singh Rajput. 
* **Licensing:** No part of this specification or repository structure may be replicated, distributed, or modified for commercial purposes without explicit, written authorization from the copyright owner.
