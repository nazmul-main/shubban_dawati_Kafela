import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

// GET /api/blog — Fetch posts with aggregated reaction counts and current user's reaction status
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('sessionId')

    const posts = await prisma.blogPost.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { postedAt: 'desc' },
      include: {
        reactions: true,
      },
    })

    // Map posts to format containing count of each reaction type and current user's active reaction
    const formattedPosts = posts.map((post) => {
      const counts = {
        like: post.reactions.filter((r) => r.type === 'like').length,
        love: post.reactions.filter((r) => r.type === 'love').length,
        care: post.reactions.filter((r) => r.type === 'care').length,
      }

      const totalReactions = post.reactions.length

      const userReaction = sessionId
        ? post.reactions.find((r) => r.sessionId === sessionId)?.type || null
        : null

      return {
        id: post.id,
        captionBn: post.captionBn,
        captionEn: post.captionEn,
        images: post.images,
        postedAt: post.postedAt,
        createdAt: post.createdAt,
        reactionCounts: counts,
        totalReactions,
        userReaction,
      }
    })

    return NextResponse.json(formattedPosts)
  } catch (error) {
    console.error('GET /api/blog error:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

// POST /api/blog — Create new blog post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { captionBn, captionEn, images, postedAt } = body

    if (!captionBn && !captionEn) {
      return NextResponse.json({ error: 'At least one caption is required' }, { status: 400 })
    }

    const post = await prisma.blogPost.create({
      data: {
        captionBn: captionBn || '',
        captionEn: captionEn || '',
        images: images || [],
        postedAt: postedAt ? new Date(postedAt) : new Date(),
        status: 'ACTIVE',
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('POST /api/blog error:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
