import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const advisers = await prisma.adviser.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(advisers)
  } catch (error) {
    console.error('Error fetching advisers:', error)
    return NextResponse.json({ error: 'Failed to fetch advisers' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { nameBn, nameEn, designationBn, designationEn, titleBn, titleEn, image, order, status } = data

    if (!nameBn || !nameEn || !designationBn || !designationEn) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const adviser = await prisma.adviser.create({
      data: {
        nameBn,
        nameEn,
        designationBn,
        designationEn,
        titleBn: titleBn || null,
        titleEn: titleEn || null,
        image: image || null,
        order: order !== undefined ? parseInt(order.toString(), 10) : 0,
        status: status || 'ACTIVE',
      },
    })

    return NextResponse.json(adviser, { status: 201 })
  } catch (error) {
    console.error('Error creating adviser:', error)
    return NextResponse.json({ error: 'Failed to create adviser' }, { status: 500 })
  }
}
