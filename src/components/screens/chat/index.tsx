import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'

import { useChat } from '@/hooks/useChat'
import { useAuth } from '@/hooks/useAuth'
import { useUserProfile } from '@/hooks/useProfile'

import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'

import ChatInfo from './chatInfo/ChatInfo'
import Messages from './messages/Messages'

import styles from '@/assets/styles/screens/Chat.module.scss'


const Chat: FC = () => {
	const [message, setMessage] = useState<string>('')

	const router = useRouter()
	const id = router.query.id as string
	const withId = router.query.withId as string

	const { userProfile } = useUserProfile(withId)

	const { user } = useAuth()

	const { sendMessage } = useChat(String(id))

	const addMessageHandler = () => {
		sendMessage({
			text: message,
			conversationId: String(id),
			userFrom: String(user?._id),
			userTo: String(userProfile?._id),
		})
		setMessage('')
	}

	const pressKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			addMessageHandler()
		}
	}

	return (
		<div className={styles.chat}>
			<div className={styles.container}>
				<ChatInfo />
				<Messages />
				<div style={{ display: 'flex', gap: '10px' }}>
					<Input
						autoFocus
						onKeyDown={pressKeyHandler}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder='Введите сообщение...'
					/>
					<Button onClick={addMessageHandler}>Отправить</Button>
				</div>
			</div>
		</div>
	)
}

export default Chat
