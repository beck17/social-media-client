import React, { FC, useMemo } from 'react'

import Input from '../../ui/input/Input'
import CommunityItem from './communityItem/CommunityItem'

import styles from './CommunityItems.module.scss'
import CommunityBlock from './communityItem/CommunityBlock'
import { useGetUserCommunities } from '../../../hooks/useCommunity'
import { useAuth } from '../../../hooks/useAuth'

const MyCommunities: FC = () => {
	const { user } = useAuth()
	const { communities, isLoading } = useGetUserCommunities(user._id)
	const communitiesCount = communities?.length
	return (
		<div className={styles.community}>
			<div className={styles.container}>
				<CommunityBlock count={communitiesCount} />
				<Input placeholder="Найти сообщество..." />
				{isLoading ? (
					<p>Загрузка...</p>
				) : (
					communities?.map((community) => (
						<CommunityItem key={community._id} community={community} />
					))
				)}
				{/*<CommunityItem />*/}
				{/*<CommunityItem />*/}
				{/*<CommunityItem />*/}
			</div>
		</div>
	)
}

export default MyCommunities
