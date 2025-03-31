import React, { FC } from 'react'
import { useProfile } from '@/hooks/useProfile'
import FriendItem from '@/components/ui/friend-item/FriendItem'
import styles from '@/assets/styles/screens/Friends.module.scss'
import TopFriendBlock from '@/components/ui/top-friend-block/TopFriendBlock'
import FriendItemSkeleton from '@/components/ui/skeletons/friend-item-skeleton/FriendItemSkeleton'
import { FriendsSectionState, useSwitchFriendsSection } from '@/hooks/useSwitchSections'
import { EmptyInfoBlock } from '@/components/ui/empty-users-block/EmptyInfoBlock'


const Friends: FC = () => {
	const { myProfile, isLoading } = useProfile()
	const { section, toggle } = useSwitchFriendsSection()

	const currentData = section === FriendsSectionState.friends
		? myProfile?.friends
		: myProfile?.requestFriends

	const isEmpty = !currentData || currentData.length === 0
	const skeletonItems = Array.from({ length: 5 }, (_, i) => (
		<FriendItemSkeleton key={i} />
	))

	const emptyTexts = {
		[FriendsSectionState.friends]: 'У вас нет друзей',
		[FriendsSectionState.subscribers]: 'У вас нет подписчиков',
	}

	const renderContent = () => {
		if (isEmpty) {
			return <EmptyInfoBlock text={emptyTexts[section]} />
		}

		return currentData?.map((friend) => (
			<FriendItem key={friend._id} user={friend} />
		))
	}

	return (
		<div className={styles.friends}>
			<div className={styles.container}>
				<TopFriendBlock
					count={currentData?.length || 0}
					section={section}
					toggle={toggle}
				/>
				{isLoading ? (
					skeletonItems
				) : (
					renderContent()
				)}
			</div>
		</div>
	)
}

export default Friends