import { getAllPosts, getPostBySlug } from '../../../lib/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts('comparison')
  return posts.map((post) => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug('comparison', slug)
  
  if (!post) {
    return {
      title: 'Comparison Not Found - Advisor Echo'
    }
  }

  return {
    title: `${post.title} - Advisor Echo`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description
    }
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('comparison', slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article className="prose prose-invert prose-lg max-w-none">
          <header className="mb-12">
            <h1 className="text-4xl font-bold font-heading mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-text-secondary leading-relaxed">
              {post.description}
            </p>
          </header>
          
          <div 
            className="prose prose-invert prose-lg max-w-none [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:text-text-secondary [&>p]:leading-relaxed [&>p]:mb-6 [&>ul]:text-text-secondary [&>ol]:text-text-secondary [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-color [&>table]:border-opacity-20 [&>table>thead>tr>th]:bg-background-elevated [&>table>thead>tr>th]:p-4 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:font-medium [&>table>tbody>tr>td]:p-4 [&>table>tbody>tr>td]:border-t [&>table>tbody>tr>td]:border-color [&>table>tbody>tr>td]:border-opacity-10 [&>blockquote]:border-l-primary [&>blockquote]:pl-6 [&>blockquote]:italic"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </main>
  )
}