'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react'
import styles from './AdvisersAdmin.module.css'

interface Adviser {
  id: string
  nameBn: string
  nameEn: string
  designationBn: string
  designationEn: string
  titleBn: string | null
  titleEn: string | null
  image: string | null
  order: number
  status: string
}

export default function AdvisersAdminPage() {
  const [advisers, setAdvisers] = useState<Adviser[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nameBn: '',
    nameEn: '',
    designationBn: '',
    designationEn: '',
    titleBn: '',
    titleEn: '',
    image: '',
    order: '0',
  })

  useEffect(() => {
    fetchAdvisers()
  }, [])

  const fetchAdvisers = async () => {
    try {
      const res = await fetch('/api/advisers')
      const data = await res.json()
      if (Array.isArray(data)) {
        setAdvisers(data)
      } else {
        console.error('Expected array from API but got:', data)
        setAdvisers([])
      }
    } catch (err) {
      console.error('Failed to fetch advisers', err)
      setAdvisers([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const openModal = (adviser?: Adviser) => {
    if (adviser) {
      setEditingId(adviser.id)
      setFormData({
        nameBn: adviser.nameBn,
        nameEn: adviser.nameEn,
        designationBn: adviser.designationBn,
        designationEn: adviser.designationEn,
        titleBn: adviser.titleBn || '',
        titleEn: adviser.titleEn || '',
        image: adviser.image || '',
        order: adviser.order.toString(),
      })
    } else {
      setEditingId(null)
      setFormData({
        nameBn: '',
        nameEn: '',
        designationBn: '',
        designationEn: '',
        titleBn: '',
        titleEn: '',
        image: '',
        order: '0',
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
    const url = editingId ? `/api/advisers/${editingId}` : '/api/advisers'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: parseInt(formData.order, 10) || 0,
        }),
      })
      if (res.ok) {
        closeModal()
        fetchAdvisers()
      } else {
        alert('Failed to save adviser.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/advisers/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setConfirmDeleteId(null)
        fetchAdvisers()
      } else {
        alert('Failed to delete adviser.')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Manage Advisory Council (উপদেষ্টা পরিষদ)</h2>
        <button className={styles.addBtn} onClick={() => openModal()}>
          <Plus size={16} /> Add New Adviser
        </button>
      </div>

      {loading ? (
        <p>Loading advisers...</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name (Bn/En)</th>
                <th>Position (Bn/En)</th>
                <th>Title/Degree (Bn/En)</th>
                <th>Order (ক্রম)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {advisers.map((adv) => (
                <tr key={adv.id}>
                  <td>
                    <div><strong>{adv.nameBn}</strong></div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{adv.nameEn}</div>
                  </td>
                  <td>
                    <div>{adv.designationBn}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{adv.designationEn}</div>
                  </td>
                  <td>
                    <div>{adv.titleBn || '-'}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{adv.titleEn || '-'}</div>
                  </td>
                  <td>{adv.order}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => openModal(adv)}>
                        <Edit2 size={15} /> Edit
                      </button>
                      <button className={styles.deleteBtn} onClick={() => setConfirmDeleteId(adv.id)}>
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
              <h3>{editingId ? 'Edit Adviser' : 'Add New Adviser'}</h3>
              <button className={styles.closeBtn} onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Name (Bengali) *</label>
                <input required type="text" name="nameBn" value={formData.nameBn} onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Name (English) *</label>
                <input required type="text" name="nameEn" value={formData.nameEn} onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Position/Designation (Bengali) *</label>
                <input required type="text" name="designationBn" value={formData.designationBn} onChange={handleInputChange} placeholder="e.g. প্রধান উপদেষ্টা" />
              </div>
              <div className={styles.formGroup}>
                <label>Position/Designation (English) *</label>
                <input required type="text" name="designationEn" value={formData.designationEn} onChange={handleInputChange} placeholder="e.g. Chief Adviser" />
              </div>
              <div className={styles.formGroup}>
                <label>Title/Honorifics (Bengali)</label>
                <input type="text" name="titleBn" value={formData.titleBn} onChange={handleInputChange} placeholder="e.g. মুফতি / ডক্টর" />
              </div>
              <div className={styles.formGroup}>
                <label>Title/Honorifics (English)</label>
                <input type="text" name="titleEn" value={formData.titleEn} onChange={handleInputChange} placeholder="e.g. Mufti / PhD" />
              </div>
              <div className={styles.formGroup}>
                <label>Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="e.g. /images/advisers/avatar.jpg" />
              </div>
              <div className={styles.formGroup}>
                <label>Sort Order (ক্রম) - প্রধান উপদেষ্টার মান ১ রাখুন (সবচেয়ে উপরে রাখতে)</label>
                <input type="number" name="order" value={formData.order} onChange={handleInputChange} />
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
            <h3 className={styles.confirmTitle}>Delete Adviser?</h3>
            <p className={styles.confirmText}>এই উপদেষ্টাকে মুছে ফেলা হবে। এই কাজটি আর ফেরানো যাবে না।</p>
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
