import React, { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Image from 'next/image'

import { useUpdateCommunityPost } from '@/hooks/useCommunityPost'
import { useUploadFile } from '../../uploadField/useUploadFile'


import { validatePost } from '@/lib/validate-fields'
import { toastError } from '@/lib/toast-error'

import { ICommunityPostCreate } from '@/types/community-post.interface'
import { IPostUpdate } from '@/types/post.interface'

import Input from '../../input/Input'
import Button from '../../button/Button'

import photo from '@/assets/img/photo.svg'
import styles from '../EditForm.module.scss'


interface Props {
	postId: string
	setIsOpen: Dispatch<SetStateAction<boolean>>
	refetch: () => void
}

const CommunityPostForm: FC<Props> = ({ refetch, setIsOpen, postId }) => {
	const [photoPic, setPhotoPic] = useState<{ image: string | undefined }>()
	const { uploadFile } = useUploadFile(setPhotoPic)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ICommunityPostCreate>()

	const { updateCommunityPost } = useUpdateCommunityPost(postId)

	const onSubmitHandler: SubmitHandler<IPostUpdate> = useCallback(
		async ({ text, image = photoPic?.image }) => {
			try {
				const data = { text, image }
				validatePost(data)

				await updateCommunityPost(data)

				refetch()
				setIsOpen((prev) => !prev)

			} catch (error) {

				if (error instanceof Error) {
					toastError(error.message)
				} else {
					toastError('Произошла неизвестная ошибка')
				}

			} finally {
				reset()
				setPhotoPic({ image: undefined })
			}
		}, [updateCommunityPost, reset, setPhotoPic])

	return (
		<div className={styles.formEdit}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
				<Input
					{...register('text')}
					error={errors.text?.message}
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

export default CommunityPostForm
