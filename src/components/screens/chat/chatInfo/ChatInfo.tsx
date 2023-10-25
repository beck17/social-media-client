import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useUserProfile } from '../../../../hooks/useProfile'

import styles from './ChatInfo.module.scss'

const ChatInfo: FC = () => {
	const router = useRouter()
	const { withId } = router.query

	const { userProfile, isLoading } = useUserProfile(withId)

	return (
		<div className={styles.chatInfo}>
			<Link href="/im">Назад</Link>
			<span>
				{userProfile?.firstName} {userProfile?.lastName}
			</span>
			<Link href={`/profile/${userProfile?._id}`}>
				<Image
					src={
						isLoading
							? 'http://localhost:5000/uploads/default/no-avatar.jpg'
							: `http://localhost:5000${userProfile?.avatar}`
					}
					alt="avatar photo"
					width={400}
					height={400}
				/>
			</Link>
		</div>
	)
}

export default ChatInfo
