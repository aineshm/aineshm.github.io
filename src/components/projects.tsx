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
