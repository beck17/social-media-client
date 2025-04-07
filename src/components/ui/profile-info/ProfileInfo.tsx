import styles from './ProfileInfo.module.scss'

import { IUser } from '@/types/user.interface'
import { useDateWithYear } from '@/hooks/utils/useDate'
import React from 'react'
import { getQuantityFriends } from '@/lib/utils/get-quantity-friends'
import Link from 'next/link'
import cn from 'clsx'

interface Props {
	profileId: string
	userProfile: IUser
	isProfile?: boolean
}

export const ProfileInfo: React.FC<Props> = ({ profileId, userProfile, isProfile }) => {


	const userFullName = `${userProfile.firstName} ${userProfile.lastName}`

	const userFriends = userProfile.friends

	const quantityFriends = getQuantityFriends(userFriends.length)

	const nameBlock = () => {
		if (isProfile) return <span>{userFullName}</span>

		return (
			<Link href={`/profile/${profileId}`}>
				<span>{userFullName}</span>
			</Link>
		)
	}

	return (
		<div className={cn(isProfile && styles.left, styles.title)}>
			{nameBlock()}
			<span className={styles.info}>
						{quantityFriends}
				</span>
			<span className={styles.info}>
						{useDateWithYear(userProfile.createdAt) + 'г.'}
				</span>
		</div>

	)
}