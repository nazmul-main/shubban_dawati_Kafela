import React from 'react'
import { Skeleton, TableRowSkeleton } from '@/components/ui/Skeleton'

export default function DashboardLoading() {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <Skeleton style={{ height: '32px', width: '250px', marginBottom: '8px' }} />
        <Skeleton style={{ height: '20px', width: '350px' }} />
      </div>
      
      <div style={{ marginTop: '2rem', border: '1px solid var(--border-color)', borderRadius: '0.75rem', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <th key={i} style={{ padding: '1rem', textAlign: 'left' }}>
                  <Skeleton style={{ height: '16px', width: '80px' }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
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
