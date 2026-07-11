import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

// GET /api/gallery/categories
export async function GET() {
  try {
    const categories = await prisma.galleryCategory.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('GET /api/gallery/categories error:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

// POST /api/gallery/categories — create new category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nameBn, nameEn, slug } = body

    if (!nameBn || !nameEn || !slug) {
      return NextResponse.json({ error: 'nameBn, nameEn, slug required' }, { status: 400 })
    }

    const lastCat = await prisma.galleryCategory.findFirst({ orderBy: { order: 'desc' } })
    const order = lastCat ? lastCat.order + 1 : 0

    const category = await prisma.galleryCategory.create({
      data: { nameBn, nameEn, slug, order },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.error('POST /api/gallery/categories error:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
