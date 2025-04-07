import { FC } from 'react'

import Input from '../../ui/input/Input'
import ConversationItem from './conversationItem/ConversationItem'

import styles from '@/assets/styles/screens/Conversations.module.scss'
import { useSearchUserConversations, useUserConversations } from '@/hooks/conversations/useConversation'
import ConversationItemSkeleton from '@/components/skeletons/conversation-item-skeleton/ConversationItemSkeleton'
import { EmptyInfoBlock } from '@/components/ui/empty-users-block/EmptyInfoBlock'


const Conversations: FC = () => {
	const { userConversations = [], isLoading: isLoadingUserConversations } = useUserConversations()
	const { searchUserConversationsActions } = useSearchUserConversations()

	const {
		searchConversations = [],
		searchTermConversations,
		isLoadingSearchConversations,
		handleSearchConversations,
	} = searchUserConversationsActions

	const isLoading = isLoadingSearchConversations || isLoadingUserConversations

	const isEmptyUserConversations = userConversations.length === 0
	const isEmptySearchUserConversations = searchConversations.length === 0
	const isEmptySearchTermConversations = searchTermConversations.trim() === ''

	const skeletonConversations = Array(5).fill(0).map((_, i) => (
		<ConversationItemSkeleton key={i} />
	))

	const currentConversations = isEmptySearchTermConversations
		? userConversations
		: searchConversations

	const renderItems = () => {
		if (isEmptyUserConversations) {
			return <EmptyInfoBlock text='У вас ещё нет диалогов' />
		}
		if (!isEmptySearchTermConversations && isEmptySearchUserConversations) {
			return <EmptyInfoBlock text='По вашему поиску результатов нет' />
		}

		return currentConversations.map((conversation) => (
			<ConversationItem key={conversation._id} conversation={conversation} />
		))
	}

	return (
		<div className={styles.conversations}>
			<div style={{ padding: '20px' }}>
				<Input placeholder='Поиск диалога...' onChange={handleSearchConversations} value={searchTermConversations} />
			</div>
			{isLoading ? (
				skeletonConversations
			) : (
				renderItems()
			)}

		</div>
	)
}

export default Conversations