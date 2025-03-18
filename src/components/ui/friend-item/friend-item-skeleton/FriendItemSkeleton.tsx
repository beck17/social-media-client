import React from 'react'
import styles from './FriendItemSkeleton.module.scss'

const UserCardSkeleton = () => {
	return (
		<div className={styles.skeletonCard}>
			<div className={styles.avatarSkeleton}></div>

			<div className={styles.content}>
				<div className={styles.group}>
					<div className={styles.nameSkeleton}></div>
					<div className={styles.actionsSkeleton}></div>
				</div>
				<div className={styles.infoSkeleton}></div>
				<div className={styles.dateSkeleton}></div>
			</div>
		</div>
	)
}

export default UserCardSkeleton