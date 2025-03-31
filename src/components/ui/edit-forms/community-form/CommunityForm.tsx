import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'


import { useUploadBackground } from '@/hooks/useUploadBackground'
import { useUploadFile } from '@/components/ui/uploadField/useUploadFile'
import { useCreateCommunity } from '@/hooks/useCommunity'

import Input from '../../input/Input'
import Button from '../../button/Button'

import { ICommunityCreate } from '@/types/community.interface'

import photo from '@/assets/img/photo.svg'
import styles from '../EditForm.module.scss'


interface Props {
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface StateProps {
	image?: string
}

const CommunityForm: FC<Props> = ({
																		setIsOpen,
																	}) => {
	const [photoPic, setPhotoPic] = useState<StateProps>()
	const [backgroundPicPhoto, setBackgroundPic] = useState<StateProps>()

	const { uploadFile } = useUploadFile(setPhotoPic)
	const { uploadBackground } = useUploadBackground(setBackgroundPic)

	const {
		register,
		handleSubmit,
		reset,
	} = useForm<ICommunityCreate>()

	const { createCommunity } = useCreateCommunity()


	const onSubmitCommunity: SubmitHandler<ICommunityCreate> = async ({
																																			name,
																																			description,
																																			communityAvatar = photoPic?.image,
																																			communityBackgroundPic = backgroundPicPhoto?.image,
																																		}) => {
		const data = { name, description, communityAvatar, communityBackgroundPic }

		await createCommunity(data)

		reset()
		setIsOpen((prev) => !prev)
	}

	return (
		<div className={styles.formEdit}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitCommunity)}>
				<h2 style={{ textAlign: 'center' }}>Создать сообщество</h2>
				<Input
					{...register('name', {
						required: 'Название сообщества обязательно',
					})}
					placeholder='Название сообщества'
				/>
				<Input
					{...register('description', {
						required: 'Описание сообщества обязательно',
					})}
					placeholder='Введите описание сообщества'
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
							<span>Загрузить основное фото</span>
						</div>
					</label>
					<input
						type='file'
						id='back'
						onChange={uploadBackground}
						style={{ display: 'none' }}
					/>
					<label htmlFor='back'>
						<div className={styles.file}>
							<Image src={photo} alt='фото' width={25} height={25} />
							<span>Загрузить задний фон</span>
						</div>
					</label>
				</div>
				<Button>Создать</Button>
			</form>
		</div>
	)
}

export default CommunityForm
