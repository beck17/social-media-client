import Image from 'next/image'
import React, { FC } from 'react'
import home from '@/assets/img/home.svg'

import styles from '@/assets/styles/screens/Profile.module.scss'
import { useProfile } from '../../../hooks/useProfile'
import { useUserPost } from '../../../hooks/usePost'
import Post from '../../ui/post/Post'
import SubmitPost from '../feed/submitPost/SubmitPost'
import { useAuth } from '../../../hooks/useAuth'
import Button from '../../ui/button/Button'
import ModalEdit from '../../ui/modal/Modal'
import ProfileForm from '../../ui/edit-forms/profile-form/ProfileForm'

const MyProfile: FC = () => {
	const [modalIsOpen, setIsOpen] = React.useState(false)
	const { user } = useAuth()

	const {
		myProfile,
		isLoading: isLoadingProfile,
		refetch: refetchProfile,
	} = useProfile()
	const {
		posts,
		isLoading: isLoadingPosts,
		refetch: refetchPosts,
	} = useUserPost(user._id)

	return (
		<div className={styles.profile}>
			<ModalEdit modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
				<ProfileForm refetch={refetchProfile} setIsOpen={setIsOpen} />
			</ModalEdit>
			<div className={styles.images}>
				<Image
					className={styles.cover}
					src={
						isLoadingProfile
							? 'http://localhost:5000/uploads/default/background.jpg'
							: `http://localhost:5000${myProfile?.backgroundPic}`
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
							: `http://localhost:5000${myProfile?.avatar}`
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
								? 'СКЕЛЕТОН'
								: `${myProfile?.firstName} ${myProfile?.lastName}`}
						</span>
						<div className={styles.info}>
							<div className={styles.item}>
								<Image src={home} alt="home" width={20} height={20} />
								<span>
									{isLoadingProfile
										? 'SKELETON'
										: myProfile?.city
										? myProfile.city
										: 'указать город'}
								</span>
							</div>
						</div>
						<div className={styles.buttons}>
							<Button onClick={() => setIsOpen((prev) => !prev)}>
								Редактировать профиль
							</Button>
						</div>
					</div>
				</div>
				<SubmitPost refetch={refetchPosts} />
				{posts?.map((post) => (
					<Post post={post} key={post._id} refetchPosts={refetchPosts} />
				))}
			</div>
		</div>
	)
}

export default MyProfile
