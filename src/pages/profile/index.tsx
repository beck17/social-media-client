import { NextPage } from 'next'
import CheckRole from '../../providers/auth-provider/CheckRole'
import MyProfile from '../../components/screens/profile/MyProfile'

const MyProfilePage: NextPage = () => {
	return (
		<CheckRole>
			<MyProfile />
		</CheckRole>
	)
}

export default MyProfilePage
