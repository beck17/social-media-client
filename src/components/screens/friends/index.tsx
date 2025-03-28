import React, { FC } from 'react'
import { useProfile } from '@/hooks/useProfile'
import FriendItem from '@/components/ui/friend-item/FriendItem'
import styles from '@/assets/styles/screens/Friends.module.scss'
import TopFriendBlock from '@/components/ui/top-friend-block/TopFriendBlock'
import FriendItemSkeleton from '@/components/ui/skeletons/friend-item-skeleton/FriendItemSkeleton'
import { SectionState, useSectionSwitch } from '@/hooks/useSectionSwitch'
import { EmptyUsersBlock } from '@/components/ui/empty-users-block/EmptyUsersBlock'


const Friends: FC = () => {
	const { myProfile, isLoading } = useProfile()
	const { section, toggle } = useSectionSwitch(SectionState.friends)

	const currentData = section === SectionState.friends
		? myProfile?.friends
		: myProfile?.requestFriends

	const isEmpty = !currentData || currentData.length === 0
	const skeletonItems = Array.from({ length: 5 }, (_, i) => (
		<FriendItemSkeleton key={i} />
	))

	const emptyTexts = {
		[SectionState.friends]: 'У вас нет друзей',
		[SectionState.subscribers]: 'У вас нет подписчиков'
	}

	const renderContent = () => {
		if (isEmpty) {
			return <EmptyUsersBlock text={emptyTexts[section]} />
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