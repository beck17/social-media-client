import { FC } from 'react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import { CommentPostService } from '@/services/post/comment.service'

import { useProfile } from '@/hooks/useProfile'

import CommentItem from './CommentItem'
import Button from '../button/Button'
import Input from '../input/Input'

import { IComment, ICommentRequest } from '@/types/comment.interface'
import styles from './Comment.module.scss'


interface Props {
	comments: IComment[]
	postId: string
	refetch: any
	postUserId: string
}

const Comments: FC<Props> = ({ comments, postUserId, postId, refetch }) => {
	const { myProfile } = useProfile()

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<ICommentRequest>({
		mode: 'onChange',
	})

	const { mutateAsync } = useMutation(
		'create a new comment',
		(data: ICommentRequest) =>
			CommentPostService.createPostComment({ ...data, postId }),
		{
			onSuccess(data) {
				reset()
				refetch()
			},
		},
	)

	const onSubmitForm: SubmitHandler<ICommentRequest> = async (data) => {
		await mutateAsync(data)
	}

	return (
		<div className={styles.comments}>
			<form onSubmit={handleSubmit(onSubmitForm)} className={styles.write}>
				<Image
					src={`http://localhost:5000${myProfile?.avatar}`}
					width={500}
					height={500}
					alt='аватар'
				/>
				<Input
					{...register('text', {
						required: 'Это поле обязательное',
					})}
					error={errors.text?.message}
					placeholder='Введите комментарий...'
				/>
				<Button>Отправить</Button>
			</form>
			{comments.map((comment) => (
				<CommentItem
					key={comment._id}
					comment={comment}
					postUserId={postUserId}
					refetchComment={refetch}
				/>
			))}
		</div>
	)
}

export default Comments
