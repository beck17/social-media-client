import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useActions } from '../../../hooks/useActions'
import Button from '../../ui/button/Button'

import logo from '@/assets/img/logo.svg'

import styles from './Navbar.module.scss'

const Navbar: FC = () => {
	const { logout } = useActions()
	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<Link href="/feed">
					<Image src={logo} alt="logo" width={100} height={50} />
				</Link>
			</div>
			<div className={styles.right}>
				<Button onClick={() => logout()}>Выйти</Button>
			</div>
		</header>
	)
}

export default Navbar
