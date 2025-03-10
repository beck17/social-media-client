import React, { Dispatch, FC, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateComment } from '@/hooks/useComment'

import Input from '../../input/Input'
import Button from '../../button/Button'

import styles from '../EditForm.module.scss'


interface Props {
	refetch: () => void,
	setIsOpen: Dispatch<SetStateAction<boolean>>
	commentId: string
}

const CommentForm: FC<Props> = ({
																	refetch,
																	setIsOpen,
																	commentId,
																}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<{ text: string }>()

	const { onSubmit } = useUpdateComment(commentId, refetch, reset, setIsOpen)

	return (
		<div className={styles.formEdit}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('text')}
					error={errors.text?.message}
					placeholder='Текст'
				/>

				<Button>Сохранить</Button>
			</form>
		</div>
	)
}

export default CommentForm
