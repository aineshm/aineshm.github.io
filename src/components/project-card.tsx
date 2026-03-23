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
      <div className="h-1 bg-gradient-to-r from-accent-blue to-accent-purple" />

      <div className="p-6">
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

        <p className="mt-4 text-sm leading-relaxed text-text-body">
          {project.tagline}
        </p>

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
