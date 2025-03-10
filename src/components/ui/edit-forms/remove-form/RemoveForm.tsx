import React, { Dispatch, FC, SetStateAction } from 'react'
import { useMutation } from 'react-query'

import { PostService } from '@/services/post/post.service'

import Button from '../../button/Button'

import styles from './RemoveForm.module.scss'


interface Props {
	postId: string
	refetch: () => void
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

const RemoveForm: FC<Props> = ({
																 refetch,
																 postId,
																 setIsOpen,
															 }) => {
	const { mutateAsync: mutateDelete } = useMutation(
		`delete post ${postId}`,
		(postId: string) => PostService.deletePost(postId),
		{
			onSuccess(data) {
				refetch()
			},
		},
	)

	const deletePostHandler = async (postId: string) => {
		await mutateDelete(postId)
	}

	return (
		<div className={styles.formEdit}>
			<div className={styles.removeForm}>
				<h2>Вы точно хотите удалить этот пост?</h2>
				<div className={styles.buttons}>
					<Button onClick={() => deletePostHandler(postId)}>Да</Button>
					<Button onClick={() => setIsOpen((prev) => !prev)}>Нет</Button>
				</div>
			</div>
		</div>
	)
}

export default RemoveForm
