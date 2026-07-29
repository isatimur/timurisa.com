// One-off publish script for the 9 AI-engineering blog posts.
// Requires SANITY_API_TOKEN (Editor-level write token) in the environment.
// Idempotent: uses deterministic _ids and createOrReplace, safe to re-run.
//
// Usage: node scripts/publish-blog-posts.mjs [--draft]
//   --draft   write documents as Sanity drafts (drafts.<id>) instead of publishing

import { createClient } from '@sanity/client'
import { posts } from './blog-posts-data.mjs'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN
const asDraft = process.argv.includes('--draft')

if (!projectId || !dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET')
  process.exit(1)
}
if (!token) {
  console.error('Missing SANITY_API_TOKEN. Create an Editor token at https://sanity.io/manage and set it in the environment.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-06',
  token,
  useCdn: false,
})

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function key() {
  return Math.random().toString(36).slice(2, 10)
}

// Convert inline **bold** markers into Portable Text spans.
function textToSpans(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return parts.map((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return { _type: 'span', _key: key(), text: part.slice(2, -2), marks: ['strong'] }
    }
    return { _type: 'span', _key: key(), text: part, marks: [] }
  })
}

function block(style, text, listItem) {
  const b = {
    _type: 'block',
    _key: key(),
    style,
    children: textToSpans(text),
    markDefs: [],
  }
  if (listItem) {
    b.listItem = listItem
    b.level = 1
  }
  return b
}

// Minimal markdown-subset -> Portable Text converter.
// Supports: ## / ### headers, > blockquotes, - bullet lists, blank-line paragraphs, **bold**.
function markdownToBlocks(markdown) {
  const lines = markdown.split('\n')
  const blocks = []
  let paragraphBuffer = []

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      blocks.push(block('normal', paragraphBuffer.join(' ')))
      paragraphBuffer = []
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line === '') {
      flushParagraph()
      continue
    }
    if (line.startsWith('### ')) {
      flushParagraph()
      blocks.push(block('h3', line.slice(4)))
      continue
    }
    if (line.startsWith('## ')) {
      flushParagraph()
      blocks.push(block('h2', line.slice(3)))
      continue
    }
    if (line.startsWith('> ')) {
      flushParagraph()
      blocks.push(block('blockquote', line.slice(2)))
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      flushParagraph()
      blocks.push(block('normal', line.replace(/^[-*]\s+/, ''), 'bullet'))
      continue
    }
    if (/^\d+\.\s+/.test(line)) {
      flushParagraph()
      blocks.push(block('normal', line.replace(/^\d+\.\s+/, ''), 'number'))
      continue
    }

    paragraphBuffer.push(line)
  }
  flushParagraph()
  return blocks
}

async function ensureAuthor() {
  const authorId = 'author-timur-isachenko'
  const doc = {
    _id: authorId,
    _type: 'author',
    name: 'Timur Isachenko',
    slug: { _type: 'slug', current: 'timur-isachenko' },
    role: 'AI CTO at Swiirl | Principal Solution Architect',
  }
  await client.createOrReplace(doc)
  console.log(`✓ author ready: ${authorId}`)
  return authorId
}

async function ensureCategory(title) {
  const id = `category-${slugify(title)}`
  await client.createOrReplace({
    _id: id,
    _type: 'category',
    title,
  })
  return id
}

async function publishPost(post, authorId, categoryId, publishedAt) {
  const baseId = `post-${post.slug}`
  const docId = asDraft ? `drafts.${baseId}` : baseId

  const doc = {
    _id: docId,
    _type: 'post',
    title: post.title,
    slug: { _type: 'slug', current: post.slug },
    author: { _type: 'reference', _ref: authorId },
    categories: [{ _type: 'reference', _ref: categoryId, _key: key() }],
    excerpt: post.excerpt,
    publishedAt,
    body: markdownToBlocks(post.body),
  }

  await client.createOrReplace(doc)
  console.log(`✓ ${asDraft ? 'draft' : 'published'}: ${post.title}`)
}

async function main() {
  console.log(`Target dataset: ${projectId}/${dataset} (${asDraft ? 'DRAFT mode' : 'PUBLISH mode'})`)

  const authorId = await ensureAuthor()

  const categoryCache = new Map()
  const now = Date.now()

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    if (!categoryCache.has(post.category)) {
      categoryCache.set(post.category, await ensureCategory(post.category))
    }
    const categoryId = categoryCache.get(post.category)

    // Stagger publish dates going backward from now, ~4 days apart,
    // so the blog listing doesn't show 9 posts all timestamped identically.
    const publishedAt = new Date(now - (posts.length - i) * 4 * 24 * 60 * 60 * 1000).toISOString()

    await publishPost(post, authorId, categoryId, publishedAt)
  }

  console.log(`\nDone. ${posts.length} posts ${asDraft ? 'drafted' : 'published'}.`)
}

main().catch((err) => {
  console.error('Publish failed:', err.message || err)
  process.exit(1)
})
