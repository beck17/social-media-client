import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useActions } from '@/hooks/useActions'
import { useProfile } from '@/hooks/useProfile'

import Button from '../../ui/button/Button'

import logo from '@/assets/img/logo.jpg'

import styles from './Navbar.module.scss'

const Navbar: FC = () => {
	const { logout } = useActions()
	const { myProfile, isLoading } = useProfile()

	return (
		<header className={styles.headerMain}>
			<div className={styles.container}>
				<div className={styles.items}>
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

					<Link href='/feed' className={styles.center}>
						<Image src={logo} alt='logo' width={50} height={50} />

						<span>NETLY</span>
					</Link>

					<div className={styles.right}>
						<Button onClick={() => logout()}>Выйти</Button>
					</div>
				</div>
			</div>

		</header>
	)
}

export default Navbar
