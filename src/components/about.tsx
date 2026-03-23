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
