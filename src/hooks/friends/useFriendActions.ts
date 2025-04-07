import { useMutation } from 'react-query'

import { UserService } from '@/services/user/user.service'

import { useIsFriend, useIsSubscribe } from '@/hooks/friends/useFriend'
import { useProfile } from '@/hooks/user/useProfile'


export const useFriendActions = (id: string) => {
	const { isFriend, isFriendRefetch } = useIsFriend(id)
	const { isSubscribe, isSubscribeRefetch } = useIsSubscribe(id)
	const { refetch } = useProfile()

	const { mutateAsync: sendFriendRequest } = useMutation(
		`send request to friendship ${id}`,
		(id: string) => UserService.sendFriendRequest(id),
		{
			onSuccess() {
				isFriendRefetch()
				refetch()
				isSubscribeRefetch()
			},
		},
	)

	const { mutateAsync: removeFriend } = useMutation(
		`remove from friends ${id}`,
		(id: string) => UserService.removeFromFriends(id),
		{
			onSuccess() {
				isFriendRefetch()
				refetch()
				isSubscribeRefetch()
			},
		},
	)

	const { mutateAsync: unSubscribe } = useMutation(
		`un subscribe from user ${id}`,
		(id: string) => UserService.unSubscribe(id),
		{
			onSuccess() {
				isFriendRefetch()
				refetch()
				isSubscribeRefetch()
			},
		},
	)


	const sendFriendRequestHandler = async (id: string) => {
		await sendFriendRequest(id)
	}

	const removeFromFriendsHandler = async (id: string) => {
		await removeFriend(id)
	}

	const unSubscribeHandler = async (id: string) => {
		await unSubscribe(id)
	}

	return { isFriend, isSubscribe, sendFriendRequestHandler, removeFromFriendsHandler, unSubscribeHandler }
}