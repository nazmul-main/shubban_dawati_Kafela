'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '../context/LanguageContext'
import { MapPin, Phone, Mail } from 'lucide-react'
import styles from './Footer.module.css'

const Facebook = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
const Twitter = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
const Youtube = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>

export default function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { href: '/', label: 'nav.home' },
    { href: '/about', label: 'nav.about' },
    { href: '/news', label: 'nav.news' },
    { href: '/events', label: 'nav.events' },
    { href: '/library', label: 'nav.library' },
    { href: '/donate', label: 'nav.donate' },
    { href: '/contact', label: 'nav.contact' },
  ]

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {/* Brand Info */}
          <div className={styles.brandInfo}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/logo.png"
                alt="শুব্বান দাওয়াতি কাফেলা লোগো"
                width={56}
                height={56}
                className={styles.logoImg}
              />
              <span className={styles.logoText}>{t('site.title')}</span>
            </Link>
            <p className={styles.description}>{t('site.footer.desc')}</p>
            <div className={styles.socials}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Youtube size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.column}>
            <h3 className={styles.title}>{t('site.footer.links')}</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className={styles.column}>
            <h3 className={styles.title}>{t('site.footer.contact')}</h3>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={18} className={styles.icon} />
                <span>ঢাকা, বাংলাদেশ (Dhaka, Bangladesh)</span>
              </li>
              <li>
                <Phone size={18} className={styles.icon} />
                <span>+৮৮০ ১২৩৪৫৬৭৮৯০ (+880 1234567890)</span>
              </li>
              <li>
                <Mail size={18} className={styles.icon} />
                <span>info@shubban.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>{t('site.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
