import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Blog Post Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find the blog post you're looking for.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          title="Return to blog listing page"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
