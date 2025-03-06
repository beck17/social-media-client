import React, { FC } from 'react'

import { useCommunityPosts } from '@/hooks/useCommunityPost'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import Modal from '../modal/Modal'
import CommunityPostForm from '../edit-forms/communityPost-form/CommunityPostForm'
import CommunityPostRemoveForm from '../edit-forms/communityPost-form/CommunityPostRemoveForm'

import styles from './Select.module.scss'


const CommunityPostActions: FC<{ postId: string; communityId?: string }> = ({
	postId,
	communityId,
}) => {
	const [isOpenPopup, setIsOpenPopup] = React.useState(false)
	const [editModalIsOpen, setEditIsOpen] = React.useState(false)
	const [removeModalIsOpen, setRemoveIsOpen] = React.useState(false)

	const { refetch } = useCommunityPosts(communityId)

	const postActionRef = React.useRef<HTMLDivElement>(null)

	useOutsideClick(postActionRef, () => setIsOpenPopup(false))

	const handleUpdatePost = () => {
		setIsOpenPopup(false)
		setEditIsOpen((prev) => !prev)
	}

	const handleRemovePost = () => {
		setIsOpenPopup(false)
		setRemoveIsOpen((prev) => !prev)
	}

	return (
		<div className={styles.sort} ref={postActionRef}>
			<Modal modalIsOpen={editModalIsOpen} setIsOpen={setEditIsOpen}>
				<CommunityPostForm
					refetch={refetch}
					setIsOpen={setEditIsOpen}
					postId={postId}
				/>
			</Modal>
			<Modal modalIsOpen={removeModalIsOpen} setIsOpen={setRemoveIsOpen}>
				<CommunityPostRemoveForm
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

export default CommunityPostActions
