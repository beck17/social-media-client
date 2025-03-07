import React, { FC } from 'react'

import styles from '@/assets/styles/screens/Profile.module.scss'
import home from '@/assets/img/home.svg'

import { useProfile } from '@/hooks/useProfile'
import { useUserPost } from '@/hooks/usePost'
import Post from '../../ui/post/Post'
import SubmitPost from '../feed/submitPost/SubmitPost'
import Button from '../../ui/button/Button'
import ModalEdit from '../../ui/modal/Modal'
import ProfileForm from '../../ui/edit-forms/profile-form/ProfileForm'
import { ProfileImages } from '@/components/ui/images/ProfileImages'
import { InfoBlock } from '@/components/ui/info/city-info/InfoBlock'

const MyProfile: FC = () => {
	const [modalIsOpen, setIsOpen] = React.useState(false)

	const {
		myProfile,
		isLoading: isLoadingProfile,
		refetch: refetchProfile,
	} = useProfile()
	const {
		posts,
		isLoading: isLoadingPosts,
		refetch: refetchPosts,
	} = useUserPost(myProfile?._id)

	return (
		<div className={styles.profile}>
			<ModalEdit modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
				<ProfileForm refetch={refetchProfile} setIsOpen={setIsOpen} />
			</ModalEdit>

			<ProfileImages
				isLoading={isLoadingProfile}
				backgroundPic={myProfile?.backgroundPic}
				avatar={myProfile?.avatar}
			/>

			<div className={styles.profileContainer}>
				<div className={styles.uInfo}>
					<div className={styles.center}>
						<span className={styles.name}>
							{isLoadingProfile
								? 'СКЕЛЕТОН'
								: `${myProfile?.firstName} ${myProfile?.lastName}`}
						</span>
						<div className={styles.info}>
							<InfoBlock src={home} text={myProfile?.city} />
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
					<Post post={post} key={post._id} />
				))}
			</div>
		</div>
	)
}

export default MyProfile
