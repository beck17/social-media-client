import { FC } from 'react'

import FriendItem from './friendItem/FriendItem'
import Input from '../../ui/input/Input'

import styles from '@/assets/styles/screens/Friends.module.scss'
import { useProfile } from '../../../hooks/useProfile'

const Friends: FC = () => {
	const { isLoading, myProfile } = useProfile()

	return (
		<div className={styles.friends}>
			<div className={styles.container}>
				<Input placeholder="Найти друга..." />
				{isLoading ? (
					<p>Тут нужно добавить скелетон!!!</p>
				) : (
					myProfile?.friends?.map((friend) => (
						<FriendItem key={friend._id} user={friend} />
					))
				)}
			</div>
		</div>
	)
}

export default Friends
