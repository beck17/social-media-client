import React, { FC } from 'react'

import Input from '../../ui/input/Input'
import CommunityItem from './communityItem/CommunityItem'

import styles from './Community.module.scss'
import CommunityBlock from './communityItem/CommunityBlock'

const MyCommunities: FC = () => {
	return (
		<div className={styles.community}>
			<div className={styles.container}>
				<CommunityBlock />
				<Input placeholder="Найти сообщество..." />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
			</div>
		</div>
	)
}

export default MyCommunities
