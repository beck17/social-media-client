import React, { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import CommunityContent from './communityContent/CommunityContent'
import PostLoader from '../../ui/loaders/post-loader/PostLoader'
import CommunityActions from './communityItem/CommunityActions'

import { useOneCommunity } from '../../../hooks/useCommunity'
import { useDateWithYear } from '../../../hooks/useDate'
import { useAuth } from '../../../hooks/useAuth'

import styles from './Community.module.scss'

const Community: FC = () => {
	const { user } = useAuth()
	const { query } = useRouter()
	const { community, isLoading, refetch } = useOneCommunity(query.id)

	const avatarPath = {
		avatar: isLoading
			? '/uploads/default/no-avatar.jpg'
			: community?.communityAvatar,
		background: isLoading
			? '/uploads/default/background.jpg'
			: community?.communityBackgroundPic,
	}

	const isCreator: boolean = user._id === community?.creator

	return (
		<div className={styles.community}>
			<div className={styles.images}>
				<Image
					className={styles.cover}
					src={`http://localhost:5000${avatarPath.background}`}
					alt="2"
					width={0}
					height={0}
					sizes="100vw 100vh"
					priority
				/>

				<Image
					width={0}
					height={0}
					sizes="100vw 100vh"
					src={`http://localhost:5000${avatarPath.avatar}`}
					alt="1"
					className={styles.profilePic}
				/>
			</div>
			<div className={styles.uInfo}>
				<div className={styles.title}>
					<span>{community?.name}</span>
					<span className={styles.info}>
						{community?.members.length} подписчиков
					</span>
					<span className={styles.info}>
						{useDateWithYear(community?.createdAt) + 'г.'}
					</span>
				</div>
				<CommunityActions
					communityId={community?._id}
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
