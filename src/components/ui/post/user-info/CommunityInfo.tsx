import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useAuth } from '../../../../hooks/useAuth'
import { useDate } from '../../../../hooks/useDate'

import PostActions from '../../select/PostActions'

import { IPost } from '../../../../types/post.interface'
import styles from './UserInfo.module.scss'
import CommunityActions from '../../../screens/communities/communityItem/CommunityActions'
import CommunityPostActions from '../../select/CommunityPostActions'

const CommunityInfo: FC<{ post: IPost; isCreator?: boolean }> = ({
	post,
	isCreator,
}) => {
	const postCreated = useDate(post.createdAt)

	return (
		<div className={styles.user}>
			<div className={styles.userInfo}>
				<Image
					src={process.env.BASE_URL + `${post.community?.communityAvatar}`}
					alt="аватар"
					width={500}
					height={500}
				/>
				<div className={styles.details}>
					<Link
						href={`/community/${post.community?._id}`}
						className={styles.name}
					>
						{post.community?.name}
					</Link>
					<span className={styles.date}>{postCreated}</span>
				</div>
			</div>
			{isCreator && (
				<CommunityPostActions
					postId={post._id}
					communityId={post.community?._id}
				/>
			)}
		</div>
	)
}

export default CommunityInfo
