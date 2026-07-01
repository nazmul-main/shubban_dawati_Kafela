'use client'

import React, { useState, useActionState } from 'react'
import { useLanguage } from '@/components/context/LanguageContext'
import { Heart, CreditCard, Send, Check } from 'lucide-react'
import { submitDonation } from '@/actions/donations'
import styles from './Donate.module.css'

export default function DonatePage() {
  const { t } = useLanguage()
  const [amount, setAmount] = useState<number>(1000)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [method, setMethod] = useState<string>('bKash')
  
  const [state, formAction, isPending] = useActionState(submitDonation, undefined)

  const presets = [200, 500, 1000, 2000, 5000]
  const activeAmount = customAmount ? parseFloat(customAmount) : amount

  return (
    <div className={styles.wrapper}>
      {/* Header Banner */}
      <section className={`${styles.banner} islamic-pattern`}>
        <div className="container text-center">
          <Heart size={44} className={styles.bannerIcon} />
          <h1 className="heading-lg" style={{ color: 'var(--primary)', margin: '1rem 0 0.5rem' }}>
            {t('donate.title')}
          </h1>
          <p className={styles.bannerSubtitle}>
            {t('donate.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="section">
        <div className="container" style={{ maxWidth: '680px' }}>
          {state?.success ? (
            <div className="card text-center" style={{ borderColor: 'var(--accent)', animation: 'fadeIn 0.3s ease-out' }}>
              <div className={styles.successIconWrapper}>
                <Check size={40} />
              </div>
              <h2 className="heading-sm" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                {t('nav.home') === 'হোম' ? 'আলহামদুলিল্লাহ!' : 'Alhamdulillah!'}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                {t('donate.success')}
              </p>
              <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                {t('nav.home') === 'হোম' ? 'আবার অনুদান দিন' : 'Donate Again'}
              </button>
            </div>
          ) : (
            <form action={formAction} className="card card-hover">
              {state?.error && (
                <div style={{ backgroundColor: '#fef2f2', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '1rem' }}>
                  ⚠️ {state.error}
                </div>
              )}

              {/* Hidden Inputs for Action */}
              <input type="hidden" name="amount" value={activeAmount} />
              <input type="hidden" name="method" value={method} />

              {/* Preset Amounts */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>{t('donate.amount')}</h3>
                <div className={styles.presetGrid}>
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={`${styles.presetBtn} ${
                        amount === preset && !customAmount ? styles.activePreset : ''
                      }`}
                      onClick={() => {
                        setAmount(preset)
                        setCustomAmount('')
                      }}
                    >
                      {t('nav.home') === 'হোম' ? `${preset} ৳` : `৳${preset}`}
                    </button>
                  ))}
                </div>
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label className="form-label">{t('donate.custom')}</label>
                  <input
                    type="number"
                    placeholder="e.g. 5000"
                    className="form-input"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setAmount(0)
                    }}
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>{t('donate.method')}</h3>
                <div className={styles.methodGrid}>
                  {['bKash', 'Nagad', 'Rocket', 'Bank'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`${styles.methodBtn} ${method === m ? styles.activeMethod : ''}`}
                      onClick={() => setMethod(m)}
                    >
                      <CreditCard size={16} /> {m}
                    </button>
                  ))}
                </div>
                <div className={styles.instructions}>
                  {method === 'Bank' ? (
                    <p>
                      <strong>Bank Details:</strong> Shubban Trust, A/C: 1234567890, Islami Bank Bangladesh PLC, Kakrail Branch.
                    </p>
                  ) : (
                    <p>
                      Send Money (স্যান্ড মানি) to: <strong>০১৭৯৮৭৬৫৪৩২</strong> ({method} Personal).
                    </p>
                  )}
                </div>
              </div>

              {/* Personal Details */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>{t('donate.details')}</h3>
                <div className="form-group">
                  <label className="form-label">{t('donate.name')} *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('donate.email')} *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('donate.phone')} *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('donate.txnid')} *</label>
                  <input
                    type="text"
                    name="transactionId"
                    required
                    placeholder="e.g. A9B8C7D6"
                    className="form-input"
                  />
                </div>
              </div>

              <button type="submit" disabled={isPending} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                <Send size={18} /> {isPending ? 'Submitting...' : `${t('donate.submit')} (${t('nav.home') === 'হোম' ? `${activeAmount} ৳` : `৳${activeAmount}`})`}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
