'use client'

import React from 'react'
import { Users, FileText, Heart, UserPlus, Clock } from 'lucide-react'
import styles from './Dashboard.module.css'

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Users', count: '১২', change: '+2 this week', icon: <Users size={22} />, color: 'hsl(145, 75%, 21%)' },
    { label: 'Total Posts', count: '৪৫', change: '+8 this month', icon: <FileText size={22} />, color: 'hsl(210, 80%, 40%)' },
    { label: 'Volunteers', count: '১৬৮', change: '+15 pending', icon: <UserPlus size={22} />, color: 'hsl(43, 76%, 51%)' },
    { label: 'Total Donations', count: '১,৪৫,০০০ ৳', change: '+20,000 BDT today', icon: <Heart size={22} />, color: 'hsl(350, 80%, 50%)' },
  ]

  const recentVolunteers = [
    { name: 'Rafiqul Islam', phone: '01712345678', skills: 'Dawah, Writing', status: 'Pending' },
    { name: 'Tahmid Hasan', phone: '01898765432', skills: 'Relief, Tech', status: 'Approved' },
    { name: 'Kazi Noman', phone: '01511223344', skills: 'Management', status: 'Pending' },
  ]

  const recentDonations = [
    { name: 'Abdullah Al-Mamun', amount: '৳৫,০০০', method: 'bKash', txnId: 'BK789FHD', status: 'Pending' },
    { name: 'Anonymous', amount: '৳১০,০০০', method: 'Bank', txnId: 'IB5647FD', status: 'Confirmed' },
    { name: 'Ziaur Rahman', amount: '৳১,৫০০', method: 'Nagad', txnId: 'NG6542DF', status: 'Confirmed' },
  ]

  return (
    <div className={styles.wrapper}>
      {/* Welcome message */}
      <div className={styles.welcome}>
        <h1>Assalamu Alaikum, Administrator</h1>
        <p>Here is what is happening with the Shubban Dawati Kafela portal today.</p>
      </div>

      {/* Stats row */}
      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} className="card card-hover">
            <div className={styles.statRow}>
              <div>
                <span className={styles.statLabel}>{stat.label}</span>
                <h3 className={styles.statCount}>{stat.count}</h3>
              </div>
              <div className={styles.iconWrapper} style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div className={styles.statChange}>
              <Clock size={12} /> <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lists section */}
      <div className={styles.listsGrid}>
        {/* Volunteers Table */}
        <div className="card">
          <h3 className="heading-sm" style={{ color: 'var(--primary)', marginBottom: '1.25rem' }}>
            Recent Volunteer Applications
          </h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Skills</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentVolunteers.map((vol, idx) => (
                  <tr key={idx}>
                    <td className={styles.boldCell}>{vol.name}</td>
                    <td>{vol.skills}</td>
                    <td>
                      <span className={`badge ${vol.status === 'Approved' ? 'badge-primary' : 'badge-accent'}`}>
                        {vol.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Donations Table */}
        <div className="card">
          <h3 className="heading-sm" style={{ color: 'var(--primary)', marginBottom: '1.25rem' }}>
            Recent Donations Logs
          </h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>TxnID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((don, idx) => (
                  <tr key={idx}>
                    <td className={styles.boldCell}>{don.name}</td>
                    <td>{don.amount}</td>
                    <td><code>{don.txnId}</code></td>
                    <td>
                      <span className={`badge ${don.status === 'Confirmed' ? 'badge-primary' : 'badge-accent'}`}>
                        {don.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
