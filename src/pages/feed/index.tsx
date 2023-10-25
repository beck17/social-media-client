import { NextPage } from 'next'
import Feed from '../../components/screens/feed'
import CheckRole from '../../providers/auth-provider/CheckRole'

const FeedPage: NextPage = () => {
	return (
		<CheckRole>
			<Feed />
		</CheckRole>
	)
}

export default FeedPage
