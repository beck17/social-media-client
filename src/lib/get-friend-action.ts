import { useFriendActions } from '@/hooks/useFriendActions'


export const getFriendAction = (id: string) => {
	const {
		isFriend,
		isSubscribe,
		sendFriendRequestHandler,
		removeFromFriendsHandler,
		unSubscribeHandler,
	} = useFriendActions(id)

	if (isFriend) {
		return { text: 'Удалить из друзей', actionHandler: () => removeFromFriendsHandler(id) }
	}

	if (isSubscribe) {
		return { text: 'Отписаться', actionHandler: () => unSubscribeHandler(id) }
	}

	return { text: 'Добавить в друзья', actionHandler: () => sendFriendRequestHandler(id) }
}