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
    <article className="min-h-screen">
      {/* Hero section with cover image */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                {post.title}
              </h1>
              <p className="text-xl opacity-90">{post.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto py-12">
        {/* Mobile Table of Contents Dropdown */}
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-white border rounded-lg shadow-sm"
          >
            <span className="text-lg font-medium">Table of Contents</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isTableOfContentsOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {isTableOfContentsOpen && (
            <div className="mt-2 p-4 bg-white border rounded-lg shadow-sm">
              <nav>
                <ul className="space-y-2">
                  {post.tableOfContents.map((item) => (
                    <li
                      key={item.id}
                      style={{ marginLeft: `${(item.level - 2) * 1}rem` }}
                    >
                      <a
                        href={`#${item.id}`}
                        className="text-gray-600 hover:text-gray-900 hover:underline"
                        onClick={() => setIsTableOfContentsOpen(false)}
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

        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Desktop Table of Contents - Left Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Table of Contents
              </h2>
              <nav>
                <ul className="space-y-2">
                  {post.tableOfContents.map((item) => (
                    <li
                      key={item.id}
                      style={{ marginLeft: `${(item.level - 2) * 1}rem` }}
                    >
                      <a
                        href={`#${item.id}`}
                        className="text-gray-600 hover:text-gray-900 hover:underline"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Breadcrumb */}
            <BreadcrumbNav
              items={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: post.title, href: `/blog/${post.slug}` },
              ]}
            />

            {/* Meta information */}
            <div className="mt-8 flex items-center justify-between border-b border-gray-200 pb-8">
              <div className="flex items-center">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {post.author.name}
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mt-8 rounded-lg bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Key Highlights
              </h2>
              <ul className="mt-4 space-y-2">
                {post.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-indigo-600">•</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content */}
            <div className="prose prose-lg mt-8 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Conclusion */}
            <div className="mt-12 rounded-lg bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Conclusion
              </h2>
              <p className="mt-4 text-gray-700">{post.conclusion}</p>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link
                href={post.cta.link}
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {post.cta.text}
              </Link>
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
