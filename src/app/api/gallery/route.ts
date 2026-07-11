import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

// GET /api/gallery — fetch photos with optional filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const categorySlug = searchParams.get('category') // 'all' or slug
    const year = searchParams.get('year')

    const where: Record<string, unknown> = { status: 'ACTIVE' }

    if (categorySlug && categorySlug !== 'all') {
      const cat = await prisma.galleryCategory.findUnique({ where: { slug: categorySlug } })
      if (cat) where.categoryId = cat.id
    }

    if (year) {
      where.year = parseInt(year)
    }

    const items = await prisma.gallery.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('GET /api/gallery error:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 })
  }
}

// POST /api/gallery — create gallery item(s)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // body: { images: [{titleBn, titleEn, imageUrl}], categoryId, year, takenAt }
    const { images, categoryId, year, takenAt } = body

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 })
    }

    const created = await prisma.gallery.createMany({
      data: images.map((img: { titleBn: string; titleEn: string; imageUrl: string }) => ({
        titleBn: img.titleBn || 'শিরোনাম',
        titleEn: img.titleEn || 'Gallery Image',
        imageUrl: img.imageUrl,
        categoryId: categoryId || null,
        year: year || new Date().getFullYear(),
        takenAt: takenAt ? new Date(takenAt) : null,
        status: 'ACTIVE',
      })),
    })

    return NextResponse.json({ count: created.count })
  } catch (error) {
    console.error('POST /api/gallery error:', error)
    return NextResponse.json({ error: 'Failed to save gallery items' }, { status: 500 })
  }
}
