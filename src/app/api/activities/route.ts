import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: 'asc' },
    })
    return NextResponse.json(activities)
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { titleBn, titleEn, descriptionBn, descriptionEn, icon, image, status } = data

    if (!titleBn || !titleEn || !descriptionBn || !descriptionEn) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const activity = await prisma.activity.create({
      data: {
        titleBn,
        titleEn,
        descriptionBn,
        descriptionEn,
        icon,
        image,
        status: status || 'ACTIVE',
      },
    })

    return NextResponse.json(activity, { status: 201 })
  } catch (error) {
    console.error('Error creating activity:', error)
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 })
  }
}
