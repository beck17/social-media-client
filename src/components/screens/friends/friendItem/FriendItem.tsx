import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Button from '../../../ui/button/Button'

import styles from '@/assets/styles/screens/Friends.module.scss'
import { IUser } from '../../../../types/user.interface'
import { useMutation } from 'react-query'
import { ConversationService } from '../../../../services/messanger/conversation.service'
import { useRouter } from 'next/router'

const FriendItem: FC<{ user: IUser }> = ({ user }) => {
	const router = useRouter()

	const { mutateAsync: createConversation } = useMutation(
		`create conversation with ${user._id}`,
		(id: string) => ConversationService.createConversation(id),
		{
			async onSuccess({ data }) {
				await router.push(`/im/${data?._id}?withId=${user._id}`)
			},
		},
	)

	const createConversationHandler = async (id) => {
		await createConversation(id)
	}

	return (
		<div className={styles.item}>
			<Link href={`/profile/${user._id}`}>
				<Image
					width={1000}
					height={1000}
					src={`http://localhost:5000${user.avatar}`}
					alt="0-"
				/>
			</Link>
			<div className={styles.info}>
				<Link href={`/profile/${user._id}`}>
					<span>{`${user.firstName} ${user.lastName}`} </span>
				</Link>
				<Button onClick={() => createConversationHandler(user._id)}>
					Написать
				</Button>
			</div>
		</div>
	)
}

export default FriendItem
