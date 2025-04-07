import React, { Dispatch, FC, SetStateAction } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

import { CommunityService } from '@/services/community/community.service'

import Button from '../../../ui/button/Button'

import styles from '@/shared/edit-forms/remove-form/RemoveForm.module.scss'


interface Props {
	communityId: string
	setIsOpen: Dispatch<SetStateAction<boolean>>
	refetch: () => void
}

const CommunityRemoveForm: FC<Props> = ({ communityId, setIsOpen, refetch }) => {
	const router = useRouter()

	const { mutateAsync } = useMutation(
		'delete community',
		(communityId: string) => CommunityService.removeCommunity(communityId),
		{
			onSuccess() {
				refetch()
			},
		},
	)

	const deletePostHandler = async (communityId: string) => {
		await mutateAsync(communityId)
		await router.push('/communities')
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
