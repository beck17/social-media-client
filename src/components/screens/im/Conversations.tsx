import { FC } from 'react'

import Input from '../../ui/input/Input'
import ConversationItem from './conversationItem/ConversationItem'

import styles from '@/assets/styles/screens/Conversations.module.scss'
import { useUserConversations } from '@/hooks/useConversation'
import ConversationItemSkeleton from '@/components/ui/skeletons/conversation-item-skeleton/ConversationItemSkeleton'


const Conversations: FC = () => {
	const { userConversations, isLoading, refetch } = useUserConversations()

	const skeletonItems = Array(7).fill(0)

	return (
		<div className={styles.conversations}>
			<div style={{ padding: '20px' }}>
				<Input placeholder='Поиск диалога...' />
			</div>


			{isLoading ? (
				skeletonItems.map((_, i) => (
					<ConversationItemSkeleton key={i} />
				))
			) : (
				userConversations?.map((conversation) => (
					<ConversationItem key={conversation._id} conversation={conversation} />
				))
			)}

		</div>
	)
}

export default Conversations