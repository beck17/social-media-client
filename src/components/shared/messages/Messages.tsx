import React, { FC, useRef } from 'react'

import { useChat } from '@/hooks/conversations/useChat'

import Message from '@/components/ui/message/Message'

import styles from './Messages.module.scss'


interface Props {
	conversationId: string
}

const Messages: FC<Props> = ({ conversationId }) => {
	const scrollBottomRef = useRef<HTMLDivElement>(null)

	const { conversation } = useChat(conversationId)

	const scrollToBottom = () => {
		scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
	}

	React.useEffect(() => {
		scrollToBottom()
	}, [conversation.messages])

	return (
		<div className={styles.messages}>
			{conversation.messages?.length ? (
				conversation.messages.map((message) => (
					<Message key={message._id} message={message} />
				))
			) : (
				<p>Подождите идёт загрузка</p>
			)}
			<div ref={scrollBottomRef} />
		</div>
	)
}

export default Messages
