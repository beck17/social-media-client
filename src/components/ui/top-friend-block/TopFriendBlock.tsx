import React, { FC } from 'react'

import styles from './TopFriendBlock.module.scss'
import Button from '@/components/ui/button/Button'
import Input from '@/components/ui/input/Input'

interface Props {
	count: number
	section: string
	toggle: () => void
}

const TopFriendBlock: FC<Props> = ({ count, section, toggle }) => {
	const sectionName = section === 'friends' ? 'друзья' : 'подписчики'
	const buttonName = section !== 'friends' ? 'друзья' : 'подписчики'

	return (
		<>
			<div className={styles.friendBlock}>
				<p>
					Ваши {sectionName} <span>{count}</span>
				</p>
				<div className={styles.buttons}>
					<Button onClick={toggle}>Мои {buttonName}</Button>
				</div>
			</div>
			{section === 'friends' && <Input placeholder='Найти друга...' />}
		</>
	)
}

export default TopFriendBlock
