'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Plus, Trash2, X, Upload, Loader2, Calendar } from 'lucide-react'
import { TableRowSkeleton } from '@/components/ui/Skeleton'
import styles from './BlogAdmin.module.css'

interface BlogPost {
  id: string
  captionBn: string
  captionEn: string
  images: string[]
  postedAt: string
  createdAt: string
  totalReactions: number
}

interface SelectedFile {
  file: File
  preview: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Form States
  const [captionBn, setCaptionBn] = useState('')
  const [captionEn, setCaptionEn] = useState('')
  const [dateType, setDateType] = useState<'recent' | 'custom'>('recent')
  const [customDate, setCustomDate] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/blog')
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch (err) {
      console.error(err)
      showToast('Failed to fetch blog posts', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const filesArray = Array.from(e.target.files)

    if (selectedFiles.length + filesArray.length > 4) {
      showToast('You can select a maximum of 4 images for a post', 'error')
      return
    }

    const newSelected: SelectedFile[] = filesArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    setSelectedFiles([...selectedFiles, ...newSelected])
  }

  const removeSelectedFile = (index: number) => {
    const updated = [...selectedFiles]
    URL.revokeObjectURL(updated[index].preview)
    updated.splice(index, 1)
    setSelectedFiles(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!captionBn && !captionEn) {
      showToast('At least one caption is required', 'error')
      return
    }
    setIsSaving(true)

    try {
      let uploadedUrls: string[] = []

      // 1. Upload images if selected
      if (selectedFiles.length > 0) {
        const formData = new FormData()
        selectedFiles.forEach((sf) => {
          formData.append('files', sf.file)
        })

        const uploadRes = await fetch('/api/upload/blog', {
          method: 'POST',
          body: formData,
        })

        if (!uploadRes.ok) {
          throw new Error('Image upload failed')
        }

        const data = await uploadRes.json()
        uploadedUrls = data.urls
      }

      // 2. Submit post record
      const postRes = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          captionBn,
          captionEn,
          images: uploadedUrls,
          postedAt: dateType === 'custom' && customDate ? new Date(customDate).toISOString() : new Date().toISOString(),
        }),
      })

      if (postRes.ok) {
        showToast('Blog post created successfully!', 'success')
        setModalOpen(false)
        setCaptionBn('')
        setCaptionEn('')
        setSelectedFiles([])
        setDateType('recent')
        setCustomDate('')
        fetchPosts()
      } else {
        showToast('Failed to create post record', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Post creation failed. Try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return
    setIsDeletingId(id)
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPosts(posts.filter((post) => post.id !== id))
        showToast('Post deleted successfully', 'success')
      } else {
        showToast('Failed to delete post', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Delete operation failed', 'error')
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div className={styles.container}>
      {/* Toast popup */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.message}
        </div>
      )}

      {/* Header section */}
      <div className={styles.header}>
        <div>
          <h2>Manage Blog Posts</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Publish updates, reports, and activities on your public feed.
          </p>
        </div>
        <button className={styles.addBtn} onClick={() => setModalOpen(true)}>
          <Plus size={18} /> Create Post
        </button>
      </div>

      {/* Posts Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Images</th>
              <th>Caption (BN)</th>
              <th>Caption (EN)</th>
              <th>Reactions</th>
              <th>Date Posted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={`skel-row-${idx}`}>
                  <td colSpan={6}>
                    <TableRowSkeleton columns={6} />
                  </td>
                </tr>
              ))
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No blog posts found.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    {post.images && post.images.length > 0 ? (
                      <div className={styles.thumbnailStrip}>
                        {post.images.slice(0, 3).map((img, imgIdx) => (
                          <div key={imgIdx} style={{ position: 'relative', width: '40px', height: '40px' }}>
                            <Image
                              src={img}
                              alt="thumb"
                              fill
                              className={styles.tableThumb}
                              sizes="40px"
                            />
                          </div>
                        ))}
                        {post.images.length > 3 && (
                          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '4px', fontSize: '0.85rem' }}>
                            +{post.images.length - 3}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No images</span>
                    )}
                  </td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.captionBn || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>None</span>}
                  </td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.captionEn || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>None</span>}
                  </td>
                  <td>{post.totalReactions || 0}</td>
                  <td>{new Date(post.postedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(post.id)}
                      disabled={isDeletingId === post.id}
                    >
                      {isDeletingId === post.id ? (
                        <Loader2 className={styles.spinning} size={14} />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Post Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Create Blog Post</h3>
              <button className={styles.closeBtn} onClick={() => setModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Caption (Bengali)</label>
                <textarea
                  rows={4}
                  placeholder="যেমন: শুব্বান দাওয়াতি কাফেলার উদ্যোগে শীতবস্ত্র বিতরণ..."
                  value={captionBn}
                  onChange={(e) => setCaptionBn(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Caption (English)</label>
                <textarea
                  rows={4}
                  placeholder="e.g. Shubban Dawati Kafela distributing winter clothes..."
                  value={captionEn}
                  onChange={(e) => setCaptionEn(e.target.value)}
                />
              </div>

              {/* Date Toggles */}
              <div className={styles.formGroup}>
                <label>Date Toggles</label>
                <div className={styles.dateOptions}>
                  <div className={styles.dateRadio} onClick={() => setDateType('recent')}>
                    <input type="radio" checked={dateType === 'recent'} readOnly />
                    <span>Recent Date (Now)</span>
                  </div>
                  <div className={styles.dateRadio} onClick={() => setDateType('custom')}>
                    <input type="radio" checked={dateType === 'custom'} readOnly />
                    <span>Custom Date</span>
                  </div>
                </div>
                {dateType === 'custom' && (
                  <input
                    type="datetime-local"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    style={{ marginTop: '10px' }}
                    required
                  />
                )}
              </div>

              {/* Images selection (max 4 files) */}
              <div className={styles.uploadArea} onClick={() => fileInputRef.current?.click()}>
                <div className={styles.uploadLabel}>
                  <Upload size={28} />
                  <span>Click to select images (Max 4)</span>
                  <small>JPG, PNG, WEBP formats supported</small>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>

              {/* Preview thumbnails */}
              {selectedFiles.length > 0 && (
                <div>
                  <h4 style={{ marginBottom: '10px', fontSize: '0.95rem' }}>Selected Images Previews</h4>
                  <div className={styles.previewGrid}>
                    {selectedFiles.map((sf, index) => (
                      <div key={index} className={styles.previewCard}>
                        <Image
                          src={sf.preview}
                          alt="post thumbnail"
                          fill
                          className={styles.previewImg}
                          sizes="110px"
                        />
                        <button
                          type="button"
                          className={styles.removePreviewBtn}
                          onClick={() => removeSelectedFile(index)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => {
                    setModalOpen(false)
                    setSelectedFiles([])
                  }}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                  {isSaving && <Loader2 className={styles.spinning} size={18} />}
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
