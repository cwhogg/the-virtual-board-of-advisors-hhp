import { getAllPosts, getPostBySlug } from '../../../lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts('blog-post')
  return posts.map((post) => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug('blog-post', slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Advisor Echo'
    }
  }

  return {
    title: `${post.title} - Advisor Echo`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description
    }
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('blog-post', slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Advisor Echo'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Advisor Echo'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background text-text-primary">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium mb-8"
            >
              ← Back to insights
            </Link>
          </div>
          
          <article className="prose prose-invert prose-lg max-w-none">
            <header className="mb-12">
              <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <h1 className="text-4xl font-bold font-heading mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-text-secondary leading-relaxed">
                {post.description}
              </p>
            </header>
            
            <div 
              className="prose prose-invert prose-lg max-w-none [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:text-text-secondary [&>p]:leading-relaxed [&>p]:mb-6 [&>ul]:text-text-secondary [&>ol]:text-text-secondary [&>blockquote]:border-l-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>code]:bg-background-elevated [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>pre]:bg-background-elevated [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
    </>
  )
}