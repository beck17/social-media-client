import React, { FC } from 'react'

import FriendItem from '@/components/ui/friend-item/FriendItem'
import Input from '../../ui/input/Input'

import styles from '@/assets/styles/screens/Friends.module.scss'
import { useSearchProfile } from '@/hooks/useUserSearch'
import { EmptyInfoBlock } from '@/components/ui/empty-users-block/EmptyInfoBlock'
import FriendItemSkeleton from '@/components/ui/skeletons/friend-item-skeleton/FriendItemSkeleton'

const Search: FC = () => {
	const { searchUsers = [], isLoading, handleSearch, searchTerm } = useSearchProfile()

	const usersLength = searchUsers.length

	const skeletonItems = Array(5).fill(0).map((_, index) => (
		<FriendItemSkeleton key={`skeleton-${index}`} />
	))

	const renderData = () => {
		if (isLoading) return skeletonItems
		if (!usersLength) return <EmptyInfoBlock text='Пользователей не найдено' />

		return searchUsers.map((user) => <FriendItem key={user._id} user={user} />)
	}

	return (
		<div className={styles.friends}>
			<div className={styles.container}>
				<Input
					value={searchTerm}
					onChange={handleSearch}
					placeholder='Найти пользователя...'
				/>
				{renderData()}
			</div>
		</div>
	)
}

export default Search
