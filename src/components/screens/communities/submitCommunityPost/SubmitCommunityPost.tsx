import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import { CommunityPostService } from '@/services/community-post/community-post.service'

import { useUploadFile } from '@/hooks/posts/useUploadFile'

import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'
import { FileUploadButton } from '@/components/ui/file-upload-button/FileUploadButton'

import { ICommunity } from '@/types/community.interface'
import { ICommunityPostCreate } from '@/types/community-post.interface'

import styles from '@/components/shared/submitPost/SubmitPost.module.scss'


interface Props {
	refetch: () => void
	community?: ICommunity
	isLoading: boolean
}

const SubmitCommunityPost: FC<Props> = ({ refetch, community }) => {
	const [imageState, setImageState] = useState<{ image?: string }>()
	const { uploadFile } = useUploadFile(setImageState)

	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm<ICommunityPostCreate>()

	const { mutateAsync } = useMutation(
		'add community post',
		(data: ICommunityPostCreate) =>
			CommunityPostService.createCommunityPost(data),
		{
			onSuccess() {
				reset()
				refetch()
			},
		},
	)

	const onSubmitPost: SubmitHandler<ICommunityPostCreate> = async ({
																																		 image = imageState?.image,
																																		 text,
																																		 communityId,
																																	 }) => {
		const data = { image, text, communityId }
		await mutateAsync(data)
	}

	return (
		<form className={styles.submitPost} onSubmit={handleSubmit(onSubmitPost)}>
			<div className={styles.container}>
				<div className={styles.input}>
					<Input
						placeholder='Введите текст...'
						{...register('text', {
							required: 'Это поле обязательное',
						})}
						error={errors.text?.message}
					/>
					<input
						style={{ display: 'none' }}
						value={community?._id}
						placeholder='Введите текст...'
						{...register('communityId', {
							required: 'Это поле обязательное',
						})}
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
