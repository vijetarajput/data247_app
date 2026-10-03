# Technical Architecture Specification: In-Browser Analytical Engine (v3.0)

**Product Name:** DATA247 (data247.co.in)  
**System Architect & Product Lead:** Vijeta Singh Rajput (Founder & Product Lead | Ex-Product Lead at NEBE)  
**Target Release:** October 2026 (Production Native Engine)  
**Infrastructure Model:** High-Performance, Edge-Cached, Client-Side Compute Architecture  
**Document Classification:** Proprietary Commercial Specification / Engineering Blueprint

---
## 1. Executive Architectural Summary

DATA247 v3.0 transitions the platform from a traditional client-server model into an **ultra-low-latency, cost-effective, in-browser analytical compute platform**.

Instead of routing user SQL queries to cloud-hosted databases (which incur high multi-tenant container costs, cold starts, and network roundtrip latency), DATA247 embeds a high-performance analytical columnar database engine (via **WebAssembly**) directly inside the user's browser runtime.


---
## 2. Core Architectural Pillars

1. **Efficient Compute Overhead:** Shifts 100% of analytical calculation to client hardware, ensuring the server-side cost structure remains fixed and scalable regardless of active user concurrency.
2. **Main-Thread Decoupling:** Heavy analytical queries (joins, window functions, aggregations) execute in an isolated Web Worker thread, keeping the UI responsive at a constant 60 FPS.
3. **Zero-Copy Memory Serialization:** Query results flow between the Web Worker and the UI using a columnar data IPC format for sub-millisecond serialization.
4. **Programmatic Search Dominance:** A high-speed dynamic routing strategy (`/sql/[topic]`) statically renders over 200+ syntax permutations with rich JSON-LD metadata for organic developer search traffic.
5. **Privacy-by-Design Compliance:** User queries, uploaded datasets, and analytical transformations never leave the client device, fulfilling modern data privacy (such as India's DPDP Act 2023) principles by default.
   

---
## 3. Technology Stack Breakdown

| Layer | Technology | Architectural Rationale |
| :--- | :--- | :--- |
| **Framework** | Modern Jamstack Framework (App Router, SSR/SSG) | Server Components for static pre-rendering, edge streaming, and strict routing boundaries. |
| **Language** | TypeScript (Strict Mode) | Type-safe contract definitions between the UI components and the Web Worker RPC bridge. |
| **Compute Engine** | High-Performance In-Memory OLAP Engine (Wasm) | Industrial-grade vectorized columnar OLAP engine compiled directly to WebAssembly. |
| **Data Interop** | Columnar Data Interop Layer (Wasm) | In-memory columnar data structures supporting zero-copy data exchange. |
| **Styling & Design** | Utility-First CSS Framework & Icon Set | Zero-runtime CSS tokens with a high-contrast dark aesthetic designed for code readability. |
| **Table Virtualization** | Virtualized Data Grid Component | Renders massive result sets (10,000+ records) smoothly by virtualizing DOM node creation. |
| **Client Storage** | Client-Side IndexedDB Wrapper | Retains query history, personalized bookmarks, and quiz progress entirely on the user's device. |
| **Hosting & Delivery** | Global Edge CDN | Global edge distribution with automated static asset compression for fast delivery. |

---

## 4. Web Worker & Wasm Execution Pipeline

### 4.1 Cross-Origin Isolation Configuration
Maximum analytical throughput is achieved when the compilation pipeline is backed by multi-threaded capabilities and `SharedArrayBuffer`. To enable this securely in the user's browser, the hosting edge node must supply isolated security headers.

These headers are configured in the server routing configurations:
```javascript
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
}

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
[React Hook: useDatabase] ───► Dispatches { type: 'EXECUTE_QUERY', sql } via postMessage
                                      │
                                      ▼
                        [Web Worker: engine.worker.ts]
                        ├─ Parses SQL command
                        ├─ Executes vectorized columnar scan (Wasm)
                        ├─ Extracts binary record batches
                        └─ Formats JSON column/row projections
                                      │
                                      ▼
[React Hook: useDatabase] ◄─── Emits { type: 'QUERY_SUCCESS', rows, executionMs }
           │
           ▼
[Virtualized Table Viewport] (Hydrates row objects into virtualized DOM list in < 16ms)

---
```
## 5. Storage & File System Architecture (VFS)

The local engine manages an in-memory Virtual File System (VFS). Static tabular datasets are pre-compiled into lightweight columnar binary formats and served over edge nodes:

### Dataset Hydration Process:
1. When a user selects a practice module or playground dataset, the Web Worker issues a ranged HTTP `fetch()` request for the dataset file.
2. The binary buffer is registered directly into the engine's virtual file system.
3. The table is mounted instantly as an in-memory SQL table without parsing overhead:
   ```sql
   CREATE VIEW orders AS SELECT * FROM 'ecommerce_orders.bin';

---

## 6. Search-Engine Optimization & Dynamic Route Hierarchy

To capture high-intent developer and learner search traffic, DATA247 dynamically generates search-optimized landing pages at build time.

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
* **Strict Content Security Policy (CSP):** Content Security Policies prevent unauthorized script injection and lock Web Worker execution to approved internal bundles.

---

## 8. Non-Functional Requirements & Performance Budgets

* **Core Web Vitals:**
  * **LCP (Largest Contentful Paint):** < 1.1s (via static asset pipeline optimization).
  * **FID / INP (Interaction to Next Paint):** < 50ms (achieved by offloading heavy parsing to the isolated Web Worker).
  * **CLS (Cumulative Layout Shift):** 0.00 (stable structural dimensions).
* **Lighthouse Score Targets:** 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO.
* **Memory Constraints:** Max worker memory utilization capped at 150MB; auto-garbage-collected on tab termination.
* **Browser Compatibility:** Modern engines supporting WebAssembly, Web Workers, and indexed database frameworks.

---

## 9. Intellectual Property & Copyright Notice

* **Architect & Proprietor:** Vijeta Singh Rajput (Founder, DATA247 | Ex-Product Lead at NEBE)
* **Copyright:** © 2026 DATA247. All rights reserved.
* **Proprietary Notice:** All architectural designs, Web Worker synchronization pipelines, data flow specifications, proprietary code compilation strategies, and system integration patterns documented herein are the exclusive intellectual property of Vijeta Singh Rajput.
* **Licensing:** Strict proprietary licensing is enforced. No part of this architectural specification or repository code may be reproduced, reverse-engineered, or leveraged for commercial implementations without explicit, prior written consent and execution of a non-disclosure agreement with the author.

