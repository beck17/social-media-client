import { useFriendActions } from '@/hooks/friends/useFriendActions'


export const getFriendAction = (id: string) => {
	const {
		isFriend,
		isSubscribe,
		sendFriendRequestHandler,
		removeFromFriendsHandler,
		unSubscribeHandler,
	} = useFriendActions(id)

	if (isFriend) {
		return { text: 'Удалить', actionHandler: () => removeFromFriendsHandler(id) }
	}

	if (isSubscribe) {
		return { text: 'Отписаться', actionHandler: () => unSubscribeHandler(id) }
	}

	return { text: 'Добавить в друзья', actionHandler: () => sendFriendRequestHandler(id) }
}