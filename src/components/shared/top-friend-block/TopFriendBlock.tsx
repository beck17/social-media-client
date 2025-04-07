import React, { FC } from 'react'

import { FriendsSectionState } from '@/hooks/utils/useSwitchSections'

import Button from '@/components/ui/button/Button'

import styles from './TopFriendBlock.module.scss'


interface Props {
	count: number
	section: FriendsSectionState
	toggle: () => void
}

const TopFriendBlock: FC<Props> = ({ count, section, toggle }) => {
	const sectionText = {
		[FriendsSectionState.friends]: {
			sectionName: 'Мои друзья',
			buttonText: 'Мои подписчики',
		},
		[FriendsSectionState.subscribers]: {
			sectionName: 'Мои подписчики',
			buttonText: 'Мои друзья',
		},
	}

	const currentText = sectionText[section]
	return (
		<>
			<div className={styles.friendBlock}>
				<p>
					{currentText.sectionName} <span>{count}</span>
				</p>
				<div className={styles.buttons}>
					<Button onClick={toggle}>{currentText.buttonText}</Button>
				</div>
			</div>
		</>
	)
}

export default TopFriendBlock
