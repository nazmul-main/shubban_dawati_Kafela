'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '../context/LanguageContext'
import { Menu, X, Globe, Moon, Sun } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const activeTheme = savedTheme || 'light'
    setTheme(activeTheme)
    document.documentElement.setAttribute('data-theme', activeTheme)
  }, [])

  const toggleTheme = () => {
    const targetTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(targetTheme)
    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme)
  }

  const toggleLang = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn')
  }

  const navLinks = [
    { href: '/', label: 'nav.home' },
    { href: '/about', label: 'nav.about' },
    { href: '/constitution', label: 'nav.constitution' },
    { href: '/activities', label: 'nav.activities' },
    { href: '/gallery', label: 'nav.gallery' },
    { href: '/blog', label: 'nav.blog' },
    { href: '/contact', label: 'nav.contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="শুব্বান দাওয়াতি কাফেলা লোগো"
            width={48}
            height={48}
            className={styles.logoImg}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className={styles.iconBtn} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Language Selector */}
          <button onClick={toggleLang} className={styles.langBtn}>
            <Globe size={16} />
            <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className={styles.menuBtn}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.mobileActive : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
