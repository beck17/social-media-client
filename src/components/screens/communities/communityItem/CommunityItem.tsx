import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../Community.module.scss'
import CommunityActions from './CommunityActions'
import { ICommunity } from '../../../../types/community.interface'

const CommunityItem: FC<{ community: ICommunity }> = ({ community }) => {
	console.log(community)
	return (
		<div className={styles.item}>
			<div className={styles.item1}>
				<Link href={`/profile`}>
					<Image
						width={1000}
						height={1000}
						src={`http://localhost:5000${community.communityAvatar}`}
						alt="0-"
					/>
				</Link>
				<div className={styles.info}>
					<Link href={`/profile`}>{community.name}</Link>
					<span>Спорт</span>
					<span>{community.members.length} подписчиков</span>
				</div>
			</div>
			<CommunityActions />
		</div>
	)
}

export default CommunityItem
