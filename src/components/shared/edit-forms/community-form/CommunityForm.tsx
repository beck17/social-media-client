import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useUploadFile } from '@/hooks/posts/useUploadFile'
import { FileUploadButton } from '@/components/ui/file-upload-button/FileUploadButton'
import { useAllCommunity, useCreateCommunity } from '@/hooks/communities/useCommunity'

import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'

import { ICommunityCreate } from '@/types/community.interface'

import styles from '../EditForm.module.scss'
import { useRouter } from 'next/router'
import { communityGenres } from '@/constants/genres'


interface Props {
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface StateProps {
	image?: string
}

const CommunityForm: FC<Props> = ({
																		setIsOpen,
																	}) => {
	const router = useRouter()
	const [photoPic, setPhotoPic] = useState<StateProps>()
	const [backgroundPicPhoto, setBackgroundPic] = useState<StateProps>()

	const { refetch } = useAllCommunity()

	const { uploadFile } = useUploadFile(setPhotoPic)
	const { uploadFile: uploadBackground } = useUploadFile(setBackgroundPic)

	const {
		register,
		handleSubmit,
		reset,
	} = useForm<ICommunityCreate>()

	const { createCommunity } = useCreateCommunity(refetch)


	const onSubmitCommunity: SubmitHandler<ICommunityCreate> = async ({
																																			name,
																																			description,
																																			genre,
																																			communityAvatar = photoPic?.image,
																																			communityBackgroundPic = backgroundPicPhoto?.image,
																																		}) => {
		const data = { name, description, genre, communityAvatar, communityBackgroundPic }

		const createdCommunity = await createCommunity(data)

		reset()
		setIsOpen((prev) => !prev)

		await router.push(`/community/${createdCommunity.data._id}`)
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
				<select
					{...register('genre')}
					className={styles.select}
				>
					{communityGenres.map((genre, index) => (
						<option key={genre + index} value={genre}>{genre}</option>
					))}
				</select>
				<div className={styles.buttons}>
					<div className={styles.button}>
						<FileUploadButton onUpload={uploadFile} text='Добавить аватар' htmlFor='communityAvatar' />
					</div>

					<div className={styles.button}>
						<FileUploadButton onUpload={uploadBackground} text='Добавить бэкграунд' htmlFor='communityBackground' />
					</div>
				</div>
				<Button>Создать</Button>
			</form>
		</div>
	)
}

export default CommunityForm
