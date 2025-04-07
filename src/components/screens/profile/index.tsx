import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { useUserProfile } from '@/hooks/useProfile'
import { useUserPost } from '@/hooks/posts/useGetPost'

import { CoverWithAvatar } from '@/components/ui/images/CoverWithAvatar'
import { ProfileInfo } from '@/components/ui/profile-info/ProfileInfo'
import Post from '@/components/ui/post/Post'

import styles from '@/assets/styles/screens/Profile.module.scss'
import PostLoader from '@/components/ui/skeletons/post-loader/PostLoader'
import { FriendActions } from '@/components/ui/friend-actions/FriendActions'
import { EmptyInfoBlock } from '@/components/ui/empty-users-block/EmptyInfoBlock'
import { IUser } from '@/types/user.interface'
import { InfoSkeleton } from '@/components/ui/skeletons/info-item-skeleton/InfoItemSkeleton'
import { CoverWithAvatarSkeleton } from '@/components/ui/skeletons/cover-with-avatar-skeleton/CoverWithAvatarSkeleton'


const Profile: FC = () => {
	const router = useRouter()
	const profileId = router.query.id as string

	const { posts = [], isLoading: isLoadingPosts, refetch } = useUserPost(profileId)

	const {
		isLoading: isLoadingProfile,
		userProfile = {} as IUser,
		refetchUserProfile,
	} = useUserProfile(profileId)

	const imagesRender = () => {
		if (isLoadingProfile) return <CoverWithAvatarSkeleton />

		return (
			<CoverWithAvatar
				backgroundPic={userProfile.backgroundPic}
				avatar={userProfile.avatar}
			/>
		)
	}

	const infoBlockRender = () => {
		if (isLoadingProfile) return <InfoSkeleton />
		return (
			<>
				<ProfileInfo
					profileId={profileId}
					userProfile={userProfile}
					isProfile
				/>
				<FriendActions refetch={refetchUserProfile} friendId={profileId} />
			</>
		)
	}

	const renderData = () => {
		if (isLoadingPosts) return <PostLoader />

		if (!isLoadingPosts && !posts.length) {
			return <EmptyInfoBlock text='Постов нет' smallSize />
		}

		return (
			posts.map((post) => (
				<Post post={post} key={post._id} refetchPosts={refetch} />
			))
		)
	}

	return (
		<div className={styles.profile}>
			{imagesRender()}

			<div className={styles.uInfo}>
				{infoBlockRender()}
			</div>

			<div className={styles.postsContainer}>
				{renderData()}
			</div>
		</div>
	)
}

export default Profile
