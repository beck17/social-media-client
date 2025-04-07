import { useEffect, useState } from 'react'
import { IConversation, IMessageFields } from '@/types/conversation.interface'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'


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

		const newSocket = io(process.env.WEBSOCKET_URL as string, {
			query: { conversationId },
		})

		setSocket(newSocket)

		newSocket.emit('join-conversation', conversationId);

		return () => {
			newSocket.emit('leave-conversation', conversationId);
			newSocket.close()
		}
	}, [conversationId, setSocket])


	useEffect(() => {
		if (!socket) return

		socket.emit('message:get', { conversationId })

		socket.on(`conversation:${conversationId}`, (conversation) => {
			setConversation(conversation);
		});

		return () => {
			socket.off(`conversation:${conversationId}`);
			socket.disconnect()
		}
	}, [conversationId, socket])

	const sendMessage = (body: IMessageFields) => {
		socket?.emit('message:add', body)
	}

	return { conversation, sendMessage }
}
