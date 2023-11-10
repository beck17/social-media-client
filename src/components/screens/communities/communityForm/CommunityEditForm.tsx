import React, { FC, useState } from 'react'
import { useUploadFile } from '../../../ui/uploadField/useUploadFile'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	ICommunityPostCreate,
	ICommunityPostUpdate,
} from '../../../../types/community-post.interface'
import { useMutation } from 'react-query'
import { IPostUpdate } from '../../../../types/post.interface'
import { CommunityPostService } from '../../../../services/community-post/community-post.service'
import styles from '../../../ui/edit-forms/EditForm.module.scss'
import Input from '../../../ui/input/Input'
import Image from 'next/image'
import photo from '../../../../assets/img/photo.svg'
import Button from '../../../ui/button/Button'
import { CommunityService } from '../../../../services/community/community.service'
import { ICommunityUpdate } from '../../../../types/community.interface'
import { useUploadBackground } from '../../../../hooks/useUploadBackground'
import { useAllCommunity } from '../../../../hooks/useCommunity'
import { useCommunityPosts } from '../../../../hooks/useCommunityPost'

const CommunityEditForm: FC<{
	communityId: string
	setIsOpen: any
	refetch: any
}> = ({ communityId, setIsOpen, refetch }) => {
	const [photoPic, setPhotoPic] = useState()
	const [backgroundPicPhoto, setBackgroundPic] = useState()

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
					placeholder="Название"
				/>
				<Input
					{...register('description')}
					error={errors.description?.message}
					placeholder="Описание"
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
							<span>Обновить фото группы</span>
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
