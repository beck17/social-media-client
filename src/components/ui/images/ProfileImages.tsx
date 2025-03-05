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
		? 'http://localhost:5000/uploads/default/background.jpg'
		: `http://localhost:5000${backgroundPic}`

	const avatarSrc = isLoading
		? 'http://localhost:5000/uploads/default/no-avatar.jpg'
		: `http://localhost:5000${avatar}`

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