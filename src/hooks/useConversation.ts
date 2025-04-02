import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { ConversationService } from '@/services/messanger/conversation.service'
import React, { ChangeEvent } from 'react'


export const useCreateConversation = (id: string) => {
	const router = useRouter()

	const { mutateAsync: createConversation } = useMutation(
		`create conversation with ${id}`,
		(id: string) => ConversationService.createConversation(id),
		{
			async onSuccess({ data }) {
				await router.push(`/im/${data?._id}?withId=${id}`)
			},
		},
	)

	return async (id: string) => {
		await createConversation(id)
	}
}

export const useUserConversations = () => {
	const { data, isLoading, refetch } = useQuery(
		'get all user conversations',
		() => ConversationService.getConversations(),
		{
			select: ({ data }) => data,
		},
	)

	return { userConversations: data, isLoading, refetch }
}

export const useSearchUserConversations = () => {
	const [searchTerm, setSearchTerm] = React.useState<string>('')

	const { data, isLoading } = useQuery(
		['search user conversations:', searchTerm],
		() => ConversationService.searchUserConversations(searchTerm),
		{
			select: ({ data }) => data,
			enabled: !!searchTerm,
		},
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const searchUserConversationsActions = {
		handleSearchConversations: handleSearch,
		searchConversations: data,
		isLoadingSearchConversations: isLoading,
		searchTermConversations: searchTerm,
	}

	return { searchUserConversationsActions }
}