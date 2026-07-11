'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/components/context/LanguageContext'
import { Eye, Video as VideoIcon, Image as ImageIcon, X, Calendar, Tag } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'
import styles from './Gallery.module.css'

interface CategoryProps {
  id: string
  nameBn: string
  nameEn: string
  slug: string
}

interface GalleryItemProps {
  id: string
  titleBn: string
  titleEn: string
  imageUrl: string
  categoryId: string | null
  category?: CategoryProps | null
  year: number
  takenAt: string | null
}

export default function GalleryPage() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos')
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [galleryItems, setGalleryItems] = useState<GalleryItemProps[]>([])
  const [loadingItems, setLoadingItems] = useState(true)
  const [loadingCats, setLoadingCats] = useState(true)
  const [lightboxItem, setLightboxItem] = useState<GalleryItemProps | null>(null)

  // Determine current year and range down to 2016 (founded year)
  const currentYear = new Date().getFullYear()
  const years = ['all']
  for (let y = currentYear; y >= 2016; y--) {
    years.push(y.toString())
  }

  // Convert numbers to Bengali digits if language is BN
  const formatYear = (yrStr: string) => {
    if (yrStr === 'all') {
      return language === 'bn' ? 'সব বছর' : 'All Years'
    }
    if (language === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
      return yrStr.replace(/\d/g, (d) => bnDigits[parseInt(d)])
    }
    return yrStr
  }

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/gallery/categories')
        if (res.ok) {
          const data = await res.json()
          setCategories(data)
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err)
      } finally {
        setLoadingCats(false)
      }
    }
    fetchCategories()
  }, [])

  // Fetch gallery items whenever active tab, category, or year changes
  useEffect(() => {
    if (activeTab !== 'photos') return // only fetch photos for now

    const fetchGallery = async () => {
      setLoadingItems(true)
      try {
        let url = `/api/gallery?category=${selectedCategory}`
        if (selectedYear !== 'all') {
          url += `&year=${selectedYear}`
        }
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setGalleryItems(data)
        }
      } catch (err) {
        console.error('Failed to fetch gallery items:', err)
      } finally {
        setLoadingItems(false)
      }
    }
    fetchGallery()
  }, [activeTab, selectedCategory, selectedYear])

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={`${styles.banner} islamic-pattern`}>
        <div className="container text-center">
          <h1 className="heading-lg" style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {t('nav.gallery')}
          </h1>
          <p className={styles.bannerSubtitle}>
            {t('site.title')}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Photos / Videos Tabs */}
          <div className={styles.tabsContainer}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'photos' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ImageIcon size={18} />
                {language === 'bn' ? 'ছবি সমূহ' : 'Photos'}
              </span>
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'videos' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <VideoIcon size={18} />
                {language === 'bn' ? 'ভিডিও সমূহ' : 'Videos'}
              </span>
            </button>
          </div>

          {activeTab === 'photos' ? (
            <div className={styles.mainGrid}>
              {/* Left Content Area (Year + Photo Grid) */}
              <div>
                {/* Year Filter Bar */}
                <div className={styles.yearBar}>
                  <span className={styles.yearLabel}>
                    <Calendar size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                    {language === 'bn' ? 'বছর:' : 'Year:'}
                  </span>
                  {years.map((y) => (
                    <button
                      key={y}
                      className={`${styles.yearBtn} ${selectedYear === y ? styles.activeYear : ''}`}
                      onClick={() => setSelectedYear(y)}
                    >
                      {formatYear(y)}
                    </button>
                  ))}
                </div>

                {/* Photo Grid */}
                {loadingItems ? (
                  <div className={styles.photoGrid}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Skeleton
                        key={`gallery-skel-${i}`}
                        style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-md)' }}
                      />
                    ))}
                  </div>
                ) : galleryItems.length > 0 ? (
                  <div className={styles.photoGrid}>
                    {galleryItems.map((item) => (
                      <div
                        key={item.id}
                        className={styles.photoCard}
                        onClick={() => setLightboxItem(item)}
                      >
                        <div className={styles.imageWrapper}>
                          <Image
                            src={item.imageUrl}
                            alt={language === 'bn' ? item.titleBn : item.titleEn}
                            fill
                            className={styles.galleryImg}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className={styles.overlay}>
                            <div className={styles.eyeIcon}>
                              <Eye size={24} />
                            </div>
                            <h3 className={styles.photoTitle}>
                              {language === 'bn' ? item.titleBn : item.titleEn}
                            </h3>
                            {item.category && (
                              <span className={styles.photoCat}>
                                {language === 'bn' ? item.category.nameBn : item.category.nameEn}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center" style={{ padding: '60px 0', color: 'var(--text-muted)' }}>
                    {language === 'bn' ? 'কোনো ছবি পাওয়া যায়নি।' : 'No photos found.'}
                  </div>
                )}
              </div>

              {/* Right Sidebar (Category Filter) */}
              <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>
                  <Tag size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                  {language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Categories'}
                </h2>
                <div className={styles.categoryList}>
                  <button
                    className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.activeCategory : ''}`}
                    onClick={() => setSelectedCategory('all')}
                  >
                    <span>{language === 'bn' ? 'সবগুলো' : 'All Categories'}</span>
                  </button>
                  {loadingCats ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <Skeleton key={`cat-skel-${i}`} style={{ height: '38px', borderRadius: 'var(--radius-md)' }} />
                    ))
                  ) : (
                    categories.map((cat) => (
                      <button
                        key={cat.id}
                        className={`${styles.categoryBtn} ${selectedCategory === cat.slug ? styles.activeCategory : ''}`}
                        onClick={() => setSelectedCategory(cat.slug)}
                      >
                        <span>{language === 'bn' ? cat.nameBn : cat.nameEn}</span>
                      </button>
                    ))
                  )}
                </div>
              </aside>
            </div>
          ) : (
            /* Videos coming soon */
            <div className={styles.comingSoon}>
              <VideoIcon size={48} className={styles.comingSoonIcon} />
              <h2 className="heading-md" style={{ marginBottom: '8px' }}>
                {language === 'bn' ? 'ভিডিও গ্যালারি শীঘ্রই আসছে' : 'Video Gallery Coming Soon'}
              </h2>
              <p style={{ maxWidth: '400px' }}>
                {language === 'bn'
                  ? 'আমরা আমাদের ভিডিও গ্যালারি প্রস্তুত করছি। শীঘ্রই এখানে আকর্ষণীয় সব ভিডিও কন্টেন্ট দেখতে পাবেন।'
                  : 'We are preparing our video gallery. Soon you will see interactive video content here.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Zoom-in Modal */}
      {lightboxItem && (
        <div className={styles.modalOverlay} onClick={() => setLightboxItem(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setLightboxItem(null)}>
              <X size={24} />
            </button>
            <div className={styles.modalImageWrapper}>
              <Image
                src={lightboxItem.imageUrl}
                alt={language === 'bn' ? lightboxItem.titleBn : lightboxItem.titleEn}
                fill
                style={{ objectFit: 'contain' }}
                sizes="100vw"
                priority
              />
            </div>
            <div className={styles.modalDetails}>
              <h2 className={styles.modalTitle}>
                {language === 'bn' ? lightboxItem.titleBn : lightboxItem.titleEn}
              </h2>
              <div className={styles.modalMeta}>
                {lightboxItem.category && (
                  <span>
                    <strong>{language === 'bn' ? 'ক্যাটাগরি: ' : 'Category: '}</strong>
                    {language === 'bn' ? lightboxItem.category.nameBn : lightboxItem.category.nameEn}
                  </span>
                )}
                <span>
                  <strong>{language === 'bn' ? 'বছর: ' : 'Year: '}</strong>
                  {formatYear(lightboxItem.year.toString())}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
