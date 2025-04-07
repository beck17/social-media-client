import styles from './CoverWithAvatarSkeleton.module.scss'
import React from 'react'

export const CoverWithAvatarSkeleton = () => {
	return (
		<div className={styles.images}>
			<div className={styles.cover}></div>

			<div className={styles.avatar}></div>
		</div>
	)
}