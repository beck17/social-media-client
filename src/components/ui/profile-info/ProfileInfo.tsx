import styles from './ProfileInfo.module.scss'

import { IUser } from '@/types/user.interface'
import { useDateWithYear } from '@/hooks/useDate'
import { FriendActions } from '@/components/ui/friend-actions/FriendActions'
import React from 'react'
import { getQuantityFriends } from '@/lib/get-quantity-friends'
import Link from 'next/link'

interface Props {
	profileId: string
	userProfile: IUser | undefined
	isLoading?: boolean
	refetchUserProfile?: () => void
	style?: any
}

export const ProfileInfo: React.FC<Props> = ({ style, profileId, userProfile, isLoading, refetchUserProfile }) => {



	const userFullName = isLoading
		? 'SKELETON'
		: `${userProfile?.firstName} ${userProfile?.lastName}`

	const quantityFriends = getQuantityFriends(userProfile?.friends.length)

	return (
		<>
			<div className={styles.title} style={style}>
				<Link href={`/profile/${profileId}`}>
					<span>{userFullName}</span>
				</Link>
				<span className={styles.info}>
						{quantityFriends}
				</span>
				<span className={styles.info}>
						{useDateWithYear(userProfile?.createdAt) + 'г.'}
				</span>
			</div>
		</>

	)
}