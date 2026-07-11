'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/components/context/LanguageContext'
import { CheckCircle, ShieldAlert, Award, Landmark } from 'lucide-react'
import { AdviserCardSkeleton } from '@/components/ui/Skeleton'
import styles from './About.module.css'

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

export default function AboutPage() {
  const { t, language } = useLanguage()
  const [advisers, setAdvisers] = useState<AdviserProps[]>([])
  const [loadingAdvisers, setLoadingAdvisers] = useState(true)

  useEffect(() => {
    const fetchAdvisers = async () => {
      try {
        const res = await fetch('/api/advisers')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data)) {
            const active = data.filter((adv: AdviserProps) => adv.status === 'ACTIVE')
            setAdvisers(active)
          }
        }
      } catch (err) {
        console.error('Failed to fetch advisers', err)
      } finally {
        setLoadingAdvisers(false)
      }
    }
    fetchAdvisers()
  }, [])

  const objectives = [
    {
      titleBn: 'চরিত্র গঠন',
      titleEn: 'Character Building',
      descBn: 'তরুণদেরকে সঠিক নৈতিক শিক্ষা দিয়ে উত্তম চরিত্রের অধিকারী হিসেবে গড়ে তোলা।',
      descEn: 'Building youths with high moral standards and authentic Islamic character.',
    },
    {
      titleBn: 'দাওয়াতি কাজ',
      titleEn: 'Islamic Dawah',
      descBn: 'আধুনিক মাধ্যমে সর্বস্তরের মানুষের মাঝে ইসলামের সৌন্দর্য তুলে ধরা।',
      descEn: 'Presenting the beauty and wisdom of Islam to everyone using modern media.',
    },
    {
      titleBn: 'সমাজসেবা',
      titleEn: 'Social Welfare',
      descBn: 'দারিদ্র্য বিমোচন ও দুর্যোগকালীন সময়ে ত্রাণ ও পুনর্বাসন কাজ করা।',
      descEn: 'Running charity, relief, and rehabilitation projects for the needy.',
    },
  ]

  // Remove static advisoryBoard
  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={`${styles.banner} islamic-pattern`}>
        <div className="container text-center">
          <h1 className="heading-lg" style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {t('nav.about')}
          </h1>
          <p className={styles.bannerSubtitle}>
            {t('site.title')}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className={styles.missionVisionGrid}>
            <div className="card card-hover">
              <div className={styles.cardHeader}>
                <Award className={styles.icon} />
                <h2 className="heading-sm" style={{ margin: 0 }}>{t('about.mission')}</h2>
              </div>
              <p style={{ color: 'var(--text-muted)' }}>
                {t('nav.home') === 'হোম'
                  ? 'যুবসমাজকে ভ্রান্ত আদর্শের হাত থেকে রক্ষা করে আল-কোরআন ও সুন্নাহর ভিত্তিতে জীবন গঠনে উদ্বুদ্ধ করা এবং সমাজের সকল স্তরে ইসলামের দাওয়াত পৌঁছে দেয়া।'
                  : 'To protect the youth from misguidance, encourage them to build their lives based on the Quran and Sunnah, and convey the message of Islam to all layers of society.'}
              </p>
            </div>
            <div className="card card-hover">
              <div className={styles.cardHeader}>
                <ShieldAlert className={styles.icon} />
                <h2 className="heading-sm" style={{ margin: 0 }}>{t('about.vision')}</h2>
              </div>
              <p style={{ color: 'var(--text-muted)' }}>
                {t('nav.home') === 'হোম'
                  ? 'একটি ইনসাফপূর্ণ, সুশৃঙ্খল ও নৈতিকভাবে উন্নত আদর্শ সমাজ গঠন যেখানে যুবসমাজ সর্বাগ্রে নেতৃত্ব প্রদান করবে।'
                  : 'To establish a just, orderly, and morally upright model society where the youth take the leading roles.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History & Landmark */}
      <section className={`${styles.historySection} section`}>
        <div className="container">
          <div className={styles.historyGrid}>
            <div className={styles.historyVisual}>
              <Landmark size={120} className={styles.landmarkIcon} />
            </div>
            <div className={styles.historyContent}>
              <h2 className="heading-md" style={{ color: 'var(--primary)' }}>
                {t('nav.home') === 'হোম' ? 'আমাদের ইতিহাস' : 'Our History'}
              </h2>
              <p className={styles.historyText}>
                {t('nav.home') === 'হোম'
                  ? 'শুব্বান দাওয়াতি কাফেলা ২০১৬ সালে কিছু উদ্যমী ও দ্বীনদার তরুণের সমন্বয়ে প্রতিষ্ঠিত হয়। সূচনালগ্ন থেকেই এটি তরুণদের চারিত্রিক সংশোধন ও সামাজিক কল্যাণে নানামুখী কাজ পরিচালনা করে আসছে।'
                  : 'Shubban Dawati Kafela was established in 2016 by a group of energetic and pious youths. Since its inception, it has been executing various activities for character reformation and social welfare.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section">
        <div className="container">
          <h2 className="heading-lg text-center" style={{ marginBottom: '3rem' }}>
            {t('nav.home') === 'হোম' ? 'আমাদের লক্ষ্য ও উদ্দেশ্যসমূহ' : 'Our Objectives'}
          </h2>
          <div className={styles.objectivesGrid}>
            {objectives.map((obj, idx) => (
              <div key={idx} className={`${styles.objCard} card`}>
                <CheckCircle className={styles.checkIcon} />
                <div>
                  <h3 className="heading-sm" style={{ margin: '0 0 0.5rem' }}>
                    {t('nav.home') === 'হোম' ? obj.titleBn : obj.titleEn}
                  </h3>
                  <p style={{ color: 'var(--text-muted)' }}>
                    {t('nav.home') === 'হোম' ? obj.descBn : obj.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board Section */}
      {(loadingAdvisers || advisers.length > 0) && (
        <section className={`${styles.teamSection} section`}>
          <div className="container">
            <h2 className="heading-lg text-center" style={{ marginBottom: '3rem' }}>
              {language === 'bn' ? 'উপদেষ্টা পরিষদ' : 'Advisory Board'}
            </h2>
            <div className={styles.teamGrid}>
              {loadingAdvisers ? (
                Array.from({ length: 6 }).map((_, i) => <AdviserCardSkeleton key={`adv-skel-${i}`} />)
              ) : (
                advisers.map((adv) => (
                  <div key={adv.id} className={styles.teamCard}>
                    {adv.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={adv.image} 
                        alt={language === 'bn' ? adv.nameBn : adv.nameEn} 
                        className={styles.adviserImage}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        <span>{language === 'bn' ? adv.nameBn.charAt(0) : adv.nameEn.charAt(0)}</span>
                      </div>
                    )}
                    <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', margin: '1rem 0 0.15rem' }}>
                      {language === 'bn' ? adv.designationBn : adv.designationEn}
                    </p>
                    <h3 className="heading-sm" style={{ margin: '0 0 0.15rem', fontSize: '1.05rem', fontWeight: 'bold' }}>
                      {language === 'bn' ? adv.nameBn : adv.nameEn}
                    </h3>
                    {(language === 'bn' ? adv.titleBn : adv.titleEn) && (
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {language === 'bn' ? adv.titleBn : adv.titleEn}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
