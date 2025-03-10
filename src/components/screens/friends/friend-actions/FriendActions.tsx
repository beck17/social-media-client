import React, { FC } from 'react'

import { useCreateConversation } from '@/hooks/useCreateConversation'

import { getFriendAction } from '@/lib/get-friend-action'

import styles from '../../../ui/select/Select.module.scss'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import ProfileForm from '@/components/ui/edit-forms/profile-form/ProfileForm'
import ModalEdit from '@/components/ui/modal/Modal'
import { useAuth } from '@/hooks/useAuth'


interface Props {
	friendId: string
	refetchUserProfile: any
}

export const FriendActions: FC<Props> = ({ friendId, refetchUserProfile }) => {
	const { user } = useAuth()

	const [isOpenPopup, setIsOpenPopup] = React.useState(false)
	const [modalIsOpen, setIsOpenModal] = React.useState(false)

	const popupRef = React.useRef<HTMLDivElement>(null)

	const { text, actionHandler } = getFriendAction(friendId)

	const createConversationHandler = useCreateConversation(friendId)

	useOutsideClick(popupRef, () => setIsOpenPopup(false))

	const isMyProfile = user?._id === friendId

	const openModalHandler = () => {
		setIsOpenModal(true)
		setIsOpenPopup(false)
	}

	return (
		<div className={styles.sort} ref={popupRef}>
			<ModalEdit modalIsOpen={modalIsOpen} setIsOpen={setIsOpenModal}>
				<ProfileForm refetch={refetchUserProfile} setIsOpen={setIsOpenModal} />
			</ModalEdit>

			<div className={styles.sort__label}>
				<span onClick={() => setIsOpenPopup((prev) => !prev)}>...</span>
			</div>
			{isOpenPopup && (
				<div className={styles.sort__popup}>
					{
						isMyProfile ? (
							<ul>
								<li onClick={openModalHandler}>Редактировать</li>
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
