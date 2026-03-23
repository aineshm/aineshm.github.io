// src/components/latest-posts.tsx
import Link from "next/link";
import { getLatestPosts } from "@/lib/blog";
import { BlogPostCard } from "./blog-post-card";
import { SectionWrapper } from "./section-wrapper";

export function LatestPosts() {
  const posts = getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <SectionWrapper id="latest-posts" className="mx-auto max-w-3xl px-6 pb-24">
      <h2 className="mb-8 font-serif text-2xl font-semibold text-text-primary">
        Latest Posts
      </h2>
      <div className="divide-y divide-border">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
      <Link
        href="/blog"
        className="mt-6 inline-block text-sm font-medium text-accent-blue transition-colors duration-200 hover:text-accent-purple"
      >
        View all posts →
      </Link>
    </SectionWrapper>
  );
}
