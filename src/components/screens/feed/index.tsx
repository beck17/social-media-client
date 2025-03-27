import React, { FC } from 'react'

import { useAllPost } from '../../../hooks/usePost'

import SubmitPost from '@/components/ui/submitPost/SubmitPost'
import Post from '../../ui/post/Post'
import PostLoader from '@/components/ui/skeletons/post-loader/PostLoader'

import styles from '../../../assets/styles/screens/Home.module.scss'

const Feed: FC = () => {
	const { posts, isLoading, refetch } = useAllPost()



	return (
		<section className={styles.home}>
			<SubmitPost refetch={refetch} />
			{isLoading ? (
				<PostLoader />
			) : (
				posts?.map((post) => <Post post={post} key={post._id} refetchPosts={refetch} />)
			)}
		</section>
	)
}

export default Feed
