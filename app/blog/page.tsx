import Link from 'next/link'
import { getAllPosts } from '../../lib/content'

export default async function BlogPage() {
  const posts = await getAllPosts('blog-post')

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-heading mb-4">
            Insights for Your Growth Journey
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Thoughtful perspectives on coaching, personal development, and maintaining momentum between sessions.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-background-elevated rounded-lg p-12 border border-color border-opacity-20">
              <h3 className="text-xl font-semibold mb-4 text-text-secondary">
                More insights coming soon
              </h3>
              <p className="text-text-muted">
                We're preparing thoughtful content to support your coaching journey. Check back soon for valuable insights and frameworks.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-background-elevated rounded-lg p-8 border border-color border-opacity-20 hover:border-opacity-40 transition-all duration-200">
                <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                <h2 className="text-2xl font-semibold font-heading mb-4 hover:text-primary-light transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-text-secondary leading-relaxed mb-6">
                  {post.description}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}