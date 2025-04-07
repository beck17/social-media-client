import { FC } from 'react'

import styles from './EmptyInfoBlock.module.scss'
import cn from 'clsx'

interface Props {
	text: string
	smallSize?: boolean
}

export const EmptyInfoBlock: FC<Props> = ({ text, smallSize }) => {

	return (
		<div className={cn(smallSize ? styles.smallBlock : styles.normalBlock, styles.block)}>
			<span>{text}</span>
		</div>
	)
}