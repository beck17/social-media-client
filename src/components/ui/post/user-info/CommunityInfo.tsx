import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useDate } from '@/hooks/useDate'

import { IPost } from '@/types/post.interface'

import styles from './PostInfo.module.scss'


interface Props {
	post: IPost;
}

const CommunityInfo: FC<Props> = ({
																		post,
																	}) => {
	const postCreated = useDate(post.createdAt)

	return (
		<div className={styles.user}>
			<div className={styles.userInfo}>
				<Image
					src={process.env.BASE_URL + `${post.community?.communityAvatar}`}
					alt='аватар'
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
		</div>
	)
}

export default CommunityInfo
