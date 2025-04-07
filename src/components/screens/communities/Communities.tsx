import { FC, useMemo } from 'react'

import { useAuth } from '@/hooks/user/useAuth'
import { CommunitySectionState, useSwitchCommunitySection } from '@/hooks/utils/useSwitchSections'
import {
	useAllCommunity,
	useGetUserCommunities,
	useSearchAllCommunities,
	useSearchUserCommunities,
} from '@/hooks/communities/useCommunity'

import { CommunitiesList } from '@/components/screens/communities/communities-list/CommunitiesList'
import CommunityBlock from './communityItem/CommunityBlock'

import styles from './CommunityItems.module.scss'


const Communities: FC = () => {
	const { user } = useAuth()
	const { section, toggle } = useSwitchCommunitySection()

	const { communities: allCommunities = [], isLoading: isLoadingAllCommunities } = useAllCommunity()
	const { communities: myCommunities = [], isLoading: isLoadingMyCommunities } = useGetUserCommunities(user._id)

	const { searchAllCommunitiesActions } = useSearchAllCommunities()
	const { searchMyCommunitiesActions } = useSearchUserCommunities()

	const { searchCommunities: searchAllCommunities = [] } = searchAllCommunitiesActions
	const { searchCommunities: searchMyCommunities = [] } = searchMyCommunitiesActions

	const sectionData = {
		[CommunitySectionState.allCommunities]: {
			communities: allCommunities,
			isLoading: isLoadingAllCommunities,
			searchCommunities: searchAllCommunities,
			searchCommunitiesActions: searchAllCommunitiesActions,
		},
		[CommunitySectionState.myCommunities]: {
			communities: myCommunities,
			isLoading: isLoadingMyCommunities,
			searchCommunities: searchMyCommunities,
			searchCommunitiesActions: searchMyCommunitiesActions,
		},
	}
	const currentSection = sectionData[section]

	const communitiesCount = useMemo(
		() => currentSection.communities.length || currentSection.searchCommunities.length,
		[currentSection.communities, currentSection.searchCommunities],
	)

	return (
		<div className={styles.community}>
			<div className={styles.container}>
				<CommunityBlock
					section={section}
					count={communitiesCount}
					toggle={toggle}
				/>
				<CommunitiesList
					communities={currentSection.communities}
					isLoadingCommunities={currentSection.isLoading}
					searchCommunitiesActions={currentSection.searchCommunitiesActions}
				/>
			</div>
		</div>
	)
}

export default Communities
