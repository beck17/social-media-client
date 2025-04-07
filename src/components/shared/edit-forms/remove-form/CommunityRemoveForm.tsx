import React, { Dispatch, FC, SetStateAction } from 'react'
import { useRouter } from 'next/router'

import { useDeleteCommunity } from '@/hooks/communities/useCommunityActions'
import { toastPromise } from '@/lib/toast-utils/toast-promise'

import Button from '../../../ui/button/Button'

import styles from '../RemoveForm.module.scss'


interface Props {
	communityId: string
	setIsOpen: Dispatch<SetStateAction<boolean>>
	refetch: () => void
}

const CommunityRemoveForm: FC<Props> = ({ communityId, setIsOpen, refetch }) => {
	const router = useRouter()

	const { deleteCommunity } = useDeleteCommunity(communityId, refetch)

	const deleteCommunityHandler = async () => {
		await toastPromise(deleteCommunity())
		await router.push('/communities')
	}

	return (
		<div className={styles.formEdit}>
			<div className={styles.removeForm}>
				<h2>Вы точно хотите удалить это сообщество?</h2>
				<div className={styles.buttons}>
					<Button onClick={deleteCommunityHandler}>Да</Button>
					<Button onClick={() => setIsOpen((prev) => !prev)}>Нет</Button>
				</div>
			</div>
		</div>
	)
}

export default CommunityRemoveForm
