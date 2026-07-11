import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { type, sessionId } = body // type: "like" | "love" | "care"

    if (!id || !type || !sessionId) {
      return NextResponse.json({ error: 'Post ID, type, and Session ID required' }, { status: 400 })
    }

    // Check if reaction exists
    const existing = await prisma.blogReaction.findUnique({
      where: {
        postId_sessionId: {
          postId: id,
          sessionId,
        },
      },
    })

    if (existing) {
      if (existing.type === type) {
        // Toggle off if same type
        await prisma.blogReaction.delete({
          where: {
            postId_sessionId: {
              postId: id,
              sessionId,
            },
          },
        })
        return NextResponse.json({ action: 'removed' })
      } else {
        // Update type if different
        const updated = await prisma.blogReaction.update({
          where: {
            postId_sessionId: {
              postId: id,
              sessionId,
            },
          },
          data: { type },
        })
        return NextResponse.json({ action: 'updated', reaction: updated })
      }
    } else {
      // Create new reaction
      const created = await prisma.blogReaction.create({
        data: {
          postId: id,
          sessionId,
          type,
        },
      })
      return NextResponse.json({ action: 'added', reaction: created })
    }
  } catch (error) {
    console.error('POST /api/blog/[id]/react error:', error)
    return NextResponse.json({ error: 'Failed to record reaction' }, { status: 500 })
  }
}
