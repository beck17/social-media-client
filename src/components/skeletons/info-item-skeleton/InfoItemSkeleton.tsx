import React from 'react'
import styles from './InfoItemSkeleton.module.scss'

export const InfoSkeleton = () => {
	return (
		<div className={styles.skeletonCard}>

			<div className={styles.content}>
				<div className={styles.group}>
					<div className={styles.nameSkeleton}></div>
					<div className={styles.actionsSkeleton}></div>
				</div>
				<div className={styles.countSkeleton}></div>
				<div className={styles.dateSkeleton}></div>
			</div>
		</div>
	)
}