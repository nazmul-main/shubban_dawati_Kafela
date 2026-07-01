/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const eventSchema = z.object({
  titleBn: z.string().min(3),
  titleEn: z.string().min(3),
  descriptionBn: z.string().min(10),
  descriptionEn: z.string().min(10),
  location: z.string().min(3),
  eventDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date string",
  }),
});

export async function createEvent(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    return { error: 'Unauthorized.' };
  }

  const rawData = {
    titleBn: formData.get('titleBn'),
    titleEn: formData.get('titleEn'),
    descriptionBn: formData.get('descriptionBn'),
    descriptionEn: formData.get('descriptionEn'),
    location: formData.get('location'),
    eventDate: formData.get('eventDate'),
  };

  const parsed = eventSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: 'Invalid data format.', details: parsed.error.flatten() };
  }

  try {
    const event = await prisma.event.create({
      data: {
        ...parsed.data,
        eventDate: new Date(parsed.data.eventDate),
        status: 'ACTIVE',
      },
    });

    revalidatePath('/dashboard/events');
    revalidatePath('/events');
    return { success: true, event };
  } catch (error) {
    console.error("Error creating event:", error);
    return { error: 'An unexpected error occurred.' };
  }
}

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { eventDate: 'desc' }
    });
    return { events };
  } catch (error) {
    return { error: 'Failed to fetch events.' };
  }
}

export async function deleteEvent(id: string) {
  const session = await auth();
  if (!session) return { error: 'Unauthorized.' };
  
  try {
    await prisma.event.delete({ where: { id } });
    revalidatePath('/dashboard/events');
    revalidatePath('/events');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete event.' };
  }
}
