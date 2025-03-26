import { FC } from 'react'

import { useGetUserCommunities } from '@/hooks/useCommunity'
import { useAuth } from '@/hooks/useAuth'

import Input from '../../ui/input/Input'
import CommunityItem from './communityItem/CommunityItem'
import CommunityBlock from './communityItem/CommunityBlock'

import styles from './CommunityItems.module.scss'


const MyCommunities: FC = () => {
	const { user } = useAuth()

	const { communities, isLoading } = useGetUserCommunities(user!._id)
	const communitiesCount = communities?.length || 0

	return (
		<div className={styles.community}>
			<div className={styles.container}>
				<CommunityBlock count={communitiesCount} />
				<Input placeholder='Найти сообщество...' />
				{isLoading ? (
					<p>Загрузка...</p>
				) : (
					communities?.map((community) => (
						<CommunityItem key={community._id} community={community} />
					))
				)}
			</div>
		</div>
	)
}

export default MyCommunities
