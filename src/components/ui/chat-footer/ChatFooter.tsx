import React, { FC, useState } from 'react'

import { useAuth } from '@/hooks/user/useAuth'
import { useChat } from '@/hooks/conversations/useChat'

import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'

import { toastError } from '@/lib/toast-utils/toast-error'

import styles from './ChatFooter.module.scss'


interface Props {
	withId: string
	conversationId: string
}

export const ChatFooter: FC<Props> = ({withId, conversationId}) => {
	const { user } = useAuth()

	const { sendMessage } = useChat(conversationId)

	const [message, setMessage] = useState<string>('')

	const sendMessageHandler = () => {
		if (message.trim() === '') {
			toastError('Нельзя отправлять пустое сообщение')
			return null
		}

		sendMessage({
			text: message,
			conversationId,
			userFrom: user._id,
			userTo: withId,
		})

		setMessage('')
	}

	const pressKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			sendMessageHandler()
		}
	}
	return (
		<div className={styles.chatFooter}>
			<Input
				autoFocus
				onKeyDown={pressKeyHandler}
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder='Введите сообщение...'
			/>
			<Button onClick={sendMessageHandler}>Отправить</Button>
		</div>
	)
}