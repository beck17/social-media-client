import React, { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Image from 'next/image'

import { useUploadFile } from '../../uploadField/useUploadFile'
import { useUpdatePost } from '@/hooks/usePost'

import { validatePost } from '@/lib/validate-fields'
import { toastError } from '@/lib/toast-error'

import Button from '../../button/Button'
import Input from '../../input/Input'

import { IPostUpdate } from '@/types/post.interface'

import photo from '@/assets/img/photo.svg'

import styles from '../EditForm.module.scss'


interface Props {
	postId: string
	refetch: () => void;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PostForm: FC<Props> = ({
															 refetch,
															 setIsOpen,
															 postId,
														 }) => {
	const [imageState, setImageState] = useState<{ image?: string }>()
	const { uploadFile } = useUploadFile(setImageState)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset: resetForm,
	} = useForm<IPostUpdate>()

	const { updatePost } = useUpdatePost(postId, refetch)

	const onSubmitHandler: SubmitHandler<IPostUpdate> = useCallback(
		async ({ text, image = imageState?.image }) => {
			try {
				const data = { text, image }
				validatePost(data)

				await updatePost(data)

				setIsOpen((prev) => !prev)

			} catch (error) {

				if (error instanceof Error) {
					toastError(error.message)
				} else {
					toastError('Произошла неизвестная ошибка')
				}

			} finally {
				resetForm()
				setImageState({ image: undefined })
			}
		}, [updatePost, resetForm, imageState])

	return (
		<div className={styles.formEdit}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
				<Input
					{...register('text')}
					placeholder='Текст'
				/>
				<div className={styles.buttons}>
					<input
						type='file'
						id='avatar'
						onChange={uploadFile}
						style={{ display: 'none' }}
					/>
					<label htmlFor='avatar'>
						<div className={styles.file}>
							<Image src={photo} alt='фото' width={25} height={25} />
							<span>Загрузить новое фото</span>
						</div>
					</label>
					<Button>Сохранить</Button>
				</div>
			</form>
		</div>
	)
}

export default PostForm
