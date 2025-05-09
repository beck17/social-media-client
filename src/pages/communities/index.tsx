import { NextPage } from 'next'

import CheckRole from '../../providers/auth-provider/CheckRole'

import Communities from '../../components/screens/communities'

const CommunitiesPage: NextPage = () => {
	return (
		<CheckRole>
			<Communities />
		</CheckRole>
	)
}

export default CommunitiesPage
