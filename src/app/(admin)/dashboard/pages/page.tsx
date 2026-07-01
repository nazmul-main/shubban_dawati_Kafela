import React from 'react';
import prisma from '@/lib/db';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import DeletePageButton from './DeletePageButton';
import styles from '../Dashboard.module.css';

export default async function AdminPagesPage() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { createdBy: true }
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Manage Static Pages & Tabs</h1>
          <p>Create and edit website pages and About Us tabs (slug: about-intro).</p>
        </div>
        <Link href="/dashboard/pages/create" className="btn btn-primary">
          + Add New Page
        </Link>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title (EN)</th>
              <th>Slug</th>
              <th>Author</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td colSpan={5}>No pages found. Click Add New Page to get started.</td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id}>
                  <td className={styles.boldCell}>{page.titleEn}</td>
                  <td>/{page.slugEn}</td>
                  <td>{page.createdBy?.name || 'Admin'}</td>
                  <td>{new Date(page.updatedAt).toLocaleDateString()}</td>
                  <td style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link 
                      href={`/dashboard/pages/${page.id}/edit`} 
                      className="btn btn-sm btn-outline"
                      style={{ padding: '0.25rem 0.5rem' }}
                      title="Edit Page"
                    >
                      <Edit size={14} />
                    </Link>
                    <DeletePageButton id={page.id} />
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
