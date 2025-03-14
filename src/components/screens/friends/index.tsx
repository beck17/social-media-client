import { FC } from 'react'

import { useProfile } from '@/hooks/useProfile'

import FriendItem from '@/components/ui/friendItem/FriendItem'
import Input from '../../ui/input/Input'

import styles from '@/assets/styles/screens/Friends.module.scss'


const Friends: FC = () => {
	const { myProfile } = useProfile()

	return (
		<div className={styles.friends}>
			<div className={styles.container}>
				<Input placeholder='Найти друга...' />
				{myProfile?.friends && myProfile.friends.map((friend) => (
					<FriendItem key={friend._id} user={friend} />
				))}
			</div>
		</div>
	)
}

export default Friends
