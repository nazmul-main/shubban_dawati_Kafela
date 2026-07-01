import React from 'react';
import prisma from '@/lib/db';
import styles from '../Dashboard.module.css';

export default async function AdminGalleryPage() {
  const photos = await prisma.gallery.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1>Manage Gallery</h1>
        <p>Upload and organize photos and videos for your media section.</p>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Media</th>
              <th>Title (EN)</th>
              <th>Category</th>
              <th>Date Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {photos.length === 0 ? (
              <tr>
                <td colSpan={5}>No media found in the gallery.</td>
              </tr>
            ) : (
              photos.map((photo) => (
                <tr key={photo.id}>
                  <td>
                    {/* Placeholder for actual image rendering */}
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}></div>
                  </td>
                  <td className={styles.boldCell}>{photo.titleEn}</td>
                  <td>{photo.category}</td>
                  <td>{new Date(photo.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}>
                      Delete
                    </button>
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
