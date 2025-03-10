import styles from '@/assets/styles/screens/Profile.module.scss'
import Image from 'next/image'
import home from '@/assets/img/home.svg'
import Button from '@/components/ui/button/Button'
import { useCreateConversation } from '@/hooks/useCreateConversation'
import { IUser } from '@/types/user.interface'
import { getFriendAction } from '@/lib/get-friend-action'
import { useDateWithYear } from '@/hooks/useDate'
import { FriendActions } from '@/components/screens/friends/friend-actions/FriendActions'
import React from 'react'
import { getQuantityFriends } from '@/lib/get-quantity-friends'
import { useUserProfile } from '@/hooks/useProfile'

interface Props {
	profileId: string
	userProfile: IUser | undefined
	isLoading: boolean
	refetchUserProfile: any
}

export const ProfileInfo: React.FC<Props> = ({ profileId, userProfile, isLoading, refetchUserProfile }) => {

	const userFullName = isLoading
		? 'SKELETON'
		: `${userProfile?.firstName} ${userProfile?.lastName}`

	const quantityFriends = getQuantityFriends(userProfile?.friends.length)

	return (
		<div className={styles.uInfo}>
			<div className={styles.title}>
				<span>{userFullName}</span>
				<span className={styles.info}>
						{quantityFriends}
					</span>
				<span className={styles.info}>
						{useDateWithYear(userProfile?.createdAt) + 'г.'}
					</span>
			</div>
			<FriendActions refetchUserProfile={refetchUserProfile} friendId={profileId} />
		</div>
	)
}