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
