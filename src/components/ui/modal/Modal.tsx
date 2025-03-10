import React, { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import cn from 'clsx'

import styles from './Modal.module.scss'


interface Props {
	modalIsOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

const ModalEdit: FC<PropsWithChildren<Props>> = ({
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
