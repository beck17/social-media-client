import React, { FC } from 'react'

import CommunityForm from '../../../ui/edit-forms/community-form/CommunityForm'
import Modal from '../../../ui/modal/Modal'
import Button from '../../../ui/button/Button'

import { CommunitySectionState } from '@/hooks/useSwitchSections'

import styles from '../CommunityItems.module.scss'


interface Props {
	section: string
	count: number
	toggle: () => void
}

const CommunityBlock: FC<Props> = ({ section, count, toggle }) => {
	const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)

	const isMyCommunities = section === CommunitySectionState.myCommunities

	const sectionName = isMyCommunities ? 'Мои сообщества' : 'Все сообщества'
	const buttonText = isMyCommunities ? 'Все сообщества' : 'Мои сообщества'

	return (
		<div className={styles.communityBlock}>
			<Modal modalIsOpen={isOpenModal} setIsOpen={setIsOpenModal}>
				<CommunityForm setIsOpen={setIsOpenModal} />
			</Modal>
			<p>
				{sectionName} <span>{count}</span>
			</p>
			<div className={styles.buttons}>
				<Button onClick={toggle}>{buttonText}</Button>
				<Button onClick={() => setIsOpenModal(!isOpenModal)}>
					Создать сообщество
				</Button>
			</div>
		</div>
	)
}

export default CommunityBlock
