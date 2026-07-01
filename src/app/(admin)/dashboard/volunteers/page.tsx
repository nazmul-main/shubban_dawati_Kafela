import React from 'react';
import { getVolunteers } from '@/actions/volunteers';
import styles from '../Dashboard.module.css';

export default async function AdminVolunteersPage() {
  const result = await getVolunteers();
  
  if (result.error) {
    return <div>Error loading volunteers: {result.error}</div>;
  }

  const volunteers = result.volunteers || [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1>Manage Volunteers</h1>
        <p>Review and approve new volunteer applications.</p>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Skills</th>
              <th>Status</th>
              <th>Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.length === 0 ? (
              <tr>
                <td colSpan={6}>No volunteers found.</td>
              </tr>
            ) : (
              volunteers.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td className={styles.boldCell}>{volunteer.name}</td>
                  <td>{volunteer.phone}</td>
                  <td>{volunteer.address}</td>
                  <td>{volunteer.skills}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      backgroundColor: volunteer.status === 'PENDING' ? '#fef3c7' : '#d1fae5',
                      color: volunteer.status === 'PENDING' ? '#b45309' : '#047857',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {volunteer.status}
                    </span>
                  </td>
                  <td>{new Date(volunteer.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
