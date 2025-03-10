import React, { FC } from 'react'
import Link from 'next/link'

import CommunityForm from '../../../ui/edit-forms/community-form/CommunityForm'
import Modal from '../../../ui/modal/Modal'
import Button from '../../../ui/button/Button'

import styles from '../CommunityItems.module.scss'


const CommunityBlock: FC<{ count: number }> = ({ count }) => {
	const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)

	return (
		<div className={styles.communityBlock}>
			<Modal modalIsOpen={isOpenModal} setIsOpen={setIsOpenModal}>
				<CommunityForm setIsOpen={setIsOpenModal} />
			</Modal>
			<p>
				Ваши сообщества <span>{count}</span>
			</p>
			<div className={styles.buttons}>
				<Link href="/all-communities">
					<Button>Все сообщества</Button>
				</Link>
				<Button onClick={() => setIsOpenModal(!isOpenModal)}>
					Создать сообщество
				</Button>
			</div>
		</div>
	)
}

export default CommunityBlock
