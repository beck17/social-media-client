import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useCreateConversation } from '@/hooks/useCreateConversation'

import Button from '../../../ui/button/Button'

import { IUser } from '@/types/user.interface'

import styles from '@/assets/styles/screens/Friends.module.scss'
import { getActionsButton } from '@/components/ui/button/ActionsButton'


const FriendItem: FC<{ user: IUser }> = ({ user }) => {
	const createConversationHandler = useCreateConversation(user._id)

	return (
		<div className={styles.item}>
			<Link href={`/profile/${user._id}`}>
				<Image
					width={1000}
					height={1000}
					src={`http://localhost:5000${user.avatar}`}
					alt='0-'
				/>
			</Link>
			<div className={styles.info}>
				<Link href={`/profile/${user._id}`}>
					<span>{user.firstName} {user.lastName} </span>
				</Link>
				<div className={styles.buttons}>
					<Button onClick={() => createConversationHandler(user._id)}>
						Написать
					</Button>
					{getActionsButton(user._id)}
				</div>
			</div>
		</div>
	)
}

export default FriendItem
