import React, { FC, useRef } from 'react'
import { useRouter } from 'next/router'

import { useChat } from '@/hooks/useChat'

import Message from '../message/Message'

import styles from './Messages.module.scss'


const Messages: FC = () => {
	const router = useRouter()
	const conversationId = router.query.id as string

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
			{conversation.messages && {} ? (
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
