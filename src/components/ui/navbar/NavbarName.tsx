import styles from '@/components/layout/navbar/Navbar.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { NameLoader } from '@/components/ui/skeletons/NameLoader'

interface Props {
	id: string | undefined
	isLoading: boolean
	avatar: string | undefined
	name: string |undefined
}

export const NavbarName: FC<Props> = ({
	id,
	isLoading,
	avatar,
	name,
																			}) => {
	if (isLoading) {
		return (
			<NameLoader />
		)
	}

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