import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface MdxDoc {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  author?: string
  heroImage?: string
  content: string
  tags?: string[]
}

export interface MdxDocMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  author?: string
  heroImage?: string
  tags?: string[]
}

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => f.replace(/\.(mdx|md)$/, ''))
}

function readDoc(dir: string, slug: string): MdxDoc | null {
  const mdx = path.join(dir, `${slug}.mdx`)
  const md = path.join(dir, `${slug}.md`)
  const file = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null
  if (!file) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  return {
    slug,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    date: data.date ?? '',
    readTime: data.readTime ?? '8 min',
    category: data.category ?? 'Guide',
    author: data.author,
    heroImage: data.heroImage,
    content,
    tags: data.tags ?? [],
  }
}

// ─── Best-of ──────────────────────────────────────────────────────────────────

const BEST_DIR = path.join(process.cwd(), 'content/best')

export function getAllBestOfSlugs(): string[] {
  return readDir(BEST_DIR)
}

export function getBestOfDoc(slug: string): MdxDoc | null {
  return readDoc(BEST_DIR, slug)
}

// ─── Guides ───────────────────────────────────────────────────────────────────

const GUIDES_DIR = path.join(process.cwd(), 'content/guides')

export function getAllGuidesSlugs(): string[] {
  return readDir(GUIDES_DIR)
}

export function getGuideDoc(slug: string): MdxDoc | null {
  return readDoc(GUIDES_DIR, slug)
}
