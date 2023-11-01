import React, { FC } from 'react'
import Button from '../../../ui/button/Button'

import styles from '../Community.module.scss'

const CommunityBlock: FC = () => {
	return (
		<div className={styles.communityBlock}>
			<p>
				Ваши сообщества <span>37</span>
			</p>
			<div className={styles.buttons}>
				<Button>Все сообщества</Button>
				<Button>Создать сообщество</Button>
			</div>
		</div>
	)
}

export default CommunityBlock
