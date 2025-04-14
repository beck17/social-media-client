import React, { FC } from 'react'
import cn from 'clsx'

import { MenuItem } from '@/components/ui/menu-item/MenuItem'

import { menuItems } from '@/constants/menu-items'

import styles from './LeftSidebar.module.scss'
import { NameLoader } from '@/components/skeletons/NameLoader'
import { NavbarName } from '@/components/ui/navbar/navbar-name/NavbarName'
import { useNameAndAvatarProfile } from '@/hooks/user/useProfile'
import { INameAndAvatar } from '@/types/user.interface'


interface Props {
	isOpen?: boolean
	onClose?: () => void
}

const LeftSidebar: FC<Props> = ({ isOpen, onClose }) => {
	const { nameAndAvatar = {} as INameAndAvatar, isLoading } = useNameAndAvatarProfile()
	const nameRender = () => {
		if (isLoading) return <NameLoader />

		return <NavbarName avatar={nameAndAvatar.avatar} name={nameAndAvatar.firstName} id={nameAndAvatar._id} onClose={onClose} />
	}
	return (
		<>
			{/* Десктопная версия */}
			<nav className={cn(styles.sidebar, styles.desktop)}>
				<div className={styles.container}>
					{menuItems.map((menuItem) => (
						<MenuItem
							key={menuItem.id}
							value={menuItem.value}
							href={menuItem.href}
							image={menuItem.image}
						/>
					))}
				</div>
			</nav>

			{/* Мобильная версия */}
			<nav className={cn(styles.sidebar, styles.mobile, isOpen && styles.active)}>
				<button className={styles.closeButton} onClick={onClose}>
					✕
				</button>
				{nameRender()}
				<div className={styles.container}>
					{menuItems.map((menuItem) => (
						<MenuItem
							key={menuItem.id}
							value={menuItem.value}
							href={menuItem.href}
							image={menuItem.image}
							onClick={onClose}
						/>
					))}
				</div>
			</nav>

			{isOpen && <div className={styles.overlay} onClick={onClose} />}
		</>
	)
}

export default LeftSidebar