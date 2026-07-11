import React from 'react'
import { Skeleton, TableRowSkeleton } from '@/components/ui/Skeleton'
import styles from './Dashboard.module.css'

export default function DashboardLoading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <Skeleton style={{ height: '32px', width: '250px', marginBottom: '8px' }} />
        <Skeleton style={{ height: '20px', width: '350px' }} />
      </div>
      
      <div className={styles.tableWrapper} style={{ marginTop: '2rem' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              {Array.from({ length: 5 }).map((_, i) => (
                <th key={i}>
                  <Skeleton style={{ height: '16px', width: '80px' }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i}>
                <td colSpan={5} style={{ padding: 0 }}>
                  <TableRowSkeleton columns={5} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
