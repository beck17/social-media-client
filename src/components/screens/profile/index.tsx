import { FC } from 'react'
import { useRouter } from 'next/router'

import { useUserProfile } from '@/hooks/useProfile'
import { useUserPost } from '@/hooks/usePost'

import { ProfileImages } from '@/components/ui/images/ProfileImages'
import { ProfileInfo } from '@/components/ui/profile-info/ProfileInfo'
import  Post  from '@/components/ui/post/Post'

import styles from '@/assets/styles/screens/Profile.module.scss'


const Profile: FC = () => {
	const router = useRouter()
	const profileId = router.query.id as string

	const { posts } = useUserPost(profileId)

	const {
		isLoading: isLoadingProfile,
		userProfile,
	} = useUserProfile(profileId)


	return (
		<div className={styles.profile}>
			<ProfileImages isLoading={isLoadingProfile} avatar={userProfile?.avatar}
										 backgroundPic={userProfile?.backgroundPic} />
			<div className={styles.profileContainer}>
				<ProfileInfo profileId={profileId} userProfile={userProfile} isLoading={isLoadingProfile} />

				{posts?.map((post) => (
					<Post post={post} key={post._id} />
				))}
			</div>
		</div>
	)
}

export default Profile
