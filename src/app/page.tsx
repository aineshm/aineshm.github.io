// src/app/page.tsx
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { LatestPosts } from "@/components/latest-posts";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <LatestPosts />
        <Contact />
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-text-label">
        © 2026 Ainesh Mohan
      </footer>
    </>
  );
}
