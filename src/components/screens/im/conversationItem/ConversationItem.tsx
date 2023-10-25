import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import photo from '@/assets/img/trash.svg'

import styles from './ConversationItem.module.scss'

const ConversationItem: FC = () => {
	return (
		<Link href="/im/1" className={styles.conversationItem}>
			<Image src={photo} alt="11" />
			<div className={styles.info}>
				<span>Одинцов Богдан</span>
				<p>Какое-то сообщение...</p>
			</div>
			<div className={styles.date}>
				<span>23:00 am</span>
			</div>
		</Link>
	)
}

export default ConversationItem
