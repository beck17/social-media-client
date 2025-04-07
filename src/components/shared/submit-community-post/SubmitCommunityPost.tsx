import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useUploadFile } from '@/hooks/posts/useUploadFile'
import { useCreateCommunityPost } from '@/hooks/communities/useCommunityPostActions'

import { toastPromise } from '@/lib/toast-utils/toast-promise'
import { validatePost } from '@/lib/validate/validate-fields'
import { toastError } from '@/lib/toast-utils/toast-error'

import Input from '../../ui/input/Input'
import Button from '../../ui/button/Button'
import { FileUploadButton } from '@/components/ui/file-upload-button/FileUploadButton'

import { ICommunityPostCreate } from '@/types/community-post.interface'

import styles from '@/components/shared/submitPost/SubmitPost.module.scss'


interface Props {
	id: string
	refetch: () => void
}

const SubmitCommunityPost: FC<Props> = ({ id, refetch }) => {
	const [imageState, setImageState] = useState<{ image?: string }>()
	const { uploadFile } = useUploadFile(setImageState)

	const {
		register,
		reset,
		handleSubmit,
	} = useForm<ICommunityPostCreate>()

	const { createPost } = useCreateCommunityPost(refetch)

	const onSubmitPost: SubmitHandler<ICommunityPostCreate> = async ({
																																		 image = imageState?.image,
																																		 text,
																																		 communityId = id,
																																	 }) => {
		try {
			const data = { image, text, communityId }
			validatePost(data)

			await toastPromise(createPost(data))
		} catch (error) {
			if (error instanceof Error) {
				toastError(error.message)
			} else {
				toastError('Произошла неизвестная ошибка')
			}
		} finally {
			reset()
			setImageState({ image: undefined })
		}
	}

	return (
		<form className={styles.submitPost} onSubmit={handleSubmit(onSubmitPost)}>
			<div className={styles.container}>
				<div className={styles.input}>
					<Input
						placeholder='Введите текст...'
						{...register('text')}
					/>
				</div>
				<div className={styles.buttons}>
					<FileUploadButton onUpload={uploadFile} text='Добавить фото' htmlFor='communityPost' />

					<Button>Добавить пост</Button>
				</div>
			</div>
		</form>
	)
}

export default SubmitCommunityPost
