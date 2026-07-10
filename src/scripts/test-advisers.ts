import 'dotenv/config'
import prisma from '../lib/db'

async function main() {
  try {
    const advisers = await prisma.adviser.findMany({
      orderBy: { order: 'asc' },
    })
    console.log('Query Success. Advisers found:', advisers.length)
    console.log(JSON.stringify(advisers, null, 2))
  } catch (error) {
    console.error('Query Failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
