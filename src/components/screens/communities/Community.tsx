import React, { FC } from 'react'
import { useRouter } from 'next/router'

import CommunityContent from './communityContent/CommunityContent'
import PostLoader from '@/components/ui/skeletons/post-loader/PostLoader'
import CommunityActions from './communityItem/CommunityActions'

import { useOneCommunity } from '@/hooks/useCommunity'
import { useDateWithYear } from '@/hooks/useDate'
import { useAuth } from '@/hooks/useAuth'

import { ICommunity } from '@/types/community.interface'

import styles from './Community.module.scss'
import { ProfileImages } from '@/components/ui/images/ProfileImages'


const Community: FC = () => {
	const router = useRouter()
	const id = router.query.id as string

	const { user } = useAuth()
	const { community = {} as ICommunity, isLoading, refetch } = useOneCommunity(id)

	// const avatarPath = {
	// 	avatar: isLoading
	// 		? '/uploads/default/no-avatar.jpg'
	// 		: community.communityAvatar,
	// 	background: isLoading
	// 		? '/uploads/default/background.jpg'
	// 		: community.communityBackgroundPic,
	// }

	const isCreator: boolean = user._id === community.creator

	return (
		<div className={styles.community}>
			<ProfileImages
				isLoading={isLoading}
				backgroundPic={community.communityBackgroundPic}
				avatar={community.communityAvatar}
			/>
			<div className={styles.uInfo}>
				<div className={styles.title}>
					<span>{community.name}</span>
					<span className={styles.info}>
						{community.members?.length} подписчиков
					</span>
					<span className={styles.info}>
						{useDateWithYear(community.createdAt) + 'г.'}
					</span>
				</div>
				<CommunityActions
					refetch={refetch}
					isCreator={isCreator}
				/>
			</div>
			<div className={styles.communityContainer}>
				{isLoading ? (
					<PostLoader />
				) : (
					<CommunityContent
						community={community}
						isLoading={isLoading}
						isCreator={isCreator}
					/>
				)}
			</div>
		</div>
	)
}

export default Community
