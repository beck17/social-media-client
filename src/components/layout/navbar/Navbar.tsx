import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useActions } from '@/hooks/useActions'
import { useProfile } from '@/hooks/useProfile'

import Button from '../../ui/button/Button'

import logo from '@/assets/img/logo.jpg'

import styles from './Navbar.module.scss'
import { NavbarLogo } from '@/components/ui/navbar/NavbarLogo'
import { NavbarName } from '@/components/ui/navbar/NavbarName'
import { NameLoader } from '@/components/ui/skeletons/NameLoader'



const Navbar: FC = () => {
	const { logout } = useActions()
	const { myProfile, isLoading } = useProfile()

	const fullName = `${myProfile?.firstName} ${myProfile?.lastName}`

	return (
		<header className={styles.headerMain}>
			<div className={styles.container}>
				<div className={styles.items}>
					<NavbarName isLoading={isLoading} avatar={myProfile?.avatar} name={fullName} id={myProfile?._id} />

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
