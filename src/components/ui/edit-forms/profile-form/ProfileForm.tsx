import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import Image from 'next/image'
import { useMutation } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import { UserService } from '@/services/user.service'

import { useUploadFile } from '../../uploadField/useUploadFile'
import { useUploadBackground } from '@/hooks/useUploadBackground'

import Input from '../../input/Input'
import Button from '../../button/Button'

import photo from '@/assets/img/photo.svg'

import { IUserUpdate } from '@/types/user.interface'

import styles from '../EditForm.module.scss'
import { emptyValue } from '@/lib/empty-value'


interface Props {
	firstName: string
	lastName: string
	city: string
	refetch: () => void,
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface ImageInterface {
	image?: string
}

const ProfileForm: FC<Props> = ({
																	firstName,
																	lastName,
																	city,
																	refetch,
																	setIsOpen,
																}) => {
	const [avatarPic, setAvatarPic] = useState<ImageInterface>()
	const [backgroundPicPhoto, setBackgroundPic] = useState<ImageInterface>()

	const [firstNameInput, setFirstNameInput] = useState<string>(firstName)
	const [lastNameInput, setLastNameInput] = useState<string>(lastName)
	const [cityInput, setCityInput] = useState<string>(city)


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

		if (lastName?.trim() === '' || firstName?.trim() === '' || city?.trim() === '') {
			return emptyValue('Поля не должны быть пустыми!')
		}
		await mutateAsync(data)
	}

	return (
		<div className={styles.formEdit}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					placeholder='Имя'
					{...register('firstName')}
					value={firstNameInput}
					onChange={(e) => setFirstNameInput(e.target.value as string)}
				/>
				<Input
					placeholder='Фамилия'
					{...register('lastName')}
					value={lastNameInput}
					onChange={(e) => setLastNameInput(e.target.value as string)}
				/>
				<Input
					placeholder='Город'
					{...register('city')}
					value={cityInput}
					onChange={(e) => setCityInput(e.target.value as string)}
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
							<span>Добавить аватар</span>
						</div>
					</label>

					<input
						type='file'
						id='backgroundPic'
						onChange={uploadBackground}
						style={{ display: 'none' }}
					/>

					<label htmlFor='backgroundPic'>
						<div className={styles.file}>
							<Image src={photo} alt='фото' width={25} height={25} />
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
