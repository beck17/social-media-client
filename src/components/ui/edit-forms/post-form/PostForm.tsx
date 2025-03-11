import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Image from 'next/image'

import { PostService } from '@/services/post/post.service'

import { useUploadFile } from '../../uploadField/useUploadFile'

import Input from '../../input/Input'
import Button from '../../button/Button'

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
	const [photoPic, setPhotoPic] = useState<{ image?: string }>()
	const { uploadFile } = useUploadFile(setPhotoPic)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IPostUpdate>()

	const { mutateAsync } = useMutation(
		`update post ${postId}`,
		(data: IPostUpdate) => PostService.updatePost(data, postId),
		{
			onSuccess(data) {
				refetch()
				reset()
				setIsOpen((prev) => !prev)
			},
		},
	)

	const onSubmit: SubmitHandler<IPostUpdate> = async ({
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
