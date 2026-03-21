# Personal Portfolio Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page scrollable portfolio site for Ainesh Mohan with warm + bento hybrid style, expandable project cards, and scroll-driven animations.

**Architecture:** Next.js static export with Tailwind CSS for styling and Framer Motion for animations. All content lives in TypeScript data files — no CMS or backend. Single `page.tsx` renders all sections as components.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, next/font/google

**Spec:** `docs/superpowers/specs/2026-03-21-personal-portfolio-design.md`

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, scroll-behavior
│   ├── page.tsx            # Single page: composes all sections
│   └── globals.css         # Tailwind directives + custom CSS vars
├── components/
│   ├── nav.tsx             # Floating pill nav with scroll-spy
│   ├── hero.tsx            # Hero section: intro + bento cards
│   ├── bento-card.tsx      # Individual bento card (light/dark variants)
│   ├── projects.tsx        # Projects section: maps over data
│   ├── project-card.tsx    # Expandable project card (V2 style)
│   ├── experience.tsx      # Experience section: maps over data
│   ├── experience-card.tsx # Single experience entry card
│   ├── about.tsx           # About section: narrative + fun facts
│   ├── contact.tsx         # Contact section: CTA + links + resume
│   ├── section-wrapper.tsx # Scroll-triggered fade-up animation wrapper
│   └── providers.tsx      # Client wrapper for MotionConfig (reduced motion)
├── data/
│   ├── projects.ts         # Project content + types
│   └── experience.ts       # Experience content + types
├── hooks/
│   └── use-active-section.ts # Intersection Observer for nav scroll-spy
public/
├── resume.pdf              # Resume PDF download
next.config.ts              # Static export config
                            # No tailwind.config.ts needed — Tailwind v4 uses @theme in CSS
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `next.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `tsconfig.json`, `package.json`

- [ ] **Step 1: Initialize Next.js project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --skip-install
```

Select defaults. This creates the base project structure.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion lucide-react
```

- [ ] **Step 3: Configure next.config.ts for static export**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
```

- [ ] **Step 4: Configure fonts in layout.tsx**

Set up `next/font/google` for Playfair Display and Inter. Set metadata for SEO.

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ainesh Mohan — Software & AI Engineer",
  description:
    "New grad engineer building AI systems — agentic assistants, inference pipelines, and full-stack products. UW-Madison CS + Data Science.",
  openGraph: {
    title: "Ainesh Mohan — Software & AI Engineer",
    description:
      "New grad engineer building AI systems — agentic assistants, inference pipelines, and full-stack products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="bg-[#FAFAF8] font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Create Providers component (client-side MotionConfig)**

```typescript
// src/components/providers.tsx
"use client";

import { MotionConfig } from "framer-motion";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

This wraps the app so Framer Motion respects `prefers-reduced-motion` for all JS-driven animations.

- [ ] **Step 6: Set up globals.css with Tailwind and custom properties**

Note: Tailwind v4 uses `@theme` in CSS for configuration — no `tailwind.config.ts` needed. Variables defined under `@theme` automatically create utility classes (e.g., `--color-text-primary` → `text-text-primary`, `bg-text-primary`).

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-serif: var(--font-playfair), Georgia, serif;

  --color-bg: #FAFAF8;
  --color-text-primary: #1C1917;
  --color-text-body: #57534E;
  --color-text-muted: #78716C;
  --color-text-label: #A8A29E;
  --color-accent-dark: #292524;
  --color-border: #E7E5E4;
  --color-card: #FFFFFF;
  --color-accent-blue: #2563EB;
  --color-accent-purple: #7C3AED;
  --color-icon-bg: #EFF6FF;
}

html {
  scroll-behavior: smooth;
}

/* Focus rings for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--color-accent-blue);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 7: Create placeholder page.tsx**

```typescript
// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <p className="p-8 font-serif text-3xl text-text-primary">
        Ainesh Mohan — coming soon
      </p>
    </main>
  );
}
```

- [ ] **Step 8: Verify build and dev server**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify: off-white background, Playfair Display serif text renders, no errors in console.

- [ ] **Step 9: Copy resume PDF**

```bash
cp ~/iCloud/Resume/Resumes/Current\ Resume/Aven/NewGrad_AI_Engineer_AineshMohan_Resume_3-18-26.pdf public/resume.pdf
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, fonts, and static export config"
```

---

## Task 2: Content Data Files

**Files:**
- Create: `src/data/projects.ts`, `src/data/experience.ts`

- [ ] **Step 1: Create project data with types**

```typescript
// src/data/projects.ts
export interface Project {
  id: string;
  name: string;
  date: string;
  tagline: string;
  icon: string;
  label: string;
  tags: readonly string[];
  githubUrl?: string;
  deployUrl?: string;
  approach: string;
}

export const projects: readonly Project[] = [
  {
    id: "cribai",
    name: "CribAI",
    date: "Mar 2026",
    tagline:
      "AI-native student housing platform with an agentic concierge",
    icon: "Home",
    label: "Solo Project",
    tags: ["Next.js", "TypeScript", "Supabase", "Vertex AI", "PostGIS", "pgvector"],
    githubUrl: "https://github.com/aineshm/cribai",
    approach:
      "The core idea is an AI concierge that can actually do things for you — not just answer questions. It uses 13 function-calling tools with intent classification to figure out what you need, then routes simple requests (like 'show me apartments near campus') to instant tool responses and complex ones (like 'schedule tours at my top 3 picks') to a background mission executor with human-in-the-loop approval. Housing search blends PostGIS spatial queries with semantic embeddings in a 70/30 weighted ranking against 2,500+ real listings. The chat interface streams responses via SSE with structured tool outputs rendered as typed client blocks — listing cards, map overlays, comparison tables.",
  },
  {
    id: "vc-audit",
    name: "VC Audit Tool",
    date: "Mar 2026",
    tagline:
      "Valuation engine for venture-backed companies with full audit trails",
    icon: "TrendingUp",
    label: "Solo Project",
    tags: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "Next.js"],
    githubUrl: "https://github.com/aineshm/vc-audit",
    approach:
      "Supports five valuation methodologies — DCF, comparables, precedent transactions, asset-based, and venture method — each plugged in as a swappable data source with full audit trails tracking every assumption and derivation step. A LangGraph research agent auto-assembles the inputs you need by pulling from SEC EDGAR, DuckDuckGo, and USASpending.gov, with a multi-provider LLM fallback chain and regex safety net for when APIs are flaky. For comparable company selection, it uses sentence-transformer embeddings to rank the EDGAR universe by cosine similarity, then a reconciliation layer with YAML-driven stage-based methodology weighting ties everything together.",
  },
  {
    id: "qualcomm-coach",
    name: "Qualcomm AI Public Speaking Coach",
    date: "Sep–Dec 2025",
    tagline:
      "On-device presentation coaching with NPU-accelerated inference",
    icon: "Mic",
    label: "Team · Qualcomm",
    tags: ["Python", "ONNX Runtime", "Next.js", "React", "SQLite"],
    approach:
      "Built with a 6-person team and Qualcomm engineers for their Snapdragon X Elite platform. The system runs a three-stage analysis pipeline — pose estimation, gesture tracking, and facial expression analysis — orchestrating 5 ONNX models across dual Python environments with NPU acceleration via the QNN Execution Provider, hitting 50 fps inference. Scoring algorithms analyze 33 pose, 42 hand, and 68 facial landmarks with a calibration step so feedback is personalized to your natural speaking style. An on-device Llama 3.2 1B model generates natural-language coaching feedback. The whole thing is wrapped in a Next.js/React web app with SSE-based real-time streaming so you see results as the pipeline processes.",
  },
  {
    id: "personal-search",
    name: "Personal Search Layer",
    date: "Feb 2026",
    tagline:
      "Local-first agentic RAG system unifying documents into a single query layer",
    icon: "Search",
    label: "Solo Project",
    tags: ["Python", "RAG", "Embeddings", "Hybrid Retrieval"],
    githubUrl: "https://github.com/aineshm/personal-search",
    approach:
      "Takes all your local documents and notes and makes them searchable through a single query interface. Uses hybrid retrieval that combines traditional lexical search with vector embeddings so you get both exact keyword matches and semantic understanding. When you ask a complex question, a multi-hop evidence gathering pipeline follows chains of reasoning across documents, then builds responses with claim-by-claim citations so you can trace every statement back to its source.",
  },
  {
    id: "accessichat",
    name: "AccessiChat AI",
    date: "Feb 2024",
    tagline:
      "Accessible healthcare management application with AI chat",
    icon: "MessageCircle",
    label: "Solo Project",
    tags: ["Python", "React", "OpenAI", "PostgreSQL", "REST APIs"],
    approach:
      "A healthcare management app built with accessibility as a core constraint. The backend uses OpenAI function calling with structured tool use — the AI doesn't just chat, it can look up patient info, check schedules, and take actions through a defined set of tools. Built with a RESTful API layer and PostgreSQL persistence, with the React frontend designed to meet accessibility standards.",
  },
] as const;
```

- [ ] **Step 2: Create experience data with types**

```typescript
// src/data/experience.ts
export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export const experiences: readonly Experience[] = [
  {
    role: "Capstone Software Engineer",
    company: "Qualcomm",
    location: "Madison, WI",
    startDate: "Sep 2025",
    endDate: "Dec 2025",
    description:
      "Led architecture and development of an NPU-accelerated presentation coaching system on Snapdragon X Elite. Owned the full stack from ONNX model pipeline to the Next.js frontend, achieving 7-second latency for 30-second video analysis with a team of 6.",
  },
  {
    role: "AI Engineering Intern",
    company: "Staples Inc.",
    location: "Framingham, MA",
    startDate: "Jun 2025",
    endDate: "Aug 2025",
    description:
      "Built and shipped a production agentic AI assistant using LangGraph and RAG for Customer Service and Supply Chain teams. Designed security evaluations and jailbreak prevention for internal AI agents, and created real-time operational dashboards replacing manual reporting workflows.",
  },
  {
    role: "Software and AI Intern",
    company: "Apurva.ai",
    location: "Bengaluru, India",
    startDate: "Jun 2023",
    endDate: "Aug 2023",
    description:
      "Built a semantic search system using sentence-transformers and function calling that improved search accuracy from 41% to 83% through iterative algorithmic optimization and benchmarking.",
  },
] as const;
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add project and experience content data files"
```

---

## Task 3: Section Wrapper + Active Section Hook

**Files:**
- Create: `src/components/section-wrapper.tsx`, `src/hooks/use-active-section.ts`

- [ ] **Step 1: Create scroll-triggered animation wrapper**

```typescript
// src/components/section-wrapper.tsx
"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUpVariants}
      className={`scroll-mt-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 2: Create active section hook**

```typescript
// src/hooks/use-active-section.ts
"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["projects", "experience", "about", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  return active;
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: build succeeds (components aren't used yet but should compile).

- [ ] **Step 4: Commit**

```bash
git add src/components/section-wrapper.tsx src/hooks/
git commit -m "feat: add section wrapper animation and active section scroll-spy hook"
```

---

## Task 4: Navigation

**Files:**
- Create: `src/components/nav.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build the floating pill nav**

```typescript
// src/components/nav.tsx
"use client";

import { useActiveSection, type SectionId } from "@/hooks/use-active-section";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const NAV_LINKS: { label: string; href: SectionId }[] = [
  { label: "Projects", href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "About", href: "about" },
  { label: "Contact", href: "contact" },
];

export function Nav() {
  const activeSection = useActiveSection();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <header className="fixed top-6 left-4 right-4 z-50 flex justify-center">
      <nav
        className={`flex items-center justify-between w-full max-w-3xl rounded-full border px-6 py-3 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "border-border bg-white/95 shadow-md"
            : "border-transparent bg-white/80 shadow-sm"
        }`}
      >
        <a
          href="#"
          className="font-serif text-[15px] font-semibold italic text-text-primary"
        >
          ainesh
        </a>
        <ul className="flex gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={`#${href}`}
                className={`text-[13px] transition-colors duration-200 ${
                  activeSection === href
                    ? "font-medium text-text-primary"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Add Nav to page.tsx**

```typescript
// src/app/page.tsx
import { Nav } from "@/components/nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-28">
        <section id="projects" className="min-h-[50vh] p-8">
          <p className="text-text-muted">Projects section</p>
        </section>
        <section id="experience" className="min-h-[50vh] p-8">
          <p className="text-text-muted">Experience section</p>
        </section>
        <section id="about" className="min-h-[50vh] p-8">
          <p className="text-text-muted">About section</p>
        </section>
        <section id="contact" className="min-h-[50vh] p-8">
          <p className="text-text-muted">Contact section</p>
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Check: pill nav floats at top, scroll-spy highlights active section, smooth scroll works on click, nav stays sticky.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav.tsx src/app/page.tsx
git commit -m "feat: add floating pill navigation with scroll-spy"
```

---

## Task 5: Hero Section + Bento Cards

**Files:**
- Create: `src/components/hero.tsx`, `src/components/bento-card.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create bento card component**

```typescript
// src/components/bento-card.tsx
"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
  colSpan?: 1 | 2;
}

export function BentoCard({
  children,
  variant = "light",
  className = "",
  colSpan = 1,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`rounded-2xl p-5 ${
        colSpan === 2 ? "col-span-2" : ""
      } ${
        variant === "dark"
          ? "bg-accent-dark text-white"
          : "border border-border bg-card"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create hero section**

```typescript
// src/components/hero.tsx
"use client";

import { BentoCard } from "./bento-card";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-12 px-6 pb-24 pt-32 md:flex-row md:items-center md:gap-16 md:pt-36">
      {/* Left column */}
      <div className="flex-1">
        <p className="mb-2 text-[15px] text-text-muted">Hey, I&apos;m</p>
        <h1 className="mb-4 font-serif text-[40px] font-bold leading-[1.1] tracking-tight text-text-primary">
          Ainesh Mohan
        </h1>
        <p className="mb-8 max-w-md text-[15px] leading-relaxed text-text-body">
          I&apos;m passionate about building AI that works in the real
          world. From agentic assistants to inference pipelines — I love
          turning ideas into systems that ship.
        </p>
        <div className="flex gap-3">
          <a
            href="#projects"
            className="cursor-pointer rounded-full bg-accent-dark px-5 py-2.5 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-text-primary"
          >
            See my work
          </a>
          <a
            href="#contact"
            className="cursor-pointer rounded-full border border-[#D6D3D1] px-5 py-2.5 text-[13px] font-medium text-[#44403C] transition-colors duration-200 hover:border-text-muted"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Right column — Bento grid */}
      <div className="grid w-full max-w-sm grid-cols-2 gap-3">
        <BentoCard colSpan={2}>
          <span className="text-[10px] uppercase tracking-wider text-text-label">
            Latest Project
          </span>
          <p className="mt-1.5 text-sm font-semibold text-text-primary">
            CribAI
          </p>
          <p className="mt-1 text-xs text-text-muted">
            AI-native student housing with 13-tool agentic concierge
          </p>
        </BentoCard>
        <BentoCard variant="dark">
          <span className="text-[10px] uppercase tracking-wider text-text-label">
            Focus
          </span>
          <p className="mt-1.5 text-sm font-semibold">LLM Agents</p>
          <p className="mt-1 text-xs text-text-label">&amp; RAG Systems</p>
        </BentoCard>
        <BentoCard>
          <span className="text-[10px] uppercase tracking-wider text-text-label">
            Education
          </span>
          <p className="mt-1.5 text-sm font-semibold text-text-primary">
            UW-Madison
          </p>
          <p className="mt-1 text-xs text-text-muted">CS + Data Science</p>
        </BentoCard>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire Hero into page.tsx**

Replace the placeholder content in `page.tsx` to render `<Hero />` before the section placeholders.

- [ ] **Step 4: Verify in browser**

Check: two-column hero layout, bento cards render with correct colors (dark card for Focus), serif font on name, pill buttons, responsive stacking on mobile (resize to 375px).

- [ ] **Step 5: Commit**

```bash
git add src/components/hero.tsx src/components/bento-card.tsx src/app/page.tsx
git commit -m "feat: add hero section with bento cards"
```

---

## Task 6: Project Cards

**Files:**
- Create: `src/components/project-card.tsx`, `src/components/projects.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create expandable project card**

```typescript
// src/components/project-card.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Github,
  ExternalLink,
  Home,
  TrendingUp,
  Mic,
  Search,
  MessageCircle,
  Code,
} from "lucide-react";
import type { Project } from "@/data/projects";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, TrendingUp, Mic, Search, MessageCircle, Code,
};

function getIcon(iconName: string) {
  return ICON_MAP[iconName] ?? Code;
}

export function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  // Handle hash-based expansion on mount
  useEffect(() => {
    if (window.location.hash === `#project-${project.id}`) {
      setExpanded(true);
    }
  }, [project.id]);

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    if (next) {
      window.history.replaceState(null, "", `#project-${project.id}`);
    }
  };

  const Icon = getIcon(project.icon);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Gradient stripe */}
      <div className="h-1 bg-gradient-to-r from-accent-blue to-accent-purple" />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-icon-bg">
              <Icon className="h-5 w-5 text-accent-blue" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                {project.name}
              </h3>
              <span className="text-xs text-text-muted">
                {project.label} · {project.date}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} on GitHub`}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-[#F4F4F5] transition-colors duration-200 hover:bg-border"
              >
                <Github className="h-4 w-4 text-text-body" />
              </a>
            )}
            {project.deployUrl && (
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} live site`}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-[#F4F4F5] transition-colors duration-200 hover:bg-border"
              >
                <ExternalLink className="h-4 w-4 text-text-body" />
              </a>
            )}
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-4 text-sm leading-relaxed text-text-body">
          {project.tagline}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[#F4F4F5] px-2.5 py-1 text-[11px] font-medium text-text-body"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expand/collapse */}
        <div className="mt-4 border-t border-[#F4F4F5] pt-4">
          <button
            onClick={toggle}
            aria-expanded={expanded}
            className="flex cursor-pointer items-center gap-1 text-[13px] font-medium text-accent-blue transition-colors duration-200 hover:text-accent-purple"
          >
            {expanded ? (
              <>
                Collapse <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                Expand details <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-lg bg-[#FAFAF8] p-4">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-label">
                  How it works
                </h4>
                <p className="text-sm leading-relaxed text-text-body">
                  {project.approach}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create projects section**

```typescript
// src/components/projects.tsx
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { SectionWrapper } from "./section-wrapper";

export function Projects() {
  return (
    <SectionWrapper id="projects" className="mx-auto max-w-3xl px-6 pb-24">
      <h2 className="mb-8 font-serif text-2xl font-semibold text-text-primary">
        Projects
      </h2>
      <div className="flex flex-col gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 3: Wire into page.tsx**

Replace the `#projects` placeholder section with `<Projects />`.

- [ ] **Step 4: Verify in browser**

Check: gradient stripe, icons render, tech tags, expand/collapse animation works, GitHub link buttons, hash URLs update on expand, multiple cards can expand simultaneously.

- [ ] **Step 5: Commit**

```bash
git add src/components/project-card.tsx src/components/projects.tsx src/app/page.tsx
git commit -m "feat: add expandable project cards with V2 styling"
```

---

## Task 7: Experience Section

**Files:**
- Create: `src/components/experience-card.tsx`, `src/components/experience.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create experience card**

```typescript
// src/components/experience-card.tsx
import type { Experience as ExperienceType } from "@/data/experience";

export function ExperienceCard({
  experience,
}: {
  experience: ExperienceType;
}) {
  return (
    <div className="rounded-lg border-l-2 border-border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            {experience.role}
          </h3>
          <p className="text-sm text-text-muted">{experience.company}</p>
        </div>
        <span className="text-xs text-text-label">
          {experience.startDate} – {experience.endDate} · {experience.location}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-body">
        {experience.description}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create experience section**

```typescript
// src/components/experience.tsx
import { experiences } from "@/data/experience";
import { ExperienceCard } from "./experience-card";
import { SectionWrapper } from "./section-wrapper";

export function Experience() {
  return (
    <SectionWrapper id="experience" className="mx-auto max-w-3xl px-6 pb-24">
      <h2 className="mb-8 font-serif text-2xl font-semibold text-text-primary">
        Experience
      </h2>
      <div className="flex flex-col gap-4">
        {experiences.map((exp) => (
          <ExperienceCard key={`${exp.company}-${exp.startDate}`} experience={exp} />
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 3: Wire into page.tsx**

Replace the `#experience` placeholder with `<Experience />`.

- [ ] **Step 4: Verify in browser**

Check: left border accent, role/company/dates render, responsive layout on mobile.

- [ ] **Step 5: Commit**

```bash
git add src/components/experience-card.tsx src/components/experience.tsx src/app/page.tsx
git commit -m "feat: add experience section with stacked cards"
```

---

## Task 8: About Section

**Files:**
- Create: `src/components/about.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create about section**

```typescript
// src/components/about.tsx
import { SectionWrapper } from "./section-wrapper";

const FUN_FACTS = [
  "From Bengaluru, India",
  "UW-Madison '25",
  "Building with AI daily",
] as const;

export function About() {
  return (
    <SectionWrapper id="about" className="mx-auto max-w-3xl px-6 pb-24">
      <h2 className="mb-8 font-serif text-2xl font-semibold text-text-primary">
        About
      </h2>
      <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-text-body">
        I got into AI because I wanted to build things that feel like magic —
        systems that understand what you need and actually do something about
        it. What drives me is the craft of turning a messy, ambitious idea
        into a working system: figuring out the right architecture, iterating
        on it until it&apos;s solid, and shipping it. I&apos;m most excited
        about agentic systems — AI that doesn&apos;t just answer questions
        but takes action, plans multi-step workflows, and gets better with
        feedback.
      </p>
      <div className="flex flex-wrap gap-3">
        {FUN_FACTS.map((fact) => (
          <span
            key={fact}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-text-muted"
          >
            {fact}
          </span>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Wire into page.tsx**

Replace `#about` placeholder with `<About />`.

- [ ] **Step 3: Verify in browser**

Check: narrative paragraph renders, fun fact pills display inline.

- [ ] **Step 4: Commit**

```bash
git add src/components/about.tsx src/app/page.tsx
git commit -m "feat: add about section with narrative and fun facts"
```

---

## Task 9: Contact Section

**Files:**
- Create: `src/components/contact.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create contact section**

```typescript
// src/components/contact.tsx
import { Mail, Linkedin, Github, Download } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";

interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const SOCIAL_LINKS: readonly SocialLink[] = [
  { href: "mailto:aineshmohan@outlook.com", icon: Mail, label: "Email" },
  { href: "https://linkedin.com/in/ainesh-mohan", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/aineshm", icon: Github, label: "GitHub" },
];

export function Contact() {
  return (
    <SectionWrapper id="contact" className="mx-auto max-w-3xl px-6 pb-24">
      <div className="text-center">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-text-primary">
          Want to chat about AI? Reach out.
        </h2>
        <p className="mb-8 text-sm text-text-muted">
          Always happy to talk about agentic systems, new projects, or
          opportunities.
        </p>

        {/* Social links */}
        <div className="mb-6 flex justify-center gap-3">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card transition-colors duration-200 hover:border-text-muted"
            >
              <Icon className="h-5 w-5 text-text-body" />
            </a>
          ))}
        </div>

        {/* Resume download */}
        <a
          href="/resume.pdf"
          download
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent-dark px-6 py-2.5 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-text-primary"
        >
          <Download className="h-4 w-4" />
          Download Resume
        </a>
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Wire into page.tsx**

Replace `#contact` placeholder with `<Contact />`.

- [ ] **Step 3: Verify in browser**

Check: centered layout, social icon buttons render, resume download triggers file download, hover states work.

- [ ] **Step 4: Commit**

```bash
git add src/components/contact.tsx src/app/page.tsx
git commit -m "feat: add contact section with social links and resume download"
```

---

## Task 10: Final Assembly + Footer + Polish

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Assemble final page.tsx**

Wire all sections together in order: Nav → Hero → Projects → Experience → About → Contact → Footer.

```typescript
// src/app/page.tsx
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-text-label">
        © {new Date().getFullYear()} Ainesh Mohan
      </footer>
    </>
  );
}
```

- [ ] **Step 2: Full build verification**

```bash
npm run build
```

Expected: static export succeeds with no errors, `out/` directory generated.

- [ ] **Step 3: Test static export locally**

```bash
npx serve out
```

Open the served URL. Walk through: nav scroll-spy, hero layout, project card expand/collapse, experience cards, about section, contact links, resume download. Test at 375px, 768px, and 1440px widths.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble all sections into final single-page layout"
```

---

## Task 11: Favicon

**Files:**
- Create: `src/app/icon.svg`

- [ ] **Step 1: Create SVG favicon**

```svg
<!-- src/app/icon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#292524"/>
  <text x="16" y="23" text-anchor="middle" font-family="serif" font-size="20" font-weight="700" fill="#FAFAF8">A</text>
</svg>
```

Next.js App Router automatically picks up `icon.svg` as the favicon.

- [ ] **Step 2: Verify favicon appears in browser tab**

```bash
npm run dev
```

Check: "A" lettermark appears in browser tab.

- [ ] **Step 3: Final build and commit**

```bash
npm run build && git add . && git commit -m "feat: add favicon and finalize portfolio site"
```
