import React, { FC } from 'react'

import { useActions } from '@/hooks/useActions'
import { useProfile } from '@/hooks/useProfile'

import { NavbarLogo } from '@/components/ui/navbar/NavbarLogo'
import { NavbarName } from '@/components/ui/navbar/NavbarName'

import Button from '../../ui/button/Button'


import styles from './Navbar.module.scss'


const Navbar: FC = () => {
	const { logout } = useActions()
	const { myProfile, isLoading } = useProfile()

	return (
		<header className={styles.headerMain}>
			<div className={styles.container}>
				<div className={styles.items}>
					<NavbarName isLoading={isLoading} avatar={myProfile?.avatar} name={myProfile?.firstName} id={myProfile?._id} />

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
