import React, { FC } from 'react'

import { useCreateConversation } from '@/hooks/conversations/useConversation'
import { useUserPost } from '@/hooks/posts/useGetPost'
import { useOutsideClick } from '@/hooks/utils/useOutsideClick'
import { useAuth } from '@/hooks/user/useAuth'

import { getFriendAction } from '@/lib/utils/get-friend-action'
import { closePopupOpenModal } from '@/lib/utils/close-popup-open-modal'


import ProfileForm from '@/components/shared/edit-forms/profile-form/ProfileForm'
import ModalEdit from '@/components/shared/modal/Modal'

import styles from './Select.module.scss'
import cn from 'clsx'


interface Props {
	friendId: string
	refetch?: () => void
}

export const FriendActions: FC<Props> = ({ friendId, refetch }) => {

	const { user } = useAuth()
	const isMyProfile = user._id === friendId

	const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false)
	const [modalIsOpen, setIsOpenModal] = React.useState<boolean>(false)

	const { refetch: userPostRefetch } = useUserPost(user._id)

	const popupRef = React.useRef<HTMLDivElement>(null)

	const createConversationHandler = useCreateConversation(friendId)

	const { text, actionHandler } = getFriendAction(friendId)

	useOutsideClick(popupRef, () => setIsOpenPopup(false))

	const handleUpdatePost = () => closePopupOpenModal(setIsOpenPopup, setIsOpenModal)

	const renderPopupItems = () => {
		if (isMyProfile) return <li onClick={handleUpdatePost}>Редактировать</li>
		return (
			<>
				<li onClick={() => createConversationHandler(friendId)}>Написать</li>
				<li onClick={actionHandler} className={cn(text === 'Удалить' && styles.remove)}>{text}</li>
			</>
		)
	}

	return (
		<div className={styles.sort} ref={popupRef}>
			<ModalEdit modalIsOpen={modalIsOpen} setIsOpen={setIsOpenModal}>
				<ProfileForm
					firstName={user.firstName}
					lastName={user.lastName}
					city={user.city}
					refetch={refetch}
					userPostRefetch={userPostRefetch}
					setIsOpen={setIsOpenModal}
				/>
			</ModalEdit>

			<div className={styles.sort__label}>
				<span onClick={() => setIsOpenPopup((prev) => !prev)}>...</span>
			</div>
			{isOpenPopup && (
				<div className={styles.sort__popup}>
					<ul>
						{renderPopupItems()}
					</ul>
				</div>
			)}
		</div>
	)
}
