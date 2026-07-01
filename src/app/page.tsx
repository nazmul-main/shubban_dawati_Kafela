'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/context/LanguageContext'
import { Heart, Users, BookOpen, Calendar, ArrowRight, Award } from 'lucide-react'
import styles from './Home.module.css'

export default function HomePage() {
  const { t } = useLanguage()

  const stats = [
    { icon: <Users className={styles.statIcon} />, count: '৫০০+', countEn: '500+', labelKey: 'stats.volunteers' },
    { icon: <BookOpen className={styles.statIcon} />, count: '১০,০০০+', countEn: '10,000+', labelKey: 'stats.books' },
    { icon: <Calendar className={styles.statIcon} />, count: '৫০+', countEn: '50+', labelKey: 'stats.events' },
    { icon: <Heart className={styles.statIcon} />, count: '৫,০০,০০০+', countEn: '500,000+', labelKey: 'stats.donations' },
  ]

  const coreServices = [
    {
      titleBn: 'দাওয়াতি সেমিনার',
      titleEn: 'Dawah Seminars',
      descBn: 'যুবসমাজকে ইসলামের সঠিক বার্তা পৌঁছে দিতে আমরা বিভিন্ন সেমিনার ও দাওয়াতি সভার আয়োজন করি।',
      descEn: 'We organize seminars and discussions to deliver the authentic message of Islam to the youth.',
    },
    {
      titleBn: 'সামাজিক সেবা',
      titleEn: 'Social Service',
      descBn: 'দুস্থ ও অসহায় মানুষের পাশে দাঁড়াতে বিভিন্ন সমাজসেবামূলক ও ত্রাণ কার্যক্রম পরিচালনা করা হয়।',
      descEn: 'We run relief and charity projects to support underprivileged communities.',
    },
    {
      titleBn: 'ইসলামিক পাঠাগার',
      titleEn: 'Islamic Library',
      descBn: 'জ্ঞান অর্জনের প্রসারে বিভিন্ন শিক্ষণীয় ইসলামিক বই বিনামূল্যে সরবরাহ করা হয়।',
      descEn: 'We offer free digital book downloads to propagate authentic Islamic knowledge.',
    },
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
          <div className={styles.servicesGrid}>
            {coreServices.map((service, idx) => (
              <div key={idx} className="card card-hover">
                <h3 className="heading-sm" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                  {t('nav.home') === 'হোম' ? service.titleBn : service.titleEn}
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  {t('nav.home') === 'হোম' ? service.descBn : service.descEn}
                </p>
              </div>
            ))}
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
    </div>
  )
}
