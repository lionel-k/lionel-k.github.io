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
    <article className="min-h-screen bg-gray-100 text-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white shadow-md">
        <BreadcrumbNav
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />
      </div>

      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[350px] w-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover rounded-md shadow-lg"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-lg opacity-90 mt-2">{post.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Table of Contents (Mobile) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white text-gray-900 rounded-lg shadow-sm border"
          >
            <span className="text-lg font-medium">Table of Contents</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isTableOfContentsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isTableOfContentsOpen && (
            <div className="mt-2 p-4 bg-white rounded-lg shadow-md">
              <nav>
                <ul className="space-y-3">
                  {post.tableOfContents.map((item) => (
                    <li key={item.id} className="ml-4">
                      <a
                        href={`#${item.id}`}
                        className="text-gray-700 hover:text-indigo-600"
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

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Table of Contents (Desktop) */}
          <aside className="hidden lg:block w-72">
            <div className="sticky top-24 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Table of Contents</h2>
              <nav className="mt-4">
                <ul className="space-y-2">
                  {post.tableOfContents.map((item) => (
                    <li key={item.id} className="ml-4">
                      <a
                        href={`#${item.id}`}
                        className="text-gray-700 hover:text-indigo-600"
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
            {/* Meta Info */}
            <div className="flex items-center justify-between pb-6 border-b">
              <div>
                <p className="text-sm text-gray-600">By {post.author}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  • {post.readingTime}
                </p>
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>

            {/* Key Highlights */}
            <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Key Highlights</h2>
              <ul className="mt-4 list-disc list-inside text-gray-700">
                {post.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </section>

            {/* Content */}
            <section className="prose prose-lg mt-8 text-gray-800">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </section>

            {/* Conclusion */}
            <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Conclusion</h2>
              <p className="mt-4 text-gray-700 whitespace-pre-line">
                {post.conclusion}
              </p>
            </section>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link
                href={post.cta.link}
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
              >
                {post.cta.text}
              </Link>
            </div>
          </main>
        </div>
      </div>
    </article>
  );
}
