import React from 'react'
import { NextPage } from 'next'
import CheckRole from '../../providers/auth-provider/CheckRole'
import AllCommunities from '../../components/screens/communities/AllCommunities'

const AllCommunitiesPage: NextPage = () => {
	return (
		<CheckRole>
			<AllCommunities />
		</CheckRole>
	)
}

export default AllCommunitiesPage
