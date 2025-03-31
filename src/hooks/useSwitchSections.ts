import { useCallback, useState } from 'react'

export enum FriendsSectionState {
	friends = 'friends',
	subscribers = 'subscribers',
}

export enum CommunitySectionState {
	allCommunities = 'allCommunities',
	myCommunities = 'myCommunities',
}

export const useSwitchFriendsSection = () => {
	const [section, setSection] = useState<FriendsSectionState>(FriendsSectionState.friends)

	const toggle = useCallback(() => {
		setSection(prev => prev === FriendsSectionState.friends
			? FriendsSectionState.subscribers
			: FriendsSectionState.friends)
	}, [])

	return { section, toggle }
}

export const useSwitchCommunitySection = () => {
	const [section, setSection] = useState<CommunitySectionState>(CommunitySectionState.myCommunities)

	const toggle = useCallback(() => {
		setSection(prev => prev === CommunitySectionState.myCommunities
			? CommunitySectionState.allCommunities
			: CommunitySectionState.myCommunities)
	}, [])

	return { section, toggle }
}