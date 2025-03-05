import { useQuery } from 'react-query'
import { CommunityPostService } from '@/services/community-post/community-post.service'

export const useCommunityPosts = (communityId: string | undefined) => {
	const { data, isLoading, refetch } = useQuery(
		`get community posts ${communityId}`,
		() => CommunityPostService.getCommunityPosts(communityId),
		{
			select: ({ data }) => data,
		},
	)

	return { communityPosts: data, isLoading, refetch }
}
