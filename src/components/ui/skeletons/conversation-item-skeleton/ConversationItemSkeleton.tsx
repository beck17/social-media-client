import React from 'react'
import styles from './ConversationItemSkeleton.module.scss'

const UserCardSkeleton = () => {
	return (
		<div className={styles.skeletonCard}>
			<div className={styles.avatarSkeleton}></div>

			<div className={styles.content}>
				<div className={styles.nameSkeleton}></div>
				<div className={styles.infoSkeleton}></div>
			</div>

			<div className={styles.actionsSkeleton}></div>
		</div>
	)
}

export default UserCardSkeleton