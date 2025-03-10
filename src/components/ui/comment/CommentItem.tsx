import React, { FC, useState } from 'react'
import Image from 'next/image'

import { useAuth } from '@/hooks/useAuth'
import { useDate } from '@/hooks/useDate'

import { RemoveCommentForm } from '@/components/ui/edit-forms/comment-form/CommentRemoveForm'

import Modal from '../modal/Modal'
import CommentForm from '../edit-forms/comment-form/CommentForm'

import trash from '@/assets/img/trash.svg'
import edit from '@/assets/img/edit.svg'
import noPhoto from '@/assets/img/no-photo.svg'

import { IComment } from '@/types/comment.interface'

import styles from './Comment.module.scss'


interface Props {
	comment: IComment
	postUserId: string
	refetchComment: () => void
}

const CommentItem: FC<Props> = ({
																	comment,
																	postUserId,
																	refetchComment,
																}) => {

	const [modalIsOpen, setIsOpen] = useState<boolean>(false)
	const [removeModalIsOpen, setRemoveIsOpen] = useState<boolean>(false)

	const { user } = useAuth()

	return (
		<div className={styles.comment}>
			<Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
				<CommentForm
					refetch={refetchComment}
					setIsOpen={setIsOpen}
					commentId={comment._id}
				/>
			</Modal>

			<Modal modalIsOpen={removeModalIsOpen} setIsOpen={setRemoveIsOpen}>
				<RemoveCommentForm
					refetch={refetchComment}
					setIsOpen={setRemoveIsOpen}
					commentId={comment._id}
				/>
			</Modal>

			<Image
				src={process.env.BASE_URL + `${comment.user.avatar}`}
				alt='аватар'
				width={500}
				height={500}
			/>

			<div className={styles.info}>
				<span>{`${comment.user.firstName} ${comment.user.lastName}`}</span>
				<p>{comment.text}</p>
			</div>

			<div className={styles.detail}>
				<span className={styles.date}>{useDate(comment.createdAt)}</span>
				{postUserId === user?._id || comment.user._id === user?._id ? (
					<div>
						{comment.user._id === user?._id ? (
							<Image
								className={styles.img}
								src={edit}
								alt='Редактировать'
								width={20}
								height={20}
								onClick={() => setIsOpen((prev) => !prev)}
							/>
						) : (
							<Image
								src={noPhoto}
								alt='Ты не должен был это увидеть'
								width={20}
								height={20}
							/>
						)}
						<Image
							className={styles.img}
							src={trash}
							alt='Удалить'
							width={20}
							height={20}
							onClick={() => setRemoveIsOpen((prev) => !prev)}
						/>
					</div>
				) : (
					<div>
						<Image
							src={noPhoto}
							alt='Ты не должен был это увидеть'
							width={20}
							height={20}
						/>
						<Image
							src={noPhoto}
							alt='Ты не должен был это увидеть'
							width={20}
							height={20}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default CommentItem
