import { useQuery } from 'react-query'
import { CommunityService } from '@/services/community/community.service'
import React, { ChangeEvent } from 'react'

export const useAllCommunity = () => {
	const { data, isLoading, refetch } = useQuery(
		'get all communities',
		() => CommunityService.getAllCommunities(),
		{
			select: ({ data }) => data,
		},
	)

	return { communities: data, isLoading, refetch }
}

export const useOneCommunity = (id: string) => {
	const { data, isLoading, refetch } = useQuery(
		`get community ${id}`,
		() => CommunityService.getOneCommunity(id),
		{
			select: ({ data }) => data,
		},
	)

	return { community: data, isLoading, refetch }
}

export const useGetUserCommunities = (id: string) => {
	const { data, isLoading, refetch } = useQuery(
		`get user = ${id} communities`,
		() => CommunityService.getUserCommunities(id),
		{
			select: ({ data }) => data,
		},
	)

	return { communities: data, isLoading, refetch }
}

export const useSearchAllCommunities = () => {
	const [searchTerm, setSearchTerm] = React.useState<string>('')

	const { data, isLoading } = useQuery(
		['search all communities:', searchTerm],
		() => CommunityService.searchAllCommunities(searchTerm),
		{
			select: ({ data }) => data,
			enabled: !!searchTerm,
		},
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return {
		handleSearch,
		searchCommunities: data,
		searchIsLoading: isLoading,
		searchTerm,
	}
}

export const useIsSubscribed = (id: string) => {
	const { data, isLoading, refetch } = useQuery(
		`IsSubscribed = ${id} communities`,
		() => CommunityService.isSubscribed(id),
		{
			select: ({ data }) => data,
		},
	)

	return {
		isSubscribed: data,
		isSubscribedLoading: isLoading,
		isSubscribedRefetch: refetch,
	}
}
