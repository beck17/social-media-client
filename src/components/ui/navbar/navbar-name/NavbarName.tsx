import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './NavbarName.module.scss'
import cn from 'clsx'


interface Props {
	id: string
	avatar: string
	name: string
	isUnVisible?: boolean
	onClose?: () => void
}

export const NavbarName: FC<Props> = ({
																				id,
																				avatar,
																				name,
																				isUnVisible,
																				onClose,
																			}) => {

	return (
		<Link href={`/profile/${id}`} className={cn(styles.user, isUnVisible && styles.unVisible)} onClick={onClose}>
			<Image
				src={process.env.BASE_URL + `${avatar}`}
				alt='avatar'
				width={500}
				height={500}
			/>
			<span>
				{name}
			</span>
		</Link>
	)
}