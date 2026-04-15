import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  author?: string
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  author?: string
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => f.replace(/\.(mdx|md)$/, ''))
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs()
  return slugs
    .map(slug => {
      const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
      const fallback = path.join(BLOG_DIR, `${slug}.md`)
      const file = fs.existsSync(filePath) ? filePath : fallback
      const { data } = matter(fs.readFileSync(file, 'utf8'))
      return {
        slug,
        title: data.title ?? '',
        excerpt: data.excerpt ?? '',
        date: data.date ?? '',
        readTime: data.readTime ?? '5 min',
        category: data.category ?? 'Guide',
        author: data.author,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRelatedPosts(slug: string, category: string, limit = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter(p => p.slug !== slug && p.category === category)
    .slice(0, limit)
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const fallback = path.join(BLOG_DIR, `${slug}.md`)
  const file = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null
  if (!file) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  return {
    slug,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    date: data.date ?? '',
    readTime: data.readTime ?? '5 min',
    category: data.category ?? 'Guide',
    author: data.author,
    content,
  }
}
