import React, { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Button from '../../ui/button/Button'
import SubmitPost from '../feed/submitPost/SubmitPost'
import Post from '../../ui/post/Post'
import styles from './Community.module.scss'
import { useIsSubscribed, useOneCommunity } from '../../../hooks/useCommunity'
import { useDate } from '../../../hooks/useDate'
import { useMutation } from 'react-query'
import { CommunityService } from '../../../services/community/community.service'
import { useCommunityPosts } from '../../../hooks/useCommunityPost'
import SubmitCommunityPost from './submitCommunityPost/SubmitCommunityPost'
import { useAuth } from '../../../hooks/useAuth'
import CommunityContent from './communityContent/CommunityContent'
import PostLoader from '../../ui/loaders/post-loader/PostLoader'
import CommunityActions from './communityItem/CommunityActions'

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
					<span className={styles.info}>{useDate(community?.createdAt)}</span>
				</div>
				{/*<Button onClick={() => toggleSubscribeHandler(community?._id)}>*/}
				{/*	{buttonTitle}*/}
				{/*</Button>*/}
				<span style={{ position: 'relative', top: '-10px' }}>
					<CommunityActions
						communityId={community?._id}
						refetch={refetch}
						isCreator={isCreator}
					/>
				</span>
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
