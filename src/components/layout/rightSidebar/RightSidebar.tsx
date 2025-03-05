import React, { FC } from 'react'
import Image from 'next/image'

import banner1 from '@/assets/img/banner1.jpg'
import banner2 from '@/assets/img/banner2.jpg'

import styles from './RightSidebar.module.scss'

const RightSidebar: FC = () => {
	return (
		<div className={styles.main}>
			{/*<div className={styles.sidebar}>*/}
			{/*	<span className={styles.title}>Реклама</span>*/}
			{/*	<div className={styles.firstBanner}>*/}
			{/*		<Image src={banner1} alt="photo" width={130} height={130} />*/}
			{/*		<div className={styles.text}>*/}
			{/*			<p>Best Perfume for him</p>*/}
			{/*			<span>Perfumeshop.ru</span>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*	<div className={styles.secondBanner}>*/}
			{/*		<div className={styles.text}>*/}
			{/*			<p>High Heels new style </p>*/}
			{/*			<span>highheels.com</span>*/}
			{/*		</div>*/}
			{/*		<Image src={banner2} alt="photo" width={130} height={130} />*/}
			{/*	</div>*/}
			{/*</div>*/}
		</div>
	)
}

export default RightSidebar
