import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useUserProfile } from '@/hooks/user/useProfile'

import styles from './ChatInfo.module.scss'


interface Props {
	withId: string
}

const ChatInfo: FC<Props> = ({withId}) => {
	const { userProfile, isLoading } = useUserProfile(withId)

	const imageSrc = isLoading ? `/uploads/default/no-avatar.jpg` :`${userProfile?.avatar}`
	const avatarImage = process.env.BASE_URL + imageSrc

	return (
		<div className={styles.chatInfo}>
			<Link href={'/im'}>Назад</Link>
			<span>
				{userProfile?.firstName} {userProfile?.lastName}
			</span>
			<Link href={`/profile/${userProfile?._id}`}>
				<Image
					src={avatarImage}
					alt="avatar photo"
					width={400}
					height={400}
				/>
			</Link>
		</div>
	)
}

export default ChatInfo
