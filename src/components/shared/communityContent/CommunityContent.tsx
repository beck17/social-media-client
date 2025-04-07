import React, { FC } from 'react'

import { useCommunityPosts } from '@/hooks/communities/useCommunityPost'

import SubmitCommunityPost from '@/components/shared/submit-community-post/SubmitCommunityPost'
import Post from '@/components/shared/post/Post'

import { ICommunity } from '@/types/community.interface'
import { EmptyInfoBlock } from '@/components/ui/empty-users-block/EmptyInfoBlock'

interface Props {
	community: ICommunity
	isCreator: boolean
}

const CommunityContent: FC<Props> = ({ community, isCreator }) => {

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
					id={community._id}
					refetch={refetchPosts}
				/>
			)}
			{renderData()}
		</>
	)
}

export default CommunityContent
