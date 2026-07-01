import React from 'react';
import prisma from '@/lib/db';
import AboutTabs from './AboutTabs';
import styles from './About.module.css';

// Adding metadata for SEO
export const metadata = {
  title: 'আমাদের সম্পর্কে | Shubban Dawati Kafela',
  description: 'শুব্বান দাওয়াতি কাফেলার পরিচিতি, লক্ষ্য, উদ্দেশ্য এবং কার্যক্রম সম্পর্কে বিস্তারিত জানুন।',
};

export default async function AboutPage() {
  // Fetch all pages that belong to the about section (slug starts with 'about-')
  const aboutPages = await prisma.page.findMany({
    where: {
      slugEn: {
        startsWith: 'about-'
      }
    }
  });

  // Convert to plain objects to pass to Client Component safely
  const formattedPages = aboutPages.map(page => ({
    slug: page.slugEn,
    titleBn: page.titleBn,
    titleEn: page.titleEn,
    contentBn: page.contentBn,
    contentEn: page.contentEn,
  }));

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={`${styles.banner} islamic-pattern`}>
        <div className="container text-center">
          <h1 className="heading-lg" style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            আমাদের সম্পর্কে
          </h1>
          <p className={styles.bannerSubtitle}>
            শুব্বান দাওয়াতি কাফেলা - একটি আদর্শ সমাজ গড়ার প্রত্যয়
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="section" style={{ background: '#fafafa', minHeight: '80vh' }}>
        <div className="container">
          <AboutTabs pages={formattedPages} />
        </div>
      </section>
    </div>
  );
}
