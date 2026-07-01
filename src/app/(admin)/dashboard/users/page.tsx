import React from 'react';
import prisma from '@/lib/db';
import styles from '../Dashboard.module.css';

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: { role: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1>Manage Users</h1>
        <p>View and manage administrators, editors, and members.</p>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6}>No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className={styles.boldCell}>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td><span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{user.role?.name || 'N/A'}</span></td>
                  <td>{user.status}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
