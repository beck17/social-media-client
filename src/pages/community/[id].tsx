import React from 'react'
import { NextPage } from 'next'
import CheckRole from '../../providers/auth-provider/CheckRole'
import Community from '../../components/screens/community'

const CommunityPage: NextPage = () => {
	return (
		<CheckRole>
			<Community />
		</CheckRole>
	)
}

export default CommunityPage
