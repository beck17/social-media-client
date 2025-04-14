import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './MenuItem.module.scss'

export interface menuItemsProps {
	value: string
	href: string
	image: string
	onClick?: () => void
}

export const MenuItem: React.FC<menuItemsProps> = ({
																										 value,
																										 href,
																										 image,
																										 onClick,
																									 }) => {
	return (
		<Link href={href} className={styles.item} onClick={onClick}>
			<Image src={image} alt={value} />
			<span>{value}</span>
		</Link>
	)
}