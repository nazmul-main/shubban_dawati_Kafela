'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/context/LanguageContext'
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react'
import styles from './Contact.module.css'

export default function ContactPage() {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated API call or server action integration
    setIsSuccess(true)
    // Clear fields
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className={styles.wrapper}>
      {/* Header Banner */}
      <section className={`${styles.banner} islamic-pattern`}>
        <div className="container text-center">
          <Mail size={44} className={styles.bannerIcon} />
          <h1 className="heading-lg" style={{ color: 'var(--primary)', margin: '1rem 0 0.5rem' }}>
            {t('contact.title')}
          </h1>
          <p className={styles.bannerSubtitle}>
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Contact Columns */}
      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Info Cards Side */}
            <div className={styles.infoCol}>
              <div className="card card-hover">
                <h3 className="heading-sm" style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                  {t('site.footer.contact')}
                </h3>
                <ul className={styles.infoList}>
                  <li>
                    <MapPin className={styles.infoIcon} size={20} />
                    <div>
                      <strong>{t('nav.home') === 'হোম' ? 'কার্যালয়:' : 'Office:'}</strong>
                      <p style={{ color: 'var(--text-muted)' }}>কাকরাইল, ঢাকা, বাংলাদেশ (Kakrail, Dhaka, Bangladesh)</p>
                    </div>
                  </li>
                  <li>
                    <Phone className={styles.infoIcon} size={20} />
                    <div>
                      <strong>{t('nav.home') === 'হোম' ? 'ফোন নম্বর:' : 'Phone:'}</strong>
                      <p style={{ color: 'var(--text-muted)' }}>+৮৮০ ১২৩৪৫৬৭৮৯০ (+880 1234567890)</p>
                    </div>
                  </li>
                  <li>
                    <Mail className={styles.infoIcon} size={20} />
                    <div>
                      <strong>{t('nav.home') === 'হোম' ? 'ইমেইল:' : 'Email:'}</strong>
                      <p style={{ color: 'var(--text-muted)' }}>info@shubban.org</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Side */}
            <div className={styles.formCol}>
              {isSuccess ? (
                <div className="card text-center" style={{ borderColor: 'var(--accent)', animation: 'fadeIn 0.3s ease-out' }}>
                  <div className={styles.successIconWrapper}>
                    <Check size={40} />
                  </div>
                  <h2 className="heading-sm" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                    {t('nav.home') === 'হোম' ? 'ধন্যবাদ!' : 'Thank You!'}
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                    {t('contact.success')}
                  </p>
                  <button onClick={() => setIsSuccess(false)} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                    {t('nav.home') === 'হোম' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card card-hover">
                  <div className="form-group">
                    <label className="form-label">{t('donate.name')} *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('donate.email')} *</label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('contact.message')} *</label>
                    <textarea
                      required
                      className="form-textarea"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    <Send size={18} /> {t('contact.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
