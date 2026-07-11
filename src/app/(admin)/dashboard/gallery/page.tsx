'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Plus, Trash2, X, Upload, Loader2, Calendar, Tag } from 'lucide-react'
import { TableRowSkeleton } from '@/components/ui/Skeleton'
import styles from './GalleryAdmin.module.css'

interface Category {
  id: string
  nameBn: string
  nameEn: string
  slug: string
}

interface GalleryItem {
  id: string
  titleBn: string
  titleEn: string
  imageUrl: string
  categoryId: string | null
  category: Category | null
  year: number
  takenAt: string | null
  createdAt: string
}

interface SelectedFile {
  file: File
  preview: string
  titleBn: string
  titleEn: string
}

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Upload Form States
  const [targetCategory, setTargetCategory] = useState('')
  const [targetYear, setTargetYear] = useState(new Date().getFullYear().toString())
  const [dateType, setDateType] = useState<'recent' | 'custom'>('recent')
  const [customDate, setCustomDate] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // New Category Form States
  const [newCatBn, setNewCatBn] = useState('')
  const [newCatEn, setNewCatEn] = useState('')
  const [newCatSlug, setNewCatSlug] = useState('')

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Fetch initial data
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [galleryRes, catRes] = await Promise.all([
        fetch('/api/gallery'),
        fetch('/api/gallery/categories'),
      ])
      if (galleryRes.ok) {
        const galleryData = await galleryRes.json()
        setGalleryItems(galleryData)
      }
      if (catRes.ok) {
        const catData = await catRes.json()
        setCategories(catData)
        if (catData.length > 0) {
          setTargetCategory(catData[0].id)
        }
      }
    } catch (err) {
      console.error('Failed to load dashboard gallery data:', err)
      showToast('Failed to load gallery items', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const filesArray = Array.from(e.target.files)

    if (selectedFiles.length + filesArray.length > 20) {
      showToast('You can select a maximum of 20 images at once', 'error')
      return
    }

    const newSelected: SelectedFile[] = filesArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      titleBn: '',
      titleEn: '',
    }))

    setSelectedFiles([...selectedFiles, ...newSelected])
  }

  const removeSelectedFile = (index: number) => {
    const updated = [...selectedFiles]
    URL.revokeObjectURL(updated[index].preview)
    updated.splice(index, 1)
    setSelectedFiles(updated)
  }

  // Handle Category Submission
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatBn || !newCatEn || !newCatSlug) {
      showToast('All category fields are required', 'error')
      return
    }
    setIsSaving(true)
    try {
      const res = await fetch('/api/gallery/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameBn: newCatBn,
          nameEn: newCatEn,
          slug: newCatSlug,
        }),
      })

      if (res.ok) {
        const createdCat = await res.json()
        setCategories([...categories, createdCat])
        setTargetCategory(createdCat.id)
        showToast('Category created successfully', 'success')
        setCategoryModalOpen(false)
        setNewCatBn('')
        setNewCatEn('')
        setNewCatSlug('')
      } else {
        showToast('Failed to create category', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Category creation failed', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  // Handle Batch Upload and Gallery Save
  const handleBatchUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedFiles.length === 0) {
      showToast('Please select at least one image', 'error')
      return
    }
    setIsSaving(true)

    try {
      // 1. Upload all files to Cloudinary in batch
      const formData = new FormData()
      selectedFiles.forEach((sf) => {
        formData.append('files', sf.file)
      })

      const uploadRes = await fetch('/api/upload/gallery', {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) {
        throw new Error('Cloudinary upload failed')
      }

      const { urls } = await uploadRes.json()

      // 2. Prepare database payload
      const imagesPayload = selectedFiles.map((sf, index) => ({
        titleBn: sf.titleBn || `গ্যালারি ছবি ${index + 1}`,
        titleEn: sf.titleEn || `Gallery Image ${index + 1}`,
        imageUrl: urls[index],
      }))

      // 3. Save gallery records
      const saveRes = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: imagesPayload,
          categoryId: targetCategory || null,
          year: parseInt(targetYear),
          takenAt: dateType === 'custom' && customDate ? new Date(customDate).toISOString() : new Date().toISOString(),
        }),
      })

      if (saveRes.ok) {
        showToast('Gallery items uploaded and saved successfully!', 'success')
        setUploadModalOpen(false)
        setSelectedFiles([])
        fetchData() // Refresh list
      } else {
        showToast('Failed to save gallery records', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Upload failed. Please try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  // Delete Gallery Item
  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return
    setIsDeletingId(id)
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setGalleryItems(galleryItems.filter((item) => item.id !== id))
        showToast('Item deleted successfully', 'success')
      } else {
        showToast('Failed to delete item', 'error')
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
      {/* Toast Alert */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.message}
        </div>
      )}

      {/* Header Actions */}
      <div className={styles.header}>
        <div>
          <h2>Manage Gallery</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Upload and organize photos for public view.
          </p>
        </div>
        <div className={styles.actionBtns}>
          <button className={styles.categoryBtn} onClick={() => setCategoryModalOpen(true)}>
            <Tag size={18} /> Add Category
          </button>
          <button className={styles.addBtn} onClick={() => setUploadModalOpen(true)}>
            <Plus size={18} /> Upload Photos
          </button>
        </div>
      </div>

      {/* Table view */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Preview</th>
              <th>Title (BN)</th>
              <th>Title (EN)</th>
              <th>Category</th>
              <th>Year</th>
              <th>Date Taken</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={`skel-row-${idx}`}>
                  <td colSpan={7}>
                    <TableRowSkeleton columns={7} />
                  </td>
                </tr>
              ))
            ) : galleryItems.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No photos found in the gallery.
                </td>
              </tr>
            ) : (
              galleryItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ position: 'relative', width: '60px', height: '45px' }}>
                      <Image
                        src={item.imageUrl}
                        alt={item.titleEn}
                        fill
                        className={styles.tableImage}
                        sizes="60px"
                      />
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.titleBn}</td>
                  <td>{item.titleEn}</td>
                  <td>
                    <span className="badge badge-primary">
                      {item.category ? item.category.nameEn : 'Uncategorized'}
                    </span>
                  </td>
                  <td>{item.year}</td>
                  <td>
                    {item.takenAt ? new Date(item.takenAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteItem(item.id)}
                      disabled={isDeletingId === item.id}
                    >
                      {isDeletingId === item.id ? (
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

      {/* Upload Photos Modal */}
      {uploadModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Upload Gallery Photos</h3>
              <button className={styles.closeBtn} onClick={() => setUploadModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleBatchUpload}>
              <div className={styles.formGrid}>
                {/* Category selection */}
                <div className={styles.formGroup}>
                  <label>Target Category</label>
                  <select
                    value={targetCategory}
                    onChange={(e) => setTargetCategory(e.target.value)}
                    required
                  >
                    {categories
                      .filter((c) => c.slug !== 'all')
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nameEn} ({cat.nameBn})
                        </option>
                      ))}
                  </select>
                </div>

                {/* Year input */}
                <div className={styles.formGroup}>
                  <label>Year</label>
                  <input
                    type="number"
                    min="2016"
                    max={new Date().getFullYear() + 1}
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Date Option */}
              <div className={styles.formGroup}>
                <label>Date Toggles</label>
                <div className={styles.dateOptions}>
                  <div
                    className={styles.dateRadio}
                    onClick={() => setDateType('recent')}
                  >
                    <input
                      type="radio"
                      checked={dateType === 'recent'}
                      readOnly
                    />
                    <span>Recent Date (Now)</span>
                  </div>
                  <div
                    className={styles.dateRadio}
                    onClick={() => setDateType('custom')}
                  >
                    <input
                      type="radio"
                      checked={dateType === 'custom'}
                      readOnly
                    />
                    <span>Custom Date</span>
                  </div>
                </div>
                {dateType === 'custom' && (
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    style={{ marginTop: '10px' }}
                    required
                  />
                )}
              </div>

              {/* File input selection (supports up to 20 files) */}
              <div
                className={styles.uploadArea}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className={styles.uploadLabel}>
                  <Upload size={32} />
                  <span>Click to select images (Max 20)</span>
                  <small>Supported formats: JPG, PNG, WEBP</small>
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

              {/* Previews and Titles per selected image */}
              {selectedFiles.length > 0 && (
                <div>
                  <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Selected Images & Custom Titles</h4>
                  <div className={styles.previewGrid}>
                    {selectedFiles.map((sf, index) => (
                      <div key={index} className={styles.previewCard}>
                        <div className={styles.previewImgWrapper}>
                          <Image
                            src={sf.preview}
                            alt="preview"
                            fill
                            className={styles.previewImg}
                            sizes="150px"
                          />
                        </div>
                        <button
                          type="button"
                          className={styles.removePreviewBtn}
                          onClick={() => removeSelectedFile(index)}
                        >
                          <X size={16} />
                        </button>
                        <div className={styles.previewInputs}>
                          <input
                            type="text"
                            placeholder="শিরোনাম (বাংলা)"
                            value={sf.titleBn}
                            onChange={(e) => {
                              const updated = [...selectedFiles]
                              updated[index].titleBn = e.target.value
                              setSelectedFiles(updated)
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Title (English)"
                            value={sf.titleEn}
                            onChange={(e) => {
                              const updated = [...selectedFiles]
                              updated[index].titleEn = e.target.value
                              setSelectedFiles(updated)
                            }}
                          />
                        </div>
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
                    setUploadModalOpen(false)
                    setSelectedFiles([])
                  }}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                  {isSaving && <Loader2 className={styles.spinning} size={18} />}
                  Upload & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Custom Category Modal */}
      {categoryModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} ${styles.smallModal}`}>
            <div className={styles.modalHeader}>
              <h3>Add Custom Category</h3>
              <button className={styles.closeBtn} onClick={() => setCategoryModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateCategory}>
              <div className={styles.formGroup}>
                <label>Category Name (Bengali)</label>
                <input
                  type="text"
                  placeholder="যেমন: টিউবওয়েল স্থাপন"
                  value={newCatBn}
                  onChange={(e) => setNewCatBn(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category Name (English)</label>
                <input
                  type="text"
                  placeholder="যেমন: Tubewell Installation"
                  value={newCatEn}
                  onChange={(e) => setNewCatEn(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category Slug (Unique)</label>
                <input
                  type="text"
                  placeholder="যেমন: tubewell-installation"
                  value={newCatSlug}
                  onChange={(e) => setNewCatSlug(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setCategoryModalOpen(false)}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                  {isSaving && <Loader2 className={styles.spinning} size={18} />}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
