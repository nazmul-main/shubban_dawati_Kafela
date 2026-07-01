'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/context/LanguageContext'
import { Search, Calendar, Tag } from 'lucide-react'
import styles from './News.module.css'

interface PostItem {
  id: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  createdAt: Date;
  category?: { nameEn: string };
}

export default function NewsClient({ posts }: { posts: PostItem[] }) {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'news' | 'notice'>('all')

  const filteredArticles = posts.filter((art) => {
    // Currently treating everything from the database as 'news' for filter logic
    const matchesFilter = filter === 'all' || filter === 'news'
    const title = t('nav.home') === 'হোম' ? art.titleBn : art.titleEn
    const desc = t('nav.home') === 'হোম' ? art.contentBn : art.contentEn
    const matchesSearch =
      title?.toLowerCase().includes(search.toLowerCase()) ||
      desc?.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className={styles.wrapper}>
      {/* Header Banner */}
      <section className={`${styles.banner} islamic-pattern`}>
        <div className="container text-center">
          <h1 className="heading-lg" style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {t('news.title')}
          </h1>
          <p className={styles.bannerSubtitle}>
            {t('news.latest')}
          </p>
        </div>
      </section>

      {/* Main Board */}
      <section className="section">
        <div className="container">
          {/* Controls: Search and filter tabs */}
          <div className={styles.controls}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={18} />
              <input
                type="text"
                placeholder={t('news.search')}
                className={styles.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${filter === 'all' ? styles.activeTab : ''}`}
                onClick={() => setFilter('all')}
              >
                {t('nav.home') === 'হোম' ? 'সব আপডেট' : 'All Updates'}
              </button>
              <button
                className={`${styles.tab} ${filter === 'news' ? styles.activeTab : ''}`}
                onClick={() => setFilter('news')}
              >
                {t('nav.home') === 'হোম' ? 'খবর' : 'News'}
              </button>
              <button
                className={`${styles.tab} ${filter === 'notice' ? styles.activeTab : ''}`}
                onClick={() => setFilter('notice')}
              >
                {t('nav.home') === 'হোম' ? 'নোটিশ' : 'Notices'}
              </button>
            </div>
          </div>

          {/* Articles Grid */}
          <div className={styles.grid}>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <div
                  key={art.id}
                  className={`card card-hover ${styles.articleCard}`}
                >
                  <div className={styles.meta}>
                    <span className={styles.metaItem}>
                      <Calendar size={14} /> {new Date(art.createdAt).toLocaleDateString()}
                    </span>
                    <span className={styles.metaItem}>
                      <Tag size={14} /> {art.category?.nameEn || 'Update'}
                    </span>
                  </div>

                  <h3 className="heading-sm" style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>
                    {t('nav.home') === 'হোম' ? art.titleBn : art.titleEn}
                  </h3>
                  <p className={styles.description}>
                    {(t('nav.home') === 'হোম' ? art.contentBn : art.contentEn)?.substring(0, 100)}...
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center" style={{ gridColumn: '1 / -1', padding: '3rem', color: 'var(--text-muted)' }}>
                {t('nav.home') === 'হোম' ? 'কোন পোস্ট পাওয়া যায়নি।' : 'No updates found.'}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
