# Personal Portfolio Website — Design Spec

## Overview

Single-page scrollable portfolio for Ainesh Mohan, targeting SWE and AI Engineer roles. Designed to be shown to recruiters and people at conferences. The site communicates: "This person is passionate about AI, creates things with AI, and iterates on systems and agents."

## Visual Identity

### Style: Warm + Bento Hybrid

- **Background:** Off-white `#FAFAF8`
- **Text colors:** `#1C1917` (primary), `#57534E` (body), `#78716C` (muted), `#A8A29E` (labels)
- **Dark accent:** `#292524` (buttons, dark bento cards)
- **Project card accent:** Blue-to-purple gradient (`#2563EB` → `#7C3AED`)
- **Borders:** `#E7E5E4`
- **Card backgrounds:** `#FFFFFF`

### Typography

- **Headings / Name:** Playfair Display (serif) — weights 400, 600, 700
- **Body / Nav / UI:** Inter (sans-serif) — weights 300, 400, 500, 600
- **Font loading:** Use `next/font/google` (avoids layout shift, self-hosted)

### Buttons

- **Primary:** Dark `#292524` background, off-white text, pill-shaped (`border-radius: 99px`)
- **Secondary:** Outlined with `#D6D3D1` border, pill-shaped

### Navigation

- Floating pill-shaped bar at top
- Semi-transparent white background with subtle border
- "ainesh" in Playfair Display italic on the left
- Section links on the right: Projects, Experience, About, Contact
- Smooth-scroll to anchored sections on click
- Sticky on scroll
- Active section highlighted in nav based on scroll position (Intersection Observer)
- Smooth scroll via CSS `scroll-behavior: smooth`

## Content Model

Project and experience data stored in TypeScript data files (`src/data/projects.ts`, `src/data/experience.ts`) as typed arrays of objects. No CMS, no MDX, no external data fetching.

```typescript
interface Project {
  id: string;            // URL hash anchor (e.g., "cribai")
  name: string;
  date: string;
  tagline: string;       // one-liner description
  icon: string;          // Lucide icon name
  label: string;         // "Solo Project" or "Team · Company"
  tags: string[];        // tech tags
  githubUrl?: string;
  deployUrl?: string;
  approach: string;      // plain-language architecture paragraph
}

interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;   // 2-3 conversational sentences
}
```

## SEO & Metadata

- **Page title:** "Ainesh Mohan — Software & AI Engineer"
- **Meta description:** "New grad engineer building AI systems — agentic assistants, inference pipelines, and full-stack products. UW-Madison CS + Data Science."
- **Open Graph:** title, description, type=website (no custom OG image for initial build)
- **Favicon:** Simple "A" lettermark or Lucide icon, generated as SVG favicon

## Sections

### 1. Hero

Two-column layout:

**Left column:**
- "Hey, I'm" in muted text
- "Ainesh Mohan" in Playfair Display serif, large (38-40px)
- One paragraph: passionate about building AI that works in the real world, from agentic assistants to inference pipelines, love turning ideas into systems that ship
- Two CTAs: "See my work" (primary pill) + "Get in touch" (secondary pill outlined)

**Right column — Bento cards (2-column grid):**
```
┌─────────────────────────────┐
│ Latest Project              │  ← spans full width
│ CribAI                      │
│ AI-native housing + agents  │
├──────────────┬──────────────┤
│ Focus        │ Education    │
│ LLM Agents   │ UW-Madison  │
│ & RAG (dark) │ CS+DS       │
└──────────────┴──────────────┘
```
- **Latest Project** (spans 2 columns): "CribAI" — AI-native student housing with 13-tool agentic concierge
- **Focus** (dark `#292524` card): LLM Agents & RAG Systems
- **Education** (light card with border): UW-Madison, CS + Data Science

### 2. Projects

Full-width stacked cards with V2 styling:

**Card structure (collapsed):**
- Thin gradient stripe at top (`#2563EB` → `#7C3AED`, 4px height)
- Project icon: Lucide icon in light blue (`#EFF6FF`) rounded square — use contextually appropriate icons (e.g., Home for CribAI, TrendingUp for VC Audit, Mic for Qualcomm Coach, Search for Personal Search, MessageCircle for AccessiChat)
- "Solo Project" or "Team · Qualcomm" label + date
- One-liner description
- Tech tags in neutral pills
- GitHub and deploy link buttons in top-right corner
- "Expand details ↓" link at bottom

**Card structure (expanded):**
- Everything above, plus:
- Plain-language architecture/approach section
- Explains how the system works conversationally (not resume bullets)
- Written as you'd explain to a smart person at a conference
- Multiple cards can be expanded simultaneously (not accordion)
- Expand/collapse toggled by clicking "Expand details ↓" / "Collapse ↑"
- Expanded cards are linkable via URL hash (e.g., `#project-cribai`) for sharing

**Projects to include (in order):**
1. **CribAI** — AI-native student housing platform. Solo project. Next.js, Supabase, Vertex AI, PostGIS, pgvector. Approach: agentic concierge with 13 function-calling tools, two-phase tool-to-mission architecture, geo-proximity search blending PostGIS with semantic embeddings, SSE streaming chat with typed client blocks.
2. **VC Audit Tool** — Valuation engine for venture-backed companies. Python, FastAPI, LangGraph, PostgreSQL, Next.js. Approach: 5 valuation methodologies with swappable data sources, LangGraph research agent pulling from SEC EDGAR/DuckDuckGo/USASpending, semantic comp selection with sentence-transformer embeddings.
3. **Qualcomm AI Public Speaking Coach** — On-device presentation coaching. Team project. Python, ONNX, Next.js, React. Approach: three-stage pipeline with 5 ONNX models on NPU, scoring algorithms over pose/hand/facial landmarks, on-device Llama 3.2 1B for coaching feedback, full-stack web app with SSE streaming.
4. **Personal Search Layer** — Local-first agentic RAG. Python, embeddings, hybrid retrieval. Approach: unified query layer over documents with hybrid lexical + vector retrieval, multi-hop evidence gathering with claim-by-claim citations.
5. **AccessiChat AI** — Accessible healthcare management app. Python, React, OpenAI, PostgreSQL. Approach: backend with OpenAI function calling and structured tool use for contextual AI chat, RESTful API layer.

### 3. Experience

Vertically stacked cards (no connecting timeline line — just clean cards with consistent spacing). Simpler than project cards. Each entry:
- Role title + company name
- Date range + location
- Brief description (2-3 sentences, conversational)
- Subtle left border accent (`#E7E5E4`) for visual grouping

**Entries:**
1. **Capstone Software Engineer** — Qualcomm, Madison, WI (Sep–Dec 2025)
2. **AI Engineering Intern** — Staples Inc., Framingham, MA (Jun–Aug 2025)
3. **Software and AI Intern** — Apurva.ai, Bengaluru, India (Jun–Aug 2023)

### 4. About

**First-person narrative paragraph:**
- What got you into AI, what drives you, what you're excited about
- Tone: genuine, passionate, approachable — not corporate

**Fun facts section:**
- 3-4 personal details (to be provided by Ainesh — e.g., where you're from, hobbies, interests outside tech)
- Displayed as a simple inline list or small grid of short items
- Placeholder content for initial build: "From Bengaluru, India", "UW-Madison '25", "Building with AI daily"

### 5. Contact

- Centered layout
- Conversational CTA heading: "Want to chat about AI? Reach out." (Playfair Display)
- Brief line of body text below
- Social links as icon buttons in a row: Email (Mail icon), LinkedIn, GitHub
- Resume download button (primary pill style, links to `/resume.pdf` in `/public`)
- Resume PDF committed to `public/resume.pdf`

## Tech Stack

- **Framework:** Next.js + TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Google Fonts (Playfair Display + Inter)
- **Icons:** Lucide React (SVG icons, no emojis)
- **Deployment:** Static export via `output: 'export'` in `next.config.js` (no backend, no API routes, no ISR)
- **Mode:** Light mode only (no dark mode)

## Animations & Motion

- **Scroll-triggered entrances:** Sections fade up as they enter viewport (Intersection Observer via Framer Motion)
- **Project card expand/collapse:** Smooth height animation with content reveal
- **Hover states:** Subtle color/shadow transitions, 150-300ms
- **Hero parallax:** Subtle depth effect on bento cards
- **Nav:** Slight background opacity change on scroll
- **`prefers-reduced-motion`:** All animations disabled, instant state changes

## Responsive Breakpoints

- **Mobile:** 375px — single column, bento cards stack vertically, hero becomes single column
- **Tablet:** 768px — two-column hero, project cards full-width
- **Desktop:** 1024px — full layout
- **Large:** 1440px — max-width container, centered

## Accessibility

- Color contrast minimum 4.5:1 for all text
- Focus rings on all interactive elements
- Semantic HTML (header, main, section, footer)
- Alt text on all images
- Keyboard navigation support (tab order matches visual order)
- `aria-label` on icon-only buttons (GitHub, external link)
- `aria-expanded` on project card expand/collapse

## Anti-Patterns to Avoid

- No emojis as icons — use Lucide SVGs
- No corporate/generic template feel
- No cocky or boastful tone — authentic and approachable
- No resume bullet dumps in project descriptions — conversational architecture explanations
- No layout shift on hover (no scale transforms that move content)
- No hardcoded secrets
