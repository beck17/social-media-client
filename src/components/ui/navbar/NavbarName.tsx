import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/components/layout/navbar/Navbar.module.scss'


interface Props {
	id: string
	avatar: string
	name: string
}

export const NavbarName: FC<Props> = ({
																				id,
																				avatar,
																				name,
																			}) => {

	return (
		<Link href={`/profile/${id}`} className={styles.user}>
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