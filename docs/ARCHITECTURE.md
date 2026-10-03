# Technical Architecture Specification: In-Browser Analytical Engine (v3.0)

**Product Name:** DATA247 (data247.co.in)  
**System Architect & Product Lead:** Vijeta Singh Rajput (Founder & Product Lead | Ex-Product Lead at NEBE)  
**Target Release:** October 2026 (Production Native Engine)  
**Target Infrastructure Cost:** $0.00 / month (100% Client-Side Compute + Vercel Edge Free Tier)  
**Evidence Track:** UK Global Talent Visa — Exceptional Promise (Digital Technology / Software Architecture & Product Leadership)

---
## 1. Executive Architectural Summary

DATA247 v3.0 transitions the platform from a traditional client-server architecture into an **ultra-low-latency, zero-cost, in-browser analytical compute platform**. 

Instead of routing user SQL queries to cloud-hosted databases (which incur high multi-tenant container costs, cold starts, and network roundtrip latency), DATA247 embeds an analytical columnar database engine (**DuckDB-Wasm**) directly inside the user's browser runtime.


---
## 2. Core Architectural Pillars

1. **Zero Compute Overhead ($0.00/mo):** Shifts 100% of analytical calculation to client hardware; server costs remain fixed at zero regardless of active user concurrency.
2. **Main-Thread Decoupling:** Heavy analytical queries (joins, window functions, aggregations) execute in an isolated Web Worker thread, keeping the UI at a constant 60 FPS.
3. **Zero-Copy Memory Serialization:** Query results flow between the Web Worker and the UI using Apache Arrow IPC buffers for sub-millisecond serialization.
4. **Programmatic Search Dominance:** High-speed Next.js dynamic routing (`/sql/[topic]`) statically renders over 200+ syntax permutations with rich JSON-LD metadata for organic developer search traffic.
5. **Privacy-by-Design Compliance:** User queries, uploaded datasets, and analytical transformations never leave the client device, fulfilling DPDP Act 2023 principles by default.

---
## 3. Technology Stack Breakdown

| Layer | Technology | Architectural Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router, Turbopack, React 19) | Server Components for static pre-rendering, edge streaming, and strict routing boundaries. |
| **Language** | TypeScript (Strict Mode) | Type-safe contract definitions between the UI components and the Web Worker RPC bridge. |
| **Compute Engine** | `@duckdb/duckdb-wasm` | Industrial-grade vectorized columnar OLAP engine compiled directly to WebAssembly. |
| **Data Interop** | Apache Arrow (JS/Wasm) | In-memory columnar data structures supporting zero-copy data exchange. |
| **Styling & Design** | Tailwind CSS v3.4+, Lucide React | Zero-runtime CSS tokens with high-contrast dark aesthetic designed for code readability. |
| **Table Virtualization** | TanStack Table v8 | Renders massive result sets (10,000+ records) smoothly by virtualizing DOM node creation. |
| **Client Storage** | Dexie.js (IndexedDB) | Retains query history, personalized bookmarks, and quiz progress entirely on device. |
| **Hosting & Delivery** | Vercel Edge CDN (Hobby Tier) | Global CDN edge distribution with automated static asset compression. |

---
## 4. Web Worker & Wasm Execution Pipeline

### 4.1 Cross-Origin Isolation Configuration
DuckDB-Wasm achieves maximum analytical throughput when backed by multi-threaded SIMD capabilities and `SharedArrayBuffer`. To enable this securely in the user's browser, the server must supply isolated security headers.

These headers are configured in `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },
};

export default nextConfig;
// types/worker.d.ts

export type WorkerRequest = 
  | { type: 'INIT_ENGINE' }
  | { type: 'LOAD_DATASET'; name: string; url: string }
  | { type: 'EXECUTE_QUERY'; queryId: string; sql: string };

export type WorkerResponse = 
  | { type: 'ENGINE_READY' }
  | { type: 'DATASET_LOADED'; name: string; rows: number }
  | { type: 'QUERY_SUCCESS'; queryId: string; columns: string[]; rows: any[]; executionMs: number }
  | { type: 'QUERY_ERROR'; queryId: string; error: string };
[User triggers 'Run Query']
           │
           ▼
[React Hook: useDuckDB] ───► Dispatches { type: 'EXECUTE_QUERY', sql } via postMessage
                                      │
                                      ▼
                        [Web Worker: duckdb.worker.ts]
                        ├─ Parses SQL command
                        ├─ Executes vectorized columnar scan (Wasm)
                        ├─ Extracts Apache Arrow record batches
                        └─ Formats JSON column/row projections
                                      │
                                      ▼
[React Hook: useDuckDB] ◄─── Emits { type: 'QUERY_SUCCESS', rows, executionMs }
           │
           ▼
[TanStack Table Viewport] (Hydrates row objects into virtualized DOM list in < 16ms)

---
```
## 5. Storage & File System Architecture (VFS)

DuckDB-Wasm manages an in-memory Virtual File System (VFS). Static tabular datasets are pre-compiled into lightweight columnar Parquet formats and served over CDN:


### Dataset Hydration Process:
1. When a user selects a practice module or playground dataset, the Web Worker issues a ranged HTTP `fetch()` request for the `.parquet` file.
2. The binary buffer is registered directly into the DuckDB virtual file system using `db.registerFileBuffer()`.
3. The table is mounted instantly as an in-memory SQL table without parsing overhead:
   ```sql
   CREATE VIEW orders AS SELECT * FROM 'ecommerce_orders.parquet';

---

## 6. Programmatic SEO (pSEO) & Dynamic Route Hierarchy

To capture high-intent developer and learner search traffic across India and globally, DATA247 dynamically generates search-optimized landing pages at build time.

### 6.1 Route Permutations
* **Landing Page:** `/` (Conversion-focused hero, live preview, feature overview)
* **Interactive Playground:** `/playground` (Full-screen IDE, dataset switchers, execution telemetry)
* **Syntax Topic Permutations:** `/sql/[topic]` (e.g., `/sql/window-functions`, `/sql/group-by`, `/sql/rank-vs-dense-rank`)
* **Learning Modules:** `/learn/[module]/[topic]` (Bilingual English/Hinglish tabs with embedded video lecture)
* **Interview Preparation:** `/prepare/[round]` (HR, Technical, Behavioral, Managerial guides)
* **Tutor Marketplace:** `/tutors` and `/tutors/[slug]` (Verified profiles, star reviews, 30-min booking modal)

### 6.2 Structured Metadata Automation (JSON-LD)
Every dynamic page programmatically constructs Schema.org `TechArticle` and `SoftwareApplication` entities to secure Google Rich Snippets:

```typescript
// lib/seo/schema.ts
export function generateTopicSchema(topic: { title: string; slug: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: topic.title,
    description: topic.description,
    url: `https://data247.co.in/sql/${topic.slug}`,
    author: {
      '@type': 'Person',
      name: 'Vijeta Singh Rajput',
      jobTitle: 'Product & Technical Lead',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DATA247',
      url: 'https://data247.co.in',
    },
  };
}

---
```
## 7. Security, DPDP Act 2023 & Zero-Trust Sandbox

* **Complete Immunity to Server SQL Injection:** Because SQL execution is 100% confined to the browser's local WebAssembly instance, malicious SQL queries (`DROP TABLE`, `UNION SELECT`) only impact the user's isolated local memory. Backend databases cannot be compromised.
* **Zero Cloud Data Exfiltration:** Learner queries, resume uploads, and image conversions run inside local memory allocations; zero customer PII is transmitted to external servers.
* **Cryptographic Randomness:** Any unique query identifiers or session keys utilize `crypto.randomUUID()` rather than predictable pseudo-random generators.
* **Strict CSP Directives:** Content Security Policies prevent unauthorized script injection and lock Web Worker execution to approved internal bundles.

---
## 8. Non-Functional Requirements & Performance Budgets

* **Core Web Vitals:**
  * **LCP (Largest Contentful Paint):** < 1.1s (via Next.js static asset optimization).
  * **FID / INP (Interaction to Next Paint):** < 50ms (achieved by offloading SQL parsing to Web Worker).
  * **CLS (Cumulative Layout Shift):** 0.00 (stable structural dimensions).
* **Lighthouse Score Targets:** 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO.
* **Memory Constraints:** Max worker memory utilization capped at 150MB; auto-garbage-collected on tab termination.
* **Browser Compatibility:** Chromium 92+, Firefox 90+, Safari 16.4+, and modern Android WebView environments.

---
## 9. Intellectual Property & Copyright Notice

* **Architect & Proprietor:** Vijetasingh Rajput (Founder, DATA247 | Ex-Product Lead at NEBE)
* **Copyright:** © 2026 DATA247. All rights reserved.
* **Proprietary Notice:** All architectural designs, Web Worker synchronization pipelines, data flow specifications, and system integration patterns documented herein are the exclusive intellectual property of Vijeta Singh Rajput.
* **Licensing:** No part of this architectural specification may be reproduced or leveraged for commercial implementations without explicit, prior written consent from the author.
