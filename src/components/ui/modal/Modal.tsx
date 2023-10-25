import React, { FC } from 'react'
import cn from 'clsx'

// import Input from '../input/Input'
// import Button from '../button/Button'
import styles from './Modal.module.scss'

const ModalEdit: FC<{ modalIsOpen: any; setIsOpen: any; children: any }> = ({
	modalIsOpen,
	setIsOpen,
	children,
}) => {
	return (
		<div
			className={cn(styles.modal, modalIsOpen && styles.active)}
			onClick={() => setIsOpen((prev) => !prev)}
		>
			<div className={styles.content} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

export default ModalEdit
