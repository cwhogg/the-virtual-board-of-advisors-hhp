import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface Post {
  slug: string
  title: string
  description: string
  type: string
  date: string
  content: string
  targetKeywords?: string
  ideaName?: string
  status?: string
}

const typeToDirectory: Record<string, string> = {
  'blog-post': 'content/blog',
  'comparison': 'content/comparison',
  'faq': 'content/faq'
}

export async function getAllPosts(type: string): Promise<Post[]> {
  const directory = typeToDirectory[type]
  if (!directory) {
    return []
  }

  try {
    const files = fs.readdirSync(directory)
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async file => {
          const slug = file.replace(/\.md$/, '')
          return await getPostBySlug(type, slug)
        })
        .filter(Boolean)
    )
    
    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    return []
  }
}

export async function getPostBySlug(type: string, slug: string): Promise<Post | null> {
  const directory = typeToDirectory[type]
  if (!directory) {
    return null
  }

  try {
    const filePath = path.join(directory, `${slug}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await remark()
      .use(remarkHtml)
      .process(content)
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      type: data.type || type,
      date: data.date || new Date().toISOString(),
      content: processedContent.toString(),
      targetKeywords: data.targetKeywords,
      ideaName: data.ideaName,
      status: data.status
    }
  } catch (error) {
    return null
  }
}