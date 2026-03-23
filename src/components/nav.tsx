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
