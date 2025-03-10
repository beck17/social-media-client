import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Image from 'next/image'

import { CommunityService } from '@/services/community/community.service'

import { useUploadBackground } from '@/hooks/useUploadBackground'
import { useCommunityPosts } from '@/hooks/useCommunityPost'
import { useUploadFile } from '@/components/ui/uploadField/useUploadFile'

import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'

import { ICommunityUpdate } from '@/types/community.interface'

import photo from '../../../../assets/img/photo.svg'

import styles from '../../../ui/edit-forms/EditForm.module.scss'


interface Props {
	communityId: string
	setIsOpen: Dispatch<SetStateAction<boolean>>
	refetch: () => void
}

interface StateProps {
	image?: string
}

const CommunityEditForm: FC<Props> = ({ communityId, setIsOpen, refetch }) => {
	const [photoPic, setPhotoPic] = useState<StateProps>()
	const [backgroundPicPhoto, setBackgroundPic] = useState<StateProps>()

	const { uploadFile } = useUploadFile(setPhotoPic)
	const { uploadBackground } = useUploadBackground(setBackgroundPic)

	const { refetch: refetchPosts } = useCommunityPosts(communityId)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ICommunityUpdate>()

	const { mutateAsync } = useMutation(
		'update community',
		(data: ICommunityUpdate) =>
			CommunityService.updateCommunity(data, communityId),
		{
			onSuccess(data) {
				refetch()
				refetchPosts()
				reset()
				setIsOpen((prev) => !prev)
			},
		},
	)

	const onSubmit: SubmitHandler<ICommunityUpdate> = async ({
																														 name,
																														 description,
																														 communityAvatar = photoPic?.image,
																														 communityBackgroundPic = backgroundPicPhoto?.image,
																													 }) => {
		const data = { name, description, communityAvatar, communityBackgroundPic }

		await mutateAsync(data)
	}

	return (
		<div className={styles.formEdit}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('name')}
					error={errors.name?.message}
					placeholder='Название'
				/>
				<Input
					{...register('description')}
					error={errors.description?.message}
					placeholder='Описание'
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
							<span>Обновить фото группы</span>
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
							<span style={{ alignItems: 'center' }}>Обновить бэкграунд</span>
						</div>
					</label>
				</div>
				<Button>Сохранить</Button>
			</form>
		</div>
	)
}

export default CommunityEditForm
