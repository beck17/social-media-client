import Image from 'next/image'
import React, { FC } from 'react'

import styles from './info-block.module.scss'


interface Props {
	text: string | undefined
	src: string
}

export const InfoBlock:FC<Props> = ({text, src}) => {
	return (
		<div className={styles.item}>
			<Image src={src} alt={text as string} width={16} height={16} />
			<span className={styles.city}>
				{text || 'не указано'}
			</span>
		</div>
	)
}