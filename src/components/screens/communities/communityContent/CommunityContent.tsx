import React, { FC } from 'react'

import { useCommunityPosts } from '@/hooks/communities/useCommunityPost'

import SubmitCommunityPost from '../submitCommunityPost/SubmitCommunityPost'
import Post from '@/components/shared/post/Post'

import { ICommunity } from '@/types/community.interface'
import { EmptyInfoBlock } from '@/components/ui/empty-users-block/EmptyInfoBlock'

interface Props {
	community: ICommunity
	isLoading: boolean
	isCreator: boolean
}

const CommunityContent: FC<Props> = ({ community, isLoading, isCreator }) => {

	const { communityPosts = [], refetch: refetchPosts } = useCommunityPosts(
		community._id,
	)

	const renderData = () => {
		if (!communityPosts.length) return <EmptyInfoBlock text='Постов пока нет...' smallSize />

		return (
			communityPosts.map((post) => (
				<Post post={post} key={post._id} isCreator={isCreator} refetchPosts={refetchPosts} />
			))
		)
	}

	return (
		<>
			{isCreator && (
				<SubmitCommunityPost
					refetch={refetchPosts}
					community={community}
					isLoading={isLoading}
				/>
			)}
			{renderData()}
		</>
	)
}

export default CommunityContent
