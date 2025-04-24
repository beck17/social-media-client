import React, { FC } from 'react'
import { useRouter } from 'next/router'

import Messages from '@/components/shared/messages/Messages'
import ChatInfo from '@/components/ui/chat-info/ChatInfo'
import { ChatFooter } from '@/components/ui/chat-footer/ChatFooter'

import styles from '@/assets/styles/screens/Chat.module.scss'


const Chat: FC = () => {
	const router = useRouter()

	const withId = router.query.withId as string
	const conversationId = router.query.id as string

	return (
		<div className={styles.chat}>
			<ChatInfo withId={withId} />
			<Messages conversationId={conversationId} />
			<ChatFooter conversationId={conversationId} withId={withId} />
		</div>
	)
}

export default Chat
