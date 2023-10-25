import React, { FC } from 'react'

import styles from './Button.module.scss'

const Button: FC<{ children: string; onClick?: any }> = ({
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
