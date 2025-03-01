"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/types/blog";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  post: BlogPost;
}

export default function BlogPostClient({ post }: Props) {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  return (
    <article className="min-h-screen bg-white scroll-pt-8">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <BreadcrumbNav
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Table of Contents */}
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white text-gray-900 rounded-lg shadow-sm border"
          >
            <span className="text-base font-medium">Table of Contents</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isTableOfContentsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isTableOfContentsOpen && (
            <div className="mt-2 p-4 bg-white rounded-lg shadow-sm border">
              <nav>
                <ul className="space-y-3">
                  {post.tableOfContents.map((item) => (
                    <li
                      key={item.id}
                      style={{ marginLeft: `${(item.level - 2) * 1}rem` }}
                    >
                      <a
                        href={`#${item.id}`}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Table of Contents */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h2 className="text-sm font-medium text-[#DAA520] uppercase tracking-wide mb-4">
                TABLE OF CONTENTS
              </h2>
              <nav className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                <ul className="space-y-3">
                  {post.tableOfContents.map((item) => (
                    <li
                      key={item.id}
                      style={{ marginLeft: `${(item.level - 2) * 1}rem` }}
                      className="text-[15px]"
                    >
                      <a
                        href={`#${item.id}`}
                        className="text-gray-600 hover:text-[#DAA520] transition-colors"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-3xl">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-[40px] leading-[48px] font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <p>
                  By{" "}
                  {typeof post.author === "string"
                    ? post.author
                    : post.author.name}
                </p>
                <span>•</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span>•</span>
                <p>{post.readingTime}</p>
              </div>
              <p className="mt-4 text-xl text-gray-600">{post.description}</p>
            </header>

            {/* Cover Image */}
            <div className="relative aspect-[16/9] w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Highlights */}
            {post.highlights && post.highlights.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-medium text-[#DAA520] uppercase tracking-wide mb-4">
                  KEY HIGHLIGHTS
                </h2>
                <ul className="space-y-2">
                  {post.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#DAA520] mr-2">•</span>
                      <span className="text-gray-700">
                        {highlight
                          .split("**")
                          .map((part, i) =>
                            i % 2 === 1 ? (
                              <strong key={i}>{part}</strong>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-0 [&>h1]:!mt-0 [&>h1]:!text-3xl [&>h1]:!font-bold [&>h1]:!mb-4 [&>h1]:!leading-9 [&>h2]:scroll-mt-16 [&>h2]:pt-16 [&>h2]:-mt-16">
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/<h1/g, "<h2")
                    .replace(/<\/h1>/g, "</h2>"),
                }}
              />
            </div>

            {/* CTA */}
            <div className="mt-12 flex justify-center">
              <Link
                href={post.cta.link}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-base font-medium text-black bg-[#F5A524] rounded-lg hover:bg-[#F5A524]/90 transition-colors"
              >
                {post.cta.text}
                <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </article>
  );
}
