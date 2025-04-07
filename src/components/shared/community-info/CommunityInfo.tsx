import React from 'react'

import { useDateWithYear } from '@/hooks/useDate'

import styles from './CommunityInfo.module.scss'


interface Props {
	communityName: string
	membersCount: number
	communityCreatedAt: string
}

export const CommunityInfo: React.FC<Props> = ({ communityName, membersCount, communityCreatedAt }) => {


	// const quantityFriends = getQuantityFriends(userFriends.length)

	return (
		<div className={styles.title}>
			<span>{communityName}</span>
			<span className={styles.info}>
						{membersCount} подписчиков
			</span>
			<span className={styles.info}>
						{useDateWithYear(communityCreatedAt) + 'г.'}
			</span>
		</div>

	)
}