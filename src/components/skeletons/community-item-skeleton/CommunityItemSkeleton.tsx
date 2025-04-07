import React from 'react'
import styles from './CommunityItemSkeleton.module.scss'

const CommunityItemSkeleton = () => {
	return (
		<div className={styles.skeletonCard}>
			<div className={styles.avatarSkeleton}></div>

			<div className={styles.content}>
				<div className={styles.nameSkeleton}></div>
				<div className={styles.genreSkeleton}></div>
				<div className={styles.countSkeleton}></div>
			</div>
		</div>
	)
}

export default CommunityItemSkeleton