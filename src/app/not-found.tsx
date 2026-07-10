'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/context/LanguageContext'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import styles from './not-found.module.css'

export default function NotFound() {
  const { t, language } = useLanguage()

  // Helper to format 404 in Bengali or English based on language
  const errorCode = language === 'bn' ? '৪০৪' : '404'

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <AlertCircle size={80} className={styles.icon} />
        </div>
        <h1 className={styles.errorCode}>{errorCode}</h1>
        <h2 className={styles.title}>{t('404.title')}</h2>
        <p className={styles.subtitle}>
          {t('404.subtitle')}
        </p>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={18} />
          {t('404.back')}
        </Link>
      </div>
    </div>
  )
}
