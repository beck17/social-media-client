import React, { FC, useState } from 'react'

import { useActions } from '@/hooks/user/useActions'
import { useNameAndAvatarProfile } from '@/hooks/user/useProfile'

import { NavbarLogo } from '@/components/ui/navbar/navbar-logo/NavbarLogo'
import { NavbarName } from '@/components/ui/navbar/navbar-name/NavbarName'

import Button from '../../ui/button/Button'

import styles from './Navbar.module.scss'
import { INameAndAvatar } from '@/types/user.interface'
import { NameLoader } from '@/components/skeletons/NameLoader'
import LeftSidebar from '@/components/layout/left-sidebar/LeftSidebar'
import cn from 'clsx'


const Navbar: FC = () => {
	const { logout } = useActions()
	const { nameAndAvatar = {} as INameAndAvatar, isLoading } = useNameAndAvatarProfile()

	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

	const nameRender = () => {
		if (isLoading) return <NameLoader />

		return <NavbarName
			avatar={nameAndAvatar.avatar}
			name={nameAndAvatar.firstName}
			id={nameAndAvatar._id}
			isUnVisible
		/>
	}

	const toggleSidebar = () => {
		setIsSidebarOpen(prev => !prev)
	}

	return (
		<header className={styles.headerMain}>
			<div className={styles.container}>
				<div className={styles.items}>
					<div className={styles.burger}>
						<button
							className={cn(styles.burgerButton, isSidebarOpen && styles.active)}
							onClick={toggleSidebar}
						>
							<span></span>
							<span></span>
							<span></span>
						</button>
						<LeftSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
					</div>
					{nameRender()}

					<NavbarLogo />

					<div className={styles.right}>
						<Button onClick={() => logout()}>Выйти</Button>
					</div>
				</div>
			</div>

		</header>
	)
}

export default Navbar
