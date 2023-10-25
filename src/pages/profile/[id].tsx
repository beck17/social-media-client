import { NextPage } from 'next'
import Profile from '../../components/screens/profile'
import CheckRole from '../../providers/auth-provider/CheckRole'

const ProfilePage: NextPage = () => {
	return (
		<CheckRole>
			<Profile />
		</CheckRole>
	)
}

export default ProfilePage
