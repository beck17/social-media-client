import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useDate } from '@/hooks/utils/useDate'

import { IPost } from '@/types/post.interface'

import styles from './PostInfo.module.scss'
import PostActions from '@/components/ui/select/PostActions'
import { useAuth } from '@/hooks/user/useAuth'
import { updateRemovePostHandler } from '@/lib/utils/update-remove-post-handler'
import { toastPromise } from '@/lib/toast-utils/toast-promise'


interface Props {
	post: IPost;
	refetchPosts: () => void;
	isCreator?: boolean
}

const PostInfo: FC<Props> = ({ post, isCreator, refetchPosts }) => {
	const { user } = useAuth()
	const isUserPost: boolean = post.user._id === user._id

	const isCommunityPost = Boolean(post.community)

	const postCreated = useDate(post.createdAt)

	const postName = isCommunityPost ? post.community!.name : `${post.user.firstName} ${post.user.lastName}`
	const imageSrc = isCommunityPost ? post.community!.communityAvatar : post.user.avatar
	const linkUrl = isCommunityPost ? `/community/${post.community?._id}` : `/profile/${post.user._id}`

	const { updatePost, deletePost } = updateRemovePostHandler(post._id, Boolean(post.community))

	return (
		<div className={styles.postInfo}>
			<div className={styles.user}>
				<div className={styles.userInfo}>
					<Image
						src={process.env.BASE_URL + imageSrc}
						alt='аватар'
						width={500}
						height={500}
					/>
					<div className={styles.details}>
						<Link href={linkUrl} className={styles.name}>
							{postName}
						</Link>
						<span className={styles.date}>{postCreated}</span>
					</div>
				</div>
			</div>
			{(isCreator || isUserPost) &&
				<PostActions
					postId={post._id}
					text={post.text}
					refetch={refetchPosts}
					updatePost={
						async (data) => {
							await toastPromise(updatePost(data))
						}
					}
					removePost={
						async data => {
							await toastPromise(deletePost(data))
						}}
				/>
			}
		</div>
	)
}

export default PostInfo
