import React, { FC, useState } from 'react'
import Image from 'next/image'

import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'

import styles from './SubmitPost.module.scss'
import { useProfile } from '../../../../hooks/useProfile'
import { IPostResponse } from '../../../../types/post.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PostService } from '../../../../services/post/post.service'
import photo from '../../../../assets/img/photo.svg'
import { useUploadFile } from '../../../ui/uploadField/useUploadFile'
import { useMutation } from 'react-query'

const SubmitPost: FC<{ refetch: any }> = ({ refetch }) => {
	const [image1, setImage] = useState()
	const { myProfile, isLoading } = useProfile()
	const { uploadFile } = useUploadFile(setImage)

	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm<IPostResponse>()

	const { mutateAsync } = useMutation(
		'add post',
		(data: IPostResponse) => PostService.createPost(data),
		{
			onSuccess(data) {
				reset()
				refetch()
			},
		},
	)

	const onSubmitPost: SubmitHandler<IPostResponse> = async ({
		image = image1?.image,
		text,
	}) => {
		const data = { image, text }
		await mutateAsync(data)
	}

	return (
		<form className={styles.submitPost} onSubmit={handleSubmit(onSubmitPost)}>
			<div className={styles.container}>
				<div className={styles.input}>
					<Image
						src={
							isLoading
								? 'http://localhost:5000/uploads/default/no-avatar.jpg'
								: `http://localhost:5000${myProfile?.avatar}`
						}
						alt="avatar"
						width={500}
						height={500}
					/>
					<Input
						placeholder="Что у вас нового?"
						{...register('text', {
							required: 'Это поле обязательное',
						})}
						error={errors.text?.message}
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

export default SubmitPost
