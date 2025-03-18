import { FC } from 'react'

import styles from './EmptyUsersBlock.module.scss'

interface Props {
	text: string
}

export const EmptyUsersBlock: FC<Props> = ({text}) => {

	return (
		<div className={styles.block}>
			<span>{text}</span>
		</div>
	)
}