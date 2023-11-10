import React, { FC } from 'react'
import SubmitCommunityPost from '../submitCommunityPost/SubmitCommunityPost'
import Post from '../../../ui/post/Post'
import { useCommunityPosts } from '../../../../hooks/useCommunityPost'
import { ICommunity } from '../../../../types/community.interface'

const CommunityContent: FC<{
	community: ICommunity
	isLoading: boolean
	isCreator: boolean
}> = ({ community, isLoading, isCreator }) => {
	const { communityPosts, refetch: refetchPosts } = useCommunityPosts(
		community._id,
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
			{communityPosts?.map((post) => (
				<Post post={post} key={post._id} isCreator={isCreator} />
			))}
		</>
	)
}

export default CommunityContent
