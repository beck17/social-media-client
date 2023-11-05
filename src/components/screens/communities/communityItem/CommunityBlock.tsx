import React, { FC } from 'react'
import Button from '../../../ui/button/Button'

import styles from '../CommunityItems.module.scss'
import Link from 'next/link'
import Modal from '../../../ui/modal/Modal'
import CommunityForm from '../../../ui/edit-forms/community-form/CommunityForm'

const CommunityBlock: FC<{ count: number }> = ({ count }) => {
	const [isOpenModal, setIsOpenModal] = React.useState(false)

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
