import React, { FC } from 'react'

import { useCommunityPosts } from '@/hooks/useCommunityPost'

import SubmitCommunityPost from '../submitCommunityPost/SubmitCommunityPost'
import Post from '../../../ui/post/Post'

import { ICommunity } from '@/types/community.interface'

interface Props {
	community: ICommunity | undefined
	isLoading: boolean
	isCreator: boolean
}

const CommunityContent: FC<Props> = ({ community, isLoading, isCreator }) => {
	const { communityPosts, refetch: refetchPosts } = useCommunityPosts(
		community?._id,
	)

	return (
		<>
			{isCreator && (
				<SubmitCommunityPost
					refetch={refetchPosts}
					community={community}
					isLoading={isLoading}
				/>
			)}
			{communityPosts && communityPosts.map((post) => (
				<Post post={post} key={post._id} isCreator={isCreator} />
			))}
		</>
	)
}

export default CommunityContent
