import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { useMutation } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import { UserService } from '@/services/user/user.service'

import { useUploadFile } from '../../../../hooks/posts/useUploadFile'
import { useUploadBackground } from '@/hooks/posts/useUploadBackground'

import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'

import { IUserUpdate } from '@/types/user.interface'

import styles from '../EditForm.module.scss'
import { toastError } from '@/lib/toast-utils/toast-error'
import { useProfile } from '@/hooks/user/useProfile'
import { FileUploadButton } from '@/components/ui/file-upload-button/FileUploadButton'


interface Props {
	firstName: string
	lastName: string
	city: string
	refetch?: () => void,
	userPostRefetch?: () => void,
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
																	userPostRefetch,
																	setIsOpen,
																}) => {
	const [avatarPic, setAvatarPic] = useState<ImageInterface>()
	const [backgroundPicPhoto, setBackgroundPic] = useState<ImageInterface>()

	const [firstNameInput, setFirstNameInput] = useState<string>(firstName)
	const [lastNameInput, setLastNameInput] = useState<string>(lastName)
	const [cityInput, setCityInput] = useState<string>(city)


	const { uploadFile } = useUploadFile(setAvatarPic)
	const { uploadBackground } = useUploadBackground(setBackgroundPic)

	const { refetch: refetchProfile } = useProfile()

	const {
		register,
		reset,
		handleSubmit,
	} = useForm<IUserUpdate>()

	const { mutateAsync } = useMutation(
		'update user',
		(data: IUserUpdate) => UserService.updateProfile(data),
		{
			onSuccess() {
				reset()
				refetchProfile()
				if (refetch) refetch()
				if (userPostRefetch) userPostRefetch()
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
			return toastError('Поля не должны быть пустыми!')
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
					<div className={styles.button}>
						<FileUploadButton onUpload={uploadFile} text='Добавить аватар' htmlFor='avatar' />
					</div>

					<div className={styles.button}>
						<FileUploadButton onUpload={uploadBackground} text='Добавить бэкграунд' htmlFor='background' />
					</div>
				</div>

				<Button>Сохранить</Button>
			</form>
		</div>
	)
}

export default ProfileForm
