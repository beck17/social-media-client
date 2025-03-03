import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useProfile } from '@/hooks/useProfile'

import { MenuItem } from '@/components/ui/menu-item/MenuItem'
import { menuItems } from '@/constants/menu-items'

import styles from './LeftSidebar.module.scss'


const LeftSidebar: FC = () => {
	const { myProfile, isLoading } = useProfile()

	return (
		<div className={styles.sidebar}>
			<div className={styles.container}>
				<Link href='/profile' className={styles.user}>
					<Image
						src={
							isLoading
								? 'http://localhost:5000/uploads/default/no-avatar.jpg'
								: `http://localhost:5000${myProfile?.avatar}`
						}
						alt='avatar'
						width={500}
						height={500}
					/>
					<span>
						{isLoading
							? 'тут должен быть скелетон'
							: `${myProfile?.firstName} ${myProfile?.lastName}`}
					</span>
				</Link>


				{menuItems.map((menuItem) => (
					<MenuItem
						key={menuItem.id}
						value={menuItem.value}
						href={menuItem.href}
						image={menuItem.image}
					/>
				))}

			</div>
		</div>
	)
}

export default LeftSidebar
