import React, { FC } from 'react'

import { useUserFeed } from '@/hooks/posts/useGetPost'

import SubmitPost from '@/components/shared/submitPost/SubmitPost'
import Post from '@/components/shared/post/Post'
import PostLoader from '@/components/skeletons/post-loader/PostLoader'

import styles from '../../../assets/styles/screens/Home.module.scss'

const Feed: FC = () => {
	const { posts = [], isLoading, refetch } = useUserFeed()

	return (
		<section className={styles.home}>
			<SubmitPost refetch={refetch} />
			{isLoading ? (
				<PostLoader />
			) : (
				posts.map((post) => <Post post={post} key={post._id} refetchPosts={refetch} />)
			)}
		</section>
	)
}

export default Feed
