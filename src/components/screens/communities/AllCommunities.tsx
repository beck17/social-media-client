import React, { FC } from 'react'
import styles from './Community.module.scss'
import Input from '../../ui/input/Input'
import CommunityItem from './communityItem/CommunityItem'

const AllCommunities: FC = () => {
	return (
		<div className={styles.community}>
			<div className={styles.container}>
				<div className={styles.communityTop}>
					<span>Все сообщества</span>
					<Input placeholder="Найти сообщество..." />
				</div>
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
			</div>
		</div>
	)
}

export default AllCommunities
