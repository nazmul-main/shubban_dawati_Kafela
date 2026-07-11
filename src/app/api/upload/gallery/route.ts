import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    if (files.length > 20) {
      return NextResponse.json({ error: 'Cannot upload more than 20 files at once' }, { status: 400 })
    }

    const uploadPromises = files.map(async (file) => {
      // Convert File to base64 data URI
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')
      const mimeType = file.type || 'image/png'
      const dataUri = `data:${mimeType};base64,${base64}`

      // Upload to Cloudinary under the gallery folder without face crop
      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: 'shubban/gallery',
        transformation: [
          { quality: 'auto', fetch_format: 'auto' },
        ],
      })
      
      return uploadResult.secure_url
    })

    const urls = await Promise.all(uploadPromises)

    return NextResponse.json({ urls })
  } catch (error) {
    console.error('Batch image upload error:', error)
    return NextResponse.json({ error: 'Failed to upload images' }, { status: 500 })
  }
}
