import React from 'react'
import styles from './Skeleton.module.css'

export const Skeleton = ({ className, style }: { className?: string, style?: React.CSSProperties }) => {
  return <div className={`${styles.skeleton} ${className || ''}`} style={style} />
}

export const AdviserCardSkeleton = () => {
  return (
    <div className={styles.adviserCardSkeleton}>
      <div className={`${styles.skeleton} ${styles.avatarSkeleton}`} />
      <div className={`${styles.skeleton} ${styles.titleSkeleton}`} style={{ marginTop: '8px' }} />
      <div className={`${styles.skeleton} ${styles.textSkeletonShort}`} style={{ marginTop: '4px' }} />
    </div>
  )
}

export const ActivityCardSkeleton = () => {
  return (
    <div className={styles.activityCardSkeleton}>
      <div className={`${styles.skeleton} ${styles.activityIconSkeleton}`} />
      <div className={`${styles.skeleton} ${styles.titleSkeleton}`} style={{ width: '80%', margin: '0 0 16px 0' }} />
      <div className={`${styles.skeleton} ${styles.textSkeleton}`} />
      <div className={`${styles.skeleton} ${styles.textSkeleton}`} />
      <div className={`${styles.skeleton} ${styles.textSkeleton}`} style={{ width: '60%' }} />
    </div>
  )
}

export const TableRowSkeleton = ({ columns = 4 }: { columns?: number }) => {
  return (
    <div className={styles.tableRowSkeleton}>
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className={`${styles.skeleton} ${styles.tableCellSkeleton}`} />
      ))}
    </div>
  )
}
