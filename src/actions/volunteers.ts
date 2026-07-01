/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use server';

import prisma from '@/lib/db';
import { auth } from '@/auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const volunteerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  address: z.string().min(5),
  skills: z.string().min(2),
});

export async function submitVolunteer(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    address: formData.get('address'),
    skills: formData.get('skills'),
  };

  const parsed = volunteerSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: 'Invalid form data.', details: parsed.error.flatten() };
  }

  try {
    const volunteer = await prisma.volunteer.create({
      data: parsed.data,
    });
    return { success: true, volunteer };
  } catch (error) {
    return { error: 'Failed to submit volunteer application.' };
  }
}

// Admin only route
export async function getVolunteers() {
  const session = await auth();
  if (!session) return { error: 'Unauthorized.' };

  try {
    const volunteers = await prisma.volunteer.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { volunteers };
  } catch (error) {
    return { error: 'Failed to fetch volunteers.' };
  }
}
