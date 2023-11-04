import React, { FC } from 'react'
import styles from './CommunityItems.module.scss'
import Input from '../../ui/input/Input'
import CommunityItem from './communityItem/CommunityItem'
import { useAllCommunity } from '../../../hooks/useCommunity'

const AllCommunities: FC = () => {
	const { communities, isLoading } = useAllCommunity()
	return (
		<div className={styles.community}>
			<div className={styles.container}>
				<div className={styles.communityTop}>
					<span>Все сообщества</span>
					<Input placeholder="Найти сообщество..." />
				</div>
				{isLoading
					? 'pfuheprf'
					: communities?.map((community) => (
							<CommunityItem key={community._id} community={community} />
					  ))}
			</div>
		</div>
	)
}

export default AllCommunities
