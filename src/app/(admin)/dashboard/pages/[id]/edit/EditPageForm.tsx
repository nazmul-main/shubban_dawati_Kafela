'use client';

import React, { useActionState } from 'react';
import { updatePage } from '@/actions/pages';
import styles from '../../../Dashboard.module.css';

export default function EditPageForm({ page }: { page: any }) {
  const updateWithId = updatePage.bind(null, page.id);
  const [state, formAction, pending] = useActionState(updateWithId, null);

  return (
    <div className="card">
      <form action={formAction} className={styles.form}>
        {state?.error && <div className="alert alert-error">{state.error}</div>}
        {state?.success && <div className="alert alert-success">Page updated successfully!</div>}
        
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Title (English)</label>
            <input type="text" name="titleEn" className={styles.input} defaultValue={page.titleEn} required />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Title (Bangla)</label>
            <input type="text" name="titleBn" className={styles.input} defaultValue={page.titleBn} required />
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Slug (English)</label>
            <input type="text" name="slugEn" className={styles.input} defaultValue={page.slugEn} required />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Slug (Bangla)</label>
            <input type="text" name="slugBn" className={styles.input} defaultValue={page.slugBn} required />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Content (English)</label>
          <textarea name="contentEn" className={styles.input} style={{ minHeight: '150px' }} defaultValue={page.contentEn} required></textarea>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Content (Bangla)</label>
          <textarea name="contentBn" className={styles.input} style={{ minHeight: '150px' }} defaultValue={page.contentBn} required></textarea>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={pending}>
          {pending ? 'Updating...' : 'Update Page'}
        </button>
      </form>
    </div>
  );
}
