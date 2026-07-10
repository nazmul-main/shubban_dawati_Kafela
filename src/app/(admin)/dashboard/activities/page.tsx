'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react'
import styles from './ActivitiesAdmin.module.css'

interface Activity {
  id: string
  titleBn: string
  titleEn: string
  descriptionBn: string
  descriptionEn: string
  icon: string | null
  image: string | null
  status: string
}

export default function ActivitiesAdminPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    titleBn: '',
    titleEn: '',
    descriptionBn: '',
    descriptionEn: '',
    icon: '',
  })

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/activities')
      const data = await res.json()
      setActivities(data)
    } catch (err) {
      console.error('Failed to fetch activities', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const openModal = (activity?: Activity) => {
    if (activity) {
      setEditingId(activity.id)
      setFormData({
        titleBn: activity.titleBn,
        titleEn: activity.titleEn,
        descriptionBn: activity.descriptionBn,
        descriptionEn: activity.descriptionEn,
        icon: activity.icon || '',
      })
    } else {
      setEditingId(null)
      setFormData({
        titleBn: '',
        titleEn: '',
        descriptionBn: '',
        descriptionEn: '',
        icon: '',
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `/api/activities/${editingId}` : '/api/activities'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        closeModal()
        fetchActivities()
      } else {
        alert('Failed to save activity.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/activities/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setConfirmDeleteId(null)
        fetchActivities()
      } else {
        alert('Failed to delete activity.')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Manage Activities</h2>
        <button className={styles.addBtn} onClick={() => openModal()}>
          <Plus size={16} /> Add New Activity
        </button>
      </div>

      {loading ? (
        <p>Loading activities...</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title (Bn)</th>
                <th>Title (En)</th>
                <th>Icon</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act) => (
                <tr key={act.id}>
                  <td>{act.titleBn}</td>
                  <td>{act.titleEn}</td>
                  <td>{act.icon}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => openModal(act)}>
                        <Edit2 size={15} /> Edit
                      </button>
                      <button className={styles.deleteBtn} onClick={() => setConfirmDeleteId(act.id)}>
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? 'Edit Activity' : 'Add New Activity'}</h3>
              <button className={styles.closeBtn} onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Title (Bengali)</label>
                <input required type="text" name="titleBn" value={formData.titleBn} onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Title (English)</label>
                <input required type="text" name="titleEn" value={formData.titleEn} onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Lucide Icon Name</label>
                <input type="text" name="icon" value={formData.icon} onChange={handleInputChange} placeholder="e.g. HeartHandshake" />
              </div>
              <div className={styles.formGroup}>
                <label>Description (Bengali)</label>
                <textarea required name="descriptionBn" rows={6} value={formData.descriptionBn} onChange={handleInputChange}></textarea>
              </div>
              <div className={styles.formGroup}>
                <label>Description (English)</label>
                <textarea required name="descriptionEn" rows={6} value={formData.descriptionEn} onChange={handleInputChange}></textarea>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                <button type="submit" className={styles.saveBtn}><Save size={16} /> Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmModal}>
            <div className={styles.confirmIcon}>
              <Trash2 size={32} color="#ef4444" />
            </div>
            <h3 className={styles.confirmTitle}>Delete Activity?</h3>
            <p className={styles.confirmText}>এই কার্যক্রমটি মুছে ফেলা হবে। এই কাজটি আর ফেরানো যাবে না।</p>
            <div className={styles.confirmActions}>
              <button className={styles.cancelBtn} onClick={() => setConfirmDeleteId(null)}>বাতিল করুন</button>
              <button className={styles.confirmDeleteBtn} onClick={() => handleDelete(confirmDeleteId)}>হ্যাঁ, মুছুন</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
