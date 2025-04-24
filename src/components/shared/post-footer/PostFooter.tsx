import React, { FC, useState } from 'react'

import { usePostComments } from '@/hooks/posts/useComment'

import { LikeButton } from '@/components/ui/like-button/LikeButton'
import { CommentButton } from '@/components/ui/comment-button/CommentButton'
import Comments from '@/components/ui/comment/Comment'

import styles from './PostFooter.module.scss'


interface Props {
	postId: string
	postUserId: string
	isLiked: boolean
	isLoadingLike: boolean
	likedCount: number
	toggleLikeHandler: (id: string) => Promise<void>
}

export const PostFooter: FC<Props> = ({
																				postId,
																				postUserId,
																				isLiked,
																				isLoadingLike,
																				likedCount,
																				toggleLikeHandler,
																			}) => {
	const { comments, refetch } = usePostComments(postId)

	const [commentOpen, setCommentOpen] = useState<boolean>(false)

	const commentCount = comments?.length || 0
	return (
		<>
			<div className={styles.postFooter}>
				<LikeButton
					postId={postId}
					isLiked={isLiked}
					isLoadingLike={isLoadingLike}
					likedCount={likedCount}
					toggleLikeHandler={toggleLikeHandler}
				/>
				<CommentButton
					commentCount={commentCount}
					setCommentOpen={setCommentOpen}
				/>
			</div>
			{commentOpen && (
				<Comments
					postId={postId}
					postUserId={postUserId}
					refetch={refetch}
					comments={comments}
				/>
			)}
		</>
	)
}