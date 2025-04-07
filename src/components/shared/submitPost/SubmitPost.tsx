import React, { FC, useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useProfile } from '@/hooks/user/useProfile'
import { useUploadFile } from '../../../hooks/posts/useUploadFile'

import Input from '../../ui/input/Input'
import Button from '../../ui/button/Button'
import { FileUploadButton } from '../../ui/file-upload-button/FileUploadButton'

import { IPostResponse } from '@/types/post.interface'

import styles from './SubmitPost.module.scss'
import { toastError } from '@/lib/toast-utils/toast-error'
import { useCreatePost } from '@/hooks/posts/usePostActions'
import { validatePost } from '@/lib/validate/validate-fields'


const SubmitPost: FC<{ refetch: () => void }> = ({ refetch }) => {
	const [imageState, setImageState] = useState<{ image?: string }>()
	const { uploadFile } = useUploadFile(setImageState)

	const { myProfile, isLoading: isProfileLoading } = useProfile()

	const {
		register,
		reset: resetForm,
		handleSubmit,
	} = useForm<IPostResponse>()

	const { createPost } = useCreatePost(refetch)

	const onSubmitHandler: SubmitHandler<IPostResponse> = useCallback(
		async ({ text, image = imageState?.image }) => {
			try {
				const data = { text, image }
				validatePost(data)

				await createPost(data)

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
		},
		[createPost, resetForm, imageState],
	)

	const avatarUrl = useMemo(() => {
		if (isProfileLoading) return '/uploads/default/no-avatar.jpg'
		return myProfile?.avatar ? `${myProfile.avatar}` : '/uploads/default/no-avatar.jpg'
	}, [isProfileLoading, myProfile])

	return (
		<form className={styles.submitPost} onSubmit={handleSubmit(onSubmitHandler)}>
			<div className={styles.container}>
				<div className={styles.input}>
					<Image
						src={process.env.BASE_URL + avatarUrl}
						alt='avatar'
						width={500}
						height={500}
					/>
					<Input
						placeholder='Что у вас нового?'
						{...register('text')}
					/>
				</div>
				<div className={styles.buttons}>
					<FileUploadButton onUpload={uploadFile} text='Добавить фото' htmlFor='post' />

					<Button>Добавить пост</Button>
				</div>
			</div>
		</form>
	)
}

export default React.memo(SubmitPost)
