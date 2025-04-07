import React, { FC, useMemo } from 'react'

import { useProfile } from '@/hooks/user/useProfile'
import { FriendsSectionState, useSwitchFriendsSection } from '@/hooks/utils/useSwitchSections'
import { useSearchFriends, useSearchSubscribers } from '@/hooks/user/useUserSearch'

import TopFriendBlock from '@/components/shared/top-friend-block/TopFriendBlock'
import { FriendsList } from '@/components/shared/friends-list/FriendsList'

import { IUser } from '@/types/user.interface'

import styles from '@/assets/styles/screens/Friends.module.scss'


const Friends: FC = () => {
	const { myProfile = {} as IUser, isLoading } = useProfile()
	const { section, toggle } = useSwitchFriendsSection()

	const { searchFriendsActions } = useSearchFriends()
	const { searchSubscribersActions } = useSearchSubscribers()

	const { searchItems: friendsItems = [] } = searchFriendsActions
	const { searchItems: subscribersItems = [] } = searchSubscribersActions

	const currentData = {
		[FriendsSectionState.friends]: {
			items: myProfile.friends,
			isLoading: isLoading,
			searchItems: friendsItems,
			searchActions: searchFriendsActions,
			placeholderText: 'Найти друга...',
			emptyInfoText: 'У вас нет друзей',
		},
		[FriendsSectionState.subscribers]: {
			items: myProfile.requestFriends,
			isLoading: isLoading,
			searchItems: subscribersItems,
			searchActions: searchSubscribersActions,
			placeholderText: 'Найти подписчика...',
			emptyInfoText: 'У вас нет подписчиков',
		},
	}

	const currentSection = currentData[section]

	const itemsCount = useMemo(
		() => (currentSection.items?.length || currentSection.searchItems?.length) || 0,
		[currentSection.items, currentSection.searchItems],
	)


	return (
		<div className={styles.friends}>
			<div className={styles.container}>
				<TopFriendBlock
					count={itemsCount}
					section={section}
					toggle={toggle}
				/>
				<FriendsList
					items={currentSection.items}
					isLoadingItems={currentSection.isLoading}
					searchActions={currentSection.searchActions}
					placeholderText={currentSection.placeholderText}
					emptyInfoText={currentSection.emptyInfoText}
				/>
			</div>
		</div>
	)
}

export default Friends