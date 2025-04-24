import React, { FC } from 'react'

import { useLike } from '@/hooks/posts/useLike'

import PostInfo from '@/components/shared/post-info/PostInfo'
import { PostFooter } from '@/components/shared/post-footer/PostFooter'

import { PostContent } from '@/components/ui/post-content/PostContent'

import { IPost } from '@/types/post.interface'

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
	const { isLiked, likedCount, toggleLikeHandler, isLoadingLike } = useLike(post._id)
	return (
		<div className={styles.post}>
			<div className={styles.container}>
				<PostInfo
					post={post}
					isCreator={isCreator}
					refetchPosts={refetchPosts}
				/>
				<PostContent
					postId={post._id}
					text={post.text}
					image={post.image}
					isLoadingLike={isLoadingLike}
					toggleLikeHandler={toggleLikeHandler}
				/>
				<PostFooter
					postId={post._id}
					postUserId={post.user._id}
					isLiked={isLiked}
					likedCount={likedCount}
					toggleLikeHandler={toggleLikeHandler}
					isLoadingLike={isLoadingLike}
				/>
			</div>
		</div>
	)
}

export default Post
