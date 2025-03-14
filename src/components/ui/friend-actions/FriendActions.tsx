import React, { FC } from 'react'

import { useCreateConversation } from '@/hooks/useCreateConversation'

import { getFriendAction } from '@/lib/get-friend-action'

import styles from '../select/Select.module.scss'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import ProfileForm from '@/components/ui/edit-forms/profile-form/ProfileForm'
import ModalEdit from '@/components/ui/modal/Modal'
import { useAuth } from '@/hooks/useAuth'
import { closePopupOpenModal } from '@/lib/close-popup-open-modal'


interface Props {
	friendId: string
	refetchUserProfile?: () => void
}

export const FriendActions: FC<Props> = ({ friendId, refetchUserProfile }) => {
	const { user } = useAuth()
	const isMyProfile = user?._id === friendId

	const [isOpenPopup, setIsOpenPopup] = React.useState(false)
	const [modalIsOpen, setIsOpenModal] = React.useState(false)

	const popupRef = React.useRef<HTMLDivElement>(null)

	const createConversationHandler = useCreateConversation(friendId)

	const { text, actionHandler } = getFriendAction(friendId)

	useOutsideClick(popupRef, () => setIsOpenPopup(false))

	const handleUpdatePost = () => closePopupOpenModal(setIsOpenPopup, setIsOpenModal)

	return (
		<div className={styles.sort} ref={popupRef}>
			<ModalEdit modalIsOpen={modalIsOpen} setIsOpen={setIsOpenModal}>
				<ProfileForm
					firstName={user.firstName}
					lastName={user.lastName}
					city={user.city}
					refetch={refetchUserProfile}
					setIsOpen={setIsOpenModal}
				/>
			</ModalEdit>

			<div className={styles.sort__label}>
				<span onClick={() => setIsOpenPopup((prev) => !prev)}>...</span>
			</div>
			{isOpenPopup && (
				<div className={styles.sort__popup}>
					{
						isMyProfile ? (
							<ul>
								<li onClick={handleUpdatePost}>Редактировать</li>
							</ul>
						) : (
							<ul>
								<li onClick={() => createConversationHandler(friendId)}>Написать</li>
								<li onClick={actionHandler}>{text}</li>
							</ul>
						)
					}
				</div>
			)}
		</div>
	)
}
