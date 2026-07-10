import React from 'react'
import prisma from '@/lib/db'
import ActivitiesClient from './ActivitiesClient'

// Server component to fetch activities
async function getActivities() {
  const activities = await prisma.activity.findMany({
    orderBy: { createdAt: 'asc' },
    where: { status: 'ACTIVE' }
  })
  return activities
}

export default async function ActivitiesPage() {
  const activities = await getActivities()

  return <ActivitiesClient activities={activities} />
}
