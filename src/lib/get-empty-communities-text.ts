import { CommunitySectionState } from '@/hooks/useSwitchSections'

export const getEmptyCommunityText = (section: CommunitySectionState) => {
	const emptyCommunitiesText = {
		[CommunitySectionState.myCommunities]: 'Сообщества не найдены',
		[CommunitySectionState.allCommunities]: 'Сообщества не найдены',
	}

	return emptyCommunitiesText[section]
}