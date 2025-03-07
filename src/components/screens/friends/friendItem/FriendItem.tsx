import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { FriendActions } from '@/components/screens/friends/friend-actions/FriendActions'

import { IUser } from '@/types/user.interface'

import styles from '@/assets/styles/screens/Friends.module.scss'
import home from '@/assets/img/home.svg'
import cake from '@/assets/img/cake.svg'
import { InfoBlock } from '@/components/ui/info/city-info/InfoBlock'


interface Props {
	user: IUser
}

const FriendItem: FC<Props> = ({ user }) => {
	return (
		<div className={styles.item}>
			<div className={styles.friend}>
				<Link href={`/profile/${user._id}`}>
					<Image
						className={styles.userImg}
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
					{user.city && <InfoBlock src={home} text={user.city} />}
					{user.birthday && <InfoBlock src={cake} text={user.birthday} />}
				</div>
			</div>
			<FriendActions friendId={user._id} />
		</div>

	)
}

export default FriendItem
