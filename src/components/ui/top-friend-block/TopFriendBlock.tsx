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
	const isFriendSection = section === 'friends'

	const sectionName = isFriendSection ? 'друзья' : 'подписчики'
	const inputText = isFriendSection ? 'Найти друга...' : 'Найти подписчика...'


	return (
		<>
			<div className={styles.friendBlock}>
				<p>
					Ваши {sectionName} <span>{count}</span>
				</p>
				<div className={styles.buttons}>
					<Button onClick={toggle}>Мои {sectionName}</Button>
				</div>
			</div>
			<Input placeholder={inputText} />
		</>
	)
}

export default TopFriendBlock
