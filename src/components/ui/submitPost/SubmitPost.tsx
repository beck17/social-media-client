import React, { FC, useState } from 'react'
import Image from 'next/image'
import { useMutation } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import { PostService } from '@/services/post/post.service'

import { useProfile } from '@/hooks/useProfile'
import { useUploadFile } from '../uploadField/useUploadFile'

import Input from '../input/Input'
import Button from '../button/Button'

import { IPostResponse } from '@/types/post.interface'

import photo from '../../../assets/img/photo.svg'
import styles from './SubmitPost.module.scss'


const SubmitPost: FC<{ refetch: () => void }> = ({ refetch }) => {
	const [image1, setImage] = useState<{ image: string }>()
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
		setImage({ image: '' })
	}

	return (
		<form className={styles.submitPost} onSubmit={handleSubmit(onSubmitPost)}>
			<div className={styles.container}>
				<div className={styles.input}>
					<Image
						src={
							isLoading
								? process.env.BASE_URL + `/uploads/default/no-avatar.jpg`
								: process.env.BASE_URL + `${myProfile?.avatar}`
						}
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
					<input
						type='file'
						id='file'
						onChange={uploadFile}
						style={{ display: 'none' }}
					/>
					<label htmlFor='file'>
						<div className={styles.file}>
							<Image src={photo} alt='фото' width={25} height={25} />
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
