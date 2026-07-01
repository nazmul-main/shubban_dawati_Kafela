/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const postSchema = z.object({
  titleBn: z.string().min(3, "Bangla Title must be at least 3 characters"),
  titleEn: z.string().min(3, "English Title must be at least 3 characters"),
  slugBn: z.string().min(3),
  slugEn: z.string().min(3),
  contentBn: z.string().min(10),
  contentEn: z.string().min(10),
  categoryId: z.string().uuid(),
});

// Create a new post
export async function createPost(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return { error: 'Unauthorized. You must be logged in to create a post.' };
  }

  const rawData = {
    titleBn: formData.get('titleBn'),
    titleEn: formData.get('titleEn'),
    slugBn: formData.get('slugBn'),
    slugEn: formData.get('slugEn'),
    contentBn: formData.get('contentBn'),
    contentEn: formData.get('contentEn'),
    categoryId: formData.get('categoryId'),
  };

  const parsed = postSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: 'Invalid data format. Please check the fields.', details: parsed.error.flatten() };
  }

  try {
    const post = await prisma.post.create({
      data: {
        ...parsed.data,
        createdById: session.user.id as string,
        status: 'ACTIVE',
      },
    });

    revalidatePath('/dashboard/posts');
    revalidatePath('/news');
    return { success: true, post };
  } catch (error: any) {
    console.error("Error creating post:", error);
    if (error.code === 'P2002') {
      return { error: 'A post with this slug already exists.' };
    }
    return { error: 'An unexpected error occurred while creating the post.' };
  }
}

// Fetch posts (with pagination)
export async function getPosts(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  try {
    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        createdBy: {
          select: { name: true }
        }
      }
    });
    
    const totalCount = await prisma.post.count();
    
    return {
      posts,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { error: 'Failed to fetch posts.' };
  }
}

// Delete post
export async function deletePost(id: string) {
  const session = await auth();
  if (!session || !session.user) {
    return { error: 'Unauthorized.' };
  }
  
  try {
    await prisma.post.delete({
      where: { id }
    });
    
    revalidatePath('/dashboard/posts');
    revalidatePath('/news');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete post.' };
  }
}
