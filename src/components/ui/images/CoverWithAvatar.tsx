import React from 'react'
import Image from 'next/image'

import styles from './CoverWithAvatar.module.scss'


interface Props {
	backgroundPic: string
	avatar: string
}

export const CoverWithAvatar: React.FC<Props> = ({
																									 backgroundPic,
																									 avatar,
																								 }) => {
	return (
		<div className={styles.images}>
			<Image
				className={styles.cover}
				src={process.env.BASE_URL + backgroundPic}
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
				src={process.env.BASE_URL + avatar}
				alt='Аватар'
				className={styles.avatar}
			/>
		</div>
	)
}