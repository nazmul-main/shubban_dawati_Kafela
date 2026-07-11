'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'bn' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  bn: {
    // General
    'site.title': 'শুব্বান দাওয়াতি কাফেলা',
    'site.footer.desc': 'দ্বীন প্রচার ও সমাজ সেবায় একদল নিবেদিতপ্রাণ তরুণ কাফেলা। আমরা যুবসমাজকে ইসলামের সুমহান আদর্শের দিকে আহ্বান করি।',
    'site.footer.links': 'গুরুত্বপূর্ণ লিংক',
    'site.footer.contact': 'যোগাযোগের ঠিকানা',
    'site.rights': 'সর্বস্বত্ব সংরক্ষিত © ২০২৬ শুব্বান দাওয়াতি কাফেলা',

    // Navbar
    'nav.home': 'হোম',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.constitution': 'গঠনতন্ত্র',
    'nav.activities': 'আমাদের কার্যক্রম',
    'nav.gallery': 'গ্যালারী',
    'nav.blog': 'ব্লগ',
    'nav.contact': 'যোগাযোগ',
    'nav.login': 'লগইন',
    'nav.dashboard': 'ড্যাশবোর্ড',

    // Banner & Hero
    'hero.title': 'শুব্বান দাওয়াতি কাফেলা',
    'hero.subtitle': 'দ্বীন প্রচার ও সমাজ সেবায় একদল নিবেদিতপ্রাণ তরুণ কাফেলা। নৈতিক সমাজ গঠনে আমাদের সাথে যোগ দিন।',
    'hero.cta': 'স্বেচ্ছাসেবক হোন',
    'hero.donate': 'সহযোগিতা করুন',

    // Quick Stats
    'stats.title': 'আমাদের এ পর্যন্ত অর্জন',
    'stats.volunteers': 'স্বেচ্ছাসেবক',
    'stats.books': 'বই ডাউনলোড',
    'stats.events': 'সম্পন্ন ইভেন্ট',
    'stats.donations': 'সংগৃহীত ফান্ড (টাকা)',

    // About Section
    'about.title': 'আমাদের পরিচয়',
    'about.desc1': 'শুব্বান দাওয়াতি কাফেলা একটি অরাজনৈতিক, সামাজিক ও দাওয়াতি যুব সংগঠন। আমরা যুবসমাজের আত্মশুদ্ধি, নৈতিক উন্নয়ন ও দ্বীনি শিক্ষার প্রসারে কাজ করে যাচ্ছি।',
    'about.desc2': 'সুস্থ সংস্কৃতি চর্চা, সামাজিক ত্রাণ কার্যক্রম, সেমিনার ও প্রকাশনা কার্যক্রমের মাধ্যমে আমরা একদল সচেতন ও দ্বীনদার যুবসমাজ গড়ে তুলতে চাই।',
    'about.vision': 'আমাদের লক্ষ্য',
    'about.mission': 'আমাদের উদ্দেশ্য',

    // News/Notice Page
    'news.title': 'খবর ও নোটিশ বোর্ড',
    'news.search': 'খবর খুঁজুন...',
    'news.latest': 'সর্বশেষ আপডেট',
    'news.notice.priority': 'জরুরী নোটিশ',

    // Library Page
    'library.title': 'ইসলামিক ডিজিটাল লাইব্রেরি',
    'library.subtitle': 'সঠিক ইলম অর্জনের জন্য আমাদের প্রকাশনা ও নির্বাচিত বইসমূহ বিনামূল্যে ডাউনলোড করুন।',
    'library.author': 'লেখক',
    'library.download': 'ডাউনলোড করুন',
    'library.downloads': 'বার ডাউনলোড করা হয়েছে',

    // Donation Page
    'donate.title': 'আপনার দান দ্বীনের প্রসারে ব্যয় হবে',
    'donate.subtitle': 'আপনার যাকাত ও সদকার টাকা দাওয়াত ও সমাজসেবামূলক কাজে ব্যয় করা হয়।',
    'donate.amount': 'টাকার পরিমাণ নির্বাচন করুন',
    'donate.custom': 'অন্যান্য পরিমাণ',
    'donate.method': 'পেমেন্ট মাধ্যম',
    'donate.details': 'আপনার বিবরণ দিন',
    'donate.name': 'পূর্ণ নাম',
    'donate.email': 'ইমেইল ঠিকানা',
    'donate.phone': 'মোবাইল নম্বর',
    'donate.txnid': 'ট্রানজেকশন আইডি (TxnID)',
    'donate.submit': 'দান সম্পন্ন করুন',
    'donate.success': 'আলহামদুলিল্লাহ! আপনার অনুদান সফলভাবে সাবমিট হয়েছে। ভেরিফিকেশনের পর কনফার্ম করা হবে।',

    // Volunteer Page
    'volunteer.title': 'স্বেচ্ছাসেবক আবেদন ফরম',
    'volunteer.subtitle': 'দ্বীনের সেবায় আপনার সময়, মেধা ও শ্রম নিয়োজিত করতে আবেদন করুন।',
    'volunteer.skills': 'আপনার দক্ষতা ও অভিজ্ঞতা',
    'volunteer.address': 'বর্তমান ঠিকানা',
    'volunteer.submit': 'আবেদন পেশ করুন',
    'volunteer.success': 'জাজাকাল্লাহু খাইরান! আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে। খুব শীঘ্রই আমাদের প্রতিনিধি যোগাযোগ করবেন।',

    // Contact Page
    'contact.title': 'যোগাযোগ করুন',
    'contact.subtitle': 'যেকোনো মতামত বা জিজ্ঞাসার জন্য আমাদের বার্তা পাঠান।',
    'contact.message': 'আপনার বার্তা',
    'contact.submit': 'বার্তা পাঠান',
    'contact.success': 'ধন্যবাদ! আপনার বার্তাটি আমরা পেয়েছি।',

    // 404 Page
    '404.title': '৪০৪ - পৃষ্ঠাটি খুঁজে পাওয়া যায়নি',
    '404.subtitle': 'দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে বা এর নাম পরিবর্তন করা হয়েছে।',
    '404.back': 'হোম পেজে ফিরে যান',

    // Admin Dashboard
    'admin.header.title': 'ম্যানেজমেন্ট কনসোল',
    'admin.header.role': 'সুপার এডমিন',
    'admin.header.logout': 'লগআউট',
    'admin.menu.dashboard': 'ড্যাশবোর্ড',
    'admin.menu.home': 'হোম পৃষ্ঠা',
    'admin.menu.about': 'আমাদের সম্পর্কে',
    'admin.menu.constitution': 'গঠনতন্ত্র',
    'admin.menu.activities': 'কার্যক্রমসমূহ',
    'admin.menu.advisers': 'উপদেষ্টা পরিষদ',
    'admin.menu.gallery': 'গ্যালারী',
    'admin.menu.blog': 'ব্লগ পোস্ট',
    'admin.menu.contacts': 'যোগাযোগসমূহ',
    'admin.menu.settings': 'সেটিংস',
    'admin.menu.view_site': 'ওয়েবসাইট দেখুন',
  },
  en: {
    // General
    'site.title': 'Shubban Dawati Kafela',
    'site.footer.desc': 'A group of dedicated youth in Islamic Dawah and social service. We call the youth to the noble values and principles of Islam.',
    'site.footer.links': 'Important Links',
    'site.footer.contact': 'Contact Address',
    'site.rights': 'All rights reserved © 2026 Shubban Dawati Kafela',

    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.constitution': 'Constitution',
    'nav.activities': 'Our Activities',
    'nav.gallery': 'Gallery',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.dashboard': 'Dashboard',

    // Banner & Hero
    'hero.title': 'Shubban Dawati Kafela',
    'hero.subtitle': 'A group of dedicated youth in Islamic Dawah and social service. Join us in building a moral society.',
    'hero.cta': 'Be a Volunteer',
    'hero.donate': 'Support Us',

    // Quick Stats
    'stats.title': 'Our Key Metrics',
    'stats.volunteers': 'Volunteers',
    'stats.books': 'Book Downloads',
    'stats.events': 'Events Completed',
    'stats.donations': 'Funds Raised (BDT)',

    // About Section
    'about.title': 'Who We Are',
    'about.desc1': 'Shubban Dawati Kafela is a non-political, social, and Islamic youth organization. We work for the self-purification, moral development, and Islamic education of the youth.',
    'about.desc2': 'Through cultural activities, social relief efforts, seminars, and publication works, we seek to raise a generation of conscious and practicing Muslim youths.',
    'about.vision': 'Our Vision',
    'about.mission': 'Our Mission',

    // News/Notice Page
    'news.title': 'News & Notice Board',
    'news.search': 'Search news...',
    'news.latest': 'Latest Updates',
    'news.notice.priority': 'Urgent Notice',

    // Library Page
    'library.title': 'Islamic Digital Library',
    'library.subtitle': 'Download our publications and selected Islamic books for free to seek authentic knowledge.',
    'library.author': 'Author',
    'library.download': 'Download PDF',
    'library.downloads': 'times downloaded',

    // Donation Page
    'donate.title': 'Your Donation Spreads the Deen',
    'donate.subtitle': 'Your Zakat and Sadaqah are spent transparently in Dawah and social development.',
    'donate.amount': 'Select Donation Amount',
    'donate.custom': 'Custom Amount',
    'donate.method': 'Payment Method',
    'donate.details': 'Your Personal Information',
    'donate.name': 'Full Name',
    'donate.email': 'Email Address',
    'donate.phone': 'Mobile Number',
    'donate.txnid': 'Transaction ID (TxnID)',
    'donate.submit': 'Complete Donation',
    'donate.success': 'Alhamdulillah! Your donation details have been submitted. It will be verified shortly.',

    // Volunteer Page
    'volunteer.title': 'Volunteer Registration Form',
    'volunteer.subtitle': 'Apply to dedicate your time, skills, and effort in the path of Allah.',
    'volunteer.skills': 'Your Skills & Experience',
    'volunteer.address': 'Current Address',
    'volunteer.submit': 'Submit Application',
    'volunteer.success': 'Jazakallahu Khairan! Your application was submitted successfully. Our team will contact you soon.',

    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Feel free to send us a message if you have any questions or feedback.',
    'contact.message': 'Your Message',
    'contact.submit': 'Send Message',
    'contact.success': 'Thank you! We have received your message.',

    // 404 Page
    '404.title': '404 - Page Not Found',
    '404.subtitle': 'Sorry, the page you are looking for might have been removed or had its name changed.',
    '404.back': 'Back to Home',

    // Admin Dashboard
    'admin.header.title': 'Management Console',
    'admin.header.role': 'Super Admin',
    'admin.header.logout': 'Logout',
    'admin.menu.dashboard': 'Dashboard',
    'admin.menu.home': 'Home Page',
    'admin.menu.about': 'About Us',
    'admin.menu.constitution': 'Constitution',
    'admin.menu.activities': 'Activities',
    'admin.menu.advisers': 'Advisers',
    'admin.menu.gallery': 'Gallery',
    'admin.menu.blog': 'Blog',
    'admin.menu.contacts': 'Contacts',
    'admin.menu.settings': 'Settings',
    'admin.menu.view_site': 'View Website',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('bn')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'bn' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
