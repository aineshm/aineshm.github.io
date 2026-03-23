// src/components/blog-post-card.tsx
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export function BlogPostCard({ post }: { post: PostMeta }) {
  return (
    <article className="py-6">
      <Link
        href={`/blog/${post.slug}`}
        className="group cursor-pointer"
      >
        <h3 className="font-serif text-xl font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent-blue">
          {post.title}
        </h3>
      </Link>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-text-label">
        <time>{post.date}</time>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-body">
        {post.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-[#F4F4F5] px-2 py-0.5 text-[11px] font-medium text-text-body"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
