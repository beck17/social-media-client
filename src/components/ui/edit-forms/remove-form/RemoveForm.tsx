import React, { Dispatch, FC, SetStateAction } from 'react'

import Button from '../../button/Button'

import styles from './RemoveForm.module.scss'


interface Props {
	postId: string
	setIsOpen: Dispatch<SetStateAction<boolean>>
	removePost: (postId: string) => Promise<void>
}

const RemoveForm: FC<Props> = ({
																 postId,
																 setIsOpen,
																 removePost,
															 }) => {
	const deletePostHandler = async () => {
		await removePost(postId)
	}

	return (
		<div className={styles.formEdit}>
			<div className={styles.removeForm}>
				<h2>Вы точно хотите удалить этот пост?</h2>
				<div className={styles.buttons}>
					<Button onClick={deletePostHandler}>Да</Button>
					<Button onClick={() => setIsOpen((prev) => !prev)}>Нет</Button>
				</div>
			</div>
		</div>
	)
}

export default RemoveForm
