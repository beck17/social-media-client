import { FC } from 'react'
import { CommunitySectionState } from '@/hooks/utils/useSwitchSections'

import { getEmptyCommunityText } from '@/lib/utils/get-empty-communities-text'

import CommunityItemSkeleton from '@/components/skeletons/community-item-skeleton/CommunityItemSkeleton'
import { EmptyInfoBlock } from '@/components/ui/empty-users-block/EmptyInfoBlock'
import Input from '@/components/ui/input/Input'
import CommunityItem from '@/components/ui/community-item/CommunityItem'

import { ICommunityResponse, ICommunitySearchActions } from '@/types/community.interface'


interface Props {
	communities: ICommunityResponse[]
	isLoadingCommunities: boolean
	searchCommunitiesActions: ICommunitySearchActions
}

export const CommunitiesList: FC<Props> = ({ communities, isLoadingCommunities, searchCommunitiesActions }) => {
	const {
		searchCommunities = [],
		isLoadingSearchCommunities,
		searchTermCommunities,
		handleSearchCommunities,
	} = searchCommunitiesActions

	const isLoading = isLoadingCommunities || isLoadingSearchCommunities

	const currentData = searchTermCommunities.trim() === ''
		? communities
		: searchCommunities

	const emptyText = getEmptyCommunityText(CommunitySectionState.allCommunities)

	const skeletonItems = Array.from({ length: 5 }, (_, i) => (
		<CommunityItemSkeleton key={i} />
	))

	const renderCommunitiesItems = () => {
		if (currentData.length === 0) {
			return <EmptyInfoBlock text={emptyText} />
		}

		return currentData.map((community) => (
			<CommunityItem key={community._id} community={community} />
		))
	}

	return (
		<>
			<Input placeholder='Найти сообщество...' value={searchTermCommunities} onChange={handleSearchCommunities} />
			{
				isLoading ? (
					skeletonItems
				) : (
					renderCommunitiesItems()
				)
			}
		</>
	)
}
