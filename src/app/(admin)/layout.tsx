/* eslint-disable jsx-a11y/alt-text */
'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Users, FileText, FileCode, Calendar, 
  Image, Heart, UserPlus, Settings as SettingsIcon, LogOut, ArrowLeft 
} from 'lucide-react'
import styles from './AdminLayout.module.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/dashboard/users', label: 'Users', icon: <Users size={18} /> },
    { href: '/dashboard/posts', label: 'Posts', icon: <FileText size={18} /> },
    { href: '/dashboard/pages', label: 'Pages', icon: <FileCode size={18} /> },
    { href: '/dashboard/events', label: 'Events', icon: <Calendar size={18} /> },
    { href: '/dashboard/gallery', label: 'Gallery', icon: <Image size={18} /> },
    { href: '/dashboard/donations', label: 'Donations', icon: <Heart size={18} /> },
    { href: '/dashboard/volunteers', label: 'Volunteers', icon: <UserPlus size={18} /> },
    { href: '/dashboard/settings', label: 'Settings', icon: <SettingsIcon size={18} /> },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>Shubban Portal</span>
        </div>
        
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={16} /> View Website
          </Link>
        </div>
      </aside>

      {/* Main Panel */}
      <div className={styles.mainPanel}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h2>Management Console</h2>
            <span className={styles.roleBadge}>Super Admin</span>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.logoutBtn} onClick={() => alert('Log out clicked')}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {/* Viewport */}
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}
