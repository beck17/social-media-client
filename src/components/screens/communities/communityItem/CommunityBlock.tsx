import React, { FC } from 'react'
import Button from '../../../ui/button/Button'

import styles from '../Community.module.scss'
import Link from 'next/link'

const CommunityBlock: FC = () => {
	return (
		<div className={styles.communityBlock}>
			<p>
				Ваши сообщества <span>37</span>
			</p>
			<div className={styles.buttons}>
				<Link href="/all-communities">
					<Button>Все сообщества</Button>
				</Link>
				<Button>Создать сообщество</Button>
			</div>
		</div>
	)
}

export default CommunityBlock
