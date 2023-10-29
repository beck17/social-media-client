import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useAuth } from '../../../../hooks/useAuth'

import { IPost } from '../../../../types/post.interface'
import edit from '@/assets/img/edit.svg'

import trash from '@/assets/img/trash.svg'
import styles from './UserInfo.module.scss'
import Modal from '../../modal/Modal'
import PostForm from '../../edit-forms/post-form/PostForm'
import { useDate } from '../../../../hooks/useDate'
import RemoveForm from '../../edit-forms/remove-form/RemoveForm'

const UserInfo: FC<{ post: IPost; refetchPosts: any }> = ({
	post,
	refetchPosts,
}) => {
	const [editModalIsOpen, setEditIsOpen] = React.useState(false)
	const [removeModalIsOpen, setRemoveIsOpen] = React.useState(false)

	const postId = post._id
	const postCreated = useDate(post.createdAt)

	const { user } = useAuth()
	const userFullName = `${post.user.firstName} ${post.user.lastName}`
	const isUserPost: boolean = post.user._id === user._id

	const profileLink: string = isUserPost
		? '/profile'
		: `/profile/${post.user._id}`

	return (
		<div className={styles.user}>
			<Modal modalIsOpen={editModalIsOpen} setIsOpen={setEditIsOpen}>
				<PostForm
					refetch={refetchPosts}
					setIsOpen={setEditIsOpen}
					postId={postId}
				/>
			</Modal>
			<Modal modalIsOpen={removeModalIsOpen} setIsOpen={setRemoveIsOpen}>
				<RemoveForm
					refetch={refetchPosts}
					setIsOpen={setRemoveIsOpen}
					postId={postId}
				/>
			</Modal>
			<div className={styles.userInfo}>
				<Image
					src={`http://localhost:5000${post.user.avatar}`}
					alt="аватар"
					width={500}
					height={500}
				/>
				<div className={styles.details}>
					<Link href={profileLink} className={styles.name}>
						{userFullName}
					</Link>
					<span className={styles.date}>{postCreated}</span>
				</div>
			</div>
			{isUserPost && (
				<div>
					<Image
						src={edit}
						alt="Редактировать"
						onClick={() => setEditIsOpen((prev) => !prev)}
						style={{ marginRight: '5px' }}
					/>
					<Image
						onClick={() => setRemoveIsOpen((prev) => !prev)}
						src={trash}
						alt="удалить"
					/>
				</div>
			)}
		</div>
	)
}

export default UserInfo
