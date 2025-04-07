import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { useOutsideClick } from '@/hooks/utils/useOutsideClick'
import {
	useAllCommunity,
	useIsSubscribed,
} from '@/hooks/communities/useCommunity'
import { useToggleSubscribeCommunity } from '@/hooks/communities/useCommunityActions'

import CommunityEditForm from '../../shared/edit-forms/community-form/CommunityEditForm'
import CommunityRemoveForm from '../../shared/edit-forms/remove-form/CommunityRemoveForm'

import Modal from '@/components/shared/modal/Modal'
import Button from '../button/Button'

import { toastPromise } from '@/lib/toast-utils/toast-promise'

import styles from './Select.module.scss'


interface Props {
	communityName: string
	communityDescription: string
	isCreator: boolean
	refetch: () => void,
}

const CommunityActions: FC<Props> = ({
																			 refetch,
																			 communityName,
																			 communityDescription,
																			 isCreator,
																		 }) => {
	const router = useRouter()
	const communityId = router.query.id as string

	const [isOpenPopup, setIsOpenPopup] = React.useState(false)
	const [editModalIsOpen, setEditIsOpen] = React.useState(false)
	const [removeModalIsOpen, setRemoveIsOpen] = React.useState(false)

	const communityActionRef = React.useRef<HTMLDivElement>(null)

	const { isSubscribed, isSubscribedRefetch } = useIsSubscribed(communityId)
	const { refetch: refetchAllCommunities } = useAllCommunity()
	const { toggleSubscribe } = useToggleSubscribeCommunity(communityId, refetch)

	const buttonTitle = isSubscribed ? 'Отписаться' : 'Подписаться'

	useOutsideClick(communityActionRef, () => setIsOpenPopup(false))

	const toggleSubscribeHandler = async (id: string) => {
		setIsOpenPopup(false)
		await toastPromise(toggleSubscribe(id))
		await isSubscribedRefetch()
	}

	const handleUpdateCommunity = () => {
		setIsOpenPopup(false)
		setEditIsOpen((prev) => !prev)
	}

	const handleRemoveCommunity = () => {
		setIsOpenPopup(false)
		setRemoveIsOpen((prev) => !prev)
	}


	if (!isCreator) {
		return (
			<Button onClick={() => toggleSubscribeHandler(communityId)}>
				{buttonTitle}
			</Button>
		)
	}

	return (
		<div
			className={styles.sort}
			ref={communityActionRef}
			style={{ position: 'relative', top: '-10px' }}
		>
			<Modal modalIsOpen={editModalIsOpen} setIsOpen={setEditIsOpen}>
				<CommunityEditForm
					communityId={communityId}
					communityName={communityName}
					communityDescription={communityDescription}
					setIsOpen={setEditIsOpen}
					refetch={refetch}
				/>
			</Modal>
			<Modal modalIsOpen={removeModalIsOpen} setIsOpen={setRemoveIsOpen}>
				<CommunityRemoveForm
					refetch={refetchAllCommunities}
					setIsOpen={setRemoveIsOpen}
					communityId={communityId}
				/>
			</Modal>
			<div className={styles.sort__label}>
				<span onClick={() => setIsOpenPopup(!isOpenPopup)}>...</span>
			</div>
			{isOpenPopup && (
				<div className={styles.sort__popup}>
					<ul>
						<li onClick={() => toggleSubscribeHandler(communityId)}>
							{buttonTitle}
						</li>
						<li onClick={handleUpdateCommunity}>Редактировать</li>
						<li className={styles.remove} onClick={handleRemoveCommunity}>
							Удалить
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default CommunityActions
