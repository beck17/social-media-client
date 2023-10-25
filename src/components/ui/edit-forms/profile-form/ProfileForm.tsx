import React, { FC, useState } from 'react'
import Image from 'next/image'
import { useMutation } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import { UserService } from '../../../../services/user.service'

import { IUserUpdate } from '../../../../types/user.interface'

import Input from '../../input/Input'
import Button from '../../button/Button'

import photo from '@/assets/img/photo.svg'

import styles from '../EditForm.module.scss'
import { useUploadFile } from '../../uploadField/useUploadFile'
import { useUploadBackground } from '../../../../hooks/useUploadBackground'

const ProfileForm: FC<{ refetch: any; setIsOpen: any }> = ({
	refetch,
	setIsOpen,
}) => {
	const [avatarPic, setAvatarPic] = useState()
	const [backgroundPicPhoto, setBackgroundPic] = useState()

	const { uploadFile } = useUploadFile(setAvatarPic)
	const { uploadBackground } = useUploadBackground(setBackgroundPic)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserUpdate>()

	const { mutateAsync } = useMutation(
		'update user',
		(data: IUserUpdate) => UserService.updateProfile(data),
		{
			onSuccess(data) {
				reset()
				refetch()
				setIsOpen((prev) => !prev)
			},
		},
	)

	const onSubmit: SubmitHandler<IUserUpdate> = async ({
		backgroundPic = backgroundPicPhoto?.image,
		avatar = avatarPic?.image,
		lastName,
		firstName,
		city,
	}) => {
		const data = { avatar, lastName, firstName, city, backgroundPic }
		await mutateAsync(data)
	}

	return (
		<div className={styles.formEdit}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					placeholder="Имя"
					{...register('firstName')}
					error={errors.firstName?.message}
				/>
				<Input
					placeholder="Фамилия"
					{...register('lastName')}
					error={errors.lastName?.message}
				/>
				<Input
					placeholder="Город"
					{...register('city')}
					error={errors.city?.message}
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
							<span>Добавить аватар</span>
						</div>
					</label>
					<input
						type="file"
						id="backgroundPic"
						onChange={uploadBackground}
						style={{ display: 'none' }}
					/>
					<label htmlFor="backgroundPic">
						<div className={styles.file}>
							<Image src={photo} alt="фото" width={25} height={25} />
							<span style={{ alignItems: 'center' }}>Добавить ковер</span>
						</div>
					</label>
				</div>
				<Button>Сохранить</Button>
			</form>
		</div>
	)
}

export default ProfileForm
