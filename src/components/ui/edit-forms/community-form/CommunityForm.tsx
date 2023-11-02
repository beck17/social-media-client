import React, { FC } from 'react'
import Image from 'next/image'

import Input from '../../input/Input'
import Button from '../../button/Button'

import photo from '@/assets/img/photo.svg'
import styles from '../EditForm.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ICommunityCreate } from '../../../../types/community.interface'
import { useMutation } from 'react-query'
import { CommunityService } from '../../../../services/community/community.service'

const CommunityForm: FC<{ setIsOpen: React.SetStateAction<boolean> }> = ({
	setIsOpen,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ICommunityCreate>()

	const { mutateAsync } = useMutation(
		'add community',
		(data: ICommunityCreate) => CommunityService.createCommunity(data),
		{
			onSuccess(data) {
				reset()
				setIsOpen((prev) => !prev)
			},
		},
	)

	const onSubmitCommunity: SubmitHandler<ICommunityCreate> = async ({
		name,
		description,
	}) => {
		const data = { name, description }
		await mutateAsync(data)
	}

	return (
		<div className={styles.formEdit}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitCommunity)}>
				<h2 style={{ textAlign: 'center' }}>Создать сообщество</h2>
				<Input
					{...register('name', {
						required: 'Название сообщества обязательно',
					})}
					placeholder="Название сообщества"
				/>
				<Input
					{...register('description', {
						required: 'Описание сообщества обязательно',
					})}
					placeholder="Введите описание сообщества"
				/>
				<div className={styles.buttons}>
					<input
						type="file"
						id="avatar"
						// onChange={uploadFile}
						style={{ display: 'none' }}
					/>
					<label htmlFor="avatar">
						<div className={styles.file}>
							<Image src={photo} alt="фото" width={25} height={25} />
							<span>Загрузить основное фото</span>
						</div>
					</label>
					<input
						type="file"
						id="avatar"
						// onChange={uploadFile}
						style={{ display: 'none' }}
					/>
					<label htmlFor="avatar">
						<div className={styles.file}>
							<Image src={photo} alt="фото" width={25} height={25} />
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
