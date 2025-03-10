import React, { FC, useState } from 'react'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import { closePopupOpenModal } from '@/lib/close-popup-open-modal'

import Modal from '@/components/ui/modal/Modal'
import CommentForm from '@/components/ui/edit-forms/comment-form/CommentForm'
import { RemoveCommentForm } from '@/components/ui/edit-forms/comment-form/CommentRemoveForm'

import styles from '@/components/ui/select/Select.module.scss'


interface Props {
	commentId: string
	text: string
	refetch: () => void
}

export const CommentActions: FC<Props> = ({ commentId, refetch, text }) => {
	const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false)
	const [modalEditIsOpen, setEditIsOpen] = useState<boolean>(false)
	const [removeModalIsOpen, setRemoveIsOpen] = useState<boolean>(false)

	const postActionRef = React.useRef<HTMLDivElement>(null)

	useOutsideClick(postActionRef, () => setIsOpenPopup(false))

	const handleUpdatePost = () => closePopupOpenModal(setIsOpenPopup, setEditIsOpen)
	const handleRemovePost = () => closePopupOpenModal(setIsOpenPopup, setRemoveIsOpen)

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
						<li onClick={handleUpdatePost}>Редактировать</li>
						<li onClick={handleRemovePost}>Удалить</li>
					</ul>
				</div>
			)}
		</div>
	)
}