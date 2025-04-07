import React from 'react'
import { NextPage } from 'next'
import CheckRole from '../../providers/auth-provider/CheckRole'
import Index from '../../components/screens/community'

const CommunityPage: NextPage = () => {
	return (
		<CheckRole>
			<Index />
		</CheckRole>
	)
}

export default CommunityPage
