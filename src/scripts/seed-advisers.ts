import 'dotenv/config'
import { Status } from '@prisma/client'
import prisma from '../lib/db'

const advisers = [
  {
    nameBn: 'মুফতি ড. আবু ইউসুফ আল-মাদানি',
    nameEn: 'Mufti Dr. Abu Yusuf Al-Madani',
    designationBn: 'প্রধান উপদেষ্টা',
    designationEn: 'Chief Adviser',
    titleBn: 'ইসলামী গবেষক ও পিএইচডি (মদিনা বিশ্ববিদ্যালয়)',
    titleEn: 'Islamic Scholar & PhD (Madinah University)',
    image: null,
    order: 1,
    status: Status.ACTIVE
  },
  {
    nameBn: 'মাওলানা মোহাম্মদ আব্দুল হাই',
    nameEn: 'Maulana Mohammad Abdul Hai',
    designationBn: 'উপদেষ্টা',
    designationEn: 'Adviser',
    titleBn: 'মুহাদ্দিস ও ইসলামী চিন্তাবিদ',
    titleEn: 'Hadith Scholar & Islamic Thinker',
    image: null,
    order: 2,
    status: Status.ACTIVE
  },
  {
    nameBn: 'প্রফেসর ড. মুহাম্মদ জাকির হোসাইন',
    nameEn: 'Professor Dr. Muhammad Zakir Hossain',
    designationBn: 'উপদেষ্টা',
    designationEn: 'Adviser',
    titleBn: 'অধ্যাপক, ঢাকা বিশ্ববিদ্যালয়',
    titleEn: 'Professor, University of Dhaka',
    image: null,
    order: 3,
    status: Status.ACTIVE
  }
]

async function main() {
  console.log('Start seeding advisers...')

  // Clear existing advisers first
  await prisma.adviser.deleteMany()

  for (const adv of advisers) {
    const adviser = await prisma.adviser.create({
      data: adv
    })
    console.log(`Created adviser with id: ${adviser.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
