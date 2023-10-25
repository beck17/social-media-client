import React, { FC } from 'react'
import styles from '../EditForm.module.scss'
import Input from '../../input/Input'
import Button from '../../button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { CommentPostService } from '../../../../services/post/comment.service'

const CommentForm: FC<{
	refetch: any
	setIsOpen: any
	commentId: string
}> = ({ refetch, setIsOpen, commentId }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<{ text: string }>()

	const { mutateAsync } = useMutation(
		'update comment',
		(text: string) => CommentPostService.updatePostComment(text, commentId),
		{
			onSuccess(data) {
				refetch()
				reset()
				setIsOpen((prev) => !prev)
			},
		},
	)

	const onSubmit: SubmitHandler<{ text: string }> = async ({ text }) => {
		await mutateAsync(text)
	}

	return (
		<div className={styles.formEdit}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('text')}
					error={errors.text?.message}
					placeholder="Текст"
				/>

				<Button>Сохранить</Button>
			</form>
		</div>
	)
}

export default CommentForm
