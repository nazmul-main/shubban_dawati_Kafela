import React from 'react';
import NewsClient from './NewsClient';
import { getPosts } from '@/actions/posts';

export default async function NewsPage() {
  const result = await getPosts(1, 100); // Fetch latest 100 posts
  const posts = result.posts || [];

  return <NewsClient posts={posts} />;
}
