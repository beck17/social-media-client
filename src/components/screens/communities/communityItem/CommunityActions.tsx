import React, { FC } from 'react'
import styles from '../../../ui/select/Select.module.scss'
import Modal from '../../../ui/modal/Modal'
import CommunityPostForm from '../../../ui/edit-forms/communityPost-form/CommunityPostForm'
import CommunityPostRemoveForm from '../../../ui/edit-forms/communityPost-form/CommunityPostRemoveForm'
import CommunityEditForm from '../communityForm/CommunityEditForm'
import CommunityRemoveForm from '../communityForm/CommunityRemoveForm'
import {
	useAllCommunity,
	useIsSubscribed,
} from '../../../../hooks/useCommunity'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { CommunityService } from '../../../../services/community/community.service'

const CommunityActions: FC<{
	communityId: string
	refetch: any
	isCreator: boolean
}> = ({ communityId, refetch, isCreator }) => {
	const [isOpenPopup, setIsOpenPopup] = React.useState(false)
	const [editModalIsOpen, setEditIsOpen] = React.useState(false)
	const [removeModalIsOpen, setRemoveIsOpen] = React.useState(false)

	const communityActionRef = React.useRef()

	const { query } = useRouter()

	const { isSubscribed, isSubscribedLoading, isSubscribedRefetch } =
		useIsSubscribed(query.id)
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

	const toggleSubscribeHandler = async (id) => {
		setIsOpenPopup(false)
		await mutateAsync(id)
		await isSubscribedRefetch()
	}

	const buttonTitle = isSubscribed ? 'Отписаться' : 'Подписаться'

	const handleOutsideClick = (event) => {
		const path = event.path || (event.composedPath && event.composedPath())
		if (!path.includes(communityActionRef.current)) {
			setIsOpenPopup(false)
		}
	}

	const handleUpdateCommunity = () => {
		setIsOpenPopup(false)
		setEditIsOpen((prev) => !prev)
	}

	const handleRemoveCommunity = () => {
		setIsOpenPopup(false)
		setRemoveIsOpen((prev) => !prev)
	}

	React.useEffect(() => {
		document.body.addEventListener('click', handleOutsideClick)
	}, [])

	return (
		<div className={styles.sort} ref={communityActionRef}>
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
						{isCreator && (
							<>
								<li onClick={handleUpdateCommunity}>Редактировать</li>
								<li
									style={{ color: 'indianred' }}
									onClick={handleRemoveCommunity}
								>
									Удалить
								</li>
							</>
						)}
					</ul>
				</div>
			)}
		</div>
	)
}

export default CommunityActions
