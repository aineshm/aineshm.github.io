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
