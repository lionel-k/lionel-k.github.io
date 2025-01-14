import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostParams {
  params: {
    slug: string;
  };
}

// This would typically come from a CMS or markdown files
const POST_CONTENT = {
  "importance-of-bilingual-education": {
    title: "The Importance of Bilingual Education for African Children",
    description: "Discover how bilingual education can help preserve cultural heritage while preparing children for a global future.",
    date: "2024-03-20",
    author: "Dr. Sarah Johnson",
    content: `
# The Importance of Bilingual Education for African Children

Bilingual education plays a crucial role in preserving cultural heritage while preparing children for a global future. This article explores the benefits and challenges of bilingual education in the African context.

## Benefits of Bilingual Education

1. Cultural Preservation
2. Cognitive Development
3. Global Opportunities

## Implementation Strategies

- Start early
- Use engaging materials
- Create immersive environments

## Conclusion

Bilingual education is not just about learning two languages; it's about preserving identity while embracing opportunity.
    `,
  },
};

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = POST_CONTENT[params.slug as keyof typeof POST_CONTENT];
  
  if (!post) {
    return {
      title: "Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPost({ params }: BlogPostParams) {
  const post = POST_CONTENT[params.slug as keyof typeof POST_CONTENT];

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-16">
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{post.title}</h1>
        <p className="text-gray-500">
          By {post.author} · {new Date(post.date).toLocaleDateString()}
        </p>
      </header>
      <div className="prose prose-lg mx-auto">
        {post.content}
      </div>
    </article>
  );
}