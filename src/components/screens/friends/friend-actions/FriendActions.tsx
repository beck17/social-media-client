import React, { FC } from 'react'

import { useCreateConversation } from '@/hooks/useCreateConversation'

import { getFriendAction } from '@/lib/get-friend-action'

import styles from '../../../ui/select/Select.module.scss'
import { useOutsideClick } from '@/hooks/useOutsideClick'


interface Props {
	friendId: string
	refetch?: any
}

export const FriendActions: FC<Props> = ({ friendId, refetch }) => {
	const [isOpenPopup, setIsOpenPopup] = React.useState(false)

	const popupRef = React.useRef<HTMLDivElement>(null)

	const { text, actionHandler } = getFriendAction(friendId)

	const createConversationHandler = useCreateConversation(friendId)

	useOutsideClick(popupRef, () => setIsOpenPopup(false))

	return (
		<div className={styles.sort} ref={popupRef}>
			<div className={styles.sort__label}>
				<span onClick={() => setIsOpenPopup((prev) => !prev)}>...</span>
			</div>
			{isOpenPopup && (
				<div className={styles.sort__popup}>
					<ul>
						<li onClick={() => createConversationHandler(friendId)}>Написать</li>
						<li onClick={actionHandler}>{text}</li>
					</ul>
				</div>
			)}

		</div>
	)
}
