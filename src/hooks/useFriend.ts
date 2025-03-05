import { useQuery } from 'react-query'

import { UserService } from '@/services/user.service'


export const useIsFriend = (friendId: string) => {
	const { isLoading, data, refetch } = useQuery(
		`is friend ${friendId}`,
		() => UserService.isFriend(friendId),
		{
			select: ({ data }) => data,
		},
	)

	return { isLoading, isFriend: data, isFriendRefetch: refetch }
}

export const useIsSubscribe = (friendId: string) => {
	const { isLoading, data, refetch } = useQuery(
		`is subscribe ${friendId}`,
		() => UserService.isSubscribe(friendId),
		{
			select: ({ data }) => data,
		},
	)

	return { isLoading, isSubscribe: data, isSubscribeRefetch: refetch }
}
