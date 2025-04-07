import React, { FC } from 'react'
import Image from 'next/image'

import { useAuth } from '@/hooks/user/useAuth'
import { useDate } from '@/hooks/utils/useDate'

import { CommentActions } from '@/components/ui/select/CommentActions'

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
	const { user } = useAuth()

	const isUserPost = postUserId === user._id
	const isUserComment = comment.user._id === user._id
	return (
		<div className={styles.comment}>
			<Image
				src={process.env.BASE_URL + `${comment.user.avatar}`}
				alt='аватар'
				width={500}
				height={500}
			/>

			<div className={styles.info}>
				<span>{`${comment.user.firstName} ${comment.user.lastName}`}</span>
				<p>{comment.text}</p>
				<span className={styles.date}>{useDate(comment.createdAt)}</span>
			</div>

			<div className={styles.detail}>
				{(isUserPost || isUserComment) && (
					<CommentActions text={comment.text} commentId={comment._id} refetch={refetchComment} isUserPost={isUserPost} />
				)}
			</div>
		</div>
	)
}

export default CommentItem
