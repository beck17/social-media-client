import React, { FC, useRef } from 'react'

import { useChat } from '@/hooks/conversations/useChat'

import Message from '@/components/ui/message/Message'

import { groupMessageByDay } from '@/lib/utils/group-message-by-day'

import styles from './Messages.module.scss'


interface Props {
	conversationId: string
}

const Messages: FC<Props> = ({ conversationId }) => {
	const scrollBottomRef = useRef<HTMLDivElement>(null)

	const { conversation } = useChat(conversationId)

	const groupMessage = groupMessageByDay(conversation.messages)


	const scrollToBottom = () => {
		scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
	}

	React.useEffect(() => {
		scrollToBottom()
	}, [conversation.messages])

	return (
		<div className={styles.messages}>
			{groupMessage?.length ? (
				groupMessage.map((group) => (
					<>
						<div className={styles.dateLabelWrapper}>
							<div className={styles.dateLabel} key={group.date}>{group.date}</div>
						</div>
						{group.messages.map((message) => (
							<Message key={message._id} message={message} />
						))}
					</>
				))
			) : (
				<p>Подождите идёт загрузка</p>
			)}
			<div ref={scrollBottomRef} />
		</div>
	)
}

export default Messages
