import { SectionWrapper } from "./section-wrapper";

const FUN_FACTS = [
  "UW-Madison '25 — Go Badgers",
  "Based in Chapel Hill, NC",
  "Lived in 7 countries",
  "Basketball, F1, Football, Tennis",
] as const;

export function About() {
  return (
    <SectionWrapper id="about" className="mx-auto max-w-3xl px-6 pb-24">
      <h2 className="mb-8 font-serif text-2xl font-semibold text-text-primary">
        About
      </h2>
      <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-text-body">
        I&apos;m passionate about crafting ideas and problems into workflows
        and organized systems that reliably reduce busy work and improve
        efficiency — tools that provide real value to the people using them.
        Whether it&apos;s an agentic assistant that automates analytics
        workflows or a search layer that makes your documents actually
        findable, I care most about building AI that does something useful
        in the real world.
      </p>
      <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-text-body">
        Outside of tech, I&apos;m a big sports fan — basketball, football,
        F1, and tennis. I grew up moving around a lot (Japan, Hong Kong,
        Saudi Arabia, India, Singapore, Indonesia, and the US), which gave
        me a knack for adapting quickly and working with all kinds of people.
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
