import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useDatePastTime } from '@/hooks/useDate'
import { useAuth } from '@/hooks/useAuth'

import { IConversation } from '@/types/conversation.interface'

import styles from './ConversationItem.module.scss'


interface Props {
	conversation: IConversation
}

const ConversationItem: FC<Props> = ({ conversation }) => {
	const { user } = useAuth()

	const participant = conversation.participants.filter((userInfo) => userInfo._id !== user._id)[0]

	const fullName = participant.firstName + ' ' + participant.lastName
	return (
		<Link href={`/im/${conversation._id}?withId=${participant._id}`} className={styles.conversationItem}>
			<Image width={80} height={80} src={process.env.BASE_URL + `${participant.avatar}`} alt={participant.firstName} />
			<div className={styles.info}>
				<span>{fullName}</span>
				<p>{conversation.lastMessage?.text}</p>
			</div>
			<div className={styles.date}>
				<span>{useDatePastTime(conversation.lastMessageAt)}</span>
			</div>
		</Link>
	)
}

export default ConversationItem
