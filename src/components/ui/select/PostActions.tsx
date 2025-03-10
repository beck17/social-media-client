import React, { FC } from 'react'

import { useAllPost } from '@/hooks/usePost'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import { closePopupOpenModal } from '@/lib/close-popup-open-modal'

import Modal from '../modal/Modal'
import PostForm from '../edit-forms/post-form/PostForm'
import RemoveForm from '../edit-forms/remove-form/RemoveForm'

import styles from './Select.module.scss'


const PostActions: FC<{ postId: string }> = ({ postId }) => {
	const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false)
	const [editModalIsOpen, setEditIsOpen] = React.useState<boolean>(false)
	const [removeModalIsOpen, setRemoveIsOpen] = React.useState<boolean>(false)

	const { refetch: refetchPosts } = useAllPost()

	const postActionRef = React.useRef<HTMLDivElement>(null)

	useOutsideClick(postActionRef, () => setIsOpenPopup(false))


	const handleUpdatePost = () => closePopupOpenModal(setIsOpenPopup, setEditIsOpen)
	const handleRemovePost = () => closePopupOpenModal(setIsOpenPopup, setRemoveIsOpen)


	return (
		<div className={styles.sort} ref={postActionRef}>
			<Modal modalIsOpen={editModalIsOpen} setIsOpen={setEditIsOpen}>
				<PostForm refetch={refetchPosts} setIsOpen={setEditIsOpen} postId={postId} />
			</Modal>

			<Modal modalIsOpen={removeModalIsOpen} setIsOpen={setRemoveIsOpen}>
				<RemoveForm
					refetch={refetchPosts}
					setIsOpen={setRemoveIsOpen}
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
