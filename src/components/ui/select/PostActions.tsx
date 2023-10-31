import React, { FC } from 'react'

import Modal from '../modal/Modal'
import PostForm from '../edit-forms/post-form/PostForm'
import RemoveForm from '../edit-forms/remove-form/RemoveForm'

import { useAllPost } from '../../../hooks/usePost'

import styles from './Select.module.scss'

const PostActions: FC<{ postId }> = ({ postId }) => {
	const [isOpenPopup, setIsOpenPopup] = React.useState(false)
	const [editModalIsOpen, setEditIsOpen] = React.useState(false)
	const [removeModalIsOpen, setRemoveIsOpen] = React.useState(false)

	const { refetch } = useAllPost()

	const postActionRef = React.useRef()

	const handleOutsideClick = (event) => {
		const path = event.path || (event.composedPath && event.composedPath())
		if (!path.includes(postActionRef.current)) {
			setIsOpenPopup(false)
		}
	}

	const handleUpdatePost = () => {
		setIsOpenPopup(false)
		setEditIsOpen((prev) => !prev)
	}

	const handleRemovePost = () => {
		setIsOpenPopup(false)
		setRemoveIsOpen((prev) => !prev)
	}

	React.useEffect(() => {
		document.body.addEventListener('click', handleOutsideClick)
	}, [])

	return (
		<div className={styles.sort} ref={postActionRef}>
			<Modal modalIsOpen={editModalIsOpen} setIsOpen={setEditIsOpen}>
				<PostForm refetch={refetch} setIsOpen={setEditIsOpen} postId={postId} />
			</Modal>
			<Modal modalIsOpen={removeModalIsOpen} setIsOpen={setRemoveIsOpen}>
				<RemoveForm
					refetch={refetch}
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
