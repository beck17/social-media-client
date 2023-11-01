import { useQuery } from 'react-query'
import { AllCommunityService } from '../services/community/all-community'

export const useAllCommunities = () => {
	const { data, isLoading, refetch } = useQuery(
		'get all communities',
		() => AllCommunityService.getAllCommunities(),
		{
			select: ({ data }) => data,
		},
	)

	return { communities: data, isLoading, refetch }
}
