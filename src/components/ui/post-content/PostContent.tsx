import React, { FC } from 'react'
import Image from 'next/image'

import styles from './PostContent.module.scss'

interface Props {
	postId: string
	text: string
	image: string
	isLoadingLike: boolean
	toggleLikeHandler: (id: string) => Promise<void>
}

export const PostContent: FC<Props> = ({ postId, text, image, isLoadingLike, toggleLikeHandler }) => {
	return (
		<div
			className={styles.content}
			onDoubleClick={() => !isLoadingLike && toggleLikeHandler(postId)}
		>
			<p>{text}</p>
			<div className={styles.contentImage}>
				{image && (
					<Image
						src={process.env.BASE_URL + `${image}`}
						alt='Фото'
						width={1000}
						height={1000}
					/>
				)}
			</div>
		</div>
	)
}