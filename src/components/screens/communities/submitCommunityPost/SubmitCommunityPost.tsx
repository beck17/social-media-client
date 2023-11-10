import React, { FC, useState } from 'react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'

import { CommunityPostService } from '../../../../services/community-post/community-post.service'
import { useUploadFile } from '../../../ui/uploadField/useUploadFile'
import { ICommunity } from '../../../../types/community.interface'
import { ICommunityPostCreate } from '../../../../types/community-post.interface'

import photo from '../../../../assets/img/photo.svg'
import styles from '../../feed/submitPost/SubmitPost.module.scss'

const SubmitCommunityPost: FC<{
	refetch: any
	community: ICommunity
	isLoading: boolean
}> = ({ refetch, community }) => {
	const [image1, setImage] = useState()
	const { uploadFile } = useUploadFile(setImage)

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
			onSuccess(data) {
				reset()
				refetch()
			},
		},
	)

	const onSubmitPost: SubmitHandler<ICommunityPostCreate> = async ({
		image = image1?.image,
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
						placeholder="Введите текст..."
						{...register('text', {
							required: 'Это поле обязательное',
						})}
						error={errors.text?.message}
					/>
					<input
						style={{ display: 'none' }}
						value={community?._id}
						placeholder="Введите текст..."
						{...register('communityId', {
							required: 'Это поле обязательное',
						})}
					/>
				</div>
				<div className={styles.buttons}>
					<input
						type="file"
						id="file"
						onChange={uploadFile}
						style={{ display: 'none' }}
					/>
					<label htmlFor="file">
						<div className={styles.file}>
							<Image src={photo} alt="фото" width={25} height={25} />
							<span>Добавить фото</span>
						</div>
					</label>

					<Button>Добавить пост</Button>
				</div>
			</div>
		</form>
	)
}

export default SubmitCommunityPost
