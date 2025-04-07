import React, { FC } from 'react'

import { useActions } from '@/hooks/user/useActions'
import { useProfile } from '@/hooks/user/useProfile'

import { NavbarLogo } from '@/components/ui/navbar/NavbarLogo'
import { NavbarName } from '@/components/ui/navbar/NavbarName'

import Button from '../../ui/button/Button'

import styles from './Navbar.module.scss'
import { IUser } from '@/types/user.interface'
import { NameLoader } from '@/components/skeletons/NameLoader'


const Navbar: FC = () => {
	const { logout } = useActions()
	const { myProfile = {} as IUser, isLoading } = useProfile()

	const nameRender = () => {
		if (isLoading) return <NameLoader />

		return <NavbarName avatar={myProfile.avatar} name={myProfile.firstName} id={myProfile._id} />
	}


	return (
		<header className={styles.headerMain}>
			<div className={styles.container}>
				<div className={styles.items}>
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
