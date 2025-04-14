import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ICommunityResponse } from '@/types/community.interface'

import styles from '../../screens/communities/Communities.module.scss'

const CommunityItem: FC<{ community: ICommunityResponse }> = ({ community }) => {
	return (
		<div className={styles.item}>
			<div className={styles.item1}>
				<Link href={`/community/${community._id}`}>
					<Image
						width={1000}
						height={1000}
						src={process.env.BASE_URL + `${community.communityAvatar}`}
						alt="0-"
					/>
				</Link>
				<div className={styles.info}>
					<Link href={`/community/${community._id}`}>{community.name}</Link>
					<span>Спорт</span>
					<span>{community.members.length} подписчиков</span>
				</div>
			</div>
		</div>
	)
}

export default CommunityItem
