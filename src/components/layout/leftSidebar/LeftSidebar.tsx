import React, { FC } from 'react'

import { MenuItem } from '@/components/ui/menu-item/MenuItem'
import { menuItems } from '@/constants/menu-items'

import styles from './LeftSidebar.module.scss'


const LeftSidebar: FC = () => {

	return (
		<div className={styles.sidebar}>
			<div className={styles.container}>
				{menuItems.map((menuItem) => (
					<MenuItem
						key={menuItem.id}
						value={menuItem.value}
						href={menuItem.href}
						image={menuItem.image}
					/>
				))}

			</div>
		</div>
	)
}

export default LeftSidebar
