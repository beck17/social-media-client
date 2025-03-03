import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './MenuItem.module.scss'

export interface menuItemsProps {
	value: string
	href: string
	image: string
}

export const MenuItem: React.FC<menuItemsProps> = ({
																						value,
																						href,
																						image,
																					}) => {
	return (
		<Link href={href} className={styles.item}>
			<Image src={image} alt={value} />
			<span>{value}</span>
		</Link>
	)
}