import { FC } from 'react'

import { useAllCommunity, useGetUserCommunities } from '@/hooks/useCommunity'
import { useAuth } from '@/hooks/useAuth'

import Input from '../../ui/input/Input'
import CommunityItem from './communityItem/CommunityItem'
import CommunityBlock from './communityItem/CommunityBlock'

import styles from './CommunityItems.module.scss'
import { CommunitySectionState, useSwitchCommunitySection } from '@/hooks/useSwitchSections'
import CommunityItemSkeleton from '@/components/ui/skeletons/community-item-skeleton/CommunityItemSkeleton'
import { EmptyInfoBlock } from '@/components/ui/empty-users-block/EmptyInfoBlock'


const Communities: FC = () => {
	const { user } = useAuth()
	const { section, toggle } = useSwitchCommunitySection()

	const { communities: myCommunities = [], isLoading: isLoadingMyCommunities } = useGetUserCommunities(user!._id)
	const { communities: allCommunities = [], isLoading: isLoadingAllCommunities } = useAllCommunity()

	const isLoading = isLoadingAllCommunities || isLoadingMyCommunities

	const currentData = section === CommunitySectionState.myCommunities
		? myCommunities
		: allCommunities

	const isEmptyCommunities = currentData.length === 0

	const skeletonItems = Array.from({ length: 5 }, (_, i) => (
		<CommunityItemSkeleton key={i} />
	))

	const emptyText = {
		[CommunitySectionState.myCommunities]: 'У вас нет сообществ',
		[CommunitySectionState.allCommunities]: 'Сообществ не существует',
	}

	const renderContent = () => {
		if (isEmptyCommunities) {
			return <EmptyInfoBlock text={emptyText[section]} />
		}

		return currentData.map((community) => (
			<CommunityItem key={community._id} community={community} />
		))
	}

	const communitiesCount = currentData.length

	return (
		<div className={styles.community}>
			<div className={styles.container}>
				<CommunityBlock section={section} count={communitiesCount} toggle={toggle} />
				<Input placeholder='Найти сообщество...' />
				{isLoading ? (
					skeletonItems
				) : (
					renderContent()
				)}
			</div>
		</div>
	)
}

export default Communities
