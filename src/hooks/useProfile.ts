import { useQuery } from 'react-query'

import { UserService } from '@/services/user.service'


export const useProfile = () => {
	const { isLoading, data, refetch } = useQuery(
		'get profile',
		() => UserService.getMyProfile(),
		{
			select: ({ data }) => data,
		},
	)

	return { isLoading, myProfile: data, refetch }
}

export const useUserProfile = (id: string) => {
	const { isLoading, data, refetch } = useQuery(
		`get user profile${id}`,
		() => UserService.getUserProfile(id),
		{
			select: ({ data }) => data,
		},
	)

	return { isLoading, userProfile: data, refetchUserProfile: refetch }
}
