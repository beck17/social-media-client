import React, { FC } from 'react'

import Button from '../../button/Button'

import { useMutation } from 'react-query'
import { PostService } from '../../../../services/post/post.service'
import styles from '../remove-form/RemoveForm.module.scss'
import { CommunityPostService } from '../../../../services/community-post/community-post.service'

const RemoveForm: FC<{ refetch: any; postId: string; setIsOpen: any }> = ({
	refetch,
	postId,
	setIsOpen,
}) => {
	const { mutateAsync: mutateDelete } = useMutation(
		'delete post',
		(postId: string) => CommunityPostService.deleteCommunityPost(postId),
		{
			onSuccess(data) {
				refetch()
			},
		},
	)

	const deletePostHandler = async (postId) => {
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
