import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'
import { UserService } from '../services/user.service'

export const useSearch = () => {
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

	return { handleSearch, isLoading, data, searchTerm }
}
