import { NextPage } from 'next'

import CheckRole from '../../providers/auth-provider/CheckRole'

import MyCommunities from '../../components/screens/communities/MyCommunities'

const MyCommunitiesPage: NextPage = () => {
	return (
		<CheckRole>
			<MyCommunities />
		</CheckRole>
	)
}

export default MyCommunitiesPage
