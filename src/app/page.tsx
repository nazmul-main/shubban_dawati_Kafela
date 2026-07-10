'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/context/LanguageContext'
import { Heart, Users, BookOpen, Calendar, ArrowRight, Award, X } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import styles from './Home.module.css'
import activitiesStyles from './activities/Activities.module.css'

interface ActivityProps {
  id: string
  titleBn: string
  titleEn: string
  descriptionBn: string
  descriptionEn: string
  icon: string | null
  status: string
}

interface AdviserProps {
  id: string
  nameBn: string
  nameEn: string
  designationBn: string
  designationEn: string
  titleBn: string | null
  titleEn: string | null
  image: string | null
  order: number
  status: string
}

const DynamicIcon = ({ name, size = 32 }: { name: string, size?: number }) => {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType>)[name] || LucideIcons.Activity
  return <IconComponent size={size} />
}

export default function HomePage() {
  const { t, language } = useLanguage()
  const [activities, setActivities] = useState<ActivityProps[]>([])
  const [advisers, setAdvisers] = useState<AdviserProps[]>([])
  const [selectedActivity, setSelectedActivity] = useState<ActivityProps | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('/api/activities')
        if (res.ok) {
          const data = await res.json()
          const active = data.filter((act: ActivityProps) => act.status === 'ACTIVE')
          setActivities(active.slice(0, 3))
        }
      } catch (err) {
        console.error('Failed to fetch activities for home page', err)
      }
    }

    const fetchAdvisers = async () => {
      try {
        const res = await fetch('/api/advisers')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data)) {
            const active = data.filter((adv: AdviserProps) => adv.status === 'ACTIVE')
            setAdvisers(active)
          } else {
            console.error('Expected array from API but got:', data)
            setAdvisers([])
          }
        }
      } catch (err) {
        console.error('Failed to fetch advisers for home page', err)
      }
    }

    fetchActivities()
    fetchAdvisers()
  }, [])

  const stats = [
    { icon: <Users className={styles.statIcon} />, count: '৫০০+', countEn: '500+', labelKey: 'stats.volunteers' },
    { icon: <BookOpen className={styles.statIcon} />, count: '১০,০০০+', countEn: '10,000+', labelKey: 'stats.books' },
    { icon: <Calendar className={styles.statIcon} />, count: '৫০+', countEn: '50+', labelKey: 'stats.events' },
    { icon: <Heart className={styles.statIcon} />, count: '৫,০০,০০০+', countEn: '500,000+', labelKey: 'stats.donations' },
  ]

  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={`${styles.hero} islamic-pattern`}>
        <div className="container text-center">
          <h1 className={`${styles.title} heading-xl animate-fade-in`}>
            {t('hero.title')}
          </h1>
          <p className={`${styles.subtitle} subtitle animate-fade-in`} style={{ margin: '0 auto 2.5rem' }}>
            {t('hero.subtitle')}
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/volunteers" className="btn btn-primary">
              {t('hero.cta')} <ArrowRight size={18} />
            </Link>
            <Link href="/donate" className="btn btn-outline">
              {t('hero.donate')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`${styles.statsSection} section`}>
        <div className="container">
          <h2 className="heading-lg text-center" style={{ marginBottom: '3rem' }}>
            {t('stats.title')}
          </h2>
          <div className={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div key={idx} className="card card-hover text-center">
                <div className={styles.iconWrapper}>{stat.icon}</div>
                <div className={styles.statCount}>
                  {t('nav.home') === 'হোম' ? stat.count : stat.countEn}
                </div>
                <div className={styles.statLabel}>{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section Teaser */}
      <section className={`${styles.aboutSection} section`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                <Award size={14} style={{ marginRight: '4px' }} /> Organization
              </div>
              <h2 className="heading-lg">{t('about.title')}</h2>
              <p className={styles.aboutText}>{t('about.desc1')}</p>
              <p className={styles.aboutText}>{t('about.desc2')}</p>
              <Link href="/about" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                {t('nav.about')} <ArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.aboutVisual}>
              <div className={styles.patternBox}>
                <div className={styles.innerPattern}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={`${styles.servicesSection} section`}>
        <div className="container">
          <h2 className="heading-lg text-center" style={{ marginBottom: '3rem' }}>
            {t('nav.home') === 'হোম' ? 'আমাদের মূল কার্যক্রম' : 'Our Core Activities'}
          </h2>
          <div className={activitiesStyles.grid}>
            {activities.map((act) => {
              const desc = language === 'bn' ? act.descriptionBn : act.descriptionEn
              const title = language === 'bn' ? act.titleBn : act.titleEn
              const isLong = desc.length > 250

              return (
                <div 
                  key={act.id} 
                  className={activitiesStyles.card}
                  onClick={() => setSelectedActivity(act)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={activitiesStyles.iconWrapper}>
                    <DynamicIcon name={act.icon || 'Activity'} />
                  </div>
                  <h3 className={activitiesStyles.cardTitle}>{title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <p className={`${activitiesStyles.cardDesc} ${isLong ? activitiesStyles.collapsed : ''}`}>
                      {desc}
                    </p>
                    {isLong && (
                      <button 
                        className={activitiesStyles.readMoreBtn} 
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

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <Link href="/activities" className="btn btn-primary">
              {language === 'bn' ? 'সকল কার্যক্রম দেখুন' : 'View All Activities'} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Donation Banner */}
      <section className={`${styles.donateBanner} section`}>
        <div className="container text-center">
          <h2 className="heading-lg heading-gold" style={{ marginBottom: '1rem' }}>
            {t('donate.title')}
          </h2>
          <p className={styles.donateDesc} style={{ margin: '0 auto 2rem' }}>
            {t('donate.subtitle')}
          </p>
          <Link href="/donate" className="btn btn-accent btn-sm">
            {t('hero.donate')}
          </Link>
        </div>
      </section>

      {/* Advisory Council Section */}
      {advisers.length > 0 && (
        <section className={`${styles.adviserSection} section`}>
          <div className="container">
            <h2 className="heading-lg text-center" style={{ marginBottom: '3rem' }}>
              {language === 'bn' ? 'উপদেষ্টা পরিষদ' : 'Advisory Council'}
            </h2>

            {/* Chief Advisor / Top Advisor */}
            {advisers[0] && (
              <div className={styles.chiefAdviserContainer}>
                <div className={`${styles.adviserCard} ${styles.chiefCard}`}>
                  <div className={styles.avatarWrapper}>
                    {advisers[0].image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={advisers[0].image} 
                        alt={language === 'bn' ? advisers[0].nameBn : advisers[0].nameEn} 
                        className={styles.adviserImage}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {advisers[0].nameBn.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className={styles.adviserInfo}>
                    <span className={styles.adviserDesignation}>
                      {language === 'bn' ? advisers[0].designationBn : advisers[0].designationEn}
                    </span>
                    <h3 className={styles.adviserName}>
                      {language === 'bn' ? advisers[0].nameBn : advisers[0].nameEn}
                    </h3>
                    {advisers[0].titleBn && (
                      <p className={styles.adviserTitle}>
                        {language === 'bn' ? advisers[0].titleBn : advisers[0].titleEn}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Other Advisers Grid */}
            {advisers.length > 1 && (
              <div className={styles.advisersGrid}>
                {advisers.slice(1).map((adv) => (
                  <div key={adv.id} className={styles.adviserCard}>
                    <div className={styles.avatarWrapper}>
                      {adv.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={adv.image} 
                          alt={language === 'bn' ? adv.nameBn : adv.nameEn} 
                          className={styles.adviserImage}
                        />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          {adv.nameBn.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className={styles.adviserInfo}>
                      <span className={styles.adviserDesignation}>
                        {language === 'bn' ? adv.designationBn : adv.designationEn}
                      </span>
                      <h3 className={styles.adviserName}>
                        {language === 'bn' ? adv.nameBn : adv.nameEn}
                      </h3>
                      {adv.titleBn && (
                        <p className={styles.adviserTitle}>
                          {language === 'bn' ? adv.titleBn : adv.titleEn}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Modal Popup */}
      {selectedActivity && (
        <div className={activitiesStyles.modalOverlay} onClick={() => setSelectedActivity(null)}>
          <div className={activitiesStyles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={activitiesStyles.closeButton} onClick={() => setSelectedActivity(null)}>
              <X size={24} />
            </button>
            <div className={activitiesStyles.modalHeader}>
              <div className={activitiesStyles.modalIconWrapper}>
                <DynamicIcon name={selectedActivity.icon || 'Activity'} size={40} />
              </div>
              <h2 className={activitiesStyles.modalTitle}>
                {language === 'bn' ? selectedActivity.titleBn : selectedActivity.titleEn}
              </h2>
            </div>
            <div className={activitiesStyles.modalBody}>
              {language === 'bn' ? selectedActivity.descriptionBn : selectedActivity.descriptionEn}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
