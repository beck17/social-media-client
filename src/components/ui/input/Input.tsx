import { forwardRef } from 'react'

import { IInput } from '@/types/input.interface'

import styles from './Input.module.scss'


const Input = forwardRef<HTMLInputElement, IInput>(
	({ placeholder, error, type = 'text', ...rest }, ref) => {
		return (
			<>
				<input
					ref={ref}
					className={styles.input}
					type={type}
					placeholder={placeholder}
					{...rest}
				/>
				{error && <div>{error}</div>}
			</>
		)
	},
)

Input.displayName = 'Input'

export default Input
