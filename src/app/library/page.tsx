'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/components/context/LanguageContext'
import { Search, Download, BookOpen, User } from 'lucide-react'
import styles from './Library.module.css'

interface BookItem {
  id: string
  titleBn: string
  titleEn: string
  authorBn: string
  authorEn: string
  coverChar: string
  downloads: number
  pdfUrl: string
}

export default function LibraryPage() {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState<BookItem[]>([
    {
      id: '1',
      titleBn: 'ইসলামের রূপরেখা',
      titleEn: 'Outlines of Islam',
      authorBn: 'ড. মুহাম্মদ আব্দুল্লাহ',
      authorEn: 'Dr. Muhammad Abdullah',
      coverChar: 'ই',
      downloads: 1420,
      pdfUrl: '#',
    },
    {
      id: '2',
      titleBn: 'নৈতিকতা ও আদর্শ জীবন',
      titleEn: 'Ethics & Ideal Life',
      authorBn: 'মাওলানা আবদুর রহমান',
      authorEn: 'Maulana Abdur Rahman',
      coverChar: 'ন',
      downloads: 875,
      pdfUrl: '#',
    },
    {
      id: '3',
      titleBn: 'তরুণদের আত্মশুদ্ধি',
      titleEn: 'Self-Purification of Youth',
      authorBn: 'ড. আহমাদ আলী',
      authorEn: 'Dr. Ahmad Ali',
      coverChar: 'ত',
      downloads: 2310,
      pdfUrl: '#',
    },
  ])

  const handleDownload = (id: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, downloads: book.downloads + 1 } : book
      )
    )
  }

  const filteredBooks = books.filter((book) => {
    const title = t('nav.home') === 'হোম' ? book.titleBn : book.titleEn
    const author = t('nav.home') === 'হোম' ? book.authorBn : book.authorEn
    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      author.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className={styles.wrapper}>
      {/* Header Banner */}
      <section className={`${styles.banner} islamic-pattern`}>
        <div className="container text-center">
          <h1 className="heading-lg" style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {t('library.title')}
          </h1>
          <p className={styles.bannerSubtitle}>
            {t('library.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="section">
        <div className="container">
          {/* Search bar */}
          <div className={styles.controls}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={18} />
              <input
                type="text"
                placeholder={t('nav.home') === 'হোম' ? 'বই খুঁজুন...' : 'Search books...'}
                className={styles.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Book Catalog Grid */}
          <div className={styles.grid}>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book.id} className={`card card-hover ${styles.bookCard}`}>
                  <div className={styles.bookCover}>
                    <BookOpen size={40} className={styles.coverIcon} />
                    <span className={styles.coverText}>{book.coverChar}</span>
                  </div>

                  <div className={styles.bookDetails}>
                    <h3 className="heading-sm" style={{ color: 'var(--primary)', margin: '0 0 0.5rem' }}>
                      {t('nav.home') === 'হোম' ? book.titleBn : book.titleEn}
                    </h3>

                    <div className={styles.authorRow}>
                      <User size={14} className={styles.icon} />
                      <span>
                        {t('library.author')}: {t('nav.home') === 'হোম' ? book.authorBn : book.authorEn}
                      </span>
                    </div>

                    <div className={styles.downloadStats}>
                      <span>
                        {book.downloads} {t('library.downloads')}
                      </span>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
                      <a
                        href={book.pdfUrl}
                        download
                        onClick={() => handleDownload(book.id)}
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%' }}
                      >
                        <Download size={16} /> {t('library.download')}
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center" style={{ gridColumn: '1 / -1', padding: '3rem', color: 'var(--text-muted)' }}>
                {t('nav.home') === 'হোম' ? 'কোন বই পাওয়া যায়নি।' : 'No books found.'}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
