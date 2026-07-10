import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await req.json()
    const { nameBn, nameEn, designationBn, designationEn, titleBn, titleEn, image, order, status } = data

    const adviser = await prisma.adviser.update({
      where: { id },
      data: {
        nameBn,
        nameEn,
        designationBn,
        designationEn,
        titleBn: titleBn || null,
        titleEn: titleEn || null,
        image: image || null,
        order: order !== undefined ? parseInt(order.toString(), 10) : 0,
        status,
      },
    })

    return NextResponse.json(adviser)
  } catch (error) {
    console.error('Error updating adviser:', error)
    return NextResponse.json({ error: 'Failed to update adviser' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.adviser.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting adviser:', error)
    return NextResponse.json({ error: 'Failed to delete adviser' }, { status: 500 })
  }
}
