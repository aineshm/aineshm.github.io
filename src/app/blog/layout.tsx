// src/app/blog/layout.tsx
import { Nav } from "@/components/nav";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <footer className="border-t border-border py-8 text-center text-xs text-text-label">
        © 2026 Ainesh Mohan
      </footer>
    </>
  );
}
