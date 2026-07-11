import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

// DELETE /api/gallery/[id] — delete gallery item
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 })
    }

    await prisma.gallery.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Gallery item deleted successfully' })
  } catch (error) {
    console.error('DELETE /api/gallery/[id] error:', error)
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 })
  }
}
