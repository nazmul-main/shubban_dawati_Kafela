'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/context/LanguageContext'
import * as LucideIcons from 'lucide-react'
import { X } from 'lucide-react'
import styles from './Activities.module.css'

interface ActivityProps {
  id: string
  titleBn: string
  titleEn: string
  descriptionBn: string
  descriptionEn: string
  icon: string | null
}

const DynamicIcon = ({ name, size = 32 }: { name: string, size?: number }) => {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType>)[name] || LucideIcons.Activity
  return <IconComponent size={size} />
}

export default function ActivitiesClient({ activities }: { activities: ActivityProps[] }) {
  const { t, language } = useLanguage()
  const [selectedActivity, setSelectedActivity] = useState<ActivityProps | null>(null)

  return (
    <>
      {/* Banner - matching other pages */}
      <section className={`${styles.banner} islamic-pattern`}>
        <div className="container text-center">
          <h1 className="heading-lg" style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {t('nav.activities')}
          </h1>
          <p className={styles.bannerSubtitle}>
            {language === 'bn'
              ? 'শুব্বান দাওয়াতি কাফেলার মূল কার্যক্রমসমূহ এবং সমাজ সেবায় আমাদের অবদান'
              : 'The main activities of Shubban Dawati Kafela and our contributions to social service'}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {activities.map((act) => {
              const desc = language === 'bn' ? act.descriptionBn : act.descriptionEn
              const title = language === 'bn' ? act.titleBn : act.titleEn
              const isLong = desc.length > 250

              return (
                <div
                  key={act.id}
                  className={styles.card}
                  onClick={() => setSelectedActivity(act)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.iconWrapper}>
                    <DynamicIcon name={act.icon || 'Activity'} />
                  </div>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <p className={`${styles.cardDesc} ${isLong ? styles.collapsed : ''}`}>
                      {desc}
                    </p>
                    {isLong && (
                      <button
                        className={styles.readMoreBtn}
                        onClick={(e) => { e.stopPropagation(); setSelectedActivity(act) }}
                      >
                        {language === 'bn' ? 'আরও পড়ুন' : 'Read More'}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {selectedActivity && (
        <div className={styles.modalOverlay} onClick={() => setSelectedActivity(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setSelectedActivity(null)}>
              <X size={24} />
            </button>
            <div className={styles.modalHeader}>
              <div className={styles.modalIconWrapper}>
                <DynamicIcon name={selectedActivity.icon || 'Activity'} size={40} />
              </div>
              <h2 className={styles.modalTitle}>
                {language === 'bn' ? selectedActivity.titleBn : selectedActivity.titleEn}
              </h2>
            </div>
            <div className={styles.modalBody}>
              {language === 'bn' ? selectedActivity.descriptionBn : selectedActivity.descriptionEn}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
