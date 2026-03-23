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
