import React, { Dispatch, FC, SetStateAction } from 'react'

import { useRemoveComment } from '@/hooks/posts/useComment'

import Button from '../../../ui/button/Button'

import styles from '../RemoveForm.module.scss'


interface Props {
	commentId: string
	refetch: () => void
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const RemoveCommentForm: FC<Props> = ({
																							 refetch,
																							 commentId,
																							 setIsOpen,
																						 }) => {

	const { removeCommentHandler } = useRemoveComment(commentId, refetch)

	return (
		<div className={styles.formEdit}>
			<div className={styles.removeForm}>
				<h2>Вы точно хотите удалить этот комментарий?</h2>
				<div className={styles.buttons}>
					<Button onClick={() => removeCommentHandler(commentId)}>Да</Button>
					<Button onClick={() => setIsOpen((prev) => !prev)}>Нет</Button>
				</div>
			</div>
		</div>
	)
}
