import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../Community.module.scss'
import CommunityActions from './CommunityActions'

const CommunityItem: FC = () => {
	return (
		<div className={styles.item}>
			<div className={styles.item1}>
				<Link href={`/profile`}>
					<Image
						width={1000}
						height={1000}
						src="http://localhost:5000/uploads/default/1020773.jpg"
						alt="0-"
					/>
				</Link>
				<div className={styles.info}>
					<Link href={`/profile`}>
						{/*<span></span>*/}
						Некое название
					</Link>
					<span>Спорт</span>
					<span>1,000 подписчиков</span>
				</div>
			</div>
			<CommunityActions />
		</div>
	)
}

export default CommunityItem
