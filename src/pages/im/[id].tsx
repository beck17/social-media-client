import { NextPage } from 'next'
import Chat from '../../components/screens/chat'
import CheckRole from '../../providers/auth-provider/CheckRole'

const ChatPage: NextPage = () => {
	return (
		<CheckRole>
			<Chat />
		</CheckRole>
	)
}

export default ChatPage
