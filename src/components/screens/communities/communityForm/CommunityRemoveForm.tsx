import React, { FC } from 'react'
import { useMutation } from 'react-query'
import styles from '../../../ui/edit-forms/remove-form/RemoveForm.module.scss'
import Button from '../../../ui/button/Button'
import { CommunityService } from '../../../../services/community/community.service'
import { useRouter } from 'next/router'

const CommunityRemoveForm: FC<{
	communityId: string
	setIsOpen: any
	refetch: any
}> = ({ communityId, setIsOpen, refetch }) => {
	const router = useRouter()

	const { mutateAsync } = useMutation(
		'delete community',
		(communityId: string) => CommunityService.removeCommunity(communityId),
		{
			onSuccess(data) {
				refetch()
				router.push('/my-communities')
			},
		},
	)

	const deletePostHandler = async (communityId) => {
		await mutateAsync(communityId)
	}

	return (
		<div className={styles.formEdit}>
			<div className={styles.removeForm}>
				<h2>Вы точно хотите удалить это сообщество?</h2>
				<div className={styles.buttons}>
					<Button onClick={() => deletePostHandler(communityId)}>Да</Button>
					<Button onClick={() => setIsOpen((prev) => !prev)}>Нет</Button>
				</div>
			</div>
		</div>
	)
}

export default CommunityRemoveForm
