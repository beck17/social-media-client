import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCommunityPosts } from '@/hooks/communities/useCommunityPost'
import { useUploadFile } from '@/hooks/posts/useUploadFile'
import { useUpdateCommunity } from '@/hooks/communities/useCommunityActions'

import { toastPromise } from '@/lib/toast-utils/toast-promise'

import { FileUploadButton } from '@/components/ui/file-upload-button/FileUploadButton'
import Input from '../../../ui/input/Input'
import Button from '../../../ui/button/Button'

import { ICommunityUpdate } from '@/types/community.interface'

import styles from '../EditForm.module.scss'


interface Props {
	communityId: string
	communityName: string
	communityDescription: string
	setIsOpen: Dispatch<SetStateAction<boolean>>
	refetch: () => void
}

interface StateProps {
	image?: string
}

const CommunityEditForm: FC<Props> = ({ communityId, communityName, communityDescription, setIsOpen, refetch }) => {
	const [photoPic, setPhotoPic] = useState<StateProps>()
	const [backgroundPicPhoto, setBackgroundPic] = useState<StateProps>()
	const [communityNameInput, setCommunityNameInput] = useState<string>(communityName)
	const [descriptionInput, setDescriptionInput] = useState<string>(communityDescription)

	const { uploadFile } = useUploadFile(setPhotoPic)
	const { uploadFile: uploadBackground } = useUploadFile(setBackgroundPic)

	const { refetch: refetchPosts } = useCommunityPosts(communityId)

	const allRefetch = () => {
		refetch()
		refetchPosts()
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ICommunityUpdate>()

	const { updateCommunity } = useUpdateCommunity(communityId, allRefetch)

	const onSubmit: SubmitHandler<ICommunityUpdate> = async ({
																														 name,
																														 description,
																														 communityAvatar = photoPic?.image,
																														 communityBackgroundPic = backgroundPicPhoto?.image,
																													 }) => {
		const data = { name, description, communityAvatar, communityBackgroundPic }

		await toastPromise(updateCommunity(data))
		reset()
		setIsOpen((prev) => !prev)
	}

	return (
		<div className={styles.formEdit}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('name')}
					value={communityNameInput}
					onChange={(e) => setCommunityNameInput(e.target.value)}
					error={errors.name?.message}
					placeholder='Название'
				/>
				<Input
					{...register('description')}
					value={descriptionInput}
					onChange={(e) => setDescriptionInput(e.target.value)}
					error={errors.description?.message}
					placeholder='Описание'
				/>
				<div className={styles.buttons}>
					<div className={styles.button}>
						<FileUploadButton text='Обновить аватар' htmlFor='communityAvatar' onUpload={uploadFile} />
					</div>
					<div className={styles.button}>
						<FileUploadButton text='Обновить задний фон' htmlFor='communityCover' onUpload={uploadBackground} />
					</div>
				</div>
				<Button>Сохранить</Button>
			</form>
		</div>
	)
}

export default CommunityEditForm
