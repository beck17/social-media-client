import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../CommunityItems.module.scss'
import CommunityActions from './CommunityActions'
import { ICommunity } from '../../../../types/community.interface'

const CommunityItem: FC<{ community: ICommunity }> = ({ community }) => {
	return (
		<div className={styles.item}>
			<div className={styles.item1}>
				<Link href={`/community/${community._id}`}>
					<Image
						width={1000}
						height={1000}
						src={`http://localhost:5000${community.communityAvatar}`}
						alt="0-"
					/>
				</Link>
				<div className={styles.info}>
					<Link href={`/community/${community._id}`}>{community.name}</Link>
					<span>Спорт</span>
					<span>{community.members.length} подписчиков</span>
				</div>
			</div>
			{/*<CommunityActions communityId={community._id} />*/}
		</div>
	)
}

export default CommunityItem
