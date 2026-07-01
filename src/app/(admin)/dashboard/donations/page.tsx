import React from 'react';
import { getDonations } from '@/actions/donations';
import styles from '../Dashboard.module.css';

export default async function AdminDonationsPage() {
  const result = await getDonations();
  
  if (result.error) {
    return <div>Error loading donations: {result.error}</div>;
  }

  const donations = result.donations || [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1>Manage Donations</h1>
        <p>Review incoming donations and their statuses.</p>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Phone</th>
              <th>Amount (BDT)</th>
              <th>Method</th>
              <th>Trx ID</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan={7}>No donations found.</td>
              </tr>
            ) : (
              donations.map((donation) => (
                <tr key={donation.id}>
                  <td className={styles.boldCell}>{donation.name}</td>
                  <td>{donation.phone}</td>
                  <td style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>৳{donation.amount}</td>
                  <td>{donation.method}</td>
                  <td>{donation.transactionId}</td>
                  <td>{donation.status}</td>
                  <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
