import { NextPage } from 'next'
import Conversations from '../../components/screens/im/Conversations'
import CheckRole from '../../providers/auth-provider/CheckRole'

const ConversationsPage: NextPage = () => {
	return (
		<CheckRole>
			<Conversations />
		</CheckRole>
	)
}

export default ConversationsPage
