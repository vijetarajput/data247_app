# Design System & UI Specifications (v3.0)

**Product Name:** DATA247 (data247.co.in)  
**Author & Product Lead:** Vijetasingh Rajput (Founder & Product Lead | Ex-Product Lead at NEBE)  
**Target Release:** October 2026 (Production Native Engine)  
**Document Classification:** Proprietary Commercial Specification / Design Tokens  

---

## 1. Visual Identity & High-Contrast Aesthetic

DATA247 employs an ultra-modern, high-contrast **Dark Terminal Aesthetic** engineered to support long study sessions, query execution, and code analysis without ocular fatigue.

The color hierarchy relies on deep charcoal bases, slate card surfaces, high-contrast typography, and functional accent signals (sky blue for interaction, emerald for success/validation, crimson for errors).

---

## 2. Design Tokens & Core Variables

### 2.1 Tailwind CSS Color Palette Tokens

```typescript
const colors = {
  // Foundational Canvas
  background: "#09090b",       // Deep Charcoal Base
  foreground: "#fafafa",       // High-Contrast Off-White Text
  card: {
    DEFAULT: "#121214",        // Elevated Slate Surface
    foreground: "#fafafa"      // Primary Card Text
  },
  border: "#202023",           // Subtle Divider Borders

  // Functional Accents & States
  accent: {
    primary: "#38bdf8",        // Electric Sky Blue (Interactive Elements & Highlights)
    secondary: "#10b981",      // Emerald Green (Execution Success & Progress Indicators)
    destructive: "#ef4444"     // Crimson Red (Syntax Error & Validation Warnings)
  },

  // Supporting Typography Tokens
  muted: {
    DEFAULT: "#a1a1aa",        // Muted Gray (Secondary Labels & Metadata)
    foreground: "#27272a"      // Deep Slate Surface
  }
}
```

### 2.2 Typography Scale

- **Primary Interface Font:** `Inter, system-ui, -apple-system, sans-serif`  
  Calibrated for high readability across dense dashboards, curriculum directories, and quiz modules.
- **Code & Monospace Font:** `SF Mono, JetBrains Mono, monospace`  
  Applied across code editors, SQL input drawers, tabular data headers, and execution telemetry readouts.

---

## 3. Structural Layouts & User Experience Blueprints

### 3.1 Dual-Panel Interactive Analytical Workbench (`/playground`)

Optimized for horizontal dual-pane work on desktop, gracefully collapsing into a tabbed vertical stack on mobile viewports.

```text
+-----------------------------------------------------------------------------+
|  DATA247  |  [DA Track]  |  [DS Track]  |  *Playground*  |  [Tutors]        |
+-----------------------------------------------------------------------------+
|  DATASET: [E-commerce Transactions.bin] | RUN (Ctrl+Enter)  | TIME: 14ms    |
+-----------------------------------------------------------------------------+
|  IN-BROWSER IDE PANEL (Left Column)     | TABULAR DATA GRID (Right Column)  |
|  SELECT customer_id, SUM(sales)         | | customer_id | sales |           |
|  FROM orders                            | | ----------- | ----- |           |
|  GROUP BY 1                             | | #100293     | 4,200 |           |
|  ORDER BY 2 DESC LIMIT 100;             | | #209384     | 2,150 |           |
+-----------------------------------------------------------------------------+
|  CONSOLE LOGGER (Bottom Bar): Query complete. 2 rows returned. Memory: 14MB |
+-----------------------------------------------------------------------------+
```

### 3.2 Bilingual Study Hub Layout (`/learn/[track]/[module]`)

Designed for simultaneous dual-language technical concept assimilation across both Data Analytics and Data Science tracks.

```text
+-----------------------------------------------------------------------------+
|                                                                             |
|  +--------------------+  +-----------------------------------------------+  |
|  | CURRICULUM TREE    |  | TOPIC TITLE: Star Schema vs. Snowflake Schema |  |
|  |                    |  +-----------------------------------------------+  |
|  | [DA Track]         |  | [ View: ENGLISH ]  |  * View: HINGLISH *      |  |
|  | - Advanced Excel   |  +-----------------------------------------------+  |
|  | - SQL Analytics    |  | Hinglish Notes:                               |  |
|  | - Power BI & DAX   |  | "Star Schema me ek Central Fact Table hoti    |  |
|  | - Business Stats   |  |  hai jo direct Dimension Tables se connected  |  |
|  | - Python Analytics |  |  hoti hai (denormalized format)."             |  |
|  |                    |  +-----------------------------------------------+  |
|  | [DS Track]         |  | INLINE CODE LAB / RUNNER:                     |  |
|  | - Python Core      |  | [Run Query Against Sample Dataset]            |  |
|  | - Math & Inference |  +-----------------------------------------------+  |
|  | - EDA & Features   |                                                     |
|  | - Machine Learning |                                                     |
|  +--------------------+                                                     |
|                                                                             |
+-----------------------------------------------------------------------------+
```

### 3.3 Learner Experience & Video Review Layout (`/` Landing Page)

An interactive, high-trust testimonial section on the landing page showing verified student proof, localized text reviews, and native browser video reels.

```text
+-----------------------------------------------------------------------------------------+
| LANDING PAGE: "Learner Stories & Reviews" Section                                      |
+-----------------------------------------------------------------------------------------+
| [ "Share Your Story" Button ] ---> Opens Review Submission Modal                        |
|                                                                                         |
|  +---------------------------+  +---------------------------+  +---------------------+  |
|  | VIDEO TESTIMONIAL CARD    |  | TEXT REVIEW CARD          |  | VIDEO TESTIMONIAL   |  |
|  | [▶ Play 45s Story]        |  | ⭐⭐⭐⭐⭐                |  | [▶ Play 30s Story]  |  |
|  | "Hinglish notes made SQL  |  | "Cracked Data Analyst     |  | "Wasm sandbox runs  |  |
|  | window functions so easy" |  | interview in 6 weeks."    |  | without laptop lag" |  |
|  | — Priya S., Indore        |  | — Rahul K., Patna         |  | — Ankit M., Jaipur  |  |
|  | [Verified Learner Badge]  |  | [Verified Learner Badge]  |  | [Verified Badge]    |  |
|  +---------------------------+  +---------------------------+  +---------------------+  |
+-----------------------------------------------------------------------------------------+
```

---

## 4. Interaction States & Motion Guidelines

- **Button States & Transitions:**
  - Interactive controls apply `transition-all duration-200 ease-in-out`.
  - Focused interactive elements display an `accent-primary` (`#38bdf8`) border with a subtle 2px glow ring.
- **Bilingual Switcher:**
  - Zero-latency language switching without full page reload, preserving user scroll positions.
- **Virtualized Grid Scrolling:**
  - Employs DOM virtual recycling to maintain a constant 60 FPS scrolling rate across 10,000+ data records.

---

## 5. Security & Privacy UI Safeguards

- **Client Memory Processing Indicators:**
  - When analyzing files or generating visual story assets, the UI displays an explicit security badge:
    > "Processed 100% locally in browser memory. No data is transmitted to external servers."
- **XSS Sanitization:**
  - All rendered Markdown text and code samples pass through an in-browser sanitizer to eliminate script injection vectors.

---

## 6. Intellectual Property & Copyright Notice

- **Author & Proprietor:** Vijetasingh Rajput (Founder, DATA247 | Ex-Product Lead at NEBE)
- **Copyright:** © 2026 DATA247. All rights reserved.
- **Proprietary Notice:** All UI designs, wireframe specifications, bilingual component architectures, and design tokens documented herein are the exclusive intellectual property of Vijetasingh Rajput.
- **Licensing:** Strict proprietary licensing is enforced. Unauthorized reproduction, distribution, or commercial reuse of these design specifications without prior written consent is strictly prohibited.
