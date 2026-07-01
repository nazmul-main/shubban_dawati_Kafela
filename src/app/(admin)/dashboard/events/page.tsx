import React from 'react';
import { getEvents, deleteEvent } from '@/actions/events';
import styles from '../Dashboard.module.css';

export default async function AdminEventsPage() {
  const result = await getEvents();
  
  if (result.error) {
    return <div>Error loading events: {result.error}</div>;
  }

  const events = result.events || [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1>Manage Events</h1>
        <p>View and manage all upcoming and past events.</p>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title (EN)</th>
              <th>Location</th>
              <th>Event Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={5}>No events found.</td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td className={styles.boldCell}>{event.titleEn}</td>
                  <td>{event.location}</td>
                  <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td>{event.status}</td>
                  <td>
                    <form action={async () => {
                      'use server';
                      await deleteEvent(event.id);
                    }}>
                      <button type="submit" style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}>
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
