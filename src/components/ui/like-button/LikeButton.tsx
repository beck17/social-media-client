import React, { FC } from 'react'
import cn from 'clsx'
import Image from 'next/image'

import likeRed from '@/assets/img/like-red.svg'
import like from '@/assets/img/like.svg'

import styles from './Like.module.scss'


interface Props {
	postId: string
	isLiked: boolean
	isLoadingLike: boolean
	likedCount: number
	toggleLikeHandler: (id: string) => Promise<void>
}

export const LikeButton: FC<Props> = ({ postId, isLiked, isLoadingLike, likedCount, toggleLikeHandler }) => {
	const likeSvgPic = isLiked ? likeRed : like
	return (
		<div className={styles.like}>
			<div onClick={() => !isLoadingLike && toggleLikeHandler(postId)}>
				<Image
					className={cn(isLoadingLike && styles.likeDisabled)}
					src={likeSvgPic}
					alt='лайк'
					width={25}
					height={25}
				/>
			</div>
			<span>
				{likedCount}
			</span>
		</div>
	)
}