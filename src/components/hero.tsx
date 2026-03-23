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
