import React from 'react';
import prisma from '@/lib/db';
import styles from '../Dashboard.module.css';

export default async function AdminPagesPage() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { createdBy: true }
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1>Manage Static Pages</h1>
        <p>Create and edit website pages.</p>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title (EN)</th>
              <th>Slug</th>
              <th>Author</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td colSpan={5}>No pages found.</td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id}>
                  <td className={styles.boldCell}>{page.titleEn}</td>
                  <td>/{page.slugEn}</td>
                  <td>{page.createdBy?.name || 'Admin'}</td>
                  <td>{page.status}</td>
                  <td>{new Date(page.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
