import React, { FC } from 'react'

import styles from './Messages.module.scss'
import { useRouter } from 'next/router'
import { useChat } from '../../../../hooks/useChat'
import Message from '../message/Message'

const Messages: FC = () => {
	const router = useRouter()
	const conversationId = router.query.id

	const { conversation } = useChat(String(conversationId))

	return (
		<div className={styles.messages}>
			{conversation !== {} ? (
				conversation?.messages?.map((message) => (
					<Message key={message._id} message={message} />
				))
			) : (
				<p>Подождите идёт загрузка</p>
			)}
		</div>
	)
}

export default Messages
