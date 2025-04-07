import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { UserService } from '@/services/user.service'


export const useSearchProfile = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const { isLoading, data } = useQuery(
		['search user', searchTerm],
		() => UserService.getSearchProfiles(searchTerm),
		{
			select: ({ data }) => data,
			enabled: !!searchTerm,
		},
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return { handleSearch, isLoading, searchUsers: data, searchTerm }
}

export const useSearchFriends = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const { isLoading, data } = useQuery(
		['search friends', searchTerm],
		() => UserService.searchFriends(searchTerm),
		{
			select: ({ data }) => data,
			enabled: !!searchTerm,
		},
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const searchFriendsActions = {
		searchItems: data,
		isLoadingSearch: isLoading,
		searchTerm,
		handleSearch,
	}

	return { searchFriendsActions }
}

export const useSearchSubscribers = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const { isLoading, data } = useQuery(
		['search subscribers', searchTerm],
		() => UserService.searchSubscribers(searchTerm),
		{
			select: ({ data }) => data,
			enabled: !!searchTerm,
		},
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const searchSubscribersActions = {
		searchItems: data,
		isLoadingSearch: isLoading,
		searchTerm,
		handleSearch,
	}

	return { searchSubscribersActions }
}
