import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useAuth } from '@/hooks/useAuth'
import { useDate } from '@/hooks/useDate'

import PostActions from '../../select/PostActions'

import { IPost } from '@/types/post.interface'

import styles from './UserInfo.module.scss'


const UserInfo: FC<{ post: IPost }> = ({ post }) => {
	const postCreated = useDate(post.createdAt)

	const { user } = useAuth()
	const postOwnerName = `${post.user.firstName} ${post.user.lastName}`
	const isUserPost: boolean = post.user._id === user?._id


	return (
		<div className={styles.user}>
			<div className={styles.userInfo}>
				<Image
					src={process.env.BASE_URL + `${post.user.avatar}`}
					alt="аватар"
					width={500}
					height={500}
				/>
				<div className={styles.details}>
					<Link href={`/profile/${post.user._id}`} className={styles.name}>
						{postOwnerName}
					</Link>
					<span className={styles.date}>{postCreated}</span>
				</div>
			</div>
			{isUserPost && <PostActions postId={post._id} />}
		</div>
	)
}

export default UserInfo
