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

// export const use
