import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await req.json()
    const { titleBn, titleEn, descriptionBn, descriptionEn, icon, image, status } = data

    const activity = await prisma.activity.update({
      where: { id },
      data: {
        titleBn,
        titleEn,
        descriptionBn,
        descriptionEn,
        icon,
        image,
        status,
      },
    })

    return NextResponse.json(activity)
  } catch (error) {
    console.error('Error updating activity:', error)
    return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.activity.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting activity:', error)
    return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 })
  }
}
