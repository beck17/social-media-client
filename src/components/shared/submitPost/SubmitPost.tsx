import React, { FC, useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useNameAndAvatarProfile } from '@/hooks/user/useProfile'
import { useUploadFile } from '@/hooks/posts/useUploadFile'
import { useCreatePost } from '@/hooks/posts/usePostActions'

import Input from '../../ui/input/Input'
import Button from '../../ui/button/Button'
import { FileUploadButton } from '../../ui/file-upload-button/FileUploadButton'

import { toastPromise } from '@/lib/toast-utils/toast-promise'
import { toastError } from '@/lib/toast-utils/toast-error'
import { validatePost } from '@/lib/validate/validate-fields'

import { IPostResponse } from '@/types/post.interface'

import styles from './SubmitPost.module.scss'
import { INameAndAvatar } from '@/types/user.interface'

const SubmitPost: FC<{ refetch: () => void }> = ({ refetch }) => {
	const [imageState, setImageState] = useState<{ image?: string }>()
	const { uploadFile } = useUploadFile(setImageState)

	const { nameAndAvatar = {} as INameAndAvatar, isLoading: isProfileLoading } = useNameAndAvatarProfile()

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

				await toastPromise(createPost(data))
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
		return `${nameAndAvatar.avatar}`
	}, [isProfileLoading, nameAndAvatar])

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
