import React, { FC } from 'react'

import { useUserFeed } from '@/hooks/posts/useGetPost'

import SubmitPost from '@/components/shared/submit-post/SubmitPost'
import Post from '@/components/shared/post/Post'
import PostLoader from '@/components/skeletons/post-loader/PostLoader'
import { EmptyInfoBlock } from '@/components/ui/empty-users-block/EmptyInfoBlock'

import styles from '../../../assets/styles/screens/Home.module.scss'

const Feed: FC = () => {
	const { posts = [], isLoading, refetch } = useUserFeed()

	const renderPosts = () => {
		if (isLoading) return <PostLoader />
		if (!posts.length) return <EmptyInfoBlock
			text={'Пока ваша лента пуста, подпишитесь на друзей, вступите в сообщества или начните публиковать свои мысли.'}
		/>

		return posts.map((post) => <Post post={post} key={post._id} refetchPosts={refetch} />)
	}

	return (
		<section className={styles.home}>
			<SubmitPost refetch={refetch} />
			{renderPosts()}
		</section>
	)
}

export default Feed
