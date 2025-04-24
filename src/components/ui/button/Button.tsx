import React, { FC, PropsWithChildren } from 'react'
import cn from 'clsx'

import styles from './Button.module.scss'


interface Props {
	className?: string
	onClick?: () => void
}

const Button: FC<PropsWithChildren<Props>> = ({
																								children,
																								onClick,
																								className,
																							}) => {
	return (
		<button onClick={onClick} className={cn(styles.button, className)}>
			{children}
		</button>
	)
}

export default Button
