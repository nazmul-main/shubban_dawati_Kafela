/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use server';

import prisma from '@/lib/db';
import { auth } from '@/auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const donationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  amount: z.coerce.number().min(10),
  method: z.string().min(2),
  transactionId: z.string().min(5),
});

export async function submitDonation(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    amount: formData.get('amount'),
    method: formData.get('method'),
    transactionId: formData.get('transactionId'),
  };

  const parsed = donationSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: 'Please check your form inputs.', details: parsed.error.flatten() };
  }

  try {
    const donation = await prisma.donation.create({
      data: parsed.data,
    });
    return { success: true, donation };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: 'Transaction ID already exists.' };
    }
    return { error: 'Failed to submit donation.' };
  }
}

// Admin only route
export async function getDonations() {
  const session = await auth();
  if (!session) return { error: 'Unauthorized.' };

  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { donations };
  } catch (error) {
    return { error: 'Failed to fetch donations.' };
  }
}
