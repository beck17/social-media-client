import React, { FC } from 'react'

import styles from './TopFriendBlock.module.scss'
import Button from '@/components/ui/button/Button'
import Input from '@/components/ui/input/Input'
import { FriendsSectionState } from '@/hooks/useSwitchSections'

interface Props {
	count: number
	section: string
	toggle: () => void
}

const TopFriendBlock: FC<Props> = ({ count, section, toggle }) => {
	const isFriendSection = section === FriendsSectionState.friends

	const sectionName = isFriendSection ? 'Мои друзья' : 'Мои подписчики'
	const buttonText = isFriendSection ? 'Мои подписчики' : 'Мои друзья'
	const inputText = isFriendSection ? 'Найти друга...' : 'Найти подписчика...'

	return (
		<>
			<div className={styles.friendBlock}>
				<p>
					{sectionName} <span>{count}</span>
				</p>
				<div className={styles.buttons}>
					<Button onClick={toggle}>{buttonText}</Button>
				</div>
			</div>
			<Input placeholder={inputText} />
		</>
	)
}

export default TopFriendBlock
