/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client'

import React from 'react'
import { useLanguage } from '@/components/context/LanguageContext'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'
import styles from './Events.module.css'

export default function EventsClient({ events }: { events: any[] }) {
  const { t } = useLanguage()

  return (
    <div className={styles.wrapper}>
      {/* Header Banner */}
      <section className={`${styles.banner} islamic-pattern`}>
        <div className="container text-center">
          <h1 className="heading-lg" style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {t('nav.events')}
          </h1>
          <p className={styles.bannerSubtitle}>
            {t('nav.home') === 'হোম' ? 'আমাদের আসন্ন ও সম্পন্ন কার্যক্রমসমূহ' : 'Our Upcoming & Completed Events'}
          </p>
        </div>
      </section>

      {/* Main Events List */}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {events.length > 0 ? (
              events.map((evt) => {
                // Determine if event is upcoming or past based on current date
                const isUpcoming = new Date(evt.eventDate) > new Date()
                
                return (
                  <div
                    key={evt.id}
                    className={`card card-hover ${styles.eventCard} ${
                      !isUpcoming ? styles.completedCard : ''
                    }`}
                  >
                    <div className={styles.statusRow}>
                      <span
                        className={`badge ${
                          isUpcoming ? 'badge-accent' : 'badge-primary'
                        }`}
                      >
                        {isUpcoming
                          ? t('nav.home') === 'হোম'
                            ? 'আসন্ন'
                            : 'Upcoming'
                          : t('nav.home') === 'হোম'
                          ? 'সম্পন্ন'
                          : 'Completed'}
                      </span>
                    </div>

                    <h3 className="heading-sm" style={{ color: 'var(--primary)', margin: '1rem 0' }}>
                      {t('nav.home') === 'হোম' ? evt.titleBn : evt.titleEn}
                    </h3>

                    <p className={styles.description}>
                      {t('nav.home') === 'হোম' ? evt.descriptionBn : evt.descriptionEn}
                    </p>

                    <div className={styles.detailsList}>
                      <div className={styles.detailItem}>
                        <Calendar size={16} className={styles.icon} />
                        <span>{new Date(evt.eventDate).toLocaleDateString()}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <Clock size={16} className={styles.icon} />
                        <span>{new Date(evt.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <MapPin size={16} className={styles.icon} />
                        <span>{evt.location}</span>
                      </div>
                    </div>

                    {isUpcoming && (
                      <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                        <a href="/volunteers" className="btn btn-primary btn-sm btn-outline">
                          {t('nav.home') === 'হোম' ? 'যোগ দিন' : 'Register Now'} <ArrowRight size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="text-center" style={{ gridColumn: '1 / -1', padding: '3rem', color: 'var(--text-muted)' }}>
                {t('nav.home') === 'হোম' ? 'কোন ইভেন্ট পাওয়া যায়নি।' : 'No events found.'}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
