import React from 'react';
import prisma from '@/lib/db';
import styles from '../Dashboard.module.css';

export default async function AdminSettingsPage() {
  let settings = await prisma.setting.findFirst();

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1>System Settings</h1>
        <p>Configure global parameters for the Shubban Dawah Kafela website.</p>
      </div>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Site Name (English)</label>
            <input type="text" className={styles.input} defaultValue={settings?.siteNameEn || 'Shubban Dawah Kafela'} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Site Name (Bangla)</label>
            <input type="text" className={styles.input} defaultValue={settings?.siteNameBn || 'শুব্বান দাওয়াতি কাফেলা'} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Contact Email</label>
            <input type="email" className={styles.input} defaultValue={settings?.email || 'info@shubban.org'} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Contact Phone</label>
            <input type="text" className={styles.input} defaultValue={settings?.phone || '+880 1700 000 000'} />
          </div>
          <button type="button" className={styles.submitBtn} style={{ marginTop: '10px' }}>
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
