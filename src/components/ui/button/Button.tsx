import React, { FC, PropsWithChildren } from 'react'

import styles from './Button.module.scss'


interface Props {
	onClick?: () => void
}

const Button: FC<PropsWithChildren<Props>> = ({
																								children,
																								onClick,
																							}) => {
	return (
		<button onClick={onClick} className={styles.button}>
			{children}
		</button>
	)
}

export default Button
