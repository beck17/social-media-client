import React, { FC } from 'react'

import { useOutsideClick } from '@/hooks/utils/useOutsideClick'

import { closePopupOpenModal } from '@/lib/utils/close-popup-open-modal'

import Modal from '@/components/shared/modal/Modal'
import PostForm from '../../shared/edit-forms/post-form/PostForm'
import RemoveForm from '../../shared/edit-forms/remove-form/RemoveForm'

import { IPostUpdate } from '@/types/post.interface'

import styles from './Select.module.scss'


interface Props {
	postId: string
	text: string
	updatePost: (post: IPostUpdate) => Promise<void>
	removePost: (postId: string) => Promise<void>
	refetch: () => void
}

const PostActions: FC<Props> = ({ postId, text, updatePost, removePost, refetch }) => {
	const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false)
	const [isOpenEditModal, setIsOpenEditModal] = React.useState<boolean>(false)
	const [isOpenRemoveModal, setIsOpenRemoveModal] = React.useState<boolean>(false)

	const postActionRef = React.useRef<HTMLDivElement>(null)

	useOutsideClick(postActionRef, () => setIsOpenPopup(false))

	const handleUpdatePost = () => closePopupOpenModal(setIsOpenPopup, setIsOpenEditModal)
	const handleRemovePost = () => closePopupOpenModal(setIsOpenPopup, setIsOpenRemoveModal)


	return (
		<div className={styles.sort} ref={postActionRef}>
			<Modal modalIsOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal}>
				<PostForm
					updatePost={
						async (data) => {
							await updatePost(data)
							refetch()
						}
					}
					text={text}
					setIsOpen={setIsOpenEditModal}
				/>
			</Modal>

			<Modal modalIsOpen={isOpenRemoveModal} setIsOpen={setIsOpenRemoveModal}>
				<RemoveForm
					removePost={async (data) => {
						await removePost(data)
						refetch()
					}}
					setIsOpen={setIsOpenRemoveModal}
					postId={postId}
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

export default PostActions
