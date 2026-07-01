'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/context/LanguageContext'
import { Info, Users, Shield, Target, Clock, Star, Award } from 'lucide-react'
import styles from './AboutTabs.module.css'

interface TabContent {
  slug: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
}

interface AboutTabsProps {
  pages: TabContent[];
}

export default function AboutTabs({ pages }: AboutTabsProps) {
  const { t } = useLanguage()
  const isBn = t('nav.home') === 'হোম'

  // Pre-define our static tabs with icons and expected slugs
  const DEFAULT_TABS = [
    { slug: 'about-intro', titleBn: 'পরিচিতি', titleEn: 'Introduction', icon: <Info size={20} /> },
    { slug: 'about-advisors', titleBn: 'উপদেষ্টা', titleEn: 'Advisors', icon: <Users size={20} /> },
    { slug: 'about-principles', titleBn: 'নীতি ও আদর্শ', titleEn: 'Principles', icon: <Shield size={20} /> },
    { slug: 'about-goals', titleBn: 'লক্ষ্য ও উদ্দেশ্য', titleEn: 'Goals & Objectives', icon: <Target size={20} /> },
    { slug: 'about-history', titleBn: 'ইতিহাস', titleEn: 'History', icon: <Clock size={20} /> },
    { slug: 'about-leadership', titleBn: 'নেতৃত্ব', titleEn: 'Leadership', icon: <Star size={20} /> },
    { slug: 'about-success', titleBn: 'সাফল্য', titleEn: 'Success', icon: <Award size={20} /> },
  ]

  const [activeTab, setActiveTab] = useState(DEFAULT_TABS[0].slug)

  // Get active tab content from backend data, or show a fallback message
  const activePageData = pages.find(p => p.slug === activeTab)
  const activeTabStatic = DEFAULT_TABS.find(t => t.slug === activeTab)

  const displayTitle = activePageData 
    ? (isBn ? activePageData.titleBn : activePageData.titleEn) 
    : (isBn ? activeTabStatic?.titleBn : activeTabStatic?.titleEn)
    
  const displayContent = activePageData 
    ? (isBn ? activePageData.contentBn : activePageData.contentEn) 
    : (isBn ? 'এই ট্যাবের তথ্য এখনো যুক্ত করা হয়নি। অ্যাডমিন প্যানেল থেকে "Pages" এ গিয়ে নতুন পেজ তৈরি করুন (Slug: '+activeTab+').' : 'Content for this tab has not been added yet. Please add a page from the Admin Panel with slug: '+activeTab)

  return (
    <div className={styles.wrapper}>
      {/* Sidebar Tabs */}
      <div className={styles.sidebar}>
        {DEFAULT_TABS.map((tab) => (
          <button
            key={tab.slug}
            className={`${styles.tabBtn} ${activeTab === tab.slug ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.slug)}
          >
            <span className={styles.iconWrapper}>{tab.icon}</span>
            <span>{isBn ? tab.titleBn : tab.titleEn}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className={styles.contentArea}>
        {/* We use key={activeTab} to force React to remount the div and trigger the animation */}
        <div key={activeTab} className={styles.fadeEnter}>
          <h2 className={`${styles.contentTitle} heading-lg`}>{displayTitle}</h2>
          
          <div 
            className={styles.contentBody}
            dangerouslySetInnerHTML={{ __html: displayContent.replace(/\n/g, '<br/>') }}
          />
        </div>
      </div>
    </div>
  )
}
