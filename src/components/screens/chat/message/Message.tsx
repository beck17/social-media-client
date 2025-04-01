import React, { FC } from 'react'
import cn from 'clsx'
import Image from 'next/image'

import { useAuth } from '@/hooks/useAuth'
import { useDateTime } from '@/hooks/useDate'

import { IMessage } from '@/types/conversation.interface'

import photo from '@/assets/img/trash.svg'
import styles from './Message.module.scss'


const Message: FC<{ message: IMessage }> = ({ message }) => {
	const { user } = useAuth()
	const img = false
	return (
		<div
			className={cn({
				[styles.message]: true,
				[styles.owner]: message.userFrom._id === user._id,
			})}
		>
			<div className={styles.messageInfo}>
				<Image
					src={process.env.BASE_URL + `${message.userFrom.avatar}`}
					alt='photo'
					width={400}
					height={400}
				/>
				<span>{useDateTime(message.createdAt)}</span>
			</div>
			<div className={styles.messageContent}>
				<p>{message.text}</p>
				{img && <Image src={photo} alt='photo' />}
			</div>
		</div>
	)
}

export default Message
