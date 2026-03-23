# Blog Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a blog to the portfolio with MDX content, `/blog` index, `/blog/[slug]` post pages, nav integration, latest posts on home, and a cowork prompt for automated draft generation.

**Architecture:** MDX files in `src/content/blog/` parsed at build time via `gray-matter` + `next-mdx-remote`. Static export preserved with `generateStaticParams`. Blog pages share the same warm visual identity (Playfair + Inter, off-white background, cardinal red accents). Nav updated to link to `/blog`.

**Tech Stack:** Next.js 15 (static export), gray-matter, next-mdx-remote, @tailwindcss/typography

**Spec:** `docs/superpowers/specs/2026-03-22-blog-section-design.md`

**UI/UX Guidelines Applied:**
- Line height 1.5-1.75 for body text (`leading-relaxed`)
- Line length 65-75 chars (`max-w-prose` ≈ 680px)
- Minimum 16px body text on mobile
- Editorial typography: Playfair Display for headings, Inter for body
- High contrast (WCAG AAA): ink black on off-white

---

## File Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog index — lists all posts
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post page
│   ├── layout.tsx                # (modify) — no changes needed, shared layout
│   └── page.tsx                  # (modify) — add LatestPosts section
├── components/
│   ├── nav.tsx                   # (modify) — add Blog link, support blog pages
│   ├── latest-posts.tsx          # Latest posts section for home page
│   └── blog-post-card.tsx        # Reusable post entry (index + home)
├── content/
│   └── blog/
│       ├── drafts/               # Cowork drafts land here (not rendered)
│       └── 2026-03-22-why-im-writing-about-ai.mdx  # Seed post
├── hooks/
│   └── use-active-section.ts     # (modify) — handle blog page context
└── lib/
    └── blog.ts                   # Content utilities: getAllPosts, getPostBySlug
docs/
└── cowork-blog-prompt.md         # Ready-to-paste cowork prompt
```

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install blog dependencies**

```bash
npm install gray-matter next-mdx-remote @tailwindcss/typography
```

- [ ] **Step 2: Add typography plugin to globals.css**

Add the typography import to `src/app/globals.css`. In Tailwind v4, plugins are imported via CSS:

```css
/* Add after @import "tailwindcss"; */
@import "@tailwindcss/typography";
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/app/globals.css
git commit -m "feat: add blog dependencies (gray-matter, next-mdx-remote, typography)"
```

---

## Task 2: Blog Content Utilities

**Files:**
- Create: `src/lib/blog.ts`

- [ ] **Step 1: Create blog utility module**

```typescript
// src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function slugFromFilename(filename: string): string {
  // Remove date prefix and extension: 2026-03-22-my-post.mdx → my-post
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.mdx$/, "");
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("."));

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    return {
      slug: slugFromFilename(filename),
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      tags: data.tags ?? [],
      readTime: data.readTime ?? "",
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const filename = files.find((f) => slugFromFilename(f) === slug);

  if (!filename) return null;

  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    readTime: data.readTime ?? "",
    content,
  };
}

export function getLatestPosts(n: number): PostMeta[] {
  return getAllPosts().slice(0, n);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/blog.ts
git commit -m "feat: add blog content utilities (getAllPosts, getPostBySlug)"
```

---

## Task 3: Seed Blog Post

**Files:**
- Create: `src/content/blog/2026-03-22-why-im-writing-about-ai.mdx`
- Create: `src/content/blog/drafts/.gitkeep`

- [ ] **Step 1: Create content directories**

```bash
mkdir -p src/content/blog/drafts
touch src/content/blog/drafts/.gitkeep
```

- [ ] **Step 2: Create seed blog post**

```mdx
---
title: "Why I'm Writing About AI"
date: "2026-03-22"
description: "Starting a blog to explore AI developments, research, and where things are heading — from the perspective of someone who builds with these tools daily."
tags: ["meta", "AI"]
readTime: "2 min read"
---

I've spent the last couple of years building AI systems — agentic assistants, RAG pipelines, on-device inference, the kinds of things that sound futuristic until you're debugging them at 2am. Along the way, I've developed a habit of keeping up with what's happening in the space: new model releases, research papers, shifts in how companies are thinking about AI infrastructure.

This blog is where I'll share what I'm paying attention to and what I think it means. Not tutorials or how-to guides — there are plenty of those. More like: here's a development that caught my eye, here's why I think it matters, and here's how it connects to the bigger picture.

A few things I'm particularly interested in right now:

- **Agentic systems** — AI that doesn't just respond but plans, uses tools, and takes action. We're early, and the architecture patterns are still being figured out.
- **The inference cost curve** — what happens to AI applications when running models gets 10x cheaper every year?
- **Research-to-production gaps** — what looks impressive in a paper versus what actually works when you ship it.

I'll aim to post every few days. Some will be short takes on a new paper or announcement, others will be longer essays when a topic deserves more depth.

If you're interested in where AI is heading and want perspective from someone in the trenches building with it, stick around.
```

- [ ] **Step 3: Commit**

```bash
git add src/content/
git commit -m "feat: add seed blog post and drafts directory"
```

---

## Task 4: Blog Post Card Component

**Files:**
- Create: `src/components/blog-post-card.tsx`

- [ ] **Step 1: Create reusable post card**

```typescript
// src/components/blog-post-card.tsx
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export function BlogPostCard({ post }: { post: PostMeta }) {
  return (
    <article className="py-6">
      <Link
        href={`/blog/${post.slug}`}
        className="group cursor-pointer"
      >
        <h3 className="font-serif text-xl font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent-blue">
          {post.title}
        </h3>
      </Link>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-text-label">
        <time>{post.date}</time>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-body">
        {post.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-[#F4F4F5] px-2 py-0.5 text-[11px] font-medium text-text-body"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/blog-post-card.tsx
git commit -m "feat: add blog post card component"
```

---

## Task 5: Blog Index Page

**Files:**
- Create: `src/app/blog/page.tsx`

- [ ] **Step 1: Create blog index page**

```typescript
// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog-post-card";

export const metadata: Metadata = {
  title: "Blog — Ainesh Mohan",
  description:
    "Exploring AI — new developments, research, and where things are heading.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-text-muted transition-colors duration-200 hover:text-text-primary"
      >
        ← Home
      </Link>
      <h1 className="mb-2 font-serif text-3xl font-bold text-text-primary">
        Blog
      </h1>
      <p className="mb-12 text-[15px] text-text-muted">
        Exploring AI — new developments, research, and where things are
        heading.
      </p>
      {posts.length === 0 ? (
        <p className="text-sm text-text-muted">No posts yet.</p>
      ) : (
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build and check route**

```bash
npm run build
```

Expected: `/blog` route appears in the build output.

- [ ] **Step 3: Commit**

```bash
git add src/app/blog/
git commit -m "feat: add blog index page"
```

---

## Task 6: Blog Post Page

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create individual post page with MDX rendering**

```typescript
// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Ainesh Mohan`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <Link
        href="/blog"
        className="mb-8 inline-block text-sm text-text-muted transition-colors duration-200 hover:text-text-primary"
      >
        ← Back to blog
      </Link>

      <header className="mb-10">
        <h1 className="mb-3 font-serif text-3xl font-bold leading-tight text-text-primary">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-text-label">
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[#F4F4F5] px-2 py-0.5 text-[11px] font-medium text-text-body"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <article className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-text-primary prose-p:text-text-body prose-p:leading-relaxed prose-a:text-accent-blue prose-a:underline hover:prose-a:text-accent-purple prose-strong:text-text-primary prose-ul:text-text-body prose-ol:text-text-body prose-blockquote:border-accent-blue prose-blockquote:text-text-muted">
        <MDXRemote source={post.content} />
      </article>

      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/blog"
          className="text-sm text-text-muted transition-colors duration-200 hover:text-text-primary"
        >
          ← Back to blog
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: `/blog/why-im-writing-about-ai` appears in the build output alongside `/blog`.

- [ ] **Step 3: Commit**

```bash
git add src/app/blog/
git commit -m "feat: add blog post page with MDX rendering"
```

---

## Task 7: Navigation Update

**Files:**
- Modify: `src/components/nav.tsx`
- Modify: `src/hooks/use-active-section.ts`

- [ ] **Step 1: Update nav to support both home and blog pages**

Replace `src/components/nav.tsx` with:

```typescript
// src/components/nav.tsx
"use client";

import { useActiveSection, type SectionId } from "@/hooks/use-active-section";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

const HOME_LINKS: { label: string; href: string }[] = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const BLOG_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const links = isHome ? HOME_LINKS : BLOG_LINKS;

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
          href="/"
          className="font-serif text-[15px] font-semibold italic text-text-primary"
        >
          ainesh
        </a>
        <ul className="flex gap-6">
          {links.map(({ label, href }) => {
            const isHash = href.startsWith("#");
            const sectionId = isHash ? href.slice(1) : null;
            const isActive = isHome && sectionId
              ? activeSection === sectionId
              : pathname.startsWith(href) && href !== "/";

            return (
              <li key={href}>
                <a
                  href={href}
                  className={`text-[13px] transition-colors duration-200 ${
                    isActive
                      ? "font-medium text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Update use-active-section hook to handle non-home pages**

The hook uses `getElementById` which will return null on blog pages (no section elements). This is fine — it already returns `null` when sections aren't found. No code change needed, but verify it doesn't error on blog pages.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/nav.tsx
git commit -m "feat: update nav to support blog pages"
```

---

## Task 8: Latest Posts on Home Page

**Files:**
- Create: `src/components/latest-posts.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create latest posts component**

```typescript
// src/components/latest-posts.tsx
import Link from "next/link";
import { getLatestPosts } from "@/lib/blog";
import { BlogPostCard } from "./blog-post-card";
import { SectionWrapper } from "./section-wrapper";

export function LatestPosts() {
  const posts = getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <SectionWrapper id="latest-posts" className="mx-auto max-w-3xl px-6 pb-24">
      <h2 className="mb-8 font-serif text-2xl font-semibold text-text-primary">
        Latest Posts
      </h2>
      <div className="divide-y divide-border">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
      <Link
        href="/blog"
        className="mt-6 inline-block text-sm font-medium text-accent-blue transition-colors duration-200 hover:text-accent-purple"
      >
        View all posts →
      </Link>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Add LatestPosts to home page between About and Contact**

Update `src/app/page.tsx`:

```typescript
// src/app/page.tsx
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { LatestPosts } from "@/components/latest-posts";
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
        <LatestPosts />
        <Contact />
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-text-label">
        © 2026 Ainesh Mohan
      </footer>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: build passes, `/blog` and `/blog/why-im-writing-about-ai` in output.

- [ ] **Step 4: Commit**

```bash
git add src/components/latest-posts.tsx src/app/page.tsx
git commit -m "feat: add latest posts section to home page"
```

---

## Task 9: Blog Layout (Shared Nav)

**Files:**
- Create: `src/app/blog/layout.tsx`

- [ ] **Step 1: Create blog layout that includes Nav**

```typescript
// src/app/blog/layout.tsx
import { Nav } from "@/components/nav";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <footer className="border-t border-border py-8 text-center text-xs text-text-label">
        © 2026 Ainesh Mohan
      </footer>
    </>
  );
}
```

- [ ] **Step 2: Verify build and test navigation between home and blog**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/blog/layout.tsx
git commit -m "feat: add blog layout with shared nav and footer"
```

---

## Task 10: Cowork Prompt

**Files:**
- Create: `docs/cowork-blog-prompt.md`

- [ ] **Step 1: Write the cowork prompt**

```markdown
# Blog Draft Cowork Prompt

Paste this into Claude cowork as a scheduled task (every 2-3 days).

---

## Prompt

You are a blog draft generator for Ainesh Mohan's personal site (https://aineshm.github.io).

**Blog focus:** Exploring AI — new developments, research papers, industry shifts, and technology analysis. Written from the perspective of someone who builds AI systems (agentic assistants, RAG pipelines, inference optimization).

**Your job:**
1. Pick a recent, interesting AI topic. Prioritize: new model releases, notable research papers (last 1-2 weeks), industry shifts, emerging architecture patterns, or tools gaining traction. Search the web for recent AI news to find something timely.
2. Write a blog post draft as an MDX file. Format:
   - Short takes: 300-500 words for quick reactions
   - Medium essays: 800-1200 words for deeper analysis
   - Tone: informed but approachable. Like explaining to a smart friend, not writing a textbook.
   - Include your (Ainesh's) perspective as a builder — connect developments to practical implications.
   - No corporate speak. No filler. Be direct and opinionated where appropriate.
3. Use this frontmatter format exactly:

```yaml
---
title: "Your Post Title"
date: "YYYY-MM-DD"
description: "One sentence summary."
tags: ["relevant", "tags"]
readTime: "N min read"
---
```

4. Save the file to `src/content/blog/drafts/YYYY-MM-DD-slug-here.mdx`
5. Create a new git branch: `blog/draft-YYYY-MM-DD-slug-here`
6. Commit and push the branch
7. Open a PR to `main` with:
   - Title: "Blog draft: [Post Title]"
   - Body: brief summary of the topic and why it's worth writing about

**Repository:** aineshm/aineshm.github.io
**Base branch:** main

**Important:**
- Only create ONE post per run
- Save to `src/content/blog/drafts/` (NOT `src/content/blog/`)
- The draft will be reviewed and moved to `src/content/blog/` when approved
- Search the web for recent AI news — don't write about stale topics
- Check existing posts in `src/content/blog/` to avoid duplicate topics
```

- [ ] **Step 2: Commit**

```bash
git add docs/cowork-blog-prompt.md
git commit -m "docs: add cowork prompt for automated blog draft generation"
```

---

## Task 11: Final Build + Push

- [ ] **Step 1: Full build verification**

```bash
npm run build
```

Expected: static export succeeds with `/`, `/blog`, `/blog/why-im-writing-about-ai`, `/icon.svg`, `/_not-found`.

- [ ] **Step 2: Push to deploy**

```bash
git push
```

- [ ] **Step 3: Verify deployment**

```bash
gh run list --limit 1
```

Wait for deploy to complete, then verify `https://aineshm.github.io/blog` loads.
