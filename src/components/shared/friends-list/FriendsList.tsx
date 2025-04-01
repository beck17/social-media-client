import { FC } from 'react'

import { EmptyInfoBlock } from '@/components/ui/empty-users-block/EmptyInfoBlock'
import Input from '@/components/ui/input/Input'
import FriendItem from '@/components/ui/friend-item/FriendItem'
import FriendItemSkeleton from '@/components/ui/skeletons/friend-item-skeleton/FriendItemSkeleton'

import { IUser, IUserSearchActions } from '@/types/user.interface'


interface Props {
	items: IUser[]
	isLoadingItems: boolean
	searchActions: IUserSearchActions
	placeholderText: string
	emptyInfoText: string
}

export const FriendsList: FC<Props> = ({ items, isLoadingItems, searchActions, placeholderText, emptyInfoText }) => {
	const {
		searchItems = [],
		isLoadingSearch,
		searchTerm,
		handleSearch,
	} = searchActions

	const currentData = searchTerm.trim() === ''
		? items
		: searchItems

	const isLoading = isLoadingItems || isLoadingSearch

	const skeletonItems = Array.from({ length: 5 }, (_, i) => (
		<FriendItemSkeleton key={i} />
	))

	const renderItems = () => {
		if (currentData.length === 0) {
			return <EmptyInfoBlock text={emptyInfoText} />
		}

		return currentData.map((friend) => (
			<FriendItem key={friend._id} user={friend} />
		))
	}

	return (
		<>
			<Input placeholder={placeholderText} value={searchTerm} onChange={handleSearch} />
			{
				isLoading ? (
					skeletonItems
				) : (
					renderItems()
				)
			}
		</>
	)
}