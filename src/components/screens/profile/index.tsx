import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { useUserProfile } from '@/hooks/useProfile'
import { useUserPost } from '@/hooks/usePost'

import { ProfileImages } from '@/components/ui/images/ProfileImages'
import { ProfileInfo } from '@/components/ui/profile-info/ProfileInfo'
import Post from '@/components/ui/post/Post'

import styles from '@/assets/styles/screens/Profile.module.scss'
import PostLoader from '@/components/ui/loaders/post-loader/PostLoader'
import { FriendActions } from '@/components/ui/friend-actions/FriendActions'


const Profile: FC = () => {
	const router = useRouter()
	const profileId = router.query.id as string

	const { posts, isLoading: isLoadingPosts } = useUserPost(profileId)

	const {
		isLoading: isLoadingProfile,
		userProfile,
		refetchUserProfile,
	} = useUserProfile(profileId)


	return (
		<div className={styles.profile}>
			<ProfileImages
				isLoading={isLoadingProfile}
				avatar={userProfile?.avatar}
				backgroundPic={userProfile?.backgroundPic}
			/>

			<div className={styles.uInfo}>
				<ProfileInfo
					refetchUserProfile={refetchUserProfile}
					profileId={profileId}
					userProfile={userProfile}
					isLoading={isLoadingProfile}
					style={{ left: '100px' }}
				/>
				<FriendActions refetchUserProfile={refetchUserProfile} friendId={profileId} />

			</div>

			<div className={styles.postsContainer}>
				{isLoadingPosts ? (
					<PostLoader />
				) : (
					posts?.map((post) => (
						<Post post={post} key={post._id} />
					))
				)}
			</div>
		</div>
	)
}

export default Profile
