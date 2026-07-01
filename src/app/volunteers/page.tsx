'use client'

import React, { useActionState } from 'react'
import { useLanguage } from '@/components/context/LanguageContext'
import { Award, User, Phone, Mail, MapPin, Send, Check } from 'lucide-react'
import { submitVolunteer } from '@/actions/volunteers'
import styles from './Volunteers.module.css'

export default function VolunteerPage() {
  const { t } = useLanguage()
  const [state, formAction, isPending] = useActionState(submitVolunteer, undefined)

  return (
    <div className={styles.wrapper}>
      {/* Header Banner */}
      <section className={`${styles.banner} islamic-pattern`}>
        <div className="container text-center">
          <Award size={44} className={styles.bannerIcon} />
          <h1 className="heading-lg" style={{ color: 'var(--primary)', margin: '1rem 0 0.5rem' }}>
            {t('volunteer.title')}
          </h1>
          <p className={styles.bannerSubtitle}>
            {t('volunteer.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Registration Container */}
      <section className="section">
        <div className="container" style={{ maxWidth: '640px' }}>
          {state?.success ? (
            <div className="card text-center" style={{ borderColor: 'var(--accent)', animation: 'fadeIn 0.3s ease-out' }}>
              <div className={styles.successIconWrapper}>
                <Check size={40} />
              </div>
              <h2 className="heading-sm" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                {t('nav.home') === 'হোম' ? 'জাজাকাল্লাহু খাইরান!' : 'Jazakallahu Khairan!'}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                {t('volunteer.success')}
              </p>
              <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                {t('nav.home') === 'হোম' ? 'আরেকটি আবেদন পেশ করুন' : 'Submit Another Application'}
              </button>
            </div>
          ) : (
            <form action={formAction} className="card card-hover">
              {state?.error && (
                <div style={{ backgroundColor: '#fef2f2', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '1rem' }}>
                  ⚠️ {state.error}
                </div>
              )}

              {/* Form Input Groups */}
              <div className="form-group">
                <label className="form-label">{t('donate.name')} *</label>
                <div className={styles.inputWrapper}>
                  <User size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="name"
                    required
                    className={`${styles.formInput} form-input`}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('donate.phone')} *</label>
                <div className={styles.inputWrapper}>
                  <Phone size={18} className={styles.inputIcon} />
                  <input
                    type="tel"
                    name="phone"
                    required
                    className={`${styles.formInput} form-input`}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('donate.email')} *</label>
                <div className={styles.inputWrapper}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    required
                    className={`${styles.formInput} form-input`}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('volunteer.address')} *</label>
                <div className={styles.inputWrapper}>
                  <MapPin size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="address"
                    required
                    className={`${styles.formInput} form-input`}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('volunteer.skills')} *</label>
                <textarea
                  name="skills"
                  required
                  placeholder={t('nav.home') === 'হোম' 
                    ? 'যেমন: গ্রাফিক্স ডিজাইন, ভিডিও এডিটিং, কন্টেন্ট রাইটিং, দাওয়াত পরিচালনা ইত্যাদি...' 
                    : 'e.g. Graphics Design, Video Editing, Content Writing, Event Management, etc.'}
                  className="form-textarea"
                />
              </div>

              <button type="submit" disabled={isPending} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                <Send size={18} /> {isPending ? 'Submitting...' : t('volunteer.submit')}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
