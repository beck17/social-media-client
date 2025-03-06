import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { FriendActions } from '@/components/screens/friends/friend-actions/FriendActions'

import { IUser } from '@/types/user.interface'

import styles from '@/assets/styles/screens/Friends.module.scss'


interface Props {
	user: IUser
}

const FriendItem: FC<Props> = ({ user }) => {

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
				<FriendActions friendId={user._id} />
			</div>
		</div>
	)
}

export default FriendItem
