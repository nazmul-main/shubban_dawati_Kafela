'use client';

import React, { useActionState } from 'react';
import { createPage } from '@/actions/pages';
import styles from '../../Dashboard.module.css';

export default function CreatePage() {
  const [state, formAction, pending] = useActionState(createPage, null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1>Create New Page/Tab</h1>
        <p>Add a new static page or a new tab for the About section (e.g. slug: about-intro).</p>
      </div>
      
      <div className="card">
        <form action={formAction} className={styles.form}>
          {state?.error && <div className="alert alert-error">{state.error}</div>}
          {state?.success && <div className="alert alert-success">Page created successfully!</div>}
          
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Title (English)</label>
              <input type="text" name="titleEn" className={styles.input} required />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Title (Bangla)</label>
              <input type="text" name="titleBn" className={styles.input} required />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Slug (English) - Must be unique</label>
              <input type="text" name="slugEn" className={styles.input} placeholder="e.g. about-intro" required />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Slug (Bangla) - Must be unique</label>
              <input type="text" name="slugBn" className={styles.input} placeholder="e.g. about-intro-bn" required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Content (English)</label>
            <textarea name="contentEn" className={styles.input} style={{ minHeight: '150px' }} required></textarea>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Content (Bangla)</label>
            <textarea name="contentBn" className={styles.input} style={{ minHeight: '150px' }} required></textarea>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={pending}>
            {pending ? 'Creating...' : 'Create Page'}
          </button>
        </form>
      </div>
    </div>
  );
}
