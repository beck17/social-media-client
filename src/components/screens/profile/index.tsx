import Image from 'next/image'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

import { UserService } from '../../../services/user.service'

import { useUserProfile } from '../../../hooks/useProfile'
import { useUserPost } from '../../../hooks/usePost'
import { useIsFriend } from '../../../hooks/useFriend'

import Button from '../../ui/button/Button'
import Post from '../../ui/post/Post'

import home from '@/assets/img/home.svg'

import styles from '@/assets/styles/screens/Profile.module.scss'
import { ConversationService } from '../../../services/messanger/conversation.service'

const Profile: FC = () => {
	const router = useRouter()
	const { id } = router.query

	const {
		isLoading: isLoadingProfile,
		userProfile,
		refetchUserProfile,
	} = useUserProfile(id)
	const { posts, isLoading: isLoadingPosts, refetch } = useUserPost(id)
	const { isFriend, isFriendRefetch } = useIsFriend(id)

	const { mutateAsync: add } = useMutation(
		`add tot friend ${id}`,
		(id: string) => UserService.addToFriends(id),
		{
			onSuccess(data) {
				isFriendRefetch()
			},
		},
	)

	const { mutateAsync: remove } = useMutation(
		`remove from friends ${id}`,
		(id: string) => UserService.removeFromFriends(id),
		{
			onSuccess(data) {
				isFriendRefetch()
			},
		},
	)

	const { mutateAsync: createConversation } = useMutation(
		`create conversation with ${id}`,
		(id: string) => ConversationService.createConversation(id),
		{
			async onSuccess({ data }) {
				await router.push(`/im/${data?._id}?withId=${id}`)
			},
		},
	)

	const addToFriendsHandler = async (id) => {
		await add(id)
	}

	const removeFromFriendsHandler = async (id) => {
		await remove(id)
	}

	const createConversationHandler = async (id) => {
		await createConversation(id)
	}

	return (
		<div className={styles.profile}>
			<div className={styles.images}>
				<Image
					className={styles.cover}
					src={
						isLoadingProfile
							? 'http://localhost:5000/uploads/default/background.jpg'
							: `http://localhost:5000${userProfile?.backgroundPic}`
					}
					alt="2"
					width={0}
					height={0}
					sizes="100vw 100vh"
					priority
				/>

				<Image
					width={0}
					height={0}
					sizes="100vw 100vh"
					src={
						isLoadingProfile
							? 'http://localhost:5000/uploads/default/no-avatar.jpg'
							: `http://localhost:5000${userProfile?.avatar}`
					}
					alt="1"
					className={styles.profilePic}
				/>
			</div>
			<div className={styles.profileContainer}>
				<div className={styles.uInfo}>
					<div className={styles.center}>
						<span>
							{isLoadingProfile
								? 'SKELETON'
								: `${userProfile?.firstName} ${userProfile?.lastName}`}
						</span>
						<div className={styles.info}>
							<div className={styles.item}>
								<Image src={home} alt="home" width={20} height={20} />
								<span>
									{isLoadingProfile
										? 'SKELETON'
										: userProfile?.city
										? userProfile.city
										: 'не указан'}
								</span>
							</div>
						</div>
						<div className={styles.buttons}>
							<Button onClick={() => createConversationHandler(id)}>
								Написать
							</Button>
							{isFriend ? (
								<Button onClick={() => removeFromFriendsHandler(id)}>
									Удалить из друзей
								</Button>
							) : (
								<Button onClick={() => addToFriendsHandler(id)}>
									Добавить в друзья
								</Button>
							)}
						</div>
					</div>
				</div>
				{posts?.map((post) => (
					<Post post={post} key={post._id} />
				))}
			</div>
		</div>
	)
}

export default Profile
