import React from 'react'
import { NextPage } from 'next'
import CheckRole from '../../providers/auth-provider/CheckRole'
import Search from '../../components/screens/search'

const SearchPage: NextPage = () => {
	return (
		<CheckRole>
			<Search />
		</CheckRole>
	)
}

export default SearchPage
