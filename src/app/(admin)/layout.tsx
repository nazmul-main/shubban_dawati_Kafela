/* eslint-disable jsx-a11y/alt-text */
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Users, FileText, FileCode, Calendar, 
  Image, Settings as SettingsIcon, LogOut, ArrowLeft, Menu, X, Globe, Moon, Sun
} from 'lucide-react'
import { useLanguage } from '@/components/context/LanguageContext'
import styles from './AdminLayout.module.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

  const menuItems = [
    { href: '/dashboard', label: t('admin.menu.dashboard'), icon: <LayoutDashboard size={18} /> },
    { href: '/dashboard/pages/home', label: t('admin.menu.home'), icon: <FileCode size={18} /> },
    { href: '/dashboard/pages/about', label: t('admin.menu.about'), icon: <FileCode size={18} /> },
    { href: '/dashboard/pages/constitution', label: t('admin.menu.constitution'), icon: <FileCode size={18} /> },
    { href: '/dashboard/activities', label: t('admin.menu.activities'), icon: <Calendar size={18} /> },
    { href: '/dashboard/advisers', label: t('admin.menu.advisers'), icon: <Users size={18} /> },
    { href: '/dashboard/gallery', label: t('admin.menu.gallery'), icon: <Image size={18} /> },
    { href: '/dashboard/blog', label: t('admin.menu.blog'), icon: <FileText size={18} /> },
    { href: '/dashboard/contacts', label: t('admin.menu.contacts'), icon: <Users size={18} /> },
    { href: '/dashboard/settings', label: t('admin.menu.settings'), icon: <SettingsIcon size={18} /> },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className={styles.container}>
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div className={styles.backdrop} onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarHeaderMain}>
            <div className={styles.logoIcon}></div>
            <span className={styles.logoText}>Shubban Portal</span>
          </div>
          <button className={styles.closeSidebarBtn} onClick={() => setIsSidebarOpen(false)} aria-label="Close Sidebar">
            <X size={20} />
          </button>
        </div>
        
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={16} /> {t('admin.menu.view_site')}
          </Link>
        </div>
      </aside>

      {/* Main Panel */}
      <div className={styles.mainPanel}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.hamburgerBtn} onClick={() => setIsSidebarOpen(true)} aria-label="Open Sidebar">
              <Menu size={20} />
            </button>
            <div className={styles.headerTitle}>
              <h2>{t('admin.header.title')}</h2>
              <span className={styles.roleBadge}>{t('admin.header.role')}</span>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className={styles.iconBtn} aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Language Selector */}
            <button onClick={toggleLang} className={styles.langBtn}>
              <Globe size={16} />
              <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
            </button>

            {/* Logout Button */}
            <button className={styles.logoutBtn} onClick={() => alert('Log out clicked')}>
              <LogOut size={16} />
              <span className={styles.logoutText}>{t('admin.header.logout')}</span>
            </button>
          </div>
        </header>

        {/* Viewport */}
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}
