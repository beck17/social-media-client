import React, { FC } from 'react'
import styles from '../../../ui/select/Select.module.scss'

const CommunityActions: FC = () => {
	const [isOpenPopup, setIsOpenPopup] = React.useState(false)
	const communityActionRef = React.useRef()
	return (
		<div className={styles.sort} ref={communityActionRef}>
			<div className={styles.sort__label}>
				<span onClick={() => setIsOpenPopup(!isOpenPopup)}>...</span>
			</div>
			{isOpenPopup && (
				<div className={styles.sort__popup}>
					<ul>
						<li onClick={() => setIsOpenPopup(!isOpenPopup)}>Отписаться</li>
						<li onClick={() => setIsOpenPopup(!isOpenPopup)}>Что-то ещё</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default CommunityActions
