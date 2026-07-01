import React from 'react';
import prisma from '@/lib/db';
import { updatePage } from '@/actions/pages';
import EditPageForm from './EditPageForm';
import styles from '../../../Dashboard.module.css';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const page = await prisma.page.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!page) {
    return <div className={styles.wrapper}>Page not found</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1>Edit Page: {page.titleEn}</h1>
        <p>Update the content for this page or tab.</p>
      </div>
      <EditPageForm page={page} />
    </div>
  );
}
