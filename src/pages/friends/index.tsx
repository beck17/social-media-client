import { NextPage } from 'next'
import Friends from '../../components/screens/friends'
import CheckRole from '../../providers/auth-provider/CheckRole'

const FriendsPage: NextPage = () => {
	return (
		<CheckRole>
			<Friends />
		</CheckRole>
	)
}

export default FriendsPage
