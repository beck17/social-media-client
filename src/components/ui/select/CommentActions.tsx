import React, { FC, useState } from 'react'

import { useOutsideClick } from '@/hooks/utils/useOutsideClick'

import { closePopupOpenModal } from '@/lib/utils/close-popup-open-modal'

import Modal from '@/components/shared/modal/Modal'
import CommentForm from '@/components/shared/edit-forms/comment-form/CommentForm'
import { RemoveCommentForm } from '@/components/shared/edit-forms/comment-form/CommentRemoveForm'

import styles from '@/components/ui/select/Select.module.scss'


interface Props {
	commentId: string
	text: string
	isUserPost: boolean
	refetch: () => void
}

export const CommentActions: FC<Props> = ({ commentId, refetch, text, isUserPost }) => {
	const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false)
	const [modalEditIsOpen, setEditIsOpen] = useState<boolean>(false)
	const [removeModalIsOpen, setRemoveIsOpen] = useState<boolean>(false)

	const postActionRef = React.useRef<HTMLDivElement>(null)

	useOutsideClick(postActionRef, () => setIsOpenPopup(false))

	const handleUpdatePost = () => closePopupOpenModal(setIsOpenPopup, setEditIsOpen)
	const handleRemovePost = () => closePopupOpenModal(setIsOpenPopup, setRemoveIsOpen)

	const renderPopupItems = () => {
		if (isUserPost) return (
			<li className={styles.remove} onClick={handleRemovePost}>Удалить</li>
		)
		return (
			<>
				<li onClick={handleUpdatePost}>Редактировать</li>
				<li className={styles.remove} onClick={handleRemovePost}>Удалить</li>
			</>
		)
	}

	return (
		<div className={styles.sort} ref={postActionRef}>
			<Modal modalIsOpen={modalEditIsOpen} setIsOpen={setEditIsOpen}>
				<CommentForm
					text={text}
					refetch={refetch}
					setIsOpen={setEditIsOpen}
					commentId={commentId}
				/>
			</Modal>

			<Modal modalIsOpen={removeModalIsOpen} setIsOpen={setRemoveIsOpen}>
				<RemoveCommentForm
					refetch={refetch}
					setIsOpen={setRemoveIsOpen}
					commentId={commentId}
				/>
			</Modal>

			<div className={styles.sort__label}>
				<span onClick={() => setIsOpenPopup(!isOpenPopup)}>...</span>
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