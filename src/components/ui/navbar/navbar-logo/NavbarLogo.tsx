import styles from '@/components/layout/navbar/Navbar.module.scss'
import Image from 'next/image'
import logo from '@/assets/img/logo.jpg'
import Link from 'next/link'
import React from 'react'

export const NavbarLogo = () => {
	return (
		<Link href='/feed' className={styles.center}>
			<Image src={logo} alt='logo' width={50} height={50} />

			<span>NETLY</span>
		</Link>
	)
}