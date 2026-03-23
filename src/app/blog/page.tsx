// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog-post-card";

export const metadata: Metadata = {
  title: "Blog | Ainesh Mohan",
  description:
    "Exploring AI: new developments, research, and where things are heading.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-text-muted transition-colors duration-200 hover:text-text-primary"
      >
        ← Home
      </Link>
      <h1 className="mb-2 font-serif text-3xl font-bold text-text-primary">
        Blog
      </h1>
      <p className="mb-12 text-[15px] text-text-muted">
        Exploring AI: new developments, research, and where things are
        heading.
      </p>
      {posts.length === 0 ? (
        <p className="text-sm text-text-muted">No posts yet.</p>
      ) : (
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
