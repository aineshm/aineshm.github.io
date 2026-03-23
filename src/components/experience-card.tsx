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
