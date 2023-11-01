import React, { FC } from 'react'
import styles from './Community.module.scss'
import Input from '../../ui/input/Input'
import CommunityItem from './communityItem/CommunityItem'
import { useAllCommunities } from '../../../hooks/useAllCommunities'

const AllCommunities: FC = () => {
	const { communities, isLoading } = useAllCommunities()
	console.log(communities)
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
