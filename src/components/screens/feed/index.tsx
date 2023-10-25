import React, { FC } from 'react'

import { useAllPost } from '../../../hooks/usePost'

import SubmitPost from './submitPost/SubmitPost'
import Post from '../../ui/post/Post'
import PostLoader from '../../ui/loaders/post-loader/PostLoader'

import styles from '../../../assets/styles/screens/Home.module.scss'

const Feed: FC = () => {
	const { posts, isLoading, refetch } = useAllPost()

	return (
		<section className={styles.home}>
			<SubmitPost refetch={refetch} />
			{isLoading ? (
				<PostLoader />
			) : (
				posts?.map((post) => (
					<Post refetchPosts={refetch} post={post} key={post._id} />
				))
			)}
		</section>
	)
}

export default Feed
