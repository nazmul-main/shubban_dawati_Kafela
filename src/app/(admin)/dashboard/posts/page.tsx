import React from 'react';
import { getPosts, deletePost } from '@/actions/posts';
import styles from '../Dashboard.module.css';

export default async function AdminPostsPage() {
  const result = await getPosts(1, 50);
  
  if (result.error) {
    return <div>Error loading posts: {result.error}</div>;
  }

  const posts = result.posts || [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1>Manage Posts & News</h1>
        <p>View, create, and manage your platform's publications.</p>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title (EN)</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6}>No posts found.</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <td className={styles.boldCell}>{post.titleEn}</td>
                  <td>{post.category?.nameEn || 'N/A'}</td>
                  <td>{post.createdBy?.name || 'Admin'}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>{post.status}</td>
                  <td>
                    <form action={async () => {
                      'use server';
                      await deletePost(post.id);
                    }}>
                      <button type="submit" style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}>
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
