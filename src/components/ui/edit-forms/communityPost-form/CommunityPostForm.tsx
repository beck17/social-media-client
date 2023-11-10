import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Image from 'next/image'

import { useUploadFile } from '../../uploadField/useUploadFile'

import { CommunityPostService } from '../../../../services/community-post/community-post.service'

import {
	ICommunityPostCreate,
	ICommunityPostUpdate,
} from '../../../../types/community-post.interface'
import { IPostUpdate } from '../../../../types/post.interface'

import Input from '../../input/Input'
import Button from '../../button/Button'

import photo from '@/assets/img/photo.svg'
import styles from '../EditForm.module.scss'

const CommunityPostForm: FC<{
	refetch: any
	setIsOpen: any
	postId: string
}> = ({ refetch, setIsOpen, postId }) => {
	const [photoPic, setPhotoPic] = useState()
	const { uploadFile } = useUploadFile(setPhotoPic)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ICommunityPostCreate>()

	const { mutateAsync } = useMutation(
		'update community post',
		(data: IPostUpdate) =>
			CommunityPostService.updateCommunityPost(data, postId),
		{
			onSuccess(data) {
				refetch()
				reset()
				setIsOpen((prev) => !prev)
			},
		},
	)

	const onSubmit: SubmitHandler<ICommunityPostUpdate> = async ({
		image = photoPic?.image,
		text,
	}) => {
		const data = { text, image }

		await mutateAsync(data)
	}

	return (
		<div className={styles.formEdit}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('text')}
					error={errors.text?.message}
					placeholder="Текст"
				/>
				<div className={styles.buttons}>
					<input
						type="file"
						id="avatar"
						onChange={uploadFile}
						style={{ display: 'none' }}
					/>
					<label htmlFor="avatar">
						<div className={styles.file}>
							<Image src={photo} alt="фото" width={25} height={25} />
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
