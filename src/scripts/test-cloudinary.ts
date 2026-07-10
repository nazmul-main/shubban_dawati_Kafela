import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'
import * as fs from 'fs'
import * as path from 'path'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function test() {
  // Create a tiny 1x1 pixel PNG for testing
  const base64Pixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

  console.log('Test 1: Upload WITHOUT transformations...')
  try {
    const result1 = await cloudinary.uploader.upload(base64Pixel, {
      folder: 'shubban/test',
    })
    console.log('✅ Upload without transformation SUCCESS:', result1.secure_url)
  } catch (err: unknown) {
    const e = err as { message?: string; http_code?: number }
    console.error('❌ Upload without transformation FAILED:', e.message, 'HTTP:', e.http_code)
  }

  console.log('\nTest 2: Upload WITH transformations...')
  try {
    const result2 = await cloudinary.uploader.upload(base64Pixel, {
      folder: 'shubban/test',
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto', fetch_format: 'auto' },
      ],
    })
    console.log('✅ Upload with transformation SUCCESS:', result2.secure_url)
  } catch (err: unknown) {
    const e = err as { message?: string; http_code?: number }
    console.error('❌ Upload with transformation FAILED:', e.message, 'HTTP:', e.http_code)
  }
}

test()
