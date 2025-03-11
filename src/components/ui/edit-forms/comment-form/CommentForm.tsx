import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateComment } from '@/hooks/useComment'

import Input from '../../input/Input'
import Button from '../../button/Button'

import styles from '../EditForm.module.scss'


interface Props {
	text: string,
	commentId: string
	refetch: () => void,
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CommentForm: FC<Props> = ({
																	text,
																	commentId,
																	refetch,
																	setIsOpen,
																}) => {
	const [inputText, setInputText] = useState<string>(text)

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
					placeholder='Текст'
					value={inputText}
					onChange={(e) => {
						setInputText(e.target.value as string)
					}}
				/>

				<Button>Сохранить</Button>
			</form>
		</div>
	)
}

export default CommentForm
