import { FC } from 'react'

import styles from './EmptyInfoBlock.module.scss'

interface Props {
	text: string
}

export const EmptyInfoBlock: FC<Props> = ({text}) => {

	return (
		<div className={styles.block}>
			<span>{text}</span>
		</div>
	)
}