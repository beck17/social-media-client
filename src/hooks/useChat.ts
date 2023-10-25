import { useEffect, useState } from 'react'
import { IConversation, IMessageFields } from '../types/conversation.interface'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'

const SERVER_URL = 'http://localhost:8080'

export const useChat = (conversationId: string) => {
	const [conversation, setConversation] = useState<IConversation>(
		{} as IConversation,
	)

	const [socket, setSocket] = useState<Socket<
		DefaultEventsMap,
		DefaultEventsMap
	> | null>(null)

	useEffect(() => {
		if (!conversationId) return
		const newSocket = io(SERVER_URL, {
			query: { conversationId },
		})

		setSocket(newSocket)

		return () => {
			newSocket.close()
		}
	}, [conversationId, setSocket])

	useEffect(() => {
		if (!socket) return
		socket.emit('message:get', { conversationId })

		socket.on('conversation', (conversation) => {
			setConversation(conversation)
		})

		return () => {
			socket.disconnect()
		}
	}, [conversationId, socket])

	const sendMessage = (body: IMessageFields) => {
		socket?.emit('message:add', body)
	}

	return { conversation, sendMessage }
}
