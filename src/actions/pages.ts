/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const pageSchema = z.object({
  titleBn: z.string().min(2, "Bangla Title is required"),
  titleEn: z.string().min(2, "English Title is required"),
  slugBn: z.string().min(2, "Bangla Slug is required"),
  slugEn: z.string().min(2, "English Slug is required"),
  contentBn: z.string().min(5, "Bangla Content is required"),
  contentEn: z.string().min(5, "English Content is required"),
});

export async function createPage(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return { error: 'Unauthorized.' };
  }

  const rawData = {
    titleBn: formData.get('titleBn'),
    titleEn: formData.get('titleEn'),
    slugBn: formData.get('slugBn'),
    slugEn: formData.get('slugEn'),
    contentBn: formData.get('contentBn'),
    contentEn: formData.get('contentEn'),
  };

  const parsed = pageSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: 'Invalid data format.', details: parsed.error.flatten() };
  }

  try {
    const page = await prisma.page.create({
      data: {
        ...parsed.data,
        createdById: session.user.id as string,
        status: 'ACTIVE',
      },
    });

    revalidatePath('/dashboard/pages');
    revalidatePath('/about');
    return { success: true, page };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: 'A page with this slug already exists.' };
    }
    return { error: 'Failed to create page.' };
  }
}

export async function updatePage(id: string, prevState: any, formData: FormData) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return { error: 'Unauthorized.' };
  }

  const rawData = {
    titleBn: formData.get('titleBn'),
    titleEn: formData.get('titleEn'),
    slugBn: formData.get('slugBn'),
    slugEn: formData.get('slugEn'),
    contentBn: formData.get('contentBn'),
    contentEn: formData.get('contentEn'),
  };

  const parsed = pageSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: 'Invalid data format.', details: parsed.error.flatten() };
  }

  try {
    const page = await prisma.page.update({
      where: { id },
      data: {
        ...parsed.data,
        updatedById: session.user.id as string,
      },
    });

    revalidatePath('/dashboard/pages');
    revalidatePath('/about');
    return { success: true, page };
  } catch (error: any) {
    return { error: 'Failed to update page.' };
  }
}

export async function deletePage(id: string) {
  const session = await auth();
  if (!session || !session.user) {
    return { error: 'Unauthorized.' };
  }
  
  try {
    await prisma.page.delete({
      where: { id }
    });
    
    revalidatePath('/dashboard/pages');
    revalidatePath('/about');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete page.' };
  }
}
