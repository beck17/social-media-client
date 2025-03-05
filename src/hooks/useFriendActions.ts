import { useMutation } from 'react-query'

import { UserService } from '@/services/user.service'

import { useIsFriend, useIsSubscribe } from '@/hooks/useFriend'


export const useFriendActions = (id: string) => {
	const { isFriend, isFriendRefetch } = useIsFriend(id)
	const { isSubscribe, isSubscribeRefetch } = useIsSubscribe(id)

	const { mutateAsync: sendFriendRequest } = useMutation(
		`send request to friendship ${id}`,
		(id: string) => UserService.sendFriendRequest(id),
		{
			onSuccess(data) {
				isFriendRefetch()
				isSubscribeRefetch()
			},
		},
	)

	const { mutateAsync: removeFriend } = useMutation(
		`remove from friends ${id}`,
		(id: string) => UserService.removeFromFriends(id),
		{
			onSuccess(data) {
				isFriendRefetch()
				isSubscribeRefetch()
			},
		},
	)

	const { mutateAsync: unSubscribe } = useMutation(
		`un subscribe from user ${id}`,
		(id: string) => UserService.unSubscribe(id),
		{
			onSuccess(data) {
				isFriendRefetch()
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