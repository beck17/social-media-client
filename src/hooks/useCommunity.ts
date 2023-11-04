import { useQuery } from 'react-query'
import { CommunityService } from '../services/community/community.service'

export const useAllCommunity = () => {
	const { data, isLoading, refetch } = useQuery(
		'get all communities',
		() => CommunityService.getAllCommunities(),
		{
			select: ({ data }) => data,
		},
	)

	return { communities: data, isLoading, refetch }
}

export const useOneCommunity = (id) => {
	const { data, isLoading, refetch } = useQuery(
		`get community ${id}`,
		() => CommunityService.getOneCommunity(id),
		{
			select: ({ data }) => data,
		},
	)

	return { community: data, isLoading, refetch }
}
