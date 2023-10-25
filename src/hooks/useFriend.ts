import { useQuery } from 'react-query'

import { UserService } from '../services/user.service'

export const useIsFriend = (friendId) => {
	const { isLoading, data, refetch } = useQuery(
		`is friend ${friendId}`,
		() => UserService.isFriend(friendId),
		{
			select: ({ data }) => data,
		},
	)

	return { isLoading, isFriend: data, isFriendRefetch: refetch }
}
