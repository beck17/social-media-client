import { useFriendActions } from '@/hooks/useFriendActions'

import Button from '@/components/ui/button/Button'


export const getActionsButton = (id: string) => {
	const {
		isFriend,
		isSubscribe,
		sendFriendRequestHandler,
		removeFromFriendsHandler,
		unSubscribeHandler,
	} = useFriendActions(id)

	if (isFriend) {
		return (
			<Button onClick={() => removeFromFriendsHandler(id)}>
				Удалить из друзей
			</Button>
		)
	}

	if (isSubscribe) {
		return (
			<Button onClick={() => unSubscribeHandler(id)}>
				Отписаться
			</Button>
		)
	}

	return (
		<Button onClick={() => sendFriendRequestHandler(id)}>
			Добавить в друзья
		</Button>
	)
}