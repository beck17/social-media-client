import React from 'react'
import Image from 'next/image'

import styles from './ProfileImages.module.scss'


interface Props {
	isLoading: boolean
	backgroundPic?: string
	avatar?: string
}

export const ProfileImages: React.FC<Props> = ({
																								 isLoading,
																								 backgroundPic,
																								 avatar,
																							 }) => {
	const backgroundPicSrc = isLoading
		? process.env.BASE_URL + `/uploads/default/background.jpg`
		: process.env.BASE_URL + `${backgroundPic}`

	const avatarSrc = isLoading
		? process.env.BASE_URL + `/uploads/default/no-avatar.jpg`
		: process.env.BASE_URL + `${avatar}`

	console.log(isLoading,backgroundPic, avatar)


	return (
		<div className={styles.images}>
			<Image
				className={styles.cover}
				src={backgroundPicSrc}
				alt='Задний фон'
				width={0}
				height={0}
				sizes='100vw 100vh'
				priority
			/>

			<Image
				width={0}
				height={0}
				sizes='100vw 100vh'
				src={avatarSrc}
				alt='Аватар'
				className={styles.profilePic}
			/>
		</div>
	)
}