'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/components/context/LanguageContext'
import { ThumbsUp, Heart, Smile, Share2, MessageCircle, X, ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'
import styles from './Blog.module.css'

interface PostReactionCounts {
  like: number
  love: number
  care: number
}

interface BlogPostProps {
  id: string
  captionBn: string
  captionEn: string
  images: string[]
  postedAt: string
  createdAt: string
  reactionCounts: PostReactionCounts
  totalReactions: number
  userReaction: 'like' | 'love' | 'care' | null
}

export default function BlogPage() {
  const { t, language } = useLanguage()
  const [posts, setPosts] = useState<BlogPostProps[]>([])
  const [loading, setLoading] = useState(true)
  const [sessionId, setSessionId] = useState('')
  const [showReactionPopup, setShowReactionPopup] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [expandedCaptions, setExpandedCaptions] = useState<Record<string, boolean>>({})

  // Initialize Session ID
  useEffect(() => {
    let sid = localStorage.getItem('shubban_session_id')
    if (!sid) {
      sid = Math.random().toString(36).substring(2, 15)
      localStorage.setItem('shubban_session_id', sid)
    }
    setSessionId(sid)
  }, [])

  // Fetch posts once session ID is ready
  useEffect(() => {
    if (!sessionId) return
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/blog?sessionId=${sessionId}`)
        if (res.ok) {
          const data = await res.json()
          setPosts(data)
        }
      } catch (err) {
        console.error('Failed to fetch posts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [sessionId])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  // Handle reaction action
  const handleReact = async (postId: string, type: 'like' | 'love' | 'care') => {
    if (!sessionId) return

    try {
      const res = await fetch(`/api/blog/${postId}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, sessionId }),
      })

      if (res.ok) {
        const result = await res.json()
        
        // Update posts state locally
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id !== postId) return post

            const newReactionCounts = { ...post.reactionCounts }
            let totalDiff = 0

            // If toggling same reaction off
            if (result.action === 'removed') {
              newReactionCounts[type] = Math.max(0, newReactionCounts[type] - 1)
              totalDiff = -1
              return {
                ...post,
                userReaction: null,
                reactionCounts: newReactionCounts,
                totalReactions: Math.max(0, post.totalReactions + totalDiff),
              }
            }

            // If updating reaction type
            if (result.action === 'updated') {
              const previousType = post.userReaction
              if (previousType) {
                newReactionCounts[previousType] = Math.max(0, newReactionCounts[previousType] - 1)
              }
              newReactionCounts[type] = (newReactionCounts[type] || 0) + 1
              return {
                ...post,
                userReaction: type,
                reactionCounts: newReactionCounts,
              }
            }

            // If adding new reaction
            if (result.action === 'added') {
              newReactionCounts[type] = (newReactionCounts[type] || 0) + 1
              totalDiff = 1
              return {
                ...post,
                userReaction: type,
                reactionCounts: newReactionCounts,
                totalReactions: post.totalReactions + totalDiff,
              }
            }

            return post
          })
        )
      }
    } catch (err) {
      console.error('Failed to react:', err)
    } finally {
      setShowReactionPopup(null)
    }
  }

  // Share link trigger
  const handleShare = (postId: string) => {
    const postUrl = `${window.location.origin}/blog#post-${postId}`
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(postUrl)
      showToast(language === 'bn' ? 'লিংক ক্লিপবোর্ডে কপি করা হয়েছে!' : 'Link copied to clipboard!')
    } else {
      // Fallback
      showToast(postUrl)
    }
  }

  // Share to Facebook
  const shareToFacebook = (postId: string) => {
    const postUrl = `${window.location.origin}/blog#post-${postId}`
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
    window.open(fbUrl, '_blank', 'width=600,height=400')
  }

  const formatPostDate = (dateStr: string) => {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getReactionIcon = (reaction: 'like' | 'love' | 'care' | null) => {
    switch (reaction) {
      case 'like':
        return <span className={styles.reactedLike}>👍 {language === 'bn' ? 'লাইক' : 'Like'}</span>
      case 'love':
        return <span className={styles.reactedLove}>❤️ {language === 'bn' ? 'লাভ' : 'Love'}</span>
      case 'care':
        return <span className={styles.reactedCare}>🥰 {language === 'bn' ? 'কেয়ার' : 'Care'}</span>
      default:
        return (
          <>
            <ThumbsUp size={18} />
            <span>{language === 'bn' ? 'রিঅ্যাক্ট' : 'React'}</span>
          </>
        )
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={`${styles.banner} islamic-pattern`}>
        <div className="container text-center">
          <h1 className="heading-lg" style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {language === 'bn' ? 'আমাদের ব্লগ ও আপডেট' : 'Blog & Updates'}
          </h1>
          <p className={styles.bannerSubtitle}>
            {t('site.title')}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className={styles.feedContainer}>
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={`skel-post-${idx}`} className={styles.postCard} style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <Skeleton style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                    <div style={{ flex: 1 }}>
                      <Skeleton style={{ width: '150px', height: '18px', borderRadius: '4px' }} />
                      <Skeleton style={{ width: '100px', height: '12px', borderRadius: '4px', marginTop: '6px' }} />
                    </div>
                  </div>
                  <Skeleton style={{ width: '100%', height: '80px', borderRadius: '6px', marginBottom: '16px' }} />
                  <Skeleton style={{ width: '100%', aspectRatio: '4/3', borderRadius: '6px' }} />
                </div>
              ))
            ) : posts.length === 0 ? (
              <div className="text-center" style={{ padding: '60px 0', color: 'var(--text-muted)' }}>
                {language === 'bn' ? 'কোনো ব্লগ পোস্ট পাওয়া যায়নি।' : 'No blog posts found.'}
              </div>
            ) : (
              posts.map((post) => {
                const caption = language === 'bn' ? post.captionBn : post.captionEn
                const isLong = caption.length > 280
                const isExpanded = expandedCaptions[post.id]
                const displayedCaption = isLong && !isExpanded ? `${caption.slice(0, 280)}...` : caption

                return (
                  <article key={post.id} id={`post-${post.id}`} className={styles.postCard}>
                    {/* Post Header */}
                    <div className={styles.postHeader}>
                      <div className={styles.logoWrapper}>
                        <Image
                          src="/icon.png"
                          alt="Shubban Logo"
                          fill
                          className={styles.orgLogo}
                        />
                      </div>
                      <div className={styles.headerInfo}>
                        <h3 className={styles.orgName}>
                          {language === 'bn' ? 'শুব্বান দাওয়াতি কাফেলা' : 'Shubban Dawati Kafela'}
                        </h3>
                        <span className={styles.postDate}>{formatPostDate(post.postedAt)}</span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className={styles.caption}>
                      {displayedCaption}
                      {isLong && (
                        <button
                          className={styles.seeMoreBtn}
                          onClick={() =>
                            setExpandedCaptions({
                              ...expandedCaptions,
                              [post.id]: !isExpanded,
                            })
                          }
                        >
                          {isExpanded ? (language === 'bn' ? 'সংক্ষেপ করুন' : 'See Less') : (language === 'bn' ? 'আরও পড়ুন' : 'See More')}
                        </button>
                      )}
                    </div>

                    {/* Image Grid System */}
                    {post.images && post.images.length > 0 && (
                      <div
                        className={`${styles.imageGrid} ${
                          post.images.length === 1
                            ? styles.grid1
                            : post.images.length === 2
                            ? styles.grid2
                            : post.images.length === 3
                            ? styles.grid3
                            : styles.grid4
                        }`}
                      >
                        {post.images.length === 3 ? (
                          <>
                            <div className={styles.gridImgWrapper} onClick={() => setLightboxImage(post.images[0])}>
                              <Image
                                src={post.images[0]}
                                alt="blog grid"
                                fill
                                className={styles.postImg}
                                sizes="400px"
                              />
                            </div>
                            <div className={styles.grid3Right}>
                              <div className={styles.gridImgWrapper} onClick={() => setLightboxImage(post.images[1])}>
                                <Image
                                  src={post.images[1]}
                                  alt="blog grid"
                                  fill
                                  className={styles.postImg}
                                  sizes="200px"
                                />
                              </div>
                              <div className={styles.gridImgWrapper} onClick={() => setLightboxImage(post.images[2])}>
                                <Image
                                  src={post.images[2]}
                                  alt="blog grid"
                                  fill
                                  className={styles.postImg}
                                  sizes="200px"
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          post.images.map((imgUrl, imgIdx) => (
                            <div
                              key={imgIdx}
                              className={styles.gridImgWrapper}
                              onClick={() => setLightboxImage(imgUrl)}
                            >
                              <Image
                                src={imgUrl}
                                alt="blog grid image"
                                fill
                                className={styles.postImg}
                                sizes="300px"
                              />
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* Reactions Count and Summary */}
                    <div className={styles.statsRow}>
                      <div className={styles.reactionBadges}>
                        {post.reactionCounts.like > 0 && <span className={styles.reactionBadge}>👍</span>}
                        {post.reactionCounts.love > 0 && <span className={styles.reactionBadge}>❤️</span>}
                        {post.reactionCounts.care > 0 && <span className={styles.reactionBadge}>🥰</span>}
                        {post.totalReactions > 0 && (
                          <span className={styles.reactionCount}>
                            {language === 'bn'
                              ? `${post.totalReactions.toLocaleString('bn-BD')} টি প্রতিক্রিয়া`
                              : `${post.totalReactions} reactions`}
                          </span>
                        )}
                      </div>
                      <div>
                        {post.images.length > 0 && (
                          <span>
                            {language === 'bn'
                              ? `${post.images.length} টি ছবি`
                              : `${post.images.length} photos`}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions bar (React, Share options) */}
                    <div className={styles.actionRow}>
                      {/* Reaction hover trigger */}
                      <div
                        className={`${styles.actionBtn} ${styles.reactionTrigger}`}
                        onMouseEnter={() => setShowReactionPopup(post.id)}
                        onMouseLeave={() => setShowReactionPopup(null)}
                      >
                        {getReactionIcon(post.userReaction)}

                        {showReactionPopup === post.id && (
                          <div className={styles.reactionPopup}>
                            <button
                              className={styles.emojiBtn}
                              type="button"
                              onClick={() => handleReact(post.id, 'like')}
                            >
                              👍
                            </button>
                            <button
                              className={styles.emojiBtn}
                              type="button"
                              onClick={() => handleReact(post.id, 'love')}
                            >
                              ❤️
                            </button>
                            <button
                              className={styles.emojiBtn}
                              type="button"
                              onClick={() => handleReact(post.id, 'care')}
                            >
                              🥰
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Copy Link Button */}
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleShare(post.id)}
                      >
                        <Share2 size={18} />
                        <span>{language === 'bn' ? 'কপি লিংক' : 'Copy Link'}</span>
                      </button>

                      {/* Facebook Share Button */}
                      <button
                        className={styles.actionBtn}
                        onClick={() => shareToFacebook(post.id)}
                      >
                        <ChevronRight size={18} style={{ transform: 'rotate(-45deg)' }} />
                        <span>{language === 'bn' ? 'ফেসবুকে শেয়ার' : 'Facebook Share'}</span>
                      </button>
                    </div>
                  </article>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Toast popup */}
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}

      {/* Lightbox zoomed single image modal */}
      {lightboxImage && (
        <div className={styles.modalOverlay} onClick={() => setLightboxImage(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setLightboxImage(null)}>
              <X size={32} />
            </button>
            <Image
              src={lightboxImage}
              alt="Zoomed post content"
              fill
              style={{ objectFit: 'contain' }}
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}
