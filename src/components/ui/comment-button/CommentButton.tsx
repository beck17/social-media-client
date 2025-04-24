import React, { Dispatch, FC, SetStateAction } from 'react'
import Image from 'next/image'

import commentsImg from '@/assets/img/comments.svg'

import styles from './CommentButton.module.scss'


interface Props {
	commentCount: number
	setCommentOpen: Dispatch<SetStateAction<boolean>>
}

export const CommentButton: FC<Props> = ({ commentCount, setCommentOpen }) => {
	return (
		<div
			className={styles.comment}
			onClick={() => setCommentOpen((prev) => !prev)}
		>
			<Image src={commentsImg} alt='Коммент' width={25} height={25} />
			<span>
				{commentCount}
			</span>
		</div>
	)
}