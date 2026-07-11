import prisma from '../src/lib/db'

const defaultCategories = [
  { nameBn: 'সবগুলো', nameEn: 'All', slug: 'all', order: 0 },
  { nameBn: 'ইফতার বিতরণ', nameEn: 'Iftar Distribution', slug: 'iftar-distribution', order: 1 },
  { nameBn: 'এতিম সহায়তা', nameEn: 'Orphan Support', slug: 'orphan-support', order: 2 },
  { nameBn: 'কুরবানি', nameEn: 'Qurbani', slug: 'qurbani', order: 3 },
  { nameBn: 'খাদ্য বিতরণ', nameEn: 'Food Distribution', slug: 'food-distribution', order: 4 },
  { nameBn: 'টিউবওয়েল স্থাপন', nameEn: 'Tubewell Installation', slug: 'tubewell', order: 5 },
  { nameBn: 'ত্রাণ বিতরণ', nameEn: 'Relief Distribution', slug: 'relief-distribution', order: 6 },
  { nameBn: 'ভ্যান বিতরণ', nameEn: 'Van Distribution', slug: 'van-distribution', order: 7 },
  { nameBn: 'শীতবস্ত্র বিতরণ', nameEn: 'Winter Clothes', slug: 'winter-clothes', order: 8 },
  { nameBn: 'বৃক্ষরোপণ', nameEn: 'Tree Plantation', slug: 'tree-plantation', order: 9 },
  { nameBn: 'সাংস্কৃতিক অনুষ্ঠান', nameEn: 'Cultural Events', slug: 'cultural-events', order: 10 },
  { nameBn: 'সেমিনার ও আলোচনা', nameEn: 'Seminars & Discussions', slug: 'seminars', order: 11 },
  { nameBn: 'অন্যান্য', nameEn: 'Others', slug: 'others', order: 12 },
]

async function main() {
  for (const cat of defaultCategories) {
    await prisma.galleryCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log('Gallery categories seeded successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
