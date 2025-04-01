import React, { FC } from 'react'

import FriendItem from '@/components/ui/friend-item/FriendItem'
import Input from '../../ui/input/Input'

import styles from '@/assets/styles/screens/Friends.module.scss'
import { useSearchProfile } from '@/hooks/useUserSearch'
import { EmptyInfoBlock } from '@/components/ui/empty-users-block/EmptyInfoBlock'
import FriendItemSkeleton from '@/components/ui/skeletons/friend-item-skeleton/FriendItemSkeleton'

const Search: FC = () => {
	const { isLoading, handleSearch, searchTerm, data } = useSearchProfile()

	const usersLength = data?.length || 0

	return (
		<div className={styles.friends}>
			<div className={styles.container}>
				<Input
					value={searchTerm}
					onChange={handleSearch}
					placeholder='Найти пользователя...'
				/>
				{isLoading ? (
					Array(5).fill(0).map((_, index) => (
						<FriendItemSkeleton key={`skeleton-${index}`} />
					))
				) : usersLength >= 1 ? (
					data?.map((user) => <FriendItem key={user._id} user={user} />)
				) : (
					<EmptyInfoBlock text='Пользователей не найдено' />
				)}
			</div>
		</div>
	)
}

export default Search
