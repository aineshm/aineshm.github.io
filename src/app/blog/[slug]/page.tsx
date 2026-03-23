// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Ainesh Mohan`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <Link
        href="/blog"
        className="mb-8 inline-block text-sm text-text-muted transition-colors duration-200 hover:text-text-primary"
      >
        ← Back to blog
      </Link>

      <header className="mb-10">
        <h1 className="mb-3 font-serif text-3xl font-bold leading-tight text-text-primary">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-text-label">
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
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
      </header>

      <article className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-text-primary prose-p:text-text-body prose-p:leading-relaxed prose-a:text-accent-blue prose-a:underline hover:prose-a:text-accent-purple prose-strong:text-text-primary prose-ul:text-text-body prose-ol:text-text-body prose-blockquote:border-accent-blue prose-blockquote:text-text-muted">
        <MDXRemote source={post.content} />
      </article>

      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/blog"
          className="text-sm text-text-muted transition-colors duration-200 hover:text-text-primary"
        >
          ← Back to blog
        </Link>
      </div>
    </div>
  );
}
