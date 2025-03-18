import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { FriendActions } from '@/components/ui/friend-actions/FriendActions'

import { IUser } from '@/types/user.interface'

import styles from '@/assets/styles/screens/Friends.module.scss'

import { ProfileInfo } from '@/components/ui/profile-info/ProfileInfo'


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
						src={process.env.BASE_URL + `${user.avatar}`}
						alt='0-'
					/>
				</Link>
				<ProfileInfo profileId={user._id} userProfile={user} />
			</div>
			<FriendActions friendId={user._id} />
		</div>
	)
}

export default FriendItem
