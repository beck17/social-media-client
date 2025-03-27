import React, { FC, useState } from 'react'
import Image from 'next/image'

import { usePostComments } from '@/hooks/useComment'
import { useLike, useToggleLike } from '@/hooks/useLike'

import PostInfo from '@/components/ui/post/post-info/PostInfo'
import Comments from '../comment/Comment'

import { IPost } from '@/types/post.interface'

import likeRed from '@/assets/img/like-red.svg'
import like from '@/assets/img/like.svg'
import commentsImg from '@/assets/img/comments.svg'

import styles from './Post.module.scss'


interface Props {
	post: IPost;
	refetchPosts: () => void
	isCreator?: boolean;
}

const Post: FC<Props> = ({
													 post,
													 refetchPosts,
													 isCreator,
												 }) => {
	const [commentOpen, setCommentOpen] = useState<boolean>(false)

	const { comments, refetch } = usePostComments(post._id)
	const commentCount = comments?.length || 0

	const { liked, count, refetchHandler } = useLike(post._id)
	const likeSvgPic = liked ? likeRed : like
	const likeCount = count || 0


	const { toggleLike } = useToggleLike(post._id)

	const toggleLikeHandler = async (id: string) => {
		await toggleLike(id)
		await refetchHandler()
	}

	return (
		<div className={styles.post}>
			<div className={styles.container}>
				<div>
					<PostInfo post={post} isCreator={isCreator} refetchPosts={refetchPosts} />
				</div>
				<div className={styles.content} onDoubleClick={() => toggleLikeHandler(post._id)}>
					<p>{post.text}</p>
					{post.image && (
						<Image
							src={process.env.BASE_URL + `${post.image}`}
							width={1000}
							height={1000}
							alt='Фото'
						/>
					)}
				</div>
				<div className={styles.info}>
					<div className={styles.item}>
						<div onClick={() => toggleLikeHandler(post._id)}>
							<Image src={likeSvgPic} alt='лайк' width={25} height={25} />
						</div>
						{likeCount}
					</div>
					<div
						className={styles.item}
						onClick={() => setCommentOpen((prev) => !prev)}
					>
						<Image src={commentsImg} alt='Коммент' width={25} height={25} />
						{commentCount}
					</div>
				</div>
				{commentOpen && (
					<Comments
						postId={post._id}
						postUserId={post.user._id}
						refetch={refetch}
						comments={comments}
					/>
				)}
			</div>
		</div>
	)
}

export default Post
