import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

import { CommunityService } from '@/services/community/community.service'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import {
	useAllCommunity,
	useIsSubscribed,
} from '@/hooks/useCommunity'

import CommunityEditForm from '../communityForm/CommunityEditForm'
import CommunityRemoveForm from '../communityForm/CommunityRemoveForm'

import Modal from '../../../ui/modal/Modal'
import Button from '../../../ui/button/Button'

import styles from '../../../ui/select/Select.module.scss'


interface Props {
	refetch: () => void,
	isCreator: boolean
}

const CommunityActions: FC<Props> = ({
																			 refetch,
																			 isCreator,
																		 }) => {
	const router = useRouter()
	const communityId = router.query.id as string

	const [isOpenPopup, setIsOpenPopup] = React.useState(false)
	const [editModalIsOpen, setEditIsOpen] = React.useState(false)
	const [removeModalIsOpen, setRemoveIsOpen] = React.useState(false)

	const communityActionRef = React.useRef<HTMLDivElement>(null)

	const { isSubscribed, isSubscribedLoading, isSubscribedRefetch } =
		useIsSubscribed(communityId)
	const { refetch: refetchAllCommunities } = useAllCommunity()

	const { mutateAsync } = useMutation(
		`toggle subscribe community ${communityId}`,
		(id: string) => CommunityService.toggleSubscribe(id),
		{
			onSuccess(data) {
				refetch()
			},
		},
	)

	const toggleSubscribeHandler = async (id: string) => {
		setIsOpenPopup(false)
		await mutateAsync(id)
		await isSubscribedRefetch()
	}

	const buttonTitle = isSubscribed ? 'Отписаться' : 'Подписаться'

	useOutsideClick(communityActionRef, () => setIsOpenPopup(false))

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
					refetch={refetch}
					setIsOpen={setEditIsOpen}
					communityId={communityId}
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
						<li style={{ color: 'indianred' }} onClick={handleRemoveCommunity}>
							Удалить
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default CommunityActions
