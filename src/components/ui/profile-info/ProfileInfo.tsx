import styles from '@/assets/styles/screens/Profile.module.scss'
import Image from 'next/image'
import home from '@/assets/img/home.svg'
import Button from '@/components/ui/button/Button'
import { useCreateConversation } from '@/hooks/useCreateConversation'
import { IUser } from '@/types/user.interface'
import { getFriendAction } from '@/lib/get-friend-action'

interface Props {
	profileId: string
	userProfile: IUser | undefined
	isLoading: boolean
}

export const ProfileInfo: React.FC<Props> = ({ profileId, userProfile, isLoading }) => {
	const createConversationHandler = useCreateConversation(profileId)
	const {text, actionHandler} = getFriendAction(profileId)

	const userFullName = isLoading
		? 'SKELETON'
		: `${userProfile?.firstName} ${userProfile?.lastName}`

	const userCity = isLoading
		? 'SKELETON'
		: userProfile?.city
			? userProfile.city
			: 'не указан'

	return (
		<div className={styles.uInfo}>
			<div className={styles.center}>
						<span>
							{userFullName}
						</span>
				<div className={styles.info}>
					<div className={styles.item}>
						<Image src={home} alt='home' width={16} height={16} />
						<span>
							{userCity}
						</span>
					</div>
				</div>
				<div className={styles.buttons}>
					<Button onClick={() => createConversationHandler(profileId)}>
						Написать
					</Button>
					<Button onClick={actionHandler}>
						{text}
					</Button>
				</div>
			</div>
		</div>
	)
}